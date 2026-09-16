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

  // 4. Liquid Glass Navlink Transition Effect
  const initLiquidNav = () => {
    const desktopNav = document.querySelector('.desktop-nav');
    if (!desktopNav) return;

    // Get all standard nav links (exclude the consultation CTA button)
    const navLinks = Array.from(desktopNav.querySelectorAll('li > a:not(.btn-gold)'));
    if (navLinks.length === 0) return;

    // Ensure liquid glass pill indicator exists in desktopNav
    let pill = desktopNav.querySelector('.nav-liquid-pill');
    if (!pill) {
      pill = document.createElement('div');
      pill.className = 'nav-liquid-pill';
      pill.setAttribute('aria-hidden', 'true');
      desktopNav.prepend(pill);
    }

    let activeLink = desktopNav.querySelector('li > a.active:not(.btn-gold)') || null;

    // Move pill to target element
    const movePillTo = (target, immediate = false) => {
      if (!target || !pill) return;
      
      const navRect = desktopNav.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const left = targetRect.left - navRect.left;
      const top = targetRect.top - navRect.top;
      const width = targetRect.width;
      const height = targetRect.height;

      if (immediate) {
        const prevTransition = pill.style.transition;
        pill.style.transition = 'none';
        pill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        pill.style.width = `${width}px`;
        pill.style.height = `${height}px`;
        pill.style.opacity = '1';
        // Force reflow
        void pill.offsetHeight;
        pill.style.transition = prevTransition;
      } else {
        pill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        pill.style.width = `${width}px`;
        pill.style.height = `${height}px`;
        pill.style.opacity = '1';
      }
    };

    const resetToActive = () => {
      if (activeLink) {
        movePillTo(activeLink);
      } else {
        pill.style.opacity = '0';
      }
    };

    // Position initially on the active link if present
    if (activeLink) {
      requestAnimationFrame(() => {
        movePillTo(activeLink, true);
      });
    }

    // Attach mouse events to each link
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        movePillTo(link);
      });

      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        pill.style.setProperty('--liquid-x', `${x}%`);
        pill.style.setProperty('--liquid-y', `${y}%`);
      });
    });

    // When mouse leaves the desktop navigation container, glide smoothly back
    desktopNav.addEventListener('mouseleave', () => {
      resetToActive();
    });

    // Re-align on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        activeLink = desktopNav.querySelector('li > a.active:not(.btn-gold)') || null;
        if (activeLink) {
          movePillTo(activeLink, true);
        }
      }, 100);
    }, { passive: true });
  };

  initLiquidNav();

  // Helper to get asset path relative to current page
  const getAssetPath = (filename) => {
    const isSubdir = window.location.pathname.includes('/services/');
    return isSubdir ? `../assets/${filename}` : `assets/${filename}`;
  };

  // 5. Website Logo Custom Cursor (No Ring — Logo Only)
  const initCustomCursor = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Remove any leftover cursor-follower ring element
    const oldFollower = document.getElementById('cursor-follower');
    if (oldFollower) oldFollower.remove();

    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'custom-cursor';
      cursor.innerHTML = `<img src="${getAssetPath('logo.png')}" alt="Optimal Cursor Logo" />`;
      document.body.appendChild(cursor);
    }

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        cursorX = mouseX;
        cursorY = mouseY;
        isVisible = true;
        cursor.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursor.style.opacity = '1';
    });

    // Detect hover over interactive elements
    const interactiveSelector = 'a, button, .iso-card, .support-card, .testim-card, input, select, textarea, [role="button"], label, .brand-logo, .step-circle';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-click');
    });

    // Smooth render loop — logo cursor only, no trailing ring
    const render = () => {
      if (isVisible) {
        cursorX += (mouseX - cursorX) * 0.75;
        cursorY += (mouseY - cursorY) * 0.75;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  // 6. Card Liquid Glass Pill — glides between cards exactly like the nav pill
  const initCardLiquidPill = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const CARD_SELECTORS = [
      { grid: '.iso-cards-grid',     cards: '.iso-card, .card-white', radius: '18px' },
      { grid: '.support-cards-grid', cards: '.support-card',          radius: '16px' },
      { grid: '.testim-grid',        cards: '.testim-card',           radius: '20px' },
    ];

    CARD_SELECTORS.forEach(({ grid: gridSel, cards: cardSel, radius }) => {
      document.querySelectorAll(gridSel).forEach(grid => {
        const cards = Array.from(grid.querySelectorAll(cardSel));
        if (cards.length === 0) return;

        // Inject pill into this grid
        let pill = grid.querySelector('.card-liquid-pill');
        if (!pill) {
          pill = document.createElement('div');
          pill.className = 'card-liquid-pill';
          pill.setAttribute('aria-hidden', 'true');
          pill.style.borderRadius = radius;
          pill.style.setProperty('border-radius', radius);
          grid.prepend(pill);
        }

        // Move pill to cover a card
        const movePillTo = (card, immediate = false) => {
          const gridRect = grid.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const left = cardRect.left - gridRect.left + grid.scrollLeft;
          const top  = cardRect.top  - gridRect.top  + grid.scrollTop;

          if (immediate) {
            const prev = pill.style.transition;
            pill.style.transition = 'none';
            pill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            pill.style.width  = `${cardRect.width}px`;
            pill.style.height = `${cardRect.height}px`;
            pill.style.opacity = '1';
            void pill.offsetHeight;
            pill.style.transition = prev;
          } else {
            pill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            pill.style.width  = `${cardRect.width}px`;
            pill.style.height = `${cardRect.height}px`;
            pill.style.opacity = '1';
          }
        };

        // Track cursor position inside pill for the glare spotlight
        const updateGlare = (e, card) => {
          const pillRect = pill.getBoundingClientRect();
          const x = ((e.clientX - pillRect.left) / pillRect.width  * 100).toFixed(1);
          const y = ((e.clientY - pillRect.top)  / pillRect.height * 100).toFixed(1);
          pill.style.setProperty('--pill-x', `${x}%`);
          pill.style.setProperty('--pill-y', `${y}%`);
        };

        // Attach events to each card
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => movePillTo(card));
          card.addEventListener('mousemove',  (e) => updateGlare(e, card));
        });

        // Fade pill out when leaving the grid
        grid.addEventListener('mouseleave', () => {
          pill.style.opacity = '0';
        });

        // Re-align on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            pill.style.opacity = '0';
          }, 80);
        }, { passive: true });
      });
    });
  };

  initCustomCursor();
  initCardLiquidPill();

  // 7. Cinematic Scroll Drop-In Animation Engine
  const initCinematicAnimations = () => {
    // If user prefers reduced motion, reveal everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.cinematic-section').forEach(el => el.classList.add('cinematic-in'));
      return;
    }

    const cinematicSections = document.querySelectorAll('.cinematic-section');
    if (cinematicSections.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      cinematicSections.forEach(el => el.classList.add('cinematic-in'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cinematic-in');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08
    });

    cinematicSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        setTimeout(() => {
          section.classList.add('cinematic-in');
        }, index * 100 + 60);
      } else {
        observer.observe(section);
      }
    });
  };

  initCinematicAnimations();

  // 8. Update Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 9. Initialize Lucide Icons if available
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});
