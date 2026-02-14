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
    link.classList.add('nav-link--active');
  } else {
    link.classList.remove('nav-link--active');
  }
});
