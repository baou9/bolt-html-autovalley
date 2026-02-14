const setActiveNavLinks = () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .mobile-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('#')[0].split('/').pop();

    if (linkPage === page || (page === '' && linkPage === 'index.html')) {
      link.classList.add('nav-link--active');
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setActiveNavLinks, { once: true });
} else {
  setActiveNavLinks();
}

document.addEventListener('partials:loaded', setActiveNavLinks);
