/**
 * Optimal Management Consultancy - Gallery & Lightbox Handler
 * Handles dynamic galleries from backend with graceful fallback to curated defaults
 */

const DEFAULT_GALLERIES = [
  {
    _id: 'default-1',
    name: 'ISO 9001 Lead Auditor Training Seminar',
    description: 'Intensive corporate executive sessions on Quality Management System compliance, hazard mitigation, and internal audit mechanisms.',
    coverImage: 'assets/trainingphoto1.jpg',
    images: [
      'assets/trainingphoto1.jpg',
      'assets/trainingphoto2.jpg',
      'assets/training1.jpg',
      'assets/training2.jpg',
      'assets/training3.jpg',
      'assets/training4.jpg'
    ]
  },
  {
    _id: 'default-2',
    name: 'Industrial Safety & OH&S Workshop',
    description: 'Hands-on practical demonstrations of workplace emergency response, risk evaluations, and international ISO 45001 compliance standards.',
    coverImage: 'assets/collagesecond1.jpg',
    images: [
      'assets/collagesecond1.jpg',
      'assets/collage1.jpg',
      'assets/collage2.jpg',
      'assets/collage3.jpg',
      'assets/collagesecond2.jpg',
      'assets/collagesecond3.jpg'
    ]
  },
  {
    _id: 'default-3',
    name: 'Executive Management Systems Review',
    description: 'Strategic gap assessments, continuous improvement workshops, and corporate compliance certifications across Nigeria and Qatar.',
    coverImage: 'assets/carousel2.jpg',
    images: [
      'assets/carousel2.jpg',
      'assets/carousel3.jpg',
      'assets/carousel4.jpg',
      'assets/trainingphoto3.jpg',
      'assets/trainingphoto4.jpg',
      'assets/collagethird1.jpg'
    ]
  }
];

let allGalleries = [];
let activeLightboxGallery = null;

function resolveGalleryImage(url) {
  if (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.formatImageUrl === 'function') {
    return window.OPTIMAL_CONFIG.formatImageUrl(url);
  }
  if (!url) return 'assets/trainingphoto1.jpg';
  if (/^(https?:|\/\/|data:|blob:|assets\/|\.\.\/assets\/)/i.test(url)) return url;
  const base = (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) ? window.OPTIMAL_CONFIG.API_URL : 'https://optimal-fkiy.onrender.com';
  return base + (url.startsWith('/') ? url : '/' + url);
}

async function loadGalleries(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const apiUrl = (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.getApiUrl === 'function')
    ? window.OPTIMAL_CONFIG.getApiUrl('/api/gallery')
    : 'https://optimal-fkiy.onrender.com/api/gallery';

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (res.ok && data.success && data.galleries && data.galleries.length > 0) {
      allGalleries = data.galleries;
    } else {
      allGalleries = DEFAULT_GALLERIES;
    }
  } catch (e) {
    console.debug('Using default galleries fallback:', e);
    allGalleries = DEFAULT_GALLERIES;
  }

  const displayList = limit ? allGalleries.slice(0, limit) : allGalleries;
  renderGalleryGrid(container, displayList);
}

function renderGalleryGrid(container, list) {
  container.innerHTML = '';
  list.forEach(g => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.cssText = `
      position: relative; border-radius: 20px; overflow: hidden; cursor: pointer; height: 300px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4); transition: all 0.4s ease;
      border: 1px solid rgba(201,168,76,0.12); background: #1a040d;
    `;

    const imgCount = (g.images && g.images.length) || 0;
    const coverSrc = resolveGalleryImage(g.coverImage);

    card.innerHTML = `
      <img src="${coverSrc}" alt="${escapeHtml(g.name)}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" class="card-bg-img" />
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,3,8,0.92) 0%, rgba(15,3,8,0.4) 50%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.75rem; pointer-events: none;">
        <h3 style="color: var(--white); font-weight: 800; font-size: 1.25rem; margin-bottom: 0.5rem; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${escapeHtml(g.name)}</h3>
        ${g.description ? `
          <div style="background: rgba(255,255,255,0.04); backdrop-filter: blur(8px); border-radius: 10px; padding: 0.6rem 0.85rem; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 0.75rem;">
            <p style="color: rgba(255,255,255,0.8); font-size: 0.82rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(g.description)}</p>
          </div>
        ` : ''}
        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--gold); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em;">
          <span>📸 ${imgCount} Professional Photos</span>
        </div>
      </div>
      <div style="position: absolute; top: 16px; right: 16px; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; color: white;">
        ⤢
      </div>
    `;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.borderColor = 'rgba(201,168,76,0.45)';
      card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.6)';
      const img = card.querySelector('.card-bg-img');
      if (img) img.style.transform = 'scale(1.08)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'rgba(201,168,76,0.12)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
      const img = card.querySelector('.card-bg-img');
      if (img) img.style.transform = 'scale(1)';
    });

    card.addEventListener('click', () => {
      openLightbox(g);
    });

    container.appendChild(card);
  });
}

function openLightbox(gallery) {
  activeLightboxGallery = gallery;
  document.body.style.overflow = 'hidden';

  let overlay = document.getElementById('gallery-lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gallery-lightbox-overlay';
    overlay.className = 'lightbox-overlay';
    document.body.appendChild(overlay);
  }

  const imagesHtml = (gallery.images || []).map((imgUrl, idx) => {
    const src = resolveGalleryImage(imgUrl);
    return `
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02);">
        <img src="${src}" alt="${escapeHtml(gallery.name)} photo ${idx + 1}" style="width: 100%; height: auto; display: block; transition: transform 0.4s ease;"
             onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" />
      </div>
    `;
  }).join('');

  overlay.innerHTML = `
    <button class="lightbox-close-btn" id="lightbox-close" aria-label="Close Lightbox">✕</button>

    <div style="padding: 7rem 2rem 3rem; text-align: center; background: linear-gradient(to bottom, rgba(201,168,76,0.06) 0%, transparent 100%); border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 3rem;">
      <div style="max-width: 800px; margin: 0 auto;">
        <div class="gold-line" style="margin: 0 auto 1.5rem;"></div>
        <h2 style="color: white; font-weight: 800; font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 1rem;">${escapeHtml(gallery.name)}</h2>
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1.75rem;">
          <span style="background: var(--gold); color: var(--wine-deep); padding: 0.3rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800;">
            ${(gallery.images && gallery.images.length) || 0} SELECTIONS
          </span>
          <span style="color: rgba(255,255,255,0.4); font-size: 0.85rem;">• Professional Moments</span>
        </div>
        ${gallery.description ? `
          <p style="color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.7; font-style: italic; position: relative;">
            &ldquo;${escapeHtml(gallery.description)}&rdquo;
          </p>
        ` : ''}
      </div>
    </div>

    <div style="padding: 0 2rem 6rem; max-width: 1400px; margin: 0 auto; width: 100%;">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem;">
        ${imagesHtml}
      </div>
    </div>
  `;

  overlay.style.display = 'flex';
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
}

function closeLightbox() {
  const overlay = document.getElementById('gallery-lightbox-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
  document.body.style.overflow = 'unset';
  activeLightboxGallery = null;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeLightboxGallery) {
    closeLightbox();
  }
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
