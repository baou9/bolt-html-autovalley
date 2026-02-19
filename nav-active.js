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

function initSharedFooterInteractions() {
  if (document.body.dataset.footerInteractionsInitialized === 'true') return;

  const footer = document.getElementById('site-footer');
  if (!footer) return;

  document.body.dataset.footerInteractionsInitialized = 'true';

  const yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
  }

  const accordions = Array.from(footer.querySelectorAll('.footer-accordion'));
  if (!accordions.length) return;

  const mobileQuery = window.matchMedia('(max-width: 860px)');
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let isEnabled = false;
  let cleanupFns = [];

  const setExpandedState = (accordion, expanded) => {
    const trigger = accordion.querySelector('.footer-accordion-trigger');
    const panel = accordion.querySelector('.footer-accordion-panel');
    if (!trigger || !panel) return;

    accordion.classList.toggle('is-open', expanded);
    trigger.setAttribute('aria-expanded', String(expanded));
    panel.style.maxHeight = expanded
      ? (reduceMotionQuery.matches ? 'none' : `${panel.scrollHeight}px`)
      : '0px';
  };

  const refreshOpenPanels = () => {
    if (!isEnabled) return;

    accordions.forEach((accordion) => {
      const trigger = accordion.querySelector('.footer-accordion-trigger');
      const panel = accordion.querySelector('.footer-accordion-panel');
      if (!trigger || !panel) return;

      if (trigger.getAttribute('aria-expanded') === 'true') {
        panel.style.maxHeight = reduceMotionQuery.matches ? 'none' : `${panel.scrollHeight}px`;
      }
    });
  };

  const enableAccordions = () => {
    if (isEnabled) return;

    isEnabled = true;
    footer.classList.add('footer-accordions-enabled');

    accordions.forEach((accordion) => {
      const trigger = accordion.querySelector('.footer-accordion-trigger');
      const panel = accordion.querySelector('.footer-accordion-panel');
      if (!trigger || !panel) return;

      trigger.disabled = false;
      trigger.removeAttribute('aria-disabled');
      setExpandedState(accordion, false);

      const onToggle = () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        setExpandedState(accordion, !expanded);
      };

      trigger.addEventListener('click', onToggle);
      cleanupFns.push(() => trigger.removeEventListener('click', onToggle));
    });

    const onResize = () => refreshOpenPanels();
    window.addEventListener('resize', onResize);
    cleanupFns.push(() => window.removeEventListener('resize', onResize));
  };

  const disableAccordions = () => {
    if (isEnabled) {
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
      isEnabled = false;
      footer.classList.remove('footer-accordions-enabled');
    }

    accordions.forEach((accordion) => {
      const trigger = accordion.querySelector('.footer-accordion-trigger');
      const panel = accordion.querySelector('.footer-accordion-panel');
      if (!trigger || !panel) return;

      accordion.classList.add('is-open');
      trigger.disabled = true;
      trigger.setAttribute('aria-disabled', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = '';
      panel.style.opacity = '';
      panel.style.visibility = '';
    });
  };

  const evaluate = () => {
    if (mobileQuery.matches) {
      enableAccordions();
    } else {
      disableAccordions();
    }
  };

  evaluate();
  mobileQuery.addEventListener('change', evaluate);
}

initSharedHeaderInteractions();
initSharedFooterInteractions();
