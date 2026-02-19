const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let LenisConstructor = null;

async function loadLenisModule() {
  if (LenisConstructor) return LenisConstructor;
  if (typeof window !== 'undefined' && window.Lenis) {
    LenisConstructor = window.Lenis;
    return LenisConstructor;
  }

  const module = await import('https://unpkg.com/lenis@1.3.16/dist/lenis.esm.js');
  LenisConstructor = module.default || module.Lenis || module;
  return LenisConstructor;
}

export function initLenisSmoothScroll() {
  if (prefersReducedMotion) return null;

  loadLenisModule()
    .then((LenisModule) => {
      const Lenis = LenisModule;
      if (!Lenis) return null;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            lenis.scrollTo(target, { offset: -80 });
          }
        });
      });

      return lenis;
    })
    .catch(() => {
      // Lenis failed to load; gracefully skip smooth scroll to keep other interactions active.
    });
}

export function initCustomCursor() {
  if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
    <div class="cursor-glow"></div>
  `;
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  const glow = cursor.querySelector('.cursor-glow');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    glow.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .service-card, .blog-card, .glass-card, .timeline-card, .precision-std__card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));

  document.addEventListener('mouseleave', () => cursor.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('cursor-hidden'));
}

export function initMagneticButtons() {
  if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

  const magneticElements = document.querySelectorAll('.btn-header-magnetic, .btn-lg--primary, .btn-primary, .btn-approche, .cta-button, .panel-cta--primary, .blog-card-cta');

  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

export function initScrollReveal() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const revealElements = document.querySelectorAll('.reveal-on-scroll, .service-card, .timeline-card, .glass-card, .precision-std__card, .blog-card, .test-card, .noustrouver-layout > *');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || (index * 0.1);
        entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-element');
    el.dataset.revealDelay = (index % 6) * 0.08;
    observer.observe(el);
  });
}

export function initSectionHeaders() {
  const headers = document.querySelectorAll('.section-header, .approche-header, .precision-std__header, .brands-universe__header, .clients-strip__header, .trust-section__header, .blog-header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('header-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  headers.forEach(header => {
    header.classList.add('header-animate');
    observer.observe(header);
  });
}

export function initParallaxElements() {
  if (prefersReducedMotion) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (!parallaxElements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (centerY - viewportCenter) * speed;

      el.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

export function initVideoTransitions() {
  const videoEl = document.getElementById('heroVideo');
  if (!videoEl) return;

  videoEl.style.transition = 'opacity 0.8s ease-in-out';

  const originalOnEnded = videoEl.onended;

  videoEl.addEventListener('ended', () => {
    videoEl.style.opacity = '0';

    setTimeout(() => {
      if (originalOnEnded) originalOnEnded();
      videoEl.style.opacity = '1';
    }, 400);
  });
}

export function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

export function initGrainOverlay() {
  const grain = document.createElement('div');
  grain.className = 'grain-overlay';
  document.body.appendChild(grain);
}

export function initCardShine() {
  if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.service-card, .glass-card, .precision-std__card, .blog-card, .timeline-card');

  cards.forEach(card => {
    const shine = document.createElement('div');
    shine.className = 'card-shine-effect';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(shine);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`;
      shine.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      shine.style.opacity = '0';
    });
  });
}

export function initHeroEnhancements() {
  const hero = document.querySelector('.hero-lg');
  if (!hero) return;

  const content = hero.querySelector('.hero-lg__content');
  if (content && !prefersReducedMotion) {
    const elements = content.querySelectorAll('.lg-fade-up');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  if (!prefersReducedMotion) {
    let mouseX = 0.5, mouseY = 0.5;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;

      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;

      if (content) {
        content.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
      }
    });

    hero.addEventListener('mouseleave', () => {
      if (content) {
        content.style.transition = 'transform 0.5s ease';
        content.style.transform = 'translate(0, 0)';
        setTimeout(() => {
          content.style.transition = '';
        }, 500);
      }
    });
  }
}

export function initSplitTextAnimation() {
  if (prefersReducedMotion) return;

  const heroTitle = document.querySelector('.hero-lg__title');
  if (!heroTitle) return;

  const text = heroTitle.innerHTML;
  const words = text.split(/(\s+)/);

  heroTitle.innerHTML = words.map((word, i) => {
    if (word.trim() === '') return word;
    return `<span class="word-animate" style="--word-index: ${i}">${word}</span>`;
  }).join('');
}

export function initFloatingElements() {
  if (prefersReducedMotion) return;

  const trustItems = document.querySelectorAll('.hero-lg__trust-item');
  trustItems.forEach((item, i) => {
    item.style.animation = `floatSubtle ${3 + i * 0.5}s ease-in-out infinite`;
    item.style.animationDelay = `${i * 0.3}s`;
  });
}

export function initAllPremiumEffects() {
  initLenisSmoothScroll();
  // initCustomCursor(); // Disabled per user request
  initMagneticButtons();
  initScrollReveal();
  initSectionHeaders();
  initParallaxElements();
  initVideoTransitions();
  initScrollProgress();
  initGrainOverlay();
  initCardShine();
  initHeroEnhancements();
  initFloatingElements();
}
