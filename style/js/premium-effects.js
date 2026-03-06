const getPremiumCapabilities = () => {
  const match = (query) => window.matchMedia && window.matchMedia(query).matches;
  return {
    reducedMotion: match('(prefers-reduced-motion: reduce)'),
    coarsePointer: match('(pointer: coarse)'),
    narrowViewport: match('(max-width: 1024px)'),
    lowMemory: typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4,
  };
};

const shouldSkipHeavyEffect = () => {
  const capabilities = getPremiumCapabilities();
  return capabilities.reducedMotion || capabilities.coarsePointer || capabilities.narrowViewport || capabilities.lowMemory;
};

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
  if (getPremiumCapabilities().reducedMotion) return null;

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
  const capabilities = getPremiumCapabilities();
  if (capabilities.reducedMotion || capabilities.coarsePointer || capabilities.narrowViewport) return;

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
  const capabilities = getPremiumCapabilities();
  if (capabilities.reducedMotion || capabilities.coarsePointer || capabilities.narrowViewport) return;

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
  if (shouldSkipHeavyEffect()) {
    document.querySelectorAll('.reveal-on-scroll, .service-card, .timeline-card, .glass-card, .precision-std__card, .blog-card, .test-card, .noustrouver-layout > *').forEach(el => {
      el.classList.remove('reveal-element');
      el.style.removeProperty('transition-delay');
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
  if (shouldSkipHeavyEffect()) {
    document.querySelectorAll('.section-header, .approche-header, .precision-std__header, .brands-universe__header, .clients-strip__header, .trust-section__header, .blog-header').forEach((header) => {
      header.classList.remove('header-animate');
      header.classList.add('header-revealed');
    });
    return;
  }

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
  if (shouldSkipHeavyEffect()) return;

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
  if (shouldSkipHeavyEffect()) return;

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
  if (getPremiumCapabilities().narrowViewport) return;

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
  if (shouldSkipHeavyEffect()) return;

  const grain = document.createElement('div');
  grain.className = 'grain-overlay';
  document.body.appendChild(grain);
}

export function initCardShine() {
  const capabilities = getPremiumCapabilities();
  if (capabilities.reducedMotion || capabilities.coarsePointer || capabilities.lowMemory) return;

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
  if (content && !shouldSkipHeavyEffect()) {
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

  if (!shouldSkipHeavyEffect()) {
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
  if (shouldSkipHeavyEffect()) return;

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
  if (shouldSkipHeavyEffect()) return;

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
  initPremium3DGridExperience();
}


const WORKSHOP_SERVICES = [
  { tone: 'steel', svg: '<svg viewBox="0 0 24 24"><path d="M12 3v7"/><path d="M12 14v7"/><path d="M6.3 6.3l5 5"/><path d="M12.7 12.7l5 5"/><path d="M3 12h7"/><path d="M14 12h7"/><path d="M6.3 17.7l5-5"/><path d="M12.7 11.3l5-5"/><circle cx="12" cy="12" r="2.2"/></svg>' },
  { tone: 'red', svg: '<svg viewBox="0 0 24 24"><rect x="4" y="7" width="14" height="10" rx="2"/><path d="M18 10h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2"/><path d="M8 12h4"/><path d="M10 10v4"/></svg>' },
  { tone: 'white', svg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.2"/><path d="M12 5v3"/><path d="M19 12h-3"/><path d="M12 19v-3"/><path d="M5 12h3"/></svg>' },
  { tone: 'steel', svg: '<svg viewBox="0 0 24 24"><path d="M4 14.5h18"/><path d="M5 14.5l1.4-4.1A2 2 0 0 1 8.3 9h7.4a2 2 0 0 1 1.9 1.4L19 14.5"/><path d="M7 17.5h.01"/><path d="M17 17.5h.01"/><path d="M6 17.5a1 1 0 0 0 2 0"/><path d="M16 17.5a1 1 0 0 0 2 0"/><path d="M9 14.5h6"/></svg>' },
  { tone: 'white', svg: '<svg viewBox="0 0 24 24"><path d="M12 3l1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z"/><path d="M18.5 13.5l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z"/></svg>' },
  { tone: 'red', svg: '<svg viewBox="0 0 24 24"><path d="M4 13h4l2-4 4 9 2-5h4"/><path d="M8 5h8"/><path d="M8 19h8"/></svg>' },
  { tone: 'white', svg: '<svg viewBox="0 0 24 24"><path d="M4 10h2l2-3h7l2 3h3v7h-3l-2 2H8l-2-2H4z"/><path d="M8 7V4h5v3"/></svg>' },
  { tone: 'steel', svg: '<svg viewBox="0 0 24 24"><path d="M5 16l1.5-6A2 2 0 0 1 8.4 8h7.2a2 2 0 0 1 1.9 2L19 16"/><path d="M4 16h16"/><path d="M8 12h8"/></svg>' },
];

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ensure3DGridBackgroundMarkup() {
  if (document.querySelector('.av-grid-3d')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'av-grid-3d';
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.innerHTML = `
    <div class="av-grid-3d__haze"></div>
    <div class="av-grid-3d__horizon"></div>
    <div class="av-grid-3d__orbit av-grid-3d__orbit--a"></div>
    <div class="av-grid-3d__orbit av-grid-3d__orbit--b"></div>
    <div class="av-grid-3d__plane">
      <div class="av-grid-3d__floor"></div>
      <div class="av-grid-3d__lanes"></div>
      <div class="av-grid-3d__scan"></div>
      <div class="av-grid-3d__nodes" id="av-grid-nodes"></div>
      <div class="av-grid-3d__icons" id="av-grid-icons"></div>
      <div class="av-grid-3d__vignette"></div>
    </div>
  `;

  const grain = document.createElement('div');
  grain.className = 'av-grid-grain';
  grain.setAttribute('aria-hidden', 'true');

  const veil = document.createElement('div');
  veil.className = 'av-grid-veil';
  veil.setAttribute('aria-hidden', 'true');

  document.body.prepend(wrapper);
  document.body.prepend(grain);
  document.body.prepend(veil);
}

function build3DGridNodesAndIcons() {
  const nodeLayer = document.getElementById('av-grid-nodes');
  const iconLayer = document.getElementById('av-grid-icons');
  if (!nodeLayer || !iconLayer) return;

  nodeLayer.innerHTML = '';
  iconLayer.innerHTML = '';

  const compact = window.innerWidth < 640;
  const random = mulberry32(90421);
  const nodeColumns = compact ? [12, 24, 38, 50, 62, 76, 88] : [10, 22, 34, 50, 66, 78, 90];
  const nodeRows = compact ? [20, 34, 50, 68, 84] : [18, 30, 44, 60, 78];
  const iconColumns = compact ? [21, 50, 79] : [18, 34, 50, 66, 82];
  const iconRows = compact ? [28, 54, 80] : [24, 42, 66];

  nodeRows.forEach((row, rowIndex) => {
    const depth = rowIndex / Math.max(1, nodeRows.length - 1);
    const rowShift = rowIndex % 2 === 0 ? 0 : (compact ? 1.4 : 1.8);

    nodeColumns.forEach((column) => {
      const x = Math.max(8, Math.min(92, column + rowShift + (random() - 0.5) * (compact ? 0.8 : 1.1)));
      const y = Math.max(12, Math.min(90, row + (random() - 0.5) * (compact ? 0.9 : 1.2)));
      const node = document.createElement('span');
      node.className = 'av-grid-3d__node';
      node.style.left = `${x}%`;
      node.style.top = `${y}%`;
      node.style.setProperty('--av-node-scale', (0.68 + depth * 1.05).toFixed(2));
      node.style.setProperty('--av-node-opacity', (0.12 + depth * 0.22).toFixed(2));
      node.style.setProperty('--av-node-delay', `${(-random() * 10).toFixed(2)}s`);
      node.style.setProperty('--av-node-dur', `${(9.5 + random() * 4.5).toFixed(2)}s`);
      nodeLayer.appendChild(node);
    });
  });

  const iconSlots = [];

  iconRows.forEach((row, rowIndex) => {
    const depth = rowIndex / Math.max(1, iconRows.length - 1);
    const rowShift = rowIndex % 2 === 0 ? 0 : (compact ? 1.2 : 1.6);

    iconColumns.forEach((column, columnIndex) => {
      if ((rowIndex + columnIndex) % 2 === 1 && !(columnIndex === 2 && rowIndex === iconRows.length - 1)) return;

      const x = Math.max(10, Math.min(90, column + rowShift + (random() - 0.5) * (compact ? 0.7 : 1.0)));
      const y = Math.max(16, Math.min(86, row + (random() - 0.5) * (compact ? 0.8 : 1.0)));
      iconSlots.push({ x, y, depth });
    });
  });

  iconSlots.forEach((slot, index) => {
    const service = WORKSHOP_SERVICES[index % WORKSHOP_SERVICES.length];
    const icon = document.createElement('span');
    icon.className = `av-grid-3d__icon av-grid-3d__icon--${service.tone}`;
    icon.style.left = `${slot.x}%`;
    icon.style.top = `${slot.y}%`;
    icon.style.setProperty('--av-icon-scale', (0.70 + slot.depth * 0.42).toFixed(2));
    icon.style.setProperty('--av-icon-opacity', (0.10 + slot.depth * 0.14).toFixed(2));
    icon.style.setProperty('--av-icon-delay', `${(-random() * 14).toFixed(2)}s`);
    icon.style.setProperty('--av-icon-dur', `${(12 + random() * 5).toFixed(2)}s`);
    icon.innerHTML = service.svg;
    iconLayer.appendChild(icon);
  });
}

function updateGridHeroExclusion() {
  const hero = document.querySelector('main section[class*="hero"], main .hero-lg, main .sv-hero, main .pg-hero, main .blog-hero, main .article-hero');
  const root = document.documentElement;

  if (!hero) {
    root.style.setProperty('--av-grid-top-cut', '0px');
    return;
  }

  const rect = hero.getBoundingClientRect();
  const topCut = Math.max(0, rect.bottom + window.scrollY - window.scrollY);
  root.style.setProperty('--av-grid-top-cut', `${Math.round(topCut)}px`);
}

function init3DGridMotion() {
  const plane = document.querySelector('.av-grid-3d__plane');
  if (!plane || shouldSkipHeavyEffect()) return;

  const root = document.documentElement;
  let baseTilt = Number.parseFloat(getComputedStyle(root).getPropertyValue('--av-grid-tilt')) || 58;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = 0;

  const tick = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    const panX = -50 + currentX * 1.1;
    const tilt = baseTilt - currentY * 2.2;

    plane.style.transform = `translateX(${panX.toFixed(2)}%) translateY(var(--av-grid-y)) perspective(var(--av-grid-depth)) rotateX(${tilt.toFixed(2)}deg) scale(var(--av-grid-scale))`;

    if (Math.abs(targetX - currentX) < 0.002 && Math.abs(targetY - currentY) < 0.002) {
      rafId = 0;
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  window.addEventListener('mousemove', (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });

  window.addEventListener('resize', () => {
    baseTilt = Number.parseFloat(getComputedStyle(root).getPropertyValue('--av-grid-tilt')) || 58;
  }, { passive: true });
}

function initSectionTransitionMood() {
  const sections = Array.from(document.querySelectorAll('main section'));
  if (!sections.length) return;

  const root = document.documentElement;
  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);

  const getMood = (section) => {
    const cards = section.querySelectorAll('.service-card, .glass-card, .timeline-card, .blog-card, .test-card, .quote, .card').length;
    const textLength = (section.textContent || '').replace(/\s+/g, ' ').trim().length;
    const density = clamp01((textLength - 260) / 2200);
    const cardsNorm = clamp01(cards / 10);

    return {
      veil: clamp01(0.12 + cardsNorm * 0.16 + density * 0.12),
      red: clamp01(0.08 + cardsNorm * 0.18),
      pulse: clamp01(0.01 + cardsNorm * 0.05),
    };
  };

  const moods = sections.map((section) => ({ section, mood: getMood(section) }));
  let frame = 0;

  const update = () => {
    frame = 0;
    const viewportMid = window.innerHeight * 0.52;
    const rects = moods.map(({ section }) => section.getBoundingClientRect());

    let currentIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    rects.forEach((rect, index) => {
      const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
      if (dist < bestDistance) {
        bestDistance = dist;
        currentIndex = index;
      }
    });

    let nextIndex = currentIndex;
    const currentRect = rects[currentIndex];
    const currentCenter = currentRect.top + currentRect.height / 2;

    if (currentCenter < viewportMid && currentIndex < rects.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (currentCenter > viewportMid && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    let progress = 0;
    if (nextIndex !== currentIndex) {
      const nextCenter = rects[nextIndex].top + rects[nextIndex].height / 2;
      const span = Math.abs(nextCenter - currentCenter) || 1;
      progress = smooth(clamp01(Math.abs(viewportMid - currentCenter) / span));
    }

    const currentMood = moods[currentIndex].mood;
    const nextMood = moods[nextIndex].mood;

    root.style.setProperty('--av-grid-veil', lerp(currentMood.veil, nextMood.veil, progress).toFixed(3));
    root.style.setProperty('--av-grid-red', lerp(currentMood.red, nextMood.red, progress).toFixed(3));
    root.style.setProperty('--av-grid-pulse', lerp(currentMood.pulse, nextMood.pulse, progress).toFixed(3));
  };

  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

export function initPremium3DGridExperience() {
  if (document.body.dataset.avGridInitialized === 'true') return;
  document.body.dataset.avGridInitialized = 'true';

  ensure3DGridBackgroundMarkup();
  build3DGridNodesAndIcons();
  updateGridHeroExclusion();
  init3DGridMotion();
  initSectionTransitionMood();

  window.addEventListener('resize', () => {
    build3DGridNodesAndIcons();
    updateGridHeroExclusion();
  }, { passive: true });
}



if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPremium3DGridExperience, { once: true });
} else {
  initPremium3DGridExperience();
}
