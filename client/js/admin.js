/**
 * Optimal Management Consultancy - Admin Dashboard JavaScript
 * Complete lead management, gallery manager, analytics, CSV export, and API health monitoring
 */

let adminToken = null;
let adminUser = null;
let allLeads = [];
let allStats = null;
let allGalleries = [];
let activeTab = 'overview';
let filterStatus = 'All';
let searchQuery = '';
let selectedFiles = [];

const STATUS_COLORS = {
  New: '#4ade80',
  Contacted: '#C9A84C',
  Closed: '#9E9E9E'
};

document.addEventListener('DOMContentLoaded', () => {
  adminToken = localStorage.getItem('optimal_token');
  const storedUser = localStorage.getItem('optimal_admin');

  if (!adminToken) {
    window.location.href = 'login.html';
    return;
  }

  if (storedUser) {
    try {
      adminUser = JSON.parse(storedUser);
      updateAdminUserUI();
    } catch (e) {}
  }

  initAdminTabs();
  initSidebar();
  initFiltersAndSearch();
  initGalleryUpload();
  initApiStatusChecker();
  fetchDashboardData();

  const refreshBtn = document.getElementById('admin-refresh-btn');
  if (refreshBtn) refreshBtn.addEventListener('click', fetchDashboardData);

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  const exportBtn = document.getElementById('export-leads-btn');
  if (exportBtn) exportBtn.addEventListener('click', exportLeadsToCsv);
});

function updateAdminUserUI() {
  if (!adminUser) return;
  const nameEl = document.getElementById('admin-display-name');
  const emailEl = document.getElementById('admin-display-email');
  if (nameEl && adminUser.name) nameEl.textContent = adminUser.name;
  if (emailEl && adminUser.email) emailEl.textContent = adminUser.email;
}

function getApiUrl(path = '') {
  if (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.getApiUrl === 'function') {
    return window.OPTIMAL_CONFIG.getApiUrl(path);
  }
  const base = (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) ? window.OPTIMAL_CONFIG.API_URL : 'https://optimal-fkiy.onrender.com';
  const cleanPath = path ? (path.startsWith('/') ? path : '/' + path) : '';
  return base + cleanPath;
}

function formatImageUrl(url) {
  if (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.formatImageUrl === 'function') {
    return window.OPTIMAL_CONFIG.formatImageUrl(url);
  }
  if (!url) return 'assets/optimallogotran.png';
  if (/^(https?:|\/\/|data:|blob:|assets\/|\.\.\/assets\/)/i.test(url)) return url;
  const base = (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) ? window.OPTIMAL_CONFIG.API_URL : 'https://optimal-fkiy.onrender.com';
  return base + (url.startsWith('/') ? url : '/' + url);
}

function getAuthHeaders() {
  return {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };
}

async function initApiStatusChecker() {
  const statusBadge = document.getElementById('api-status-badge');
  if (!statusBadge) return;

  async function check() {
    try {
      const res = await fetch(getApiUrl('/api/health'), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const mode = data.db === 'mongodb_connected' ? 'MongoDB' : 'In-Memory';
        statusBadge.innerHTML = `<span style="color: #4ade80;">●</span> API Online (${mode})`;
        statusBadge.style.borderColor = 'rgba(74, 222, 128, 0.4)';
        statusBadge.title = `Connected to ${getApiUrl()} (${mode})`;
      } else {
        throw new Error('Non-200 status');
      }
    } catch (e) {
      statusBadge.innerHTML = `<span style="color: #ff6b6b;">●</span> API Offline`;
      statusBadge.style.borderColor = 'rgba(255, 107, 107, 0.4)';
      statusBadge.title = `Cannot reach ${getApiUrl()}`;
    }
  }

  check();
  setInterval(check, 30000);
}

async function fetchDashboardData() {
  const headers = getAuthHeaders();
  const refreshBtn = document.getElementById('admin-refresh-btn');
  if (refreshBtn) refreshBtn.textContent = '🔄 Loading...';

  try {
    const [leadsRes, statsRes, galleriesRes] = await Promise.all([
      fetch(getApiUrl('/api/leads'), { headers }),
      fetch(getApiUrl('/api/stats'), { headers }),
      fetch(getApiUrl('/api/gallery'))
    ]);

    if (leadsRes.status === 401) {
      handleLogout();
      return;
    }

    const leadsData = await leadsRes.json();
    const statsData = await statsRes.json();
    const galleriesData = await galleriesRes.json();

    if (leadsData.success) allLeads = leadsData.leads || [];
    if (statsData.success) allStats = statsData.stats || {};
    if (galleriesData.success) allGalleries = galleriesData.galleries || [];

    renderActiveTab();
  } catch (err) {
    console.error('Error fetching admin data:', err);
  } finally {
    if (refreshBtn) refreshBtn.textContent = '🔄 Refresh';
  }
}

function initAdminTabs() {
  const tabBtns = document.querySelectorAll('.admin-nav-item');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');

      const titleEl = document.getElementById('topbar-tab-title');
      if (titleEl) {
        titleEl.textContent = btn.querySelector('.tab-label') ? btn.querySelector('.tab-label').textContent : activeTab.toUpperCase();
      }

      document.querySelectorAll('.tab-view').forEach(view => {
        view.style.display = 'none';
      });
      const activeView = document.getElementById(`tab-view-${activeTab}`);
      if (activeView) activeView.style.display = 'block';

      renderActiveTab();
    });
  });
}

function initSidebar() {
  const toggleBtn = document.getElementById('sidebar-collapse-btn');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const isCollapsed = sidebar.classList.contains('collapsed');
      toggleBtn.querySelector('.collapse-label').textContent = isCollapsed ? '' : 'Collapse';
    });
  }
}

function initFiltersAndSearch() {
  const searchInput = document.getElementById('leads-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderLeadsTable();
    });
  }

  const filterBtns = document.querySelectorAll('.lead-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.style.background = 'rgba(255,255,255,0.06)';
        b.style.color = 'rgba(255,255,255,0.5)';
      });
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--wine-deep)';
      filterStatus = btn.getAttribute('data-status');
      renderLeadsTable();
    });
  });
}

function renderActiveTab() {
  if (activeTab === 'overview') {
    renderOverview();
  } else if (activeTab === 'leads') {
    renderLeadsTable();
  } else if (activeTab === 'gallery') {
    renderAdminGalleries();
  } else if (activeTab === 'analytics') {
    renderAnalytics();
  }
}

function renderOverview() {
  const totalEl = document.getElementById('overview-total-leads');
  const newEl = document.getElementById('overview-new-leads');
  const viewsEl = document.getElementById('overview-page-views');
  const convEl = document.getElementById('overview-conv-rate');

  if (totalEl) totalEl.textContent = allStats?.totalLeads ?? allLeads.length;
  if (newEl) newEl.textContent = allStats?.newLeads ?? allLeads.filter(l => l.status === 'New').length;
  if (viewsEl) viewsEl.textContent = (allStats?.pageViews ?? 1250).toLocaleString();
  if (convEl) convEl.textContent = allStats?.conversionRate ?? '3.2%';

  const tbody = document.getElementById('overview-recent-leads');
  if (!tbody) return;

  const recents = allLeads.slice(0, 5);
  if (recents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: rgba(255,255,255,0.3); padding: 2.5rem;">No consultation inquiries yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = recents.map(l => `
    <tr style="cursor: pointer;" onclick="openLeadModal('${l._id}')">
      <td>
        <div style="font-weight: 700; color: var(--white);">${escapeHtml(l.name)}</div>
        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4);">${escapeHtml(l.email)}</div>
      </td>
      <td style="color: rgba(255,255,255,0.7);">${escapeHtml(l.company || '—')}</td>
      <td style="color: var(--gold); font-size: 0.82rem;">${escapeHtml(l.inquiryType || 'General Consultation')}</td>
      <td style="color: rgba(255,255,255,0.4); font-size: 0.8rem;">${new Date(l.createdAt).toLocaleDateString('en-GB')}</td>
      <td>
        <span class="status-pill status-${l.status}">${l.status}</span>
      </td>
    </tr>
  `).join('');
}

function renderLeadsTable() {
  const tbody = document.getElementById('full-leads-table');
  const countEl = document.getElementById('leads-count-label');
  if (!tbody) return;

  const filtered = allLeads.filter(l => {
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    const matchSearch = !searchQuery || [l.name, l.email, l.phone, l.company, l.industry, l.message, l.notes].some(f => f?.toLowerCase().includes(searchQuery));
    return matchStatus && matchSearch;
  });

  if (countEl) countEl.textContent = `${filtered.length} of ${allLeads.length} leads`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: rgba(255,255,255,0.3); padding: 3rem;">No matching leads found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(l => `
    <tr style="cursor: pointer;" onclick="openLeadModal('${l._id}')">
      <td>
        <div style="font-weight: 700; color: var(--white);">${escapeHtml(l.name)}</div>
        <div style="font-size: 0.74rem; color: rgba(255,255,255,0.4);">${escapeHtml(l.email)}</div>
        <div style="font-size: 0.74rem; color: var(--gold);">${escapeHtml(l.phone)}</div>
      </td>
      <td>
        <div style="color: rgba(255,255,255,0.8);">${escapeHtml(l.company || '—')}</div>
        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.35);">${escapeHtml(l.industry || '—')}</div>
      </td>
      <td style="color: var(--gold-light); font-size: 0.82rem; max-width: 170px;">${escapeHtml(l.inquiryType || 'General')}</td>
      <td style="max-width: 200px; color: rgba(255,255,255,0.5); font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${escapeHtml(l.message || '—')}
      </td>
      <td style="color: rgba(255,255,255,0.4); font-size: 0.78rem; white-space: nowrap;">${new Date(l.createdAt).toLocaleDateString('en-GB')}</td>
      <td>
        <span class="status-pill status-${l.status}">${l.status}</span>
      </td>
      <td onclick="event.stopPropagation()" style="white-space: nowrap;">
        <select onchange="handleLeadStatusUpdate('${l._id}', this.value)" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(201,168,76,0.25); color: var(--gold); border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.75rem; cursor: pointer; outline: none; margin-right: 0.4rem;">
          <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
          <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Closed" ${l.status === 'Closed' ? 'selected' : ''}>Closed</option>
        </select>
        <button onclick="handleDeleteLead('${l._id}')" title="Delete lead" style="background: rgba(255,107,107,0.12); border: 1px solid rgba(255,107,107,0.25); border-radius: 6px; color: #ff6b6b; padding: 0.3rem 0.5rem; cursor: pointer; font-size: 0.75rem;">
          🗑️
        </button>
      </td>
    </tr>
  `).join('');
}

async function handleLeadStatusUpdate(leadId, newStatus) {
  try {
    const res = await fetch(getApiUrl(`/api/leads/${leadId}`), {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      allLeads = allLeads.map(l => l._id === leadId ? { ...l, status: newStatus } : l);
      renderActiveTab();
    }
  } catch (err) {
    console.error('Error updating status:', err);
  }
}

async function handleDeleteLead(leadId) {
  const lead = allLeads.find(l => l._id === leadId);
  const name = lead ? lead.name : 'this lead';
  if (!confirm(`Are you sure you want to permanently delete the inquiry for "${name}"?`)) {
    return;
  }

  try {
    const res = await fetch(getApiUrl(`/api/leads/${leadId}`), {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (data.success) {
      allLeads = allLeads.filter(l => l._id !== leadId);
      closeLeadModal();
      renderActiveTab();
    } else {
      alert(data.message || 'Failed to delete lead');
    }
  } catch (err) {
    console.error('Error deleting lead:', err);
    alert('Network error while deleting lead.');
  }
}

function openLeadModal(leadId) {
  const lead = allLeads.find(l => l._id === leadId);
  if (!lead) return;

  const modal = document.getElementById('lead-detail-modal');
  const body = document.getElementById('lead-modal-body');
  if (!modal || !body) return;

  const cleanPhone = (lead.phone || '').replace(/\D/g, '');

  body.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(201,168,76,0.15); padding-bottom: 1rem;">
      <div>
        <h2 style="color: var(--white); font-weight: 800; font-size: 1.3rem;">${escapeHtml(lead.name)}</h2>
        <p style="color: var(--gold); font-size: 0.85rem;">${escapeHtml(lead.company || 'Individual Client')}</p>
      </div>
      <button onclick="closeLeadModal()" style="background: none; border: none; color: rgba(255,255,255,0.5); font-size: 1.5rem; cursor: pointer;">✕</button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.88rem;">
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Email</span> <a href="mailto:${escapeHtml(lead.email)}" style="color: white; font-weight: 600; text-decoration: underline;">${escapeHtml(lead.email)}</a></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Phone</span> <a href="tel:${escapeHtml(lead.phone)}" style="color: var(--gold); font-weight: 600; text-decoration: none;">${escapeHtml(lead.phone)}</a></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Industry</span> <span style="color: white;">${escapeHtml(lead.industry || '—')}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Service Requested</span> <span style="color: var(--gold-light); font-weight: 600;">${escapeHtml(lead.inquiryType)}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Submitted Date</span> <span style="color: rgba(255,255,255,0.7);">${new Date(lead.createdAt).toLocaleString()}</span></div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: rgba(255,255,255,0.4);">Status</span>
        <select id="modal-lead-status" onchange="handleLeadStatusUpdate('${lead._id}', this.value)" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(201,168,76,0.3); color: var(--gold); border-radius: 6px; padding: 0.35rem 0.6rem; font-size: 0.8rem; cursor: pointer;">
          <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
          <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Closed" ${lead.status === 'Closed' ? 'selected' : ''}>Closed</option>
        </select>
      </div>

      ${lead.message ? `
        <div style="margin-top: 0.5rem; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 1rem; border: 1px solid rgba(255,255,255,0.08);">
          <div style="color: rgba(255,255,255,0.4); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.4rem;">Message</div>
          <p style="color: rgba(255,255,255,0.85); line-height: 1.6;">${escapeHtml(lead.message)}</p>
        </div>
      ` : ''}

      <!-- Internal Admin Notes -->
      <div style="margin-top: 0.5rem; background: rgba(201,168,76,0.05); border-radius: 8px; padding: 1rem; border: 1px solid rgba(201,168,76,0.2);">
        <div style="color: var(--gold); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; margin-bottom: 0.4rem;">Internal Consultation Notes</div>
        <textarea id="lead-notes-textarea" class="form-input" placeholder="Add follow-up notes, audit dates, agreed fee, etc..." rows="2" style="font-size: 0.85rem; resize: vertical; margin-bottom: 0.5rem;">${escapeHtml(lead.notes || '')}</textarea>
        <div style="display: flex; justify-content: flex-end;">
          <button onclick="saveLeadNotes('${lead._id}')" class="btn-gold" style="padding: 0.4rem 1rem; font-size: 0.78rem; border-radius: 6px;">
            💾 Save Notes
          </button>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 0.8rem; margin-top: 1.5rem;">
      <a href="mailto:${escapeHtml(lead.email)}" class="btn-gold" style="flex: 1; text-align: center; text-decoration: none; padding: 0.75rem; font-size: 0.88rem;">
        ✉️ Send Email
      </a>
      ${cleanPhone ? `
        <a href="https://wa.me/${cleanPhone}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; text-decoration: none; background: #25D366; color: white; padding: 0.75rem; border-radius: 4px; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
          💬 WhatsApp
        </a>
      ` : ''}
      <button onclick="handleDeleteLead('${lead._id}')" style="background: rgba(255,107,107,0.15); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 700;">
        🗑️ Delete
      </button>
    </div>
  `;

  modal.style.display = 'flex';
}

async function saveLeadNotes(leadId) {
  const textarea = document.getElementById('lead-notes-textarea');
  if (!textarea) return;
  const notes = textarea.value.trim();

  try {
    const res = await fetch(getApiUrl(`/api/leads/${leadId}`), {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ notes })
    });
    const data = await res.json();
    if (data.success) {
      allLeads = allLeads.map(l => l._id === leadId ? { ...l, notes } : l);
      alert('Internal notes saved successfully.');
    } else {
      alert(data.message || 'Failed to save notes');
    }
  } catch (err) {
    console.error('Error saving notes:', err);
    alert('Error saving notes.');
  }
}

function closeLeadModal() {
  const modal = document.getElementById('lead-detail-modal');
  if (modal) modal.style.display = 'none';
}

function exportLeadsToCsv() {
  if (allLeads.length === 0) {
    alert('No leads available to export.');
    return;
  }

  const headers = ['Name', 'Email', 'Phone', 'Company', 'Industry', 'Inquiry Type', 'Status', 'Date', 'Message', 'Notes'];
  const rows = allLeads.map(l => [
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.industry || '').replace(/"/g, '""')}"`,
    `"${(l.inquiryType || '').replace(/"/g, '""')}"`,
    `"${(l.status || '').replace(/"/g, '""')}"`,
    `"${new Date(l.createdAt).toLocaleDateString('en-GB')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `optimal_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function initGalleryUpload() {
  const fileInput = document.getElementById('gallery-file-input');
  const previewContainer = document.getElementById('gallery-upload-previews');
  const fileCountLabel = document.getElementById('dropzone-file-count');
  const form = document.getElementById('create-gallery-form');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      selectedFiles = Array.from(e.target.files);
      if (fileCountLabel) {
        fileCountLabel.textContent = selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Click or Drag Images Here';
      }

      if (previewContainer) {
        previewContainer.innerHTML = '';
        selectedFiles.forEach((file, index) => {
          const thumb = document.createElement('div');
          thumb.className = 'preview-thumb';
          thumb.style.position = 'relative';
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          thumb.appendChild(img);
          if (index === 0) {
            const badge = document.createElement('div');
            badge.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; background: rgba(201,168,76,0.85); color: #000; font-size: 0.6rem; font-weight: 800; text-align: center; padding: 2px;';
            badge.textContent = 'COVER';
            thumb.appendChild(badge);
          }
          previewContainer.appendChild(thumb);
        });
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('gallery-name-input').value.trim();
      const description = document.getElementById('gallery-desc-input').value.trim();
      const submitBtn = document.getElementById('gallery-submit-btn');

      if (!name || selectedFiles.length === 0) {
        alert('Please specify a gallery name and select at least one image.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Uploading Images...';
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      selectedFiles.forEach(f => formData.append('images', f));

      try {
        const res = await fetch(getApiUrl('/api/gallery'), {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${adminToken}` },
          body: formData
        });

        const data = await res.json();
        if (res.ok && data.success) {
          form.reset();
          selectedFiles = [];
          if (previewContainer) previewContainer.innerHTML = '';
          if (fileCountLabel) fileCountLabel.textContent = 'Click or Drag Images Here';
          alert('Gallery album published successfully!');
          fetchDashboardData();
        } else {
          alert(data.message || 'Upload failed');
        }
      } catch (err) {
        console.error('Error uploading gallery:', err);
        alert('Network error while uploading images. Check server connection.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Upload & Create Gallery';
        }
      }
    });
  }
}

function renderAdminGalleries() {
  const container = document.getElementById('admin-galleries-grid');
  if (!container) return;

  if (allGalleries.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.4); padding: 3rem; background: rgba(255,255,255,0.02); border-radius: 12px;">No active galleries created yet.</div>`;
    return;
  }

  container.innerHTML = allGalleries.map(g => `
    <div style="background: rgba(255,255,255,0.04); border-radius: 12px; overflow: hidden; border: 1px solid rgba(201,168,76,0.15);">
      <div style="height: 180px; position: relative; background: #000;">
        <img src="${formatImageUrl(g.coverImage)}" alt="${escapeHtml(g.name)}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" />
        <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 0.2rem 0.6rem; border-radius: 50px; font-size: 0.7rem; font-weight: 700;">
          ${g.images?.length || 0} Photos
        </span>
      </div>
      <div style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="color: white; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.2rem;">${escapeHtml(g.name)}</h4>
          <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem;">Created: ${new Date(g.createdAt).toLocaleDateString('en-GB')}</p>
        </div>
        <button onclick="handleDeleteGallery('${g._id}')" style="background: rgba(255,107,107,0.12); border: none; width: 36px; height: 36px; border-radius: 50%; color: #ff6b6b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Delete Gallery">
          🗑️
        </button>
      </div>
    </div>
  `).join('');
}

async function handleDeleteGallery(galleryId) {
  if (!confirm('Are you sure you want to delete this gallery album? This cannot be undone.')) return;

  try {
    const res = await fetch(getApiUrl(`/api/gallery/${galleryId}`), {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (data.success) {
      allGalleries = allGalleries.filter(g => g._id !== galleryId);
      renderAdminGalleries();
    } else {
      alert(data.message || 'Failed to delete gallery');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Error connecting to backend server.');
  }
}

function renderAnalytics() {
  const totalEl = document.getElementById('analytics-total-leads');
  const newEl = document.getElementById('analytics-new-leads');
  const viewsEl = document.getElementById('analytics-page-views');
  const convEl = document.getElementById('analytics-conv-rate');

  if (totalEl) totalEl.textContent = allStats?.totalLeads ?? allLeads.length;
  if (newEl) newEl.textContent = allStats?.newLeads ?? allLeads.filter(l => l.status === 'New').length;
  if (viewsEl) viewsEl.textContent = (allStats?.pageViews ?? 1250).toLocaleString();
  if (convEl) convEl.textContent = allStats?.conversionRate ?? '3.2%';

  const statusContainer = document.getElementById('analytics-status-breakdown');
  if (statusContainer) {
    const total = allLeads.length || 1;
    statusContainer.innerHTML = ['New', 'Contacted', 'Closed'].map(status => {
      const count = allLeads.filter(l => l.status === status).length;
      const pct = Math.round((count / total) * 100);
      return `
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="color: ${STATUS_COLORS[status]}; font-weight: 700; font-size: 0.85rem;">${status}</span>
            <span style="color: rgba(255,255,255,0.4); font-size: 0.82rem;">${count} (${pct}%)</span>
          </div>
          <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: ${STATUS_COLORS[status]}; border-radius: 3px; transition: width 0.5s;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  const servicesContainer = document.getElementById('analytics-services-breakdown');
  if (servicesContainer) {
    const counts = {};
    allLeads.forEach(l => {
      const key = l.inquiryType || 'General';
      counts[key] = (counts[key] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxVal = sorted[0] ? sorted[0][1] : 1;

    if (sorted.length === 0) {
      servicesContainer.innerHTML = `<p style="color: rgba(255,255,255,0.3);">No service requests logged yet.</p>`;
    } else {
      servicesContainer.innerHTML = sorted.map(([name, count]) => {
        const pct = Math.round((count / maxVal) * 100);
        return `
          <div style="margin-bottom: 1.1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
              <span style="color: rgba(255,255,255,0.8); font-size: 0.82rem;">${escapeHtml(name)}</span>
              <span style="color: var(--gold); font-size: 0.82rem; font-weight: 700;">${count}</span>
            </div>
            <div style="height: 5px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, var(--gold-dark), var(--gold-light)); border-radius: 3px;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
