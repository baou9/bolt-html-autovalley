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
