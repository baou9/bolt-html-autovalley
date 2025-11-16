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
// 3. Mobile Menu Toggle
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
const prevControl = carouselWrap ? carouselWrap.querySelector('.prev') : null;
const nextControl = carouselWrap ? carouselWrap.querySelector('.next') : null;

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
// 9. Partners Logos – Liquid Glass Sphere Parallax
// ─────────────────────────────────────────────────────────
const initPartnersSphere = () => {
  const sphere = document.querySelector('.partners-sphere');
  const inner = document.querySelector('.partners-sphere-inner');

  if (!sphere || !inner) return;

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // No JS parallax: keep idle CSS animation only
    return;
  }

  let pointerActive = false;
  let idleTimeoutId = null;

  const setTilt = (xDeg, yDeg) => {
    inner.style.setProperty('--partners-tilt-x', `${xDeg}deg`);
    inner.style.setProperty('--partners-tilt-y', `${yDeg}deg`);
  };

  const resetTilt = () => {
    pointerActive = false;
    setTilt(0, 0);
  };

  const handlePointerMove = (event) => {
    const rect = sphere.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    const tiltX = relX * 16;   // horizontal tilt
    const tiltY = -relY * 12;  // vertical tilt

    pointerActive = true;
    setTilt(tiltX, tiltY);

    if (idleTimeoutId) {
      window.clearTimeout(idleTimeoutId);
    }

    idleTimeoutId = window.setTimeout(() => {
      pointerActive = false;
    }, 1200);
  };

  let animationFrameId;
  const startIdleLoop = () => {
    let start = null;

    const loop = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (!pointerActive) {
        const idleX = Math.sin(elapsed * 0.0004) * 4;
        const idleY = Math.cos(elapsed * 0.0003) * 3;
        setTilt(idleX, idleY);
      }

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);
  };

  sphere.addEventListener('pointermove', handlePointerMove);
  sphere.addEventListener('pointerleave', resetTilt);

  startIdleLoop();

  window.addEventListener('beforeunload', () => {
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
  });
};

// ─────────────────────────────────────────────────────────
// 10. Technologie & Marques – Liquid glass tilt
// ─────────────────────────────────────────────────────────
const initBrandSphere = () => {
  const sphere = document.querySelector('.brands-sphere');
  const inner = document.querySelector('.brands-sphere-inner');

  if (!sphere || !inner) {
    return;
  }

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const logos = Array.from(inner.querySelectorAll('.brands-logo-floating'));

  logos.forEach((logo, index) => {
    const depth = 20 + (index % 4) * 4;
    logo.style.setProperty('--sphere-depth', `${depth}px`);
  });

  if (prefersReducedMotion) {
    return;
  }

  let pointerActive = false;
  let idleTimeoutId = null;

  const setTilt = (xDeg, yDeg) => {
    inner.style.setProperty('--brands-tilt-x', `${xDeg}deg`);
    inner.style.setProperty('--brands-tilt-y', `${yDeg}deg`);
  };

  const resetTilt = () => {
    pointerActive = false;
    setTilt(0, 0);
  };

  const handlePointerMove = (event) => {
    const rect = sphere.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    const tiltX = relX * 18;
    const tiltY = -relY * 14;

    pointerActive = true;
    setTilt(tiltX, tiltY);

    if (idleTimeoutId) {
      window.clearTimeout(idleTimeoutId);
    }

    idleTimeoutId = window.setTimeout(() => {
      pointerActive = false;
    }, 1200);
  };

  let frameId;
  const startIdleLoop = () => {
    let start = null;

    const loop = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (!pointerActive) {
        const idleX = Math.sin(elapsed * 0.0004) * 4;
        const idleY = Math.cos(elapsed * 0.00035) * 3;
        setTilt(idleX, idleY);
      }

      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);
  };

  sphere.addEventListener('pointermove', handlePointerMove);
  sphere.addEventListener('pointerleave', resetTilt);

  startIdleLoop();

  window.addEventListener('beforeunload', () => {
    if (frameId) window.cancelAnimationFrame(frameId);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initBrandSphere();
    initPartnersSphere();
  }, { once: true });
} else {
  initBrandSphere();
  initPartnersSphere();
}

// ─────────────────────────────────────────────────────────
// 11. Footer – Dynamic Year Stamp
// ─────────────────────────────────────────────────────────
const yearTarget = document.getElementById('current-year');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear().toString();
}
