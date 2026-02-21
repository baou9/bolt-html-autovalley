import { initMagneticButtons } from './premium-effects.js';

document.documentElement.classList.remove('no-js');

/* ──────────────────────────────────────────────────────────
   Scroll reveal (shared – mirrors sv-reveal pattern)
   ────────────────────────────────────────────────────────── */
function initPageReveal() {
  const elements = document.querySelectorAll('.pg-reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));

  window.setTimeout(() => {
    elements.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        el.classList.add('is-visible');
      }
    });
  }, 1400);
}

function initAproposStatAnimations() {
  const stats = document.querySelectorAll('.apropos-stat');
  if (!stats.length) return;

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCount = (stat, statIndex = 0) => {
    if (!stat || stat.dataset.countAnimated === 'true') return;

    const counters = stat.querySelectorAll('.apropos-stat__count[data-count-to]');
    if (!counters.length) return;

    const duration = 1450;
    const baseDelay = Math.min(statIndex * 110, 360);

    stat.dataset.countAnimated = 'true';

    counters.forEach((counter, counterIndex) => {
      const target = Number(counter.dataset.countTo || '0');
      const decimals = Number(counter.dataset.decimals || '0');
      const valueEl = counter.closest('.apropos-stat__value');

      if (!Number.isFinite(target)) return;

      if (reducedMotion) {
        if (valueEl) {
          valueEl.classList.remove('is-counting');
          valueEl.classList.add('is-counted');
        }
        counter.textContent = decimals > 0
          ? target.toFixed(decimals).replace('.', ',')
          : new Intl.NumberFormat('fr-FR').format(Math.round(target));
        return;
      }

      const localDelay = baseDelay + (counterIndex * 80);
      const startTime = performance.now() + localDelay;

      if (valueEl) {
        valueEl.classList.add('is-counting');
      }

      const step = (now) => {
        if (now < startTime) {
          requestAnimationFrame(step);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const value = target * eased;

        counter.textContent = decimals > 0
          ? value.toFixed(decimals).replace('.', ',')
          : new Intl.NumberFormat('fr-FR').format(Math.round(value));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else if (valueEl) {
          valueEl.classList.remove('is-counting');
          valueEl.classList.add('is-counted');
        }
      };

      counter.textContent = decimals > 0 ? (0).toFixed(decimals).replace('.', ',') : '0';
      requestAnimationFrame(step);
    });
  };

  if (!('IntersectionObserver' in window)) {
    stats.forEach((stat, statIndex) => {
      stat.classList.add('is-animated');
      animateCount(stat, statIndex);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-animated', entry.isIntersecting);

        if (entry.isIntersecting) {
          const statIndex = Array.prototype.indexOf.call(stats, entry.target);
          animateCount(entry.target, statIndex < 0 ? 0 : statIndex);
        }
      });
    },
    { threshold: 0.2 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

/* ──────────────────────────────────────────────────────────
   Back-to-top button
   ────────────────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.querySelector('.pg-back-top');
  if (!btn) return;

  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 400);

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ──────────────────────────────────────────────────────────
   FAQ – search + category filter + accordion
   ────────────────────────────────────────────────────────── */
export function initFaq() {
  const searchInput = document.querySelector('.faq-search-input');
  const catBtns = document.querySelectorAll('.faq-cat-btn');
  const items = document.querySelectorAll('.faq-item');
  const noResults = document.querySelector('.faq-no-results');

  let currentCat = 'all';
  let currentQuery = '';

  function filterItems() {
    let visible = 0;

    items.forEach((item) => {
      const cat = item.dataset.cat || '';
      const text = item.textContent.toLowerCase();
      const catMatch = currentCat === 'all' || cat === currentCat;
      const queryMatch = !currentQuery || text.includes(currentQuery);

      if (catMatch && queryMatch) {
        item.removeAttribute('data-hidden');
        visible++;
      } else {
        item.setAttribute('data-hidden', 'true');
        item.classList.remove('is-open');
      }
    });

    if (noResults) noResults.classList.toggle('is-visible', visible === 0);
  }

  if (catBtns.length) {
    catBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        catBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentCat = btn.dataset.cat || 'all';
        filterItems();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentQuery = searchInput.value.trim().toLowerCase();
      filterItems();
    });
  }

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach((i) => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });
}

/* ──────────────────────────────────────────────────────────
   Contact form validation & submit feedback
   ────────────────────────────────────────────────────────── */
export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const successBanner = form.querySelector('.form-success-banner');
  const submitBtn = form.querySelector('.form-submit');

  function validateField(field) {
    const wrapper = field.closest('.form-field');
    const errorMsg = wrapper?.querySelector('.form-error-msg');
    let valid = true;
    let msg = '';

    if (field.required && !field.value.trim()) {
      valid = false;
      msg = 'Ce champ est obligatoire.';
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value.trim())) {
        valid = false;
        msg = 'Adresse e-mail invalide.';
      }
    } else if (field.type === 'tel' && field.value.trim()) {
      const telRe = /^[+\d\s\-().]{7,20}$/;
      if (!telRe.test(field.value.trim())) {
        valid = false;
        msg = 'Numéro de téléphone invalide.';
      }
    }

    field.classList.toggle('is-error', !valid);
    if (wrapper) wrapper.classList.toggle('has-error', !valid);
    if (errorMsg) errorMsg.textContent = msg;

    return valid;
  }

  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
      if (successBanner) successBanner.classList.add('is-visible');
      form.reset();
      form.querySelectorAll('.is-error').forEach((el) => el.classList.remove('is-error'));
      form.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));
    }, 1200);
  });
}

/* ──────────────────────────────────────────────────────────
   Careers – application form & file label update
   ────────────────────────────────────────────────────────── */
export function initCareersForm() {
  const fileInput = document.querySelector('.form-file-input');
  const fileName = document.querySelector('.form-file-name');

  if (fileInput && fileName) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      fileName.textContent = file ? file.name : 'Aucun fichier sélectionné';
    });
  }

  const form = document.querySelector('.car-apply-form');
  if (!form) return;

  const successBanner = form.querySelector('.form-success-banner');
  const submitBtn = form.querySelector('.form-submit');

  function validateField(field) {
    const wrapper = field.closest('.form-field');
    const errorMsg = wrapper?.querySelector('.form-error-msg');
    let valid = true;
    let msg = '';

    if (field.required && !field.value.trim()) {
      valid = false;
      msg = 'Ce champ est obligatoire.';
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value.trim())) {
        valid = false;
        msg = 'Adresse e-mail invalide.';
      }
    }

    field.classList.toggle('is-error', !valid);
    if (wrapper) wrapper.classList.toggle('has-error', !valid);
    if (errorMsg) errorMsg.textContent = msg;

    return valid;
  }

  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
      if (successBanner) successBanner.classList.add('is-visible');
      form.reset();
      if (fileName) fileName.textContent = 'Aucun fichier sélectionné';
    }, 1200);
  });
}

/* ──────────────────────────────────────────────────────────
   Legal TOC – highlight active section on scroll
   ────────────────────────────────────────────────────────── */
export function initLegalToc() {
  const tocLinks = document.querySelectorAll('.legal-toc__item a');
  const sections = document.querySelectorAll('.legal-section');

  if (!tocLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ──────────────────────────────────────────────────────────
   Careers – smooth scroll to apply form on job card click
   ────────────────────────────────────────────────────────── */
function initJobApplyScroll() {
  document.querySelectorAll('.car-job-card__apply[data-apply]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const positionSelect = document.querySelector('#apply-position');
      const formSection = document.querySelector('#apply-form');

      if (positionSelect && btn.dataset.apply) {
        positionSelect.value = btn.dataset.apply;
      }

      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────
   Init
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPageReveal();
  initAproposStatAnimations();
  initBackToTop();
  initMagneticButtons();
  initFaq();
  initContactForm();
  initCareersForm();
  initLegalToc();
  initJobApplyScroll();
});
