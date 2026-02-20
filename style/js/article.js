import { initMagneticButtons } from './premium-effects.js';

const progressBar = document.getElementById('reading-progress-bar');
const articleContent = document.getElementById('article-content');
const tocToggle = document.querySelector('.article-toc-toggle');
const toc = document.getElementById('article-toc');
const tabletBreakpoint = window.matchMedia('(max-width: 1024px)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateProgressBar() {
  if (!progressBar || !articleContent) return;
  const rect = articleContent.getBoundingClientRect();
  const contentTop = rect.top + window.scrollY;
  const contentHeight = rect.height;
  const scrolled = window.scrollY - contentTop;
  const viewportHeight = window.innerHeight;
  const progress = Math.min(Math.max(scrolled / (contentHeight - viewportHeight), 0), 1);
  progressBar.style.width = `${progress * 100}%`;
}

const tocLinks = document.querySelectorAll('.article-toc__link');
const headings = [];

tocLinks.forEach((link) => {
  const targetId = link.getAttribute('href')?.replace('#', '');
  if (targetId) {
    const heading = document.getElementById(targetId);
    if (heading) headings.push({ id: targetId, el: heading, link });
  }
});

function updateTocHighlight() {
  if (headings.length === 0) return;

  let activeIndex = 0;
  const scrollY = window.scrollY + 120;

  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].el.offsetTop <= scrollY) {
      activeIndex = i;
      break;
    }
  }

  headings.forEach(({ link }, i) => {
    if (i === activeIndex) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

tocLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href')?.replace('#', '');
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      // [PATCH]
      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });

      if (tocToggle && toc && tabletBreakpoint.matches) {
        toc.classList.add('is-collapsed');
        tocToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// [PATCH]
function syncTocDisclosure() {
  if (!tocToggle || !toc) return;

  if (tabletBreakpoint.matches) {
    if (!toc.classList.contains('is-collapsed') && tocToggle.getAttribute('aria-expanded') !== 'true') {
      toc.classList.add('is-collapsed');
    }
    if (tocToggle.getAttribute('aria-expanded') === null) {
      tocToggle.setAttribute('aria-expanded', 'false');
    }
    return;
  }

  toc.classList.remove('is-collapsed');
  tocToggle.setAttribute('aria-expanded', 'true');
}

if (tocToggle && toc) {
  syncTocDisclosure();

  tocToggle.addEventListener('click', () => {
    if (!tabletBreakpoint.matches) return;
    const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
    tocToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    toc.classList.toggle('is-collapsed', isExpanded);
  });

  if (typeof tabletBreakpoint.addEventListener === 'function') {
    tabletBreakpoint.addEventListener('change', syncTocDisclosure);
  } else {
    tabletBreakpoint.addListener(syncTocDisclosure);
  }
}

let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateProgressBar();
      updateTocHighlight();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
updateProgressBar();
updateTocHighlight();

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('av-theme', next);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMagneticButtons, { once: true });
} else {
  initMagneticButtons();
}
