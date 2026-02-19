const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() || 'index.php';
const normalizedCurrentPage = currentPage === '' ? 'index.php' : currentPage;
const isServicesPage = normalizedCurrentPage === 'services.php' || normalizedCurrentPage.startsWith('services-');

const isActiveLink = (linkPage) => {
  if (!linkPage) {
    return false;
  }

  if (linkPage === normalizedCurrentPage || (normalizedCurrentPage === '' && linkPage === 'index.php')) {
    return true;
  }

  return linkPage === 'services.php' && isServicesPage;
};

const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const activePages = new Set();

navLinks.forEach((link) => {
  const href = link.getAttribute('href') || '';
  const linkPage = href.split('#')[0].split('/').pop();

  if (isActiveLink(linkPage)) {
    activePages.add(linkPage);
  }
});

navLinks.forEach((link) => {
  const href = link.getAttribute('href') || '';
  const linkPage = href.split('#')[0].split('/').pop();

  if (activePages.has(linkPage)) {
    link.classList.add('nav-link--active');
  } else {
    link.classList.remove('nav-link--active');
  }
});

const languageSelect = document.getElementById('header-language-select');

const syncHeaderScrollState = () => {
  const header = document.querySelector('.site-header');

  if (!header) {
    return;
  }

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

syncHeaderScrollState();
window.addEventListener('scroll', syncHeaderScrollState, { passive: true });

if (languageSelect) {
  const languageRoutes = {
    index: { fr: 'index.php', en: 'index-en.php' },
    services: { fr: 'services.php', en: 'services-en.php' }
  };

  const normalizedPage = (currentPage || 'index.php').toLowerCase();
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
