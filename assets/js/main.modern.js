/* ============================================
   MUKASI Modern - Enhanced JavaScript v2.0
   ============================================ */

(function () {
  'use strict';

  // ========== Utility Functions ==========
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  // ========== Smooth Scroll to Top ==========
  const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#main') {
          e.preventDefault();
          const target = $(href === '#' ? 'body' : href);
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  // ========== Header Scroll Effect ==========
  const initHeaderScroll = () => {
    const header = $('[data-header]');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  };

  // ========== Active Navigation ==========
  const initActiveNav = () => {
    try {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const normalizedPath = currentPath === '' ? 'index.html' : currentPath;

      $$('.site-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPath = href.split('#')[0].split('?')[0].split('/').pop();

        if (linkPath === normalizedPath) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');

          // Highlight parent dropdown if needed
          const dropdown = link.closest('.has-dropdown');
          if (dropdown) {
            const parentLink = dropdown.querySelector(':scope > .nav-link');
            if (parentLink) {
              parentLink.classList.add('is-active');
              parentLink.setAttribute('aria-current', 'page');
            }
          }
        }
      });
    } catch (e) {
      console.error('Navigation highlighting error:', e);
    }
  };

  // ========== Mobile Menu ==========
  const initMobileMenu = () => {
    const toggle = $('[data-nav-toggle]');
    const mobileNav = $('[data-mobile-nav]');
    const closeBtn = $('[data-nav-close]');

    if (!toggle || !mobileNav) return;

    // CRITICAL: Move mobile-nav out of header to body level.
    // backdrop-filter on header creates a new containing block,
    // which breaks position:fixed on children.
    if (mobileNav.closest('header')) {
      document.body.appendChild(mobileNav);
    }

    // Ensure CSS controls visibility (remove hidden if present from old HTML)
    mobileNav.removeAttribute('hidden');

    const openMenu = () => {
      mobileNav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Menü schließen');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menü öffnen');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Close on link click
    $$('.mobile-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (!link.closest('.mnav-details')) {
          closeMenu();
        }
      });
    });

    // Close on outside click (backdrop)
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMenu();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  };

  // ========== Scroll Reveal Animation ==========
  const initScrollReveal = () => {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe cards and tiles
    $$('.card, .tile, .event-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  };

  // ========== Next Events Loader ==========
  const initNextEvents = () => {
    const container = $('[data-next-events]');
    if (!container) return;

    // Try to get events from multiple sources
    let events = null;
    
    // 1. Try window.MUKASI_TERMINE (from termine.v26.js)
    if (window.MUKASI_TERMINE && Array.isArray(window.MUKASI_TERMINE)) {
      events = window.MUKASI_TERMINE;
    }
    
    // 2. Fallback: Try inline JSON script
    if (!events) {
      const dataScript = $('#next-events-data');
      if (dataScript) {
        try {
          events = JSON.parse(dataScript.textContent);
        } catch (e) {
          console.error('Error parsing inline events:', e);
        }
      }
    }

    // No events found
    if (!events || events.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <strong>Keine anstehenden Termine</strong>
          <p class="muted small" style="margin:6px 0 0;">Schau bald wieder vorbei für Updates!</p>
        </div>
      `;
      return;
    }

    try {
      // Clear loading state
      container.innerHTML = '';

      // Get next 3 upcoming events
      const now = new Date();
      const upcoming = events
        .map(event => ({
          ...event,
          dateObj: new Date(event.date)
        }))
        .filter(event => event.dateObj >= now)
        .sort((a, b) => a.dateObj - b.dateObj)
        .slice(0, 3);

      if (upcoming.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <strong>Keine anstehenden Termine</strong>
            <p class="muted small" style="margin:6px 0 0;">Schau bald wieder vorbei für Updates!</p>
          </div>
        `;
        return;
      }

      // Render events
      upcoming.forEach((event, index) => {
        const card = document.createElement('article');
        card.className = 'event-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const formattedDate = formatEventDate(event.dateObj);
        const formattedTime = formatEventTime(event.dateObj);
        
        // Event type badge
        const typeBadge = event.type ? `<span class="event-type-badge event-type-${event.type}">${getEventTypeLabel(event.type)}</span>` : '';

        card.innerHTML = `
          <div class="event-date">${formattedDate}</div>
          <h3 class="event-title">${escapeHtml(event.title)}</h3>
          <div class="event-meta">
            <span>⏰ ${formattedTime}</span>
            ${event.location ? `<span>📍 ${escapeHtml(event.location)}</span>` : ''}
          </div>
          ${typeBadge}
          ${event.notes ? `<p class="muted small" style="margin-top: 12px;">${escapeHtml(event.notes)}</p>` : ''}
        `;

        container.appendChild(card);
      });
    } catch (e) {
      console.error('Error loading events:', e);
      container.innerHTML = `
        <div class="empty-state">
          <strong>Fehler beim Laden der Termine</strong>
          <p class="muted small" style="margin:6px 0 0;">Bitte versuche es später erneut.</p>
        </div>
      `;
    }
  };

  // ========== Helper Functions ==========
  const formatEventDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
  };

  const formatEventTime = (date) => {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      'auftritt': 'Auftritt',
      'konzert': 'Konzert',
      'verein': 'Vereinstermin'
    };
    return labels[type] || type;
  };

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // ========== Current Year ==========
  const initCurrentYear = () => {
    // Only target empty [data-year] spans (footer), not event articles which also carry data-year
    const yearElements = $$('[data-year]:not([data-event])');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      // Only fill elements that don't already have meaningful content (e.g. the footer span)
      if (!el.dataset.year || el.dataset.year === '') {
        el.textContent = currentYear;
      }
    });
  };

  // ========== Lazy Loading Images ==========
  const initLazyLoading = () => {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    $$('img[data-src]').forEach(img => imageObserver.observe(img));
  };

  // ========== Dropdown Accessibility ==========
  const initDropdownA11y = () => {
    $$('.has-dropdown').forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown');

      if (!trigger || !menu) return;

      let timeout;

      const openDropdown = () => {
        clearTimeout(timeout);
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
        trigger.setAttribute('aria-expanded', 'true');
      };

      const closeDropdown = () => {
        timeout = setTimeout(() => {
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.transform = 'translateY(-4px)';
          trigger.setAttribute('aria-expanded', 'false');
        }, 150);
      };

      dropdown.addEventListener('mouseenter', openDropdown);
      dropdown.addEventListener('mouseleave', closeDropdown);

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          isExpanded ? closeDropdown() : openDropdown();
        }
      });
    });
  };

  // ========== Performance Optimization ==========
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ========== Link Prefetching ==========
  const initLinkPrefetch = () => {
    if (!('IntersectionObserver' in window)) return;

    const linkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target;
          const href = link.getAttribute('href');
          
          if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
          }
          
          linkObserver.unobserve(link);
        }
      });
    }, { rootMargin: '200px' });

    $$('a.nav-link, a.btn').forEach(link => linkObserver.observe(link));
  };

  // ========== Focus Visible Polyfill ==========
  const initFocusVisible = () => {
    let hadKeyboardEvent = true;

    const addFocusVisibleClass = (el) => {
      if (hadKeyboardEvent) {
        el.classList.add('focus-visible');
      }
    };

    const removeFocusVisibleClass = (el) => {
      el.classList.remove('focus-visible');
    };

    const onKeyDown = () => {
      hadKeyboardEvent = true;
    };

    const onPointerDown = () => {
      hadKeyboardEvent = false;
    };

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);

    document.addEventListener('focus', (e) => addFocusVisibleClass(e.target), true);
    document.addEventListener('blur', (e) => removeFocusVisibleClass(e.target), true);
  };

  // ========== Event Dialog Reference (set by initEventDialog) ==========
  let openEventDialog = () => {};

  // ========== Termine Filter & Events ==========
  const initTermineFilter = () => {
    const eventList = $('[data-events]');
    if (!eventList) return;

    const filterQ = $('[data-filter-q]');
    const filterYear = $('[data-filter-year]');
    const filterType = $('[data-filter-type]');
    const filterReset = $('[data-filter-reset]');
    const resultsCount = $('[data-results-count]');
    
    // Get events from MUKASI_TERMINE data
    const eventsData = window.MUKASI_TERMINE || [];
    if (eventsData.length === 0) return;

    // Render all events as cards (same style as homepage "Nächste Termine")
    const renderEvents = () => {
      eventList.innerHTML = '';
      const query = filterQ ? filterQ.value.toLowerCase() : '';
      const year = filterYear ? filterYear.value : 'all';
      const type = filterType ? filterType.value : 'all';
      
      let visibleCount = 0;

      eventsData.forEach((event, index) => {
        const dateObj = new Date(event.date);
        const eventYear = event.year || dateObj.getFullYear().toString();
        const eventType = event.type || '';
        const title = event.title || '';
        const location = event.location || '';
        const notes = event.notes || '';

        // Filter checks
        const matchesQuery = !query || 
          title.toLowerCase().includes(query) || 
          location.toLowerCase().includes(query) || 
          notes.toLowerCase().includes(query);
        const matchesYear = year === 'all' || eventYear === year;
        const matchesType = type === 'all' || eventType === type;

        if (!matchesQuery || !matchesYear || !matchesType) return;

        visibleCount++;

        const card = document.createElement('article');
        card.className = 'event-card';
        card.dataset.event = '';
        card.dataset.title = title;
        card.dataset.date = event.date;
        card.dataset.location = location;
        card.dataset.type = eventType;
        card.dataset.notes = notes;
        card.dataset.year = eventYear;
        card.style.animationDelay = `${Math.min(index, 8) * 0.05}s`;

        const formattedDate = formatEventDate(dateObj);
        const formattedTime = formatEventTime(dateObj);
        const showTime = formattedTime !== '00:00';

        const typeBadge = eventType ? `<span class="event-type-badge event-type-${eventType}">${getEventTypeLabel(eventType)}</span>` : '';

        card.innerHTML = `
          <div class="event-date">${formattedDate}</div>
          <h3 class="event-title">${escapeHtml(title)}</h3>
          <div class="event-meta">
            ${showTime ? `<span>⏰ ${formattedTime} Uhr</span>` : ''}
            ${location ? `<span>📍 ${escapeHtml(location)}</span>` : ''}
          </div>
          ${typeBadge}
          ${notes ? `<p class="muted small" style="margin-top: 8px;">${escapeHtml(notes)}</p>` : ''}
        `;

        // Click on card opens dialog
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          openEventDialog(card);
        });

        eventList.appendChild(card);
      });

      if (resultsCount) {
        resultsCount.textContent = visibleCount;
      }

      // Empty state
      const existingEmpty = eventList.querySelector('.empty-termine');
      if (existingEmpty) existingEmpty.remove();

      if (visibleCount === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-termine';
        empty.innerHTML = `
          <div class="empty-termine-icon">📅</div>
          <p><strong>Keine Termine gefunden</strong></p>
          <p class="muted small">Versuche andere Filter oder setze die Suche zurück.</p>
        `;
        eventList.appendChild(empty);
      }
    };
    
    const resetFilters = () => {
      if (filterQ) filterQ.value = '';
      if (filterYear) filterYear.value = '2026';
      if (filterType) filterType.value = 'all';
      renderEvents();
    };
    
    // Event Listeners
    if (filterQ) filterQ.addEventListener('input', debounce(renderEvents, 300));
    if (filterYear) filterYear.addEventListener('change', renderEvents);
    if (filterType) filterType.addEventListener('change', renderEvents);
    if (filterReset) filterReset.addEventListener('click', resetFilters);
    
    // Initial render
    renderEvents();
  };

  // ========== Event Details Dialog ==========
  const initEventDialog = () => {
    // Use the existing dialog from the HTML
    const dialog = $('[data-dialog]');
    if (!dialog) return;
    
    const dialogTitle = $('[data-dialog-title]', dialog);
    const dialogWhen = $('[data-dialog-when]', dialog);
    const dialogWhere = $('[data-dialog-where]', dialog);
    const dialogNotes = $('[data-dialog-notes]', dialog);
    const closeBtns = $$('[data-dialog-close]', dialog);
    
    const typeNames = {
      'auftritt': 'Auftritt',
      'konzert': 'Konzert',
      'verein': 'Verein'
    };
    
    const openDialog = () => {
      dialog.classList.add('is-open');
      dialog.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    
    const closeDialog = () => {
      dialog.classList.remove('is-open');
      dialog.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    
    // Expose openEventDialog for use by initTermineFilter
    openEventDialog = (eventEl) => {
      const title = eventEl.dataset.title;
      const date = new Date(eventEl.dataset.date);
      const location = eventEl.dataset.location || 'Nicht angegeben';
      const type = eventEl.dataset.type;
      const notes = eventEl.dataset.notes || 'Keine weiteren Hinweise';
      
      const formattedDate = date.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const formattedTime = date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const datetime = formattedTime === '00:00' ? formattedDate : `${formattedDate} · ${formattedTime} Uhr`;
      
      if (dialogTitle) dialogTitle.textContent = title;
      if (dialogWhen) dialogWhen.textContent = datetime;
      if (dialogWhere) dialogWhere.textContent = location;
      if (dialogNotes) {
        const notesParts = [];
        if (typeNames[type]) notesParts.push(typeNames[type]);
        if (notes && notes !== 'Keine weiteren Hinweise') notesParts.push(notes);
        dialogNotes.textContent = notesParts.length > 0 ? notesParts.join(' · ') : 'Keine weiteren Hinweise';
      }
      
      openDialog();
    };
    
    // Close handlers
    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeDialog);
    });
    
    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target.classList.contains('dialog-backdrop')) {
        closeDialog();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialog.classList.contains('is-open')) {
        closeDialog();
      }
    });
  };

  // ========== Initialize All ==========
  const init = () => {
    // Core functionality - each in try-catch to prevent cascading failures
    try { initActiveNav(); } catch(e) { console.error('initActiveNav:', e); }
    try { initMobileMenu(); } catch(e) { console.error('initMobileMenu:', e); }
    try { initHeaderScroll(); } catch(e) { console.error('initHeaderScroll:', e); }
    try { initCurrentYear(); } catch(e) { console.error('initCurrentYear:', e); }
    
    // Content loading
    try { initNextEvents(); } catch(e) { console.error('initNextEvents:', e); }
    
    // Termine page specific (dialog must init before filter)
    try { initEventDialog(); } catch(e) { console.error('initEventDialog:', e); }
    try { initTermineFilter(); } catch(e) { console.error('initTermineFilter:', e); }
    
    // Enhancements
    try { initSmoothScroll(); } catch(e) { console.error('initSmoothScroll:', e); }
    try { initScrollReveal(); } catch(e) { console.error('initScrollReveal:', e); }
    try { initLazyLoading(); } catch(e) { console.error('initLazyLoading:', e); }
    try { initDropdownA11y(); } catch(e) { console.error('initDropdownA11y:', e); }
    try { initLinkPrefetch(); } catch(e) { console.error('initLinkPrefetch:', e); }
    try { initFocusVisible(); } catch(e) { console.error('initFocusVisible:', e); }
    
    console.log('✨ MUKASI Modern initialized');
  };

  // ========== DOM Ready ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ========== Service Worker (Progressive Web App) ==========
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker not available, silent fail
      });
    });
  }

})();
