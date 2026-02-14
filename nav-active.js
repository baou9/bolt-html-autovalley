const normalizedPath = window.location.pathname.replace(/\/$/, '');
const currentPage = normalizedPath.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link, .mobile-link').forEach((link) => {
  const href = link.getAttribute('href') || '';
  const linkPage = href.split('#')[0].split('/').pop() || 'index.html';
  const isSamePage = linkPage === currentPage || (currentPage === '' && linkPage === 'index.html');

  if (isSamePage) {
    link.classList.add('nav-link--active');
    if (link.classList.contains('nav-link')) {
      link.setAttribute('aria-current', 'page');
    }
  }
});

const languageSelect = document.getElementById('site-language');
if (languageSelect) {
  const isEnglishPage = currentPage.includes('-en');
  languageSelect.value = isEnglishPage ? 'en' : 'fr';

  languageSelect.addEventListener('change', (event) => {
    const nextLang = event.target.value;
    const isServicesPage = currentPage.includes('services');
    const targetPageByLang = {
      fr: isServicesPage ? './services.html' : './index.html',
      en: isServicesPage ? './services-en.html' : './index-en.html'
    };

    window.location.href = targetPageByLang[nextLang] || './index.html';
  });
}
