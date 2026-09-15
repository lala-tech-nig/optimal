/**
 * Optimal Management Consultancy - Admin Dashboard JavaScript
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
      const nameEl = document.getElementById('admin-display-name');
      const emailEl = document.getElementById('admin-display-email');
      if (nameEl && adminUser.name) nameEl.textContent = adminUser.name;
      if (emailEl && adminUser.email) emailEl.textContent = adminUser.email;
    } catch (e) {}
  }

  initAdminTabs();
  initSidebar();
  initFiltersAndSearch();
  initGalleryUpload();
  fetchDashboardData();

  const refreshBtn = document.getElementById('admin-refresh-btn');
  if (refreshBtn) refreshBtn.addEventListener('click', fetchDashboardData);

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
});

function getApiUrl() {
  return (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) ? window.OPTIMAL_CONFIG.API_URL : 'http://localhost:5000';
}

function getAuthHeaders() {
  return {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };
}

async function fetchDashboardData() {
  const apiUrl = getApiUrl();
  const headers = getAuthHeaders();

  try {
    const [leadsRes, statsRes, galleriesRes] = await Promise.all([
      fetch(`${apiUrl}/api/leads`, { headers }),
      fetch(`${apiUrl}/api/stats`, { headers }),
      fetch(`${apiUrl}/api/gallery`)
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
  }
}

function initAdminTabs() {
  const tabBtns = document.querySelectorAll('.admin-nav-item');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');

      // Update Topbar Title
      const titleEl = document.getElementById('topbar-tab-title');
      if (titleEl) {
        titleEl.textContent = btn.querySelector('.tab-label') ? btn.querySelector('.tab-label').textContent : activeTab.toUpperCase();
      }

      // Toggle views
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
  // Update stat values
  document.getElementById('overview-total-leads').textContent = allStats?.totalLeads ?? allLeads.length;
  document.getElementById('overview-new-leads').textContent = allStats?.newLeads ?? allLeads.filter(l => l.status === 'New').length;
  document.getElementById('overview-page-views').textContent = (allStats?.pageViews ?? 1250).toLocaleString();
  document.getElementById('overview-conv-rate').textContent = allStats?.conversionRate ?? '3.2%';

  // Render recent 5 leads
  const tbody = document.getElementById('overview-recent-leads');
  if (!tbody) return;

  const recents = allLeads.slice(0, 5);
  if (recents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: rgba(255,255,255,0.3); padding: 2.5rem;">No consultation leads submitted yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = recents.map(l => `
    <tr>
      <td>
        <div style="font-weight: 700; color: var(--white);">${l.name}</div>
        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4);">${l.email}</div>
      </td>
      <td style="color: rgba(255,255,255,0.7);">${l.company || '—'}</td>
      <td style="color: var(--gold); font-size: 0.82rem;">${l.inquiryType || 'General Consultation'}</td>
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
    const matchSearch = !searchQuery || [l.name, l.email, l.phone, l.company].some(f => f?.toLowerCase().includes(searchQuery));
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
        <div style="font-weight: 700; color: var(--white);">${l.name}</div>
        <div style="font-size: 0.74rem; color: rgba(255,255,255,0.4);">${l.email}</div>
        <div style="font-size: 0.74rem; color: var(--gold);">${l.phone}</div>
      </td>
      <td>
        <div style="color: rgba(255,255,255,0.8);">${l.company || '—'}</div>
        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.35);">${l.industry || '—'}</div>
      </td>
      <td style="color: var(--gold-light); font-size: 0.82rem; max-width: 170px;">${l.inquiryType || 'General'}</td>
      <td style="max-width: 200px; color: rgba(255,255,255,0.5); font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${l.message || '—'}
      </td>
      <td style="color: rgba(255,255,255,0.4); font-size: 0.78rem; white-space: nowrap;">${new Date(l.createdAt).toLocaleDateString('en-GB')}</td>
      <td>
        <span class="status-pill status-${l.status}">${l.status}</span>
      </td>
      <td onclick="event.stopPropagation()">
        <select onchange="handleLeadStatusUpdate('${l._id}', this.value)" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(201,168,76,0.25); color: var(--gold); border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.75rem; cursor: pointer; outline: none;">
          <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
          <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Closed" ${l.status === 'Closed' ? 'selected' : ''}>Closed</option>
        </select>
      </td>
    </tr>
  `).join('');
}

async function handleLeadStatusUpdate(leadId, newStatus) {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/leads/${leadId}`, {
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
        <h2 style="color: var(--white); font-weight: 800; font-size: 1.3rem;">${lead.name}</h2>
        <p style="color: var(--gold); font-size: 0.85rem;">${lead.company || 'Individual Client'}</p>
      </div>
      <button onclick="closeLeadModal()" style="background: none; border: none; color: rgba(255,255,255,0.5); font-size: 1.5rem; cursor: pointer;">✕</button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.9rem; font-size: 0.88rem;">
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Email</span> <span style="color: white; font-weight: 600;">${lead.email}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Phone</span> <span style="color: var(--gold); font-weight: 600;">${lead.phone}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Industry</span> <span style="color: white;">${lead.industry || '—'}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Service Requested</span> <span style="color: var(--gold-light); font-weight: 600;">${lead.inquiryType}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Submitted Date</span> <span style="color: rgba(255,255,255,0.7);">${new Date(lead.createdAt).toLocaleString()}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: rgba(255,255,255,0.4);">Status</span> <span class="status-pill status-${lead.status}">${lead.status}</span></div>

      ${lead.message ? `
        <div style="margin-top: 0.5rem; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 1rem; border: 1px solid rgba(255,255,255,0.08);">
          <div style="color: rgba(255,255,255,0.4); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.4rem;">Message</div>
          <p style="color: rgba(255,255,255,0.85); line-height: 1.6;">${lead.message}</p>
        </div>
      ` : ''}
    </div>

    <div style="display: flex; gap: 0.8rem; margin-top: 1.8rem;">
      <a href="mailto:${lead.email}" class="btn-gold" style="flex: 1; text-align: center; text-decoration: none; padding: 0.75rem; font-size: 0.9rem;">
        ✉️ Send Email
      </a>
      ${cleanPhone ? `
        <a href="https://wa.me/${cleanPhone}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; text-decoration: none; background: #25D366; color: white; padding: 0.75rem; border-radius: 4px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
          💬 WhatsApp
        </a>
      ` : ''}
    </div>
  `;

  modal.style.display = 'flex';
}

function closeLeadModal() {
  const modal = document.getElementById('lead-detail-modal');
  if (modal) modal.style.display = 'none';
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
        submitBtn.textContent = '⏳ Uploading to Cloudinary / Server...';
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      selectedFiles.forEach(f => formData.append('images', f));

      const apiUrl = getApiUrl();

      try {
        const res = await fetch(`${apiUrl}/api/gallery`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${adminToken}` },
          body: formData
        });

        const data = await res.json();
        if (data.success) {
          form.reset();
          selectedFiles = [];
          if (previewContainer) previewContainer.innerHTML = '';
          if (fileCountLabel) fileCountLabel.textContent = 'Click or Drag Images Here';
          fetchDashboardData();
        } else {
          alert(data.message || 'Upload failed');
        }
      } catch (err) {
        console.error('Error uploading gallery:', err);
        alert('Network error while uploading images.');
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Upload & Create Gallery';
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
        <img src="${g.coverImage}" alt="${g.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" />
        <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 0.2rem 0.6rem; border-radius: 50px; font-size: 0.7rem; font-weight: 700;">
          ${g.images?.length || 0} Images
        </span>
      </div>
      <div style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="color: white; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.2rem;">${g.name}</h4>
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

  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/gallery/${galleryId}`, {
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
  // Stat counters
  document.getElementById('analytics-total-leads').textContent = allStats?.totalLeads ?? allLeads.length;
  document.getElementById('analytics-new-leads').textContent = allStats?.newLeads ?? allLeads.filter(l => l.status === 'New').length;
  document.getElementById('analytics-page-views').textContent = (allStats?.pageViews ?? 1250).toLocaleString();
  document.getElementById('analytics-conv-rate').textContent = allStats?.conversionRate ?? '3.2%';

  // Status breakdown
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

  // Top services breakdown
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
              <span style="color: rgba(255,255,255,0.8); font-size: 0.82rem;">${name}</span>
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
