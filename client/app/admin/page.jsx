'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, ClipboardList, TrendingUp, Loader2, RefreshCw, LogOut, FileText, PlusCircle, Eye, ChevronLeft, ChevronRight, Mail, Phone, Factory, Target, Calendar, Tag, MessageCircle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function StatCard({ icon, label, value, sub, color = 'var(--gold)' }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: 12, padding: '1.75rem', transition: 'all 0.3s'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
          <p style={{ fontSize: '2.2rem', fontWeight: 900, color, lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{sub}</p>}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 10, flexShrink: 0,
          background: `rgba(201,168,76,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
        }}>{icon}</div>
      </div>
    </div>
  );
}

const STATUS_COLORS = { New: '#4ade80', Contacted: 'var(--gold)', Closed: 'var(--grey-mid)' };

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('optimal_token') : null;

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchData = useCallback(async () => {
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch(`${API}/api/leads`, { headers: authHeaders }),
        fetch(`${API}/api/stats`, { headers: authHeaders }),
      ]);
      if (leadsRes.status === 401) { router.push('/login'); return; }
      const leadsData = await leadsRes.json();
      const statsData = await statsRes.json();
      if (leadsData.success) setLeads(leadsData.leads);
      if (statsData.success) setStats(statsData.stats);
    } catch { }
    setLoading(false);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('optimal_admin');
    if (!token) { router.push('/login'); return; }
    if (stored) setAdmin(JSON.parse(stored));
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('optimal_token');
    localStorage.removeItem('optimal_admin');
    router.push('/login');
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await fetch(`${API}/api/leads/${id}`, {
        method: 'PATCH', headers: authHeaders, body: JSON.stringify({ status: newStatus })
      });
      setLeads(p => p.map(l => l._id === id ? { ...l, status: newStatus } : l));
    } catch { }
    setUpdatingId(null);
  };

  const filtered = leads.filter(l => {
    const matchSearch = !search || [l.name, l.email, l.company, l.phone].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const navItems = [
    { id: 'overview', icon: <BarChart size={20} />, label: 'Overview' },
    { id: 'leads', icon: <ClipboardList size={20} />, label: 'Lead Management' },
    { id: 'analytics', icon: <TrendingUp size={20} />, label: 'Analytics' },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--wine-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--gold)' }}>
        <Loader2 size={40} style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ fontWeight: 600 }}>Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--wine-deep)', display: 'flex', fontFamily: 'Outfit, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 260 : 72, background: 'rgba(58,10,31,0.95)', backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(201,168,76,0.15)', display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s ease', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '1rem', color: 'var(--wine-deep)'
          }}>O</div>
          {sidebarOpen && <div>
            <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Optimal Admin</div>
            <div style={{ color: 'var(--gold)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dashboard</div>
          </div>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem',
              borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s',
              background: activeTab === item.id ? 'rgba(201,168,76,0.15)' : 'transparent',
              borderLeft: activeTab === item.id ? '3px solid var(--gold)' : '3px solid transparent',
              color: activeTab === item.id ? 'var(--gold-light)' : 'rgba(255,255,255,0.5)',
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: '0.88rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: 8, cursor: 'pointer', width: '100%', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem'
          }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>{sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}</span>
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          background: 'rgba(58,10,31,0.8)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100
        }}>
          <div>
            <h1 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.1rem' }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={fetchData} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 6, padding: '0.5rem 1rem', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Outfit, sans-serif'
            }}><RefreshCw size={14} /> Refresh</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--wine-deep)', fontSize: '0.85rem'
              }}>A</div>
              <div style={{ display: 'none' }} className="admin-name">
                <div style={{ color: 'var(--white)', fontSize: '0.85rem', fontWeight: 600 }}>{admin?.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>{admin?.email}</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)',
              borderRadius: 6, padding: '0.5rem 1rem', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Outfit, sans-serif'
            }}><LogOut size={14} /> Logout</button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }} className="stats-grid">
                <StatCard icon={<FileText size={24} />} label="Total Leads" value={stats?.totalLeads ?? 0} sub="All time form submissions" />
                <StatCard icon={<PlusCircle size={24} />} label="New Leads" value={stats?.newLeads ?? 0} sub="Awaiting follow-up" color="#4ade80" />
                <StatCard icon={<Eye size={24} />} label="Page Views" value={stats?.pageViews?.toLocaleString() ?? 0} sub="Estimated visits" />
                <StatCard icon={<BarChart size={24} />} label="Conversion" value={stats?.conversionRate ?? '0%'} sub="Leads / page views" color="var(--gold-light)" />
              </div>

              {/* Recent Leads */}
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: 12, overflow: 'hidden'
              }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem' }}>Recent Leads</h3>
                  <button onClick={() => setActiveTab('leads')} style={{
                    color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Outfit, sans-serif'
                  }}>View All →</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                        {['Name', 'Company', 'Service', 'Date', 'Status'].map(h => (
                          <th key={h} style={{ padding: '0.75rem 1.25rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {leads.slice(0, 5).map(l => (
                        <tr key={l._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                          <td style={{ padding: '0.9rem 1.25rem' }}>
                            <div style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.87rem' }}>{l.name}</div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.74rem' }}>{l.email}</div>
                          </td>
                          <td style={{ padding: '0.9rem 1.25rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{l.company || '—'}</td>
                          <td style={{ padding: '0.9rem 1.25rem', color: 'var(--gold)', fontSize: '0.82rem' }}>{l.inquiryType}</td>
                          <td style={{ padding: '0.9rem 1.25rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{new Date(l.createdAt).toLocaleDateString()}</td>
                          <td style={{ padding: '0.9rem 1.25rem' }}>
                            <span style={{
                              background: `${STATUS_COLORS[l.status]}22`,
                              color: STATUS_COLORS[l.status],
                              padding: '0.25rem 0.75rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600
                            }}>{l.status}</span>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr><td colSpan={5} style={{ padding: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>No leads yet. They will appear here once visitors submit the consultation form.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* LEADS TAB */}
          {activeTab === 'leads' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Filters */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  className="form-input"
                  placeholder="🔍 Search by name, email, company..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ maxWidth: 320 }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['All', 'New', 'Contacted', 'Closed'].map(s => (
                    <button key={s} onClick={() => setFilterStatus(s)} style={{
                      padding: '0.55rem 1rem', borderRadius: 50, border: 'none', cursor: 'pointer',
                      fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem', fontWeight: 600,
                      background: filterStatus === s ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                      color: filterStatus === s ? 'var(--wine-deep)' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.2s'
                    }}>{s}</button>
                  ))}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', marginLeft: 'auto' }}>
                  {filtered.length} of {leads.length} leads
                </span>
              </div>

              {/* Table */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.04)' }}>
                        {['Contact', 'Company / Industry', 'Service Requested', 'Message', 'Date', 'Status', 'Action'].map(h => (
                          <th key={h} style={{ padding: '0.9rem 1.25rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(l => (
                        <tr key={l._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s', cursor: 'pointer' }}
                          onClick={() => setSelectedLead(l)}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.87rem' }}>{l.name}</div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.73rem' }}>{l.email}</div>
                            <div style={{ color: 'var(--gold)', fontSize: '0.73rem' }}>{l.phone}</div>
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{l.company || '—'}</div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{l.industry || '—'}</div>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', color: 'var(--gold-light)', fontSize: '0.82rem', maxWidth: 160 }}>{l.inquiryType}</td>
                          <td style={{ padding: '1rem 1.25rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', maxWidth: 180 }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.message || '—'}</div>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                            {new Date(l.createdAt).toLocaleDateString('en-GB')}
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <span style={{
                              background: `${STATUS_COLORS[l.status]}22`, color: STATUS_COLORS[l.status],
                              padding: '0.25rem 0.7rem', borderRadius: 50, fontSize: '0.73rem', fontWeight: 600
                            }}>{l.status}</span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }} onClick={e => e.stopPropagation()}>
                            <select
                              value={l.status}
                              onChange={e => handleStatusChange(l._id, e.target.value)}
                              disabled={updatingId === l._id}
                              style={{
                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)',
                                borderRadius: 6, padding: '0.35rem 0.6rem', color: 'var(--gold)',
                                fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', outline: 'none'
                              }}>
                              <option value="New" style={{ background: 'var(--wine-dark)' }}>New</option>
                              <option value="Contacted" style={{ background: 'var(--wine-dark)' }}>Contacted</option>
                              <option value="Closed" style={{ background: 'var(--wine-dark)' }}>Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>No leads match your filter.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }} className="stats-grid">
                <StatCard icon={<FileText size={24} />} label="Total Leads" value={stats?.totalLeads ?? 0} />
                <StatCard icon={<PlusCircle size={24} />} label="New Leads" value={stats?.newLeads ?? 0} color="#4ade80" />
                <StatCard icon={<Eye size={24} />} label="Est. Page Views" value={stats?.pageViews?.toLocaleString() ?? 0} />
                <StatCard icon={<BarChart size={24} />} label="Conversion Rate" value={stats?.conversionRate ?? '0%'} color="var(--gold-light)" />
              </div>

              {/* Lead Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* By Status */}
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '1.75rem' }}>
                  <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.5rem' }}>Leads by Status</h3>
                  {['New', 'Contacted', 'Closed'].map(s => {
                    const count = leads.filter(l => l.status === s).length;
                    const pct = leads.length ? Math.round((count / leads.length) * 100) : 0;
                    return (
                      <div key={s} style={{ marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ color: STATUS_COLORS[s], fontSize: '0.85rem', fontWeight: 600 }}>{s}</span>
                          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>{count} ({pct}%)</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: STATUS_COLORS[s], borderRadius: 3, transition: 'width 0.6s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* By Inquiry */}
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '1.75rem' }}>
                  <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.5rem' }}>Top Services Requested</h3>
                  {(() => {
                    const counts = {};
                    leads.forEach(l => { counts[l.inquiryType] = (counts[l.inquiryType] || 0) + 1; });
                    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
                    if (!sorted.length) return <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>No data yet.</p>;
                    return sorted.map(([type, count]) => {
                      const pct = leads.length ? Math.round((count / leads.length) * 100) : 0;
                      return (
                        <div key={type} style={{ marginBottom: '1.1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>{type}</span>
                            <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>{count}</span>
                          </div>
                          <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))', borderRadius: 3 }} />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
          zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }} onClick={() => setSelectedLead(null)}>
          <div style={{
            background: 'var(--wine-dark)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 16, padding: '2rem', maxWidth: 520, width: '100%'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.1rem' }}>{selectedLead.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '0.82rem' }}>{selectedLead.company || 'No company provided'}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1.4rem' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                [<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={16} /> Email</span>, selectedLead.email],
                [<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={16} /> Phone</span>, selectedLead.phone],
                [<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Factory size={16} /> Industry</span>, selectedLead.industry || '—'],
                [<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Target size={16} /> Service</span>, selectedLead.inquiryType],
                [<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> Submitted</span>, new Date(selectedLead.createdAt).toLocaleString()],
                [<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Tag size={16} /> Status</span>, selectedLead.status],
              ].map(([k, v], idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', minWidth: 110 }}>{k}</span>
                  <span style={{ color: 'var(--white)', fontSize: '0.87rem', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              {selectedLead.message && (
                <div style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageCircle size={14} /> Message</div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.87rem', lineHeight: 1.7 }}>{selectedLead.message}</p>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
              <a href={`mailto:${selectedLead.email}`} className="btn-gold" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={16} /> Send Email
              </a>
              <a href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', padding: '0.75rem', background: '#25D366', color: '#fff', borderRadius: 4, fontWeight: 700, fontSize: '0.9rem'
                }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){ .stats-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:560px){ .stats-grid{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
