const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() || 'index.php';
const normalizedCurrentPage = currentPage || 'index.php';

const activeNavKeyByPage = {
  'index.php': 'home',
  'services.php': 'services',
  'blog.php': 'blog',
  'article.php': 'blog'
};

const activeNavKey = activeNavKeyByPage[normalizedCurrentPage] || 'home';
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

navLinks.forEach((link) => {
  const linkNavKey = link.dataset.navKey;
  if (linkNavKey === activeNavKey) {
    link.classList.add('nav-link--active');
  } else {
    link.classList.remove('nav-link--active');
  }
});

const languageSelect = document.getElementById('header-language-select');

if (languageSelect) {
  const languageRoutes = {
    index: { fr: 'index.php', en: 'index-en.php' },
    services: { fr: 'services.php', en: 'services-en.php' }
  };

  const normalizedPage = normalizedCurrentPage.toLowerCase();
  const pageKey = normalizedPage.includes('services') ? 'services' : 'index';
  const currentLanguage = normalizedPage.endsWith('-en.php') ? 'en' : 'fr';

  languageSelect.value = currentLanguage;

  languageSelect.addEventListener('change', (event) => {
    const nextLanguage = event.target.value === 'en' ? 'en' : 'fr';
    const targetPage = languageRoutes[pageKey][nextLanguage];
    const nextUrl = `${targetPage}${window.location.search}${window.location.hash}`;

    if (targetPage && !window.location.pathname.endsWith(targetPage)) {
      window.location.assign(nextUrl);
    }
  });
}


function initSharedHeaderInteractions() {
  if (document.body.dataset.headerInteractionsInitialized === 'true') return;

  const header = document.querySelector('.site-header');
  const menuTrigger = document.querySelector('.menu-trigger');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!header || !menuTrigger || !overlay) return;

  document.body.dataset.headerInteractionsInitialized = 'true';

  const setScrolledState = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;

    requestAnimationFrame(() => {
      setScrolledState();
      ticking = false;
    });

    ticking = true;
  }, { passive: true });

  const closeMenu = () => {
    menuTrigger.classList.remove('is-open');
    menuTrigger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    menuTrigger.classList.add('is-open');
    menuTrigger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  menuTrigger.addEventListener('click', () => {
    const isOpen = menuTrigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  setScrolledState();
}

initSharedHeaderInteractions();
