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

function initSharedLanguageControls() {
  const languageSelect = document.getElementById('header-language-select');
  const footerLanguageSwitch = document.querySelector('.footer-lang-switch');
  const footerLocaleButtons = Array.from(document.querySelectorAll('.footer-lang[data-locale]'));
  const normalizedPage = normalizedCurrentPage.toLowerCase();
  const currentLanguage = normalizedPage.endsWith('-en.php') ? 'en' : 'fr';

  if (!languageSelect && !footerLanguageSwitch) return;

  const setUnavailableState = () => {
    if (languageSelect) {
      languageSelect.value = currentLanguage;
      languageSelect.disabled = true;
      languageSelect.setAttribute('aria-disabled', 'true');
      languageSelect.title = 'Bientôt disponible';
    }

    footerLocaleButtons.forEach((button) => {
      const locale = button.dataset.locale === 'en' ? 'en' : 'fr';
      const isActive = locale === currentLanguage;

      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
      button.classList.toggle('is-active', isActive);
      if (isActive) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  };

  const parsedRoutes = (() => {
    if (!languageSelect?.dataset.languageRoutes) return null;

    try {
      return JSON.parse(languageSelect.dataset.languageRoutes);
    } catch (error) {
      return null;
    }
  })();

  const pageRoutes = parsedRoutes?.[normalizedCurrentPage] || parsedRoutes?.default || null;
  const hasMultilingualRouting = Boolean(pageRoutes?.fr && pageRoutes?.en);

  if (!hasMultilingualRouting) {
    setUnavailableState();
    return;
  }

  const navigateToLocale = (locale) => {
    const safeLocale = locale === 'en' ? 'en' : 'fr';
    const targetPage = pageRoutes[safeLocale];
    if (!targetPage || window.location.pathname.endsWith(targetPage)) return;

    const nextUrl = `${targetPage}${window.location.search}${window.location.hash}`;
    window.location.assign(nextUrl);
  };

  if (languageSelect) {
    languageSelect.disabled = false;
    languageSelect.removeAttribute('aria-disabled');
    languageSelect.removeAttribute('title');
    languageSelect.value = currentLanguage;

    languageSelect.addEventListener('change', (event) => {
      navigateToLocale(event.target.value);
    });
  }

  footerLocaleButtons.forEach((button) => {
    const locale = button.dataset.locale === 'en' ? 'en' : 'fr';
    const targetPage = pageRoutes[locale];
    const isActive = locale === currentLanguage;
    const isAvailable = Boolean(targetPage);

    button.classList.toggle('is-active', isActive);
    button.disabled = !isAvailable || isActive;
    button.setAttribute('aria-disabled', String(!isAvailable || isActive));

    if (isActive) {
      button.setAttribute('aria-current', 'true');
    } else {
      button.removeAttribute('aria-current');
    }

    if (isAvailable && !isActive) {
      button.addEventListener('click', () => {
        navigateToLocale(locale);
      });
    }
  });
}

initSharedLanguageControls();

function initSharedHeaderInteractions() {
  if (document.body.dataset.headerInteractionsInitialized === 'true') return;

  const header = document.querySelector('.site-header');
  const menuTrigger = document.querySelector('.menu-trigger');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!header || !menuTrigger || !overlay) return;

  document.body.dataset.headerInteractionsInitialized = 'true';

  if (!overlay.hasAttribute('tabindex')) {
    overlay.setAttribute('tabindex', '-1');
  }

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

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  const getFocusableInOverlay = () => Array.from(overlay.querySelectorAll(focusableSelector))
    .filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

  const getFirstMenuLink = () => overlay.querySelector('a[href]');

  const isMenuOpen = () => menuTrigger.getAttribute('aria-expanded') === 'true';

  const setMenuState = (open) => {
    menuTrigger.classList.toggle('is-open', open);
    menuTrigger.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('active', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuState(false);
    menuTrigger.focus(); // [PATCH] Restore focus to trigger when overlay closes.
  };

  const openMenu = () => {
    setMenuState(true);
    const firstMenuLink = getFirstMenuLink();
    (firstMenuLink || getFocusableInOverlay()[0] || overlay).focus(); // [PATCH] Move focus into opened mobile menu.
  };

  menuTrigger.addEventListener('click', () => {
    if (isMenuOpen()) {
      closeMenu();
      return;
    }

    openMenu();
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (!isMenuOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableItems = getFocusableInOverlay();
    if (!focusableItems.length) {
      event.preventDefault();
      overlay.focus();
      return;
    }

    const firstFocusable = focusableItems[0];
    const lastFocusable = focusableItems[focusableItems.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === firstFocusable || !overlay.contains(activeElement))) {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
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
