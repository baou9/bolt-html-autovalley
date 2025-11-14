// Initialize Notre Approche animations without third-party dependencies
export function initApproche() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const section = document.querySelector('.approche-section');
  if (!section) {
    return;
  }

  const cards = Array.from(section.querySelectorAll('.timeline-card'));
  const connector = section.querySelector('.timeline-connector');
  const header = section.querySelector('.approche-header');
  const ctaWrapper = section.querySelector('.approche-cta-wrapper');
  const ctaCard = section.querySelector('.approche-cta-card');
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const intersectionTargets = [header, connector, ctaWrapper, ...cards];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else if (!prefersReducedMotion) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.3 });

    intersectionTargets.filter(Boolean).forEach((target) => {
      observer.observe(target);
    });
  } else {
    intersectionTargets.filter(Boolean).forEach((target) => target.classList.add('is-visible'));
  }

  if (ctaCard) {
    if ('IntersectionObserver' in window) {
      const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctaCard.classList.add('scrolled');
          } else if (!prefersReducedMotion) {
            ctaCard.classList.remove('scrolled');
          }
        });
      }, { threshold: 0.2 });

      ctaObserver.observe(ctaCard);
    } else {
      ctaCard.classList.add('scrolled');
    }
  }

  const updateScrollEffects = () => {
    const viewportHeight = window.innerHeight || 1;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const ratio = 1 - Math.min(Math.max(midpoint / viewportHeight, 0), 1);
      const baseOffset = index % 2 === 0 ? -20 : -10;
      const offset = prefersReducedMotion ? 0 : baseOffset * ratio;
      const shadowOpacity = 0.25 + ratio * 0.25;
      const shadowBlur = 24 + ratio * 18;

      card.style.setProperty('--approche-parallax', `${offset.toFixed(2)}px`);
      card.style.setProperty('--approche-shadow-opacity', shadowOpacity.toFixed(2));
      card.style.setProperty('--approche-shadow-blur', `${Math.round(shadowBlur)}px`);
    });

    const sectionRect = section.getBoundingClientRect();
    const totalSpan = sectionRect.height + viewportHeight;
    const visible = Math.min(Math.max((viewportHeight - sectionRect.top) / totalSpan, 0), 1);
    section.style.setProperty('--ambient-position', `${(visible * 100).toFixed(2)}%`);
  };

  let frameId = null;
  const requestUpdate = () => {
    if (frameId !== null) {
      return;
    }
    frameId = window.requestAnimationFrame(() => {
      updateScrollEffects();
      frameId = null;
    });
  };

  updateScrollEffects();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  if ('ontouchstart' in window) {
    cards.forEach((card) => {
      card.addEventListener('touchstart', () => {
        if (typeof card.animate === 'function') {
          card.animate([
            { transform: 'translateY(var(--approche-parallax, 0px)) scale(1)' },
            { transform: 'translateY(calc(var(--approche-parallax, 0px) + 2px)) scale(0.98)' },
            { transform: 'translateY(var(--approche-parallax, 0px)) scale(1)' }
          ], {
            duration: 160,
            easing: 'ease-out'
          });
        }

        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      }, { passive: true });
    });
  }

  console.log('✨ Notre Approche animations initialized');
}

// Performance monitoring
export function monitorPerformance() {
  if (typeof performance !== 'undefined') {
    const entries = performance.getEntriesByType('measure');
    entries.forEach(entry => {
      if (entry.name.includes('approche')) {
        console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    });
  }
}
