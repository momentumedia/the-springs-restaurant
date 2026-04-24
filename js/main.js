(function () {
  'use strict';

  // Fade-up reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const expanded = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => document.body.classList.remove('nav-open'));
    });
  }

  // Tabs (menu, gallery, anywhere with role=tablist)
  document.querySelectorAll('[data-tabs]').forEach((tablist) => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('aria-controls');
        tabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');
        const panels = document.querySelectorAll('[role="tabpanel"][data-group="' + tablist.dataset.tabs + '"]');
        panels.forEach((p) => p.removeAttribute('data-active'));
        const active = document.getElementById(panelId);
        if (active) active.setAttribute('data-active', '');
      });
    });
  });

  // Lightbox
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const img = lightbox.querySelector('img');
    const openers = document.querySelectorAll('[data-zoom]');
    openers.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const src = el.getAttribute('data-zoom') || el.querySelector('img').src;
        img.src = src;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    const close = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      img.src = '';
    };
    lightbox.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Inquiry / contact form · mailto fallback
  document.querySelectorAll('form[data-mailto]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const to = form.getAttribute('data-mailto');
      const subject = form.getAttribute('data-subject') || 'Website inquiry';
      const data = new FormData(form);
      const lines = [];
      data.forEach((v, k) => { if (v) lines.push(k + ': ' + v); });
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
    });
  });

  // Active nav underline
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === here || (here === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // Touch-friendly dropdown · first tap opens, second tap follows the link
  document.querySelectorAll('.nav-links > li.has-sub > a').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hoverCapable = window.matchMedia('(hover: hover)').matches;
      if (hoverCapable || document.body.classList.contains('nav-open')) return;
      const submenu = a.parentElement.querySelector('.submenu');
      if (!submenu) return;
      if (!submenu.classList.contains('touch-open')) {
        e.preventDefault();
        document.querySelectorAll('.submenu.touch-open').forEach((s) => {
          if (s !== submenu) s.classList.remove('touch-open');
        });
        submenu.classList.add('touch-open');
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-sub')) {
      document.querySelectorAll('.submenu.touch-open').forEach((s) => s.classList.remove('touch-open'));
    }
  });

  // Mobile overlay nav · update aria-label when toggling open/close
  if (toggle) {
    const updateToggleLabel = () => {
      const open = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', updateToggleLabel);
    updateToggleLabel();
  }
})();
