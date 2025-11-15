/* ============================================================
   AutoValley – Minimal Interactions (< 60 lines)
   - Header shrink on scroll
   - Scroll cue fade
   - Subtle parallax effect
   ============================================================ */

document.documentElement.classList.remove('no-js');

const header = document.querySelector('.av-header');

// ─────────────────────────────────────────────────────────
// 1. Cinematic Parallax Scroll Effect
// ─────────────────────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;

      // Header shrink effect
      if (header) {
        if (scrolled > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
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
// 2. Scroll Cue – Hide on Scroll
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
// 3. Primary Nav Toggle (mobile)
// ─────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  const headerContainer = navToggle.closest('.av-container');

  const setNavState = (isOpen) => {
    navLinks.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('nav-open', isOpen);

    if (headerContainer) {
      headerContainer.classList.toggle('is-menu-open', isOpen);
    }
  };

  const closeNav = () => setNavState(false);

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    setNavState(!isOpen);
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeNav();
    }
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
            card.style.setProperty('--card-parallax', `${-offset}px`);
          } else {
            card.style.setProperty('--card-parallax', '0px');
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─────────────────────────────────────────────────────────
// 6b. Fade-in utility for featured cards
// ─────────────────────────────────────────────────────────
const fadeTargets = document.querySelectorAll('.fade-in-up');

if (fadeTargets.length > 0) {
  const reveal = (entry) => entry.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    fadeTargets.forEach(reveal);
  } else {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10%' });

    fadeTargets.forEach((target) => fadeObserver.observe(target));
  }
}

// ─────────────────────────────────────────────────────────
// 7. Témoignages Section – Reveal & Carousel
// ─────────────────────────────────────────────────────────
const testimonialsSection = document.querySelector('.test-sec');

if (testimonialsSection) {
  const revealTestimonials = () => {
    testimonialsSection.classList.add('is-visible');
  };

  const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  if (!canObserve) {
    revealTestimonials();
  } else {
    try {
      const testimonialsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      testimonialsObserver.observe(testimonialsSection);
    } catch (error) {
      console.warn('Testimonials reveal disabled – falling back to static view', error);
      revealTestimonials();
    }
  }
}

const carouselWrap = document.querySelector('.test-carousel-wrap');
const testimonialCarousel = carouselWrap ? carouselWrap.querySelector('.test-carousel') : null;
const testimonialCards = testimonialCarousel ? Array.from(testimonialCarousel.querySelectorAll('.test-card')) : [];
const prevControl = carouselWrap ? carouselWrap.querySelector('.slider-btn--prev') : null;
const nextControl = carouselWrap ? carouselWrap.querySelector('.slider-btn--next') : null;

if (testimonialCarousel && testimonialCards.length > 0) {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const AUTO_SLIDE_DELAY = 6000;
  let autoSlideTimeout = null;
  let activeTestimonial = 0;
  let scrollSyncTimeout;
  let pointerHovering = false;

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

  function pauseAutoSlide() {
    if (autoSlideTimeout) {
      clearTimeout(autoSlideTimeout);
      autoSlideTimeout = null;
    }
  }

  function scheduleAutoSlide() {
    pauseAutoSlide();

    if (motionQuery.matches || testimonialCards.length < 2) {
      return;
    }

    autoSlideTimeout = window.setTimeout(() => {
      moveTestimonial(1, { triggeredByAuto: true });
    }, AUTO_SLIDE_DELAY);
  }

  function scrollToTestimonial(index, { triggeredByAuto = false } = {}) {
    const target = testimonialCards[index];
    if (!target) return;

    activeTestimonial = index;
    const left = target.offsetLeft - ((testimonialCarousel.clientWidth - target.clientWidth) / 2);
    const behavior = getScrollBehavior();

    if (typeof testimonialCarousel.scrollTo === 'function') {
      try {
        testimonialCarousel.scrollTo({ left, behavior });
      } catch (error) {
        testimonialCarousel.scrollLeft = left;
      }
    } else {
      testimonialCarousel.scrollLeft = left;
    }

    updateActiveTestimonial();

    if (triggeredByAuto) {
      scheduleAutoSlide();
    }
  }

  function moveTestimonial(step, { triggeredByAuto = false } = {}) {
    const nextIndex = (activeTestimonial + step + testimonialCards.length) % testimonialCards.length;
    scrollToTestimonial(nextIndex, { triggeredByAuto });

    if (!triggeredByAuto) {
      if (pointerHovering) {
        pauseAutoSlide();
      } else {
        scheduleAutoSlide();
      }
    }
  }

  function handleMotionPreference() {
    if (motionQuery.matches) {
      pauseAutoSlide();
    } else {
      scheduleAutoSlide();
    }
  }

  updateActiveTestimonial();
  handleMotionPreference();

  window.requestAnimationFrame(() => {
    scrollToTestimonial(activeTestimonial);
    scheduleAutoSlide();
  });

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

  const handleInteractionStart = () => pauseAutoSlide();
  const handleInteractionEnd = () => {
    if (!pointerHovering) {
      scheduleAutoSlide();
    }
  };
  const handlePointerCancel = () => {
    pointerHovering = false;
    scheduleAutoSlide();
  };

  if ('PointerEvent' in window) {
    testimonialCarousel.addEventListener('pointerdown', handleInteractionStart, { passive: true });
    testimonialCarousel.addEventListener('pointerup', handleInteractionEnd, { passive: true });
    testimonialCarousel.addEventListener('pointercancel', handlePointerCancel, { passive: true });
  } else {
    testimonialCarousel.addEventListener('mousedown', handleInteractionStart);
    testimonialCarousel.addEventListener('mouseup', handleInteractionEnd);
    testimonialCarousel.addEventListener('touchstart', handleInteractionStart, { passive: true });
    testimonialCarousel.addEventListener('touchend', handleInteractionEnd, { passive: true });
    testimonialCarousel.addEventListener('touchcancel', handleInteractionEnd, { passive: true });
  }

  testimonialCarousel.addEventListener('touchstart', handleInteractionStart, { passive: true });
  testimonialCarousel.addEventListener('touchend', handleInteractionEnd, { passive: true });
  testimonialCarousel.addEventListener('touchcancel', handleInteractionEnd, { passive: true });
  testimonialCarousel.addEventListener('mouseenter', () => {
    pointerHovering = true;
    handleInteractionStart();
  });
  testimonialCarousel.addEventListener('mouseleave', () => {
    pointerHovering = false;
    handleInteractionEnd();
  });

  testimonialCarousel.addEventListener('scroll', () => {
    pauseAutoSlide();
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

      if (!pointerHovering) {
        scheduleAutoSlide();
      }
    }, 140);
  }, { passive: true });

  if (carouselWrap) {
    carouselWrap.addEventListener('mouseenter', () => {
      pointerHovering = true;
      pauseAutoSlide();
    });
    carouselWrap.addEventListener('mouseleave', () => {
      pointerHovering = false;
      scheduleAutoSlide();
    });

    carouselWrap.addEventListener('focusin', pauseAutoSlide);
    carouselWrap.addEventListener('focusout', (event) => {
      if (!carouselWrap.contains(event.relatedTarget)) {
        scheduleAutoSlide();
      }
    });
  }

  testimonialCards.forEach((card, index) => {
    card.addEventListener('focus', () => {
      scrollToTestimonial(index);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToTestimonial(index);
      }
    });
  });

  let resizeRaf = null;
  const handleResize = () => {
    if (resizeRaf !== null) {
      cancelAnimationFrame(resizeRaf);
    }

    resizeRaf = window.requestAnimationFrame(() => {
      resizeRaf = null;
      scrollToTestimonial(activeTestimonial);

      if (!pointerHovering) {
        scheduleAutoSlide();
      }
    });
  };

  window.addEventListener('resize', handleResize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAutoSlide();
    } else if (!pointerHovering) {
      scheduleAutoSlide();
    }
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
// 8. Notre Approche - Progressive Animations
// ─────────────────────────────────────────────────────────
const bootApprocheAnimations = () => {
  import('./approche-animations.js')
    .then((module) => {
      if (module && typeof module.initApproche === 'function') {
        module.initApproche();
      }
    })
    .catch((error) => {
      console.warn('Approche animations unavailable', error);
    });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApprocheAnimations, { once: true });
} else {
  bootApprocheAnimations();
}

// ─────────────────────────────────────────────────────────
// 9. Footer – Dynamic Year Stamp
// ─────────────────────────────────────────────────────────
const yearTarget = document.getElementById('current-year');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear().toString();
}

// ─────────────────────────────────────────────────────────
// 10. Mobile sticky CTA actions
// ─────────────────────────────────────────────────────────
const mobileCtaBar = document.querySelector('.mobile-sticky-cta');

if (mobileCtaBar) {
  const scrollToBooking = () => {
    const bookingTarget = document.getElementById('rdv') || document.querySelector('[href="#rdv"]');

    if (bookingTarget) {
      if (bookingTarget.scrollIntoView) {
        bookingTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.hash = '#rdv';
      }
    }
  };

  mobileCtaBar.addEventListener('click', (event) => {
    const actionButton = event.target.closest('.cta-link');
    if (!actionButton) return;

    const action = actionButton.dataset.action;

    if (action === 'call') {
      window.location.href = 'tel:+212661123456';
    } else if (action === 'booking') {
      scrollToBooking();
    } else if (action === 'map') {
      window.open('https://maps.google.com/?q=AutoValley+Sapino', '_blank', 'noopener');
    }
  });
}
