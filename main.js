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

const applyTheme = (theme) => {
  htmlEl.setAttribute('data-theme', theme);

  if (header) {
    header.setAttribute('data-theme', theme);
  }

  localStorage.setItem('av-theme', theme);

  const showMoon = theme === 'light';

  themeToggles.forEach(toggle => {
    const moonIcon = toggle.querySelector('.moon-icon');
    const sunIcon = toggle.querySelector('.sun-icon');

    if (moonIcon) {
      moonIcon.hidden = !showMoon;
      moonIcon.setAttribute('aria-hidden', (!showMoon).toString());
    }

    if (sunIcon) {
      sunIcon.hidden = showMoon;
      sunIcon.setAttribute('aria-hidden', showMoon.toString());
    }
  });
};

// Load saved theme or default to light
const savedTheme = localStorage.getItem('av-theme') || 'light';
applyTheme(savedTheme);

themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const current = (header && header.getAttribute('data-theme')) || htmlEl.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';

    applyTheme(next);
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
// 7. Témoignages Section – Reveal & Carousel
// ─────────────────────────────────────────────────────────
const testimonialsSection = document.querySelector('.test-sec');

if (testimonialsSection) {
  const testimonialsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  testimonialsObserver.observe(testimonialsSection);
}

const carouselWrap = document.querySelector('.test-carousel-wrap');
const testimonialCarousel = carouselWrap ? carouselWrap.querySelector('.test-carousel') : null;
const testimonialCards = testimonialCarousel ? Array.from(testimonialCarousel.querySelectorAll('.test-card')) : [];
const prevControl = carouselWrap ? carouselWrap.querySelector('.prev') : null;
const nextControl = carouselWrap ? carouselWrap.querySelector('.next') : null;

if (testimonialCarousel && testimonialCards.length > 0) {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let autoSlideTimer = null;
  let activeTestimonial = 0;
  let scrollSyncTimeout;

  function updateActiveTestimonial() {
    testimonialCards.forEach((card, index) => {
      const isActive = index === activeTestimonial;
      card.setAttribute('data-active', isActive.toString());
      card.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function getScrollBehavior() {
    return motionQuery.matches ? 'auto' : 'smooth';
  }

  function scrollToTestimonial(index, { manual = false } = {}) {
    const target = testimonialCards[index];
    if (!target) return;

    activeTestimonial = index;
    const left = target.offsetLeft - ((testimonialCarousel.clientWidth - target.clientWidth) / 2);
    const behavior = getScrollBehavior();

    if (typeof testimonialCarousel.scrollTo === 'function') {
      testimonialCarousel.scrollTo({ left, behavior });
    } else {
      testimonialCarousel.scrollLeft = left;
    }

    updateActiveTestimonial();

    if (manual) {
      restartAutoSlide();
    }
  }

  function moveTestimonial(step) {
    const nextIndex = (activeTestimonial + step + testimonialCards.length) % testimonialCards.length;
    scrollToTestimonial(nextIndex, { manual: true });
  }

  function clearAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function startAutoSlide() {
    if (motionQuery.matches || testimonialCards.length < 2) {
      clearAutoSlide();
      return;
    }

    clearAutoSlide();
    autoSlideTimer = setInterval(() => moveTestimonial(1), 6000);
  }

  function restartAutoSlide() {
    clearAutoSlide();
    startAutoSlide();
  }

  function handleMotionPreference() {
    if (motionQuery.matches) {
      clearAutoSlide();
    } else {
      startAutoSlide();
    }
  }

  updateActiveTestimonial();
  handleMotionPreference();

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', handleMotionPreference);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(handleMotionPreference);
  }

  if (prevControl) {
    prevControl.addEventListener('click', () => moveTestimonial(-1));
  }

  if (nextControl) {
    nextControl.addEventListener('click', () => moveTestimonial(1));
  }

  testimonialCarousel.addEventListener('pointerdown', clearAutoSlide, { passive: true });
  testimonialCarousel.addEventListener('pointerup', startAutoSlide, { passive: true });

  testimonialCarousel.addEventListener('scroll', () => {
    clearTimeout(scrollSyncTimeout);

    scrollSyncTimeout = window.setTimeout(() => {
      const carouselCenter = testimonialCarousel.scrollLeft + (testimonialCarousel.offsetWidth / 2);
      let closestIndex = activeTestimonial;
      let closestDistance = Number.POSITIVE_INFINITY;

      testimonialCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeTestimonial) {
        activeTestimonial = closestIndex;
        updateActiveTestimonial();
      }
    }, 120);
  }, { passive: true });

  if (carouselWrap) {
    carouselWrap.addEventListener('mouseenter', clearAutoSlide);
    carouselWrap.addEventListener('mouseleave', startAutoSlide);

    carouselWrap.addEventListener('focusin', clearAutoSlide);
    carouselWrap.addEventListener('focusout', (event) => {
      if (!carouselWrap.contains(event.relatedTarget)) {
        startAutoSlide();
      }
    });
  }

  testimonialCards.forEach((card, index) => {
    card.addEventListener('focus', () => {
      scrollToTestimonial(index);
    });
  });

  if (testimonialsSection) {
    testimonialsSection.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveTestimonial(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveTestimonial(-1);
      }
    });
  }
}

// ─────────────────────────────────────────────────────────
// 8. Notre Approche - Advanced GSAP Animations
// ─────────────────────────────────────────────────────────
import { initApproche } from './approche-animations.js';

// Wait for DOM and then initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApproche);
} else {
  initApproche();
}
