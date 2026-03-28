/* ============================================
   MUKASI v2.0 — JavaScript
   ============================================ */
(function () {
  'use strict';

  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  // ── Header scroll ──
  const initHeaderScroll = () => {
    const header = $('[data-header]');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.pageYOffset > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  // ── Active nav ──
  const initActiveNav = () => {
    const current = (window.location.pathname.split('/').pop() || 'index.html') || 'index.html';
    $$('.site-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0].split('?')[0].split('/').pop();
      if (href === current) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
        const dd = link.closest('.has-dropdown');
        if (dd) { const p = dd.querySelector(':scope > .nav-link'); if (p) { p.classList.add('is-active'); p.setAttribute('aria-current', 'page'); } }
      }
    });
  };

  // ── Mobile menu ──
  const initMobileMenu = () => {
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-mobile-nav]');
    const close = $('[data-nav-close]');
    if (!toggle || !nav) return;
    if (nav.closest('header')) document.body.appendChild(nav);
    nav.removeAttribute('hidden');

    const open = () => { nav.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const shut = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };

    toggle.addEventListener('click', () => nav.classList.contains('is-open') ? shut() : open());
    if (close) close.addEventListener('click', shut);
    $$('.mobile-nav .nav-link').forEach(l => l.addEventListener('click', () => { if (!l.closest('.mnav-details')) shut(); }));
    nav.addEventListener('click', e => { if (e.target === nav) shut(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) shut(); });
  };

  // ── Scroll reveal ──
  const initReveal = () => {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    $$('.card, .event-card, .register-card, .photo-showcase-item').forEach(el => { el.classList.add('reveal'); obs.observe(el); });
  };

  // ── Year ──
  const initYear = () => {
    $$('[data-year]:not([data-event])').forEach(el => { if (!el.dataset.year || el.dataset.year === '') el.textContent = new Date().getFullYear(); });
  };

  // ── Dropdown a11y ──
  const initDropdownA11y = () => {
    $$('.has-dropdown').forEach(dd => {
      const trigger = dd.querySelector('.nav-link');
      const menu = dd.querySelector('.dropdown');
      if (!trigger || !menu) return;
      let t;
      const open = () => { clearTimeout(t); menu.style.opacity = '1'; menu.style.visibility = 'visible'; menu.style.transform = 'translateY(0)'; trigger.setAttribute('aria-expanded', 'true'); };
      const close = () => { t = setTimeout(() => { menu.style.opacity = '0'; menu.style.visibility = 'hidden'; menu.style.transform = 'translateY(-6px)'; trigger.setAttribute('aria-expanded', 'false'); }, 150); };
      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', close);
      trigger.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger.getAttribute('aria-expanded') === 'true' ? close() : open(); } });
    });
  };

  // ── Helpers ──
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const escapeHtml = t => { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; };
  const fmtDate = d => d.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const fmtTime = d => d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const typeLabel = t => ({ auftritt: 'Auftritt', konzert: 'Konzert', verein: 'Vereinstermin' })[t] || t;

  // ── Next events (homepage) ──
  const initNextEvents = () => {
    const container = $('[data-next-events]');
    if (!container) return;
    let events = window.MUKASI_TERMINE;
    if (!events) { const s = $('#next-events-data'); if (s) try { events = JSON.parse(s.textContent); } catch (e) {} }
    if (!events || !events.length) { container.innerHTML = '<div class="empty-state"><strong>Keine anstehenden Termine</strong></div>'; return; }

    container.innerHTML = '';
    const now = new Date();
    const upcoming = events.map(e => ({ ...e, dateObj: new Date(e.date) })).filter(e => e.dateObj >= now).sort((a, b) => a.dateObj - b.dateObj).slice(0, 3);
    if (!upcoming.length) { container.innerHTML = '<div class="empty-state"><strong>Keine anstehenden Termine</strong><p class="muted small" style="margin:6px 0 0;">Schau bald wieder vorbei!</p></div>'; return; }

    upcoming.forEach((ev, i) => {
      const card = document.createElement('article');
      card.className = 'event-card reveal';
      card.style.transitionDelay = `${i * .08}s`;
      const time = fmtTime(ev.dateObj);
      const badge = ev.type ? `<span class="event-type-badge event-type-${ev.type}">${typeLabel(ev.type)}</span>` : '';
      card.innerHTML = `
        <div class="event-date">${fmtDate(ev.dateObj)}</div>
        <h3 class="event-title">${escapeHtml(ev.title)}</h3>
        <div class="event-meta">
          <span>⏰ ${time}</span>
          ${ev.location ? `<span>📍 ${escapeHtml(ev.location)}</span>` : ''}
          ${ev.notes ? `<span style="font-size:.75rem;font-weight:600;background:var(--red-subtle);color:var(--red);padding:2px 8px;border-radius:999px;">${escapeHtml(ev.notes)}</span>` : ''}
        </div>
        ${badge}`;
      container.appendChild(card);
      requestAnimationFrame(() => card.classList.add('is-visible'));
    });
  };

  // ── Event Dialog ──
  let openEventDialog = () => {};
  const initEventDialog = () => {
    const dialog = $('[data-dialog]');
    if (!dialog) return;
    const dTitle = $('[data-dialog-title]', dialog), dWhen = $('[data-dialog-when]', dialog), dWhere = $('[data-dialog-where]', dialog), dNotes = $('[data-dialog-notes]', dialog);
    const closeBtns = $$('[data-dialog-close]', dialog);
    const typeNames = { auftritt: 'Auftritt', konzert: 'Konzert', verein: 'Verein' };

    const open = () => { dialog.classList.add('is-open'); dialog.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    const close = () => { dialog.classList.remove('is-open'); dialog.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };

    openEventDialog = el => {
      const date = new Date(el.dataset.date);
      const d = fmtDate(date), t = fmtTime(date);
      if (dTitle) dTitle.textContent = el.dataset.title;
      if (dWhen) dWhen.textContent = t === '00:00' ? d : `${d} · ${t} Uhr`;
      if (dWhere) dWhere.textContent = el.dataset.location || 'Nicht angegeben';
      if (dNotes) { const parts = []; if (typeNames[el.dataset.type]) parts.push(typeNames[el.dataset.type]); if (el.dataset.notes && el.dataset.notes !== 'Keine weiteren Hinweise') parts.push(el.dataset.notes); dNotes.textContent = parts.length ? parts.join(' · ') : 'Keine weiteren Hinweise'; }
      open();
    };

    closeBtns.forEach(b => b.addEventListener('click', close));
    dialog.addEventListener('click', e => { if (e.target === dialog || e.target.classList.contains('dialog-backdrop')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && dialog.classList.contains('is-open')) close(); });
  };

  // ── Termine filter ──
  const initTermineFilter = () => {
    const list = $('[data-events]');
    if (!list) return;
    const fQ = $('[data-filter-q]'), fY = $('[data-filter-year]'), fT = $('[data-filter-type]'), fR = $('[data-filter-reset]'), count = $('[data-results-count]');
    const data = window.MUKASI_TERMINE || [];
    if (!data.length) return;

    const render = () => {
      list.innerHTML = '';
      const q = fQ ? fQ.value.toLowerCase() : '', year = fY ? fY.value : 'all', type = fT ? fT.value : 'all';
      const now = new Date();
      const filtered = data.map(e => ({ ...e, dateObj: new Date(e.date), eventYear: e.year || new Date(e.date).getFullYear().toString(), eventType: e.type || '', titleText: e.title || '', locationText: e.location || '', notesText: e.notes || '' }))
        .filter(e => (year === 'all' || e.eventYear === year) && (type === 'all' || e.eventType === type) && (!q || e.titleText.toLowerCase().includes(q) || e.locationText.toLowerCase().includes(q) || e.notesText.toLowerCase().includes(q)));

      const upcoming = filtered.filter(e => e.dateObj >= now).sort((a, b) => a.dateObj - b.dateObj);
      const past = filtered.filter(e => e.dateObj < now).sort((a, b) => a.dateObj - b.dateObj);
      let n = 0;

      const mkCard = (ev, i, isPast) => {
        n++;
        const card = document.createElement('article');
        card.className = 'event-card' + (isPast ? ' event-card--past' : '');
        card.dataset.event = ''; card.dataset.title = ev.titleText; card.dataset.date = ev.date; card.dataset.location = ev.locationText; card.dataset.type = ev.eventType; card.dataset.notes = ev.notesText; card.dataset.year = ev.eventYear;
        const time = fmtTime(ev.dateObj), showTime = time !== '00:00';
        const badge = ev.eventType ? `<span class="event-type-badge event-type-${ev.eventType}">${typeLabel(ev.eventType)}</span>` : '';
        card.innerHTML = `
          <div class="event-date">${fmtDate(ev.dateObj)}</div>
          <h3 class="event-title">${escapeHtml(ev.titleText)}</h3>
          <div class="event-meta">
            ${showTime ? `<span>⏰ ${time} Uhr</span>` : ''}
            ${ev.locationText ? `<span>📍 ${escapeHtml(ev.locationText)}</span>` : ''}
            ${ev.notesText ? `<span style="font-size:.75rem;font-weight:600;background:var(--red-subtle);color:var(--red);padding:2px 8px;border-radius:999px;">${escapeHtml(ev.notesText)}</span>` : ''}
          </div>
          ${badge}`;
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openEventDialog(card));
        return card;
      };

      if (upcoming.length) { const l = document.createElement('div'); l.className = 'event-section-label'; l.innerHTML = '<span>Kommende Termine</span>'; list.appendChild(l); upcoming.forEach((e, i) => list.appendChild(mkCard(e, i, false))); }
      if (past.length) { const l = document.createElement('div'); l.className = 'event-section-label event-section-label--past'; l.innerHTML = '<span>Vergangene Termine</span>'; list.appendChild(l); past.forEach((e, i) => list.appendChild(mkCard(e, i, true))); }
      if (count) count.textContent = n;
      if (n === 0) { const e = document.createElement('div'); e.className = 'empty-termine'; e.innerHTML = '<div class="empty-termine-icon">📅</div><p><strong>Keine Termine gefunden</strong></p><p class="muted small">Versuche andere Filter.</p>'; list.appendChild(e); }
    };

    const reset = () => { if (fQ) fQ.value = ''; if (fY) fY.value = '2026'; if (fT) fT.value = 'all'; render(); };
    if (fQ) fQ.addEventListener('input', debounce(render, 300));
    if (fY) fY.addEventListener('change', render);
    if (fT) fT.addEventListener('change', render);
    if (fR) fR.addEventListener('click', reset);
    render();
  };

  // ── Smooth scroll ──
  const initSmooth = () => {
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const h = a.getAttribute('href');
      if (h === '#' || h === '#main') { e.preventDefault(); $(h === '#' ? 'body' : h)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }));
  };

  // ── Prefetch ──
  const initPrefetch = () => {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const href = e.target.getAttribute('href');
          if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) { const l = document.createElement('link'); l.rel = 'prefetch'; l.href = href; document.head.appendChild(l); }
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '200px' });
    $$('a.nav-link, a.btn').forEach(l => obs.observe(l));
  };

  // ── Init ──
  const init = () => {
    [initActiveNav, initMobileMenu, initHeaderScroll, initYear, initNextEvents, initEventDialog, initTermineFilter, initReveal, initSmooth, initDropdownA11y, initPrefetch]
      .forEach(fn => { try { fn(); } catch (e) { console.error(fn.name + ':', e); } });
    console.log('✨ MUKASI v2.0 ready');
  };

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
