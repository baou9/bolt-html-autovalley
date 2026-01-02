/* ============================================================
   AutoValley Services Page - JavaScript Initialization
   ============================================================ */

import { initAllPremiumEffects } from './premium-effects.js';

document.documentElement.classList.remove('no-js');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServicePage, { once: true });
} else {
  initServicePage();
}

function initServicePage() {
  initAllPremiumEffects();
  initMobileMenu();
  initScrollProgress();
  initSmoothScroll();
  initFooterAccordion();
  initRevealAnimations();
}

function initMobileMenu() {
  const menuTrigger = document.querySelector('.menu-trigger');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link, .btn-mobile');

  if (!menuTrigger || !mobileOverlay) return;

  menuTrigger.addEventListener('click', () => {
    const isOpen = menuTrigger.getAttribute('aria-expanded') === 'true';
    menuTrigger.setAttribute('aria-expanded', !isOpen);
    mobileOverlay.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuTrigger.setAttribute('aria-expanded', 'false');
      mobileOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initFooterAccordion() {
  const triggers = document.querySelectorAll('.footer-accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      trigger.setAttribute('aria-expanded', !isExpanded);

      if (panel) {
        if (isExpanded) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    });
  });

  if (window.matchMedia('(min-width: 768px)').matches) {
    triggers.forEach(trigger => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-element').forEach(el => {
    observer.observe(el);
  });
}
