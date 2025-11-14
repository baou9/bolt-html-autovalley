const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: true };

function addClassOnIntersect(elements, className, options = {}) {
  if (!elements || elements.length === 0) {
    return null;
  }

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add(className));
    return null;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        obs.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach((element) => observer.observe(element));
  return observer;
}

function initTimelineCards(cards) {
  if (!cards.length) {
    return;
  }

  const cardObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add('in-view');

            const icon = card.querySelector('.card-icon-wrapper');
            if (icon) {
              icon.classList.add('in-view');
            }

            obs.unobserve(card);
          }
        });
      }, { threshold: 0.35 })
    : null;

  cards.forEach((card) => {
    if (cardObserver) {
      cardObserver.observe(card);
    } else {
      card.classList.add('in-view');
      const icon = card.querySelector('.card-icon-wrapper');
      if (icon) {
        icon.classList.add('in-view');
      }
    }
  });

  if (prefersReducedMotion.matches) {
    return;
  }

  let rafId = null;

  const updateParallax = () => {
    rafId = null;
    const viewportHeight = window.innerHeight || 1;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const visibleRatio = Math.max(0, Math.min(1, 1 - rect.top / viewportHeight));
      const depth = index % 2 === 0 ? 20 : 10;
      const offset = (visibleRatio - 0.5) * depth;
      card.style.setProperty('--card-parallax', `${offset.toFixed(2)}px`);
    });
  };

  const queueParallax = () => {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(updateParallax);
    }
  };

  queueParallax();
  window.addEventListener('scroll', queueParallax, { passive: true });
}

function initConnector(connector) {
  if (!connector) {
    return;
  }

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    connector.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        connector.classList.add('is-visible');
      } else {
        connector.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(connector);
}

function initCtaCard(ctaCard) {
  if (!ctaCard) {
    return;
  }

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    ctaCard.classList.add('scrolled');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        ctaCard.classList.add('scrolled');
      } else {
        ctaCard.classList.remove('scrolled');
      }
    });
  }, { threshold: 0.25 });

  observer.observe(ctaCard);
}

function initAmbient(section) {
  if (!section || prefersReducedMotion.matches) {
    return;
  }

  let rafId = null;

  const updateAmbient = () => {
    rafId = null;
    const rect = section.getBoundingClientRect();
    const total = rect.height + window.innerHeight;
    const progress = total > 0 ? Math.min(1, Math.max(0, 1 - (rect.bottom / total))) : 0;
    section.style.setProperty('--ambient-progress', progress.toFixed(3));
  };

  const queueAmbient = () => {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(updateAmbient);
    }
  };

  queueAmbient();
  window.addEventListener('scroll', queueAmbient, { passive: true });
}

function initTouchFeedback(cards) {
  if (!('ontouchstart' in window)) {
    return;
  }

  cards.forEach((card) => {
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
      window.setTimeout(() => card.classList.remove('touch-active'), 180);

      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }, { passive: true });
  });
}

export function initApproche() {
  const section = document.querySelector('.approche-section');
  if (!section) {
    return;
  }

  const header = section.querySelector('.approche-header');
  if (header) {
    addClassOnIntersect([header], 'is-visible', { threshold: 0.2 });
  }

  const ctaWrapper = section.querySelector('.approche-cta-wrapper');
  if (ctaWrapper) {
    addClassOnIntersect([ctaWrapper], 'is-visible', { threshold: 0.2 });
  }

  const cards = Array.from(section.querySelectorAll('.timeline-card'));
  initTimelineCards(cards);
  initTouchFeedback(cards);

  const connector = section.querySelector('.timeline-connector');
  initConnector(connector);

  const ctaCard = section.querySelector('.approche-cta-card');
  initCtaCard(ctaCard);

  initAmbient(section);
}

export function monitorPerformance() {
  if (typeof performance === 'undefined') {
    return;
  }

  performance.getEntriesByType('measure')
    .filter((entry) => entry.name.includes('approche'))
    .forEach((entry) => {
      console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
    });
}
