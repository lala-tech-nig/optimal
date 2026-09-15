/**
 * Optimal Management Consultancy - Main UI JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const stickyCta = document.getElementById('sticky-cta');

  const handleScroll = () => {
    const scrollPos = window.scrollY || window.pageYOffset;
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (stickyCta) {
      if (scrollPos > 400) {
        stickyCta.style.display = 'block';
        stickyCta.style.opacity = '1';
        stickyCta.style.transform = 'translateY(0)';
      } else {
        stickyCta.style.opacity = '0';
        stickyCta.style.transform = 'translateY(20px)';
        setTimeout(() => {
          if (window.scrollY <= 400) stickyCta.style.display = 'none';
        }, 300);
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Close when clicking any link inside drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        if (hamburgerBtn.querySelector('i')) {
          hamburgerBtn.querySelector('i').setAttribute('data-lucide', 'menu');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });
  }

  // 3. Highlight Active Navigation Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav a, .mobile-nav-drawer a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;
    const cleanHref = linkHref.split('/').pop();
    if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html') || (currentPath === 'index.html' && cleanHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Update Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Initialize Lucide Icons if available
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});
