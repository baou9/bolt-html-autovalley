const currentPath = window.location.pathname;
const currentPage = (currentPath.split('/').pop() || 'index.php').toLowerCase();

const getPageGroup = (page) => {
  if (page === 'services.php' || page.startsWith('services-')) {
    return 'services';
  }

  if (page === 'blog.php' || page === 'article.php') {
    return 'blog';
  }

  return 'index';
};

const currentGroup = getPageGroup(currentPage);
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

navLinks.forEach((link) => {
  const href = link.getAttribute('href') || '';
  const [baseHref, hash] = href.split('#');
  const linkPage = (baseHref.split('/').pop() || 'index.php').toLowerCase();
  const linkGroup = getPageGroup(linkPage);
  const isSectionLink = Boolean(hash);
  const shouldHighlight = linkGroup === currentGroup && !isSectionLink;

  link.classList.toggle('nav-link--active', shouldHighlight);
});

const languageSelect = document.getElementById('header-language-select');

if (languageSelect) {
  const languageRoutes = {
    index: { fr: 'index.php', ar: 'index.php' },
    services: { fr: 'services.php', ar: 'services.php' },
    blog: { fr: 'blog.php', ar: 'blog.php' }
  };

  const currentLanguage = currentPage.endsWith('-ar.php') ? 'ar' : 'fr';
  languageSelect.value = currentLanguage;

  languageSelect.addEventListener('change', (event) => {
    const nextLanguage = event.target.value === 'ar' ? 'ar' : 'fr';
    const targetPage = languageRoutes[currentGroup]?.[nextLanguage];

    if (targetPage && !window.location.pathname.endsWith(targetPage)) {
      window.location.assign(`${targetPage}${window.location.search}${window.location.hash}`);
    }
  });
}
