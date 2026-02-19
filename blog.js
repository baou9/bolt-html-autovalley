const grid = document.getElementById('blog-grid');
const cards = grid ? Array.from(grid.querySelectorAll('.blog-card')) : [];
const emptyState = document.getElementById('blog-empty');
const filterButtons = document.querySelectorAll('#blog-filters .blog-filter-btn');
const searchInput = document.getElementById('blog-search');

let activeCategory = 'tous';
let searchQuery = '';

function filterCards() {
  let visibleCount = 0;

  cards.forEach((card) => {
    const category = card.dataset.category || '';
    const title = (card.querySelector('.blog-card__title')?.textContent || '').toLowerCase();
    const excerpt = (card.querySelector('.blog-card__excerpt')?.textContent || '').toLowerCase();
    const matchesCategory = activeCategory === 'tous' || category === activeCategory;
    const matchesSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);

    if (matchesCategory && matchesSearch) {
      card.classList.remove('blog-card--hidden');
      card.classList.add('blog-card--animating');
      card.style.animationDelay = `${visibleCount * 0.06}s`;
      visibleCount++;
    } else {
      card.classList.add('blog-card--hidden');
      card.classList.remove('blog-card--animating');
    }
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? '' : 'none';
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    activeCategory = btn.dataset.filter;
    filterCards();
  });
});

if (searchInput) {
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value.trim().toLowerCase();
      filterCards();
    }, 200);
  });
}

const archiveTriggers = document.querySelectorAll('.sidebar-archive__trigger');
archiveTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.sidebar-archive__item');
    const isOpen = item.classList.contains('is-open');
    item.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});

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

function initMobileMenu() {
  const trigger = document.querySelector('.menu-trigger');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!trigger || !overlay) return;

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isOpen));
    trigger.classList.toggle('is-open', !isOpen);
    overlay.classList.toggle('active', !isOpen);
    overlay.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

initMobileMenu();
initHeaderScroll();
