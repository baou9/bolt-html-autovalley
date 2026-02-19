import { initMagneticButtons } from './premium-effects.js';

const progressBar = document.getElementById('reading-progress-bar');
const articleContent = document.getElementById('article-content');

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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

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
