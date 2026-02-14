const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() || 'index.html';
const normalizedCurrentPage = currentPage === '' ? 'index.html' : currentPage;
const isServicesPage = normalizedCurrentPage === 'services.html' || normalizedCurrentPage.startsWith('services-');

// [PATCH] Keep filename-based matching and add a services section fallback for service-related pages.
const isActiveLink = (linkPage) => {
  if (!linkPage) {
    return false;
  }

  if (linkPage === normalizedCurrentPage || (normalizedCurrentPage === '' && linkPage === 'index.html')) {
    return true;
  }

  return linkPage === 'services.html' && isServicesPage;
};

const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const activePages = new Set();

navLinks.forEach(link => {
  const href = link.getAttribute('href') || '';
  const linkPage = href.split('#')[0].split('/').pop();

  if (isActiveLink(linkPage)) {
    activePages.add(linkPage);
  }
});

// [PATCH] Apply the same computed active page(s) to desktop and mobile links to keep states synchronized.
navLinks.forEach(link => {
  const href = link.getAttribute('href') || '';
  const linkPage = href.split('#')[0].split('/').pop();

  if (activePages.has(linkPage)) {
// [PATCH] Keep active navigation state and language switch behavior in sync with the current path.
const currentPathname = window.location.pathname;
const currentPage = currentPathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
  const href = link.getAttribute('href');
  if (!href) {
    return;
  }

  const linkPage = href.split('#')[0].split('/').pop() || 'index.html';
  if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
    link.classList.add('nav-link--active');
  } else {
    link.classList.remove('nav-link--active');
  }
});

const languageSelect = document.getElementById('header-language-select');

if (languageSelect) {
  const languageRoutes = {
    index: { fr: 'index.html', en: 'index-en.html' },
    services: { fr: 'services.html', en: 'services-en.html' }
  };

  const normalizedPage = (currentPage || 'index.html').toLowerCase();
  const pageKey = normalizedPage.includes('services') ? 'services' : 'index';
  const currentLanguage = normalizedPage.endsWith('-en.html') ? 'en' : 'fr';

  languageSelect.value = currentLanguage;

  languageSelect.addEventListener('change', event => {
    const nextLanguage = event.target.value === 'en' ? 'en' : 'fr';
    const targetPage = languageRoutes[pageKey][nextLanguage];
    const nextUrl = `${targetPage}${window.location.search}${window.location.hash}`;

    if (targetPage && !window.location.pathname.endsWith(targetPage)) {
      window.location.assign(nextUrl);
    }
  });
}
