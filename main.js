/* ============================================================
   AutoValley – Minimal Interactions (< 60 lines)
   - Header shrink on scroll
   - Theme toggle with localStorage
   - Scroll cue fade
   - Subtle parallax effect
   ============================================================ */

// ─────────────────────────────────────────────────────────
// 1. Theme Toggle
// ─────────────────────────────────────────────────────────
const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-mobile');
const htmlEl = document.documentElement;
const header = document.querySelector('.av-header');

const applyTheme = (mode) => {
  htmlEl.setAttribute('data-theme', mode);
  header.setAttribute('data-theme', mode);

  themeToggles.forEach(toggle => {
    toggle.setAttribute('data-theme', mode);
    toggle.setAttribute('data-mode', mode);
    toggle.setAttribute(
      'aria-label',
      mode === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'
    );
  });
};

// Load saved theme or default to light
const savedTheme = localStorage.getItem('av-theme') || 'light';
applyTheme(savedTheme);

themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const current = header.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';

    applyTheme(next);
    localStorage.setItem('av-theme', next);
  });
});

// ─────────────────────────────────────────────────────────
// 2. Cinematic Parallax Scroll Effect
// ─────────────────────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;

      // Header shrink effect
      if (scrolled > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Cinematic parallax - slower movement creates depth
      if (heroBg && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.5;
        heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
      }

      ticking = false;
    });
    ticking = true;
  }
});

// ─────────────────────────────────────────────────────────
// 3. Scroll Cue – Hide on Scroll
// ─────────────────────────────────────────────────────────
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    }
  }, { once: true });

  scrollIndicator.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  });
}

// ─────────────────────────────────────────────────────────
// 4. Mobile Menu Toggle
// ─────────────────────────────────────────────────────────
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
const body = document.body;

if (hamburgerMenu && mobileMenuOverlay) {
  hamburgerMenu.addEventListener('click', () => {
    const isActive = hamburgerMenu.classList.contains('active');

    if (isActive) {
      hamburgerMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      body.classList.remove('menu-open');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    } else {
      hamburgerMenu.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      body.classList.add('menu-open');
      hamburgerMenu.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when clicking on overlay
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      hamburgerMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      body.classList.remove('menu-open');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking on a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      body.classList.remove('menu-open');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

// Parallax effect already integrated in section 2 above

// ─────────────────────────────────────────────────────────
// 6. Services Section Scroll-Triggered Animations
// ─────────────────────────────────────────────────────────

// Intersection Observer for scroll-triggered animations
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

// Observe services section for animations
const servicesSection = document.querySelector('.services-section');
if (servicesSection) {
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  servicesObserver.observe(servicesSection);
}

// Add subtle parallax to service cards on scroll
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length > 0) {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        serviceCards.forEach((card, index) => {
          const cardTop = card.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          // Only apply parallax if card is in viewport
          if (cardTop < windowHeight && cardTop > -card.offsetHeight) {
            const parallaxSpeed = 0.05 + (index * 0.01); // Stagger effect
            const offset = (windowHeight - cardTop) * parallaxSpeed;
            card.style.transform = `translateY(${-offset}px)`;
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─────────────────────────────────────────────────────────
// 7. Notre Approche - Advanced GSAP Animations
// ─────────────────────────────────────────────────────────
import { initApproche } from './approche-animations.js';

// Wait for DOM and then initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApproche);
} else {
  initApproche();
}
