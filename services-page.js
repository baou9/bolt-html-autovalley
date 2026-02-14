const serviceDetails = {
  diagnostic: {
    title: 'Diagnostic electronique & mecanique',
    content: `
      <p>Notre diagnostic de precision utilise les equipements les plus avances du marche pour identifier avec exactitude toute anomalie mecanique ou electronique sur votre vehicule.</p>

      <h4>Nos prestations incluent :</h4>
      <ul>
        <li>Diagnostic electronique multi-marques avec valises professionnelles</li>
        <li>Analyse complete du moteur (compression, fuites, performances)</li>
        <li>Diagnostic de la boite de vitesses et transmission</li>
        <li>Verification des systemes de securite (ABS, ESP, airbags)</li>
        <li>Controle des systemes de confort (climatisation, multimedia)</li>
        <li>Rapport detaille avec photos et recommandations</li>
      </ul>

      <h4>Pourquoi choisir notre diagnostic ?</h4>
      <p>Nos techniciens certifies utilisent des equipements de derniere generation compatibles avec toutes les marques. Vous recevez un rapport detaille et transparent, sans jargon technique inutile, pour prendre les meilleures decisions concernant votre vehicule.</p>
    `
  },
  entretien: {
    title: 'Entretien & maintenance',
    content: `
      <p>Un entretien regulier est la cle pour preserver la longevite et les performances de votre vehicule. Nos forfaits d'entretien sont adaptes a chaque type de vehicule et respectent scrupuleusement les preconisations constructeur.</p>

      <h4>Services d'entretien :</h4>
      <ul>
        <li>Revision complete selon plan d'entretien constructeur</li>
        <li>Vidange moteur avec huiles premium et filtres de qualite</li>
        <li>Remplacement de tous les filtres (air, habitacle, carburant)</li>
        <li>Controle et remplacement des bougies d'allumage</li>
        <li>Verification des niveaux et fluides</li>
        <li>Controle 50 points de securite gratuit</li>
        <li>Remise a zero du temoin d'entretien</li>
      </ul>

      <h4>Forfaits sur mesure</h4>
      <p>Nous proposons des forfaits d'entretien annuels adaptes a votre utilisation, avec des tarifs preferentiels et la garantie d'un suivi personnalise de votre vehicule.</p>
    `
  },
  mecanique: {
    title: 'Mecanique generale',
    content: `
      <p>Notre atelier de mecanique generale prend en charge toutes les reparations mecaniques, des plus simples aux plus complexes, avec des techniciens experimentes et des pieces de qualite.</p>

      <h4>Interventions mecaniques :</h4>
      <ul>
        <li>Reparation et revision moteur (distribution, joints, culasse)</li>
        <li>Boite de vitesses (manuelle, automatique, robotisee)</li>
        <li>Embrayage (disque, mecanisme, butee hydraulique)</li>
        <li>Systeme de freinage (plaquettes, disques, etriers, liquide)</li>
        <li>Suspension et amortisseurs</li>
        <li>Direction assistee (electrique, hydraulique)</li>
        <li>Echappement complet</li>
        <li>Turbocompresseur et systeme d'admission</li>
      </ul>

      <h4>Qualite garantie</h4>
      <p>Toutes nos interventions sont realisees dans le respect des procedures constructeur, avec des pieces d'origine ou equivalentes de qualite superieure. Garantie sur main d'oeuvre et pieces.</p>
    `
  },
  carrosserie: {
    title: 'Carrosserie & peinture',
    content: `
      <p>Notre atelier de carrosserie dispose d'equipements professionnels et d'une cabine de peinture derniere generation pour une remise en etat impeccable de votre vehicule.</p>

      <h4>Services de carrosserie :</h4>
      <ul>
        <li>Debosselage sans peinture pour petits impacts</li>
        <li>Reparation de chocs et deformations</li>
        <li>Remplacement d'elements de carrosserie</li>
        <li>Peinture en cabine professionnelle avec teinte d'origine</li>
        <li>Polissage et lustrage haute qualite</li>
        <li>Renovation d'optiques de phares</li>
        <li>Pose de pare-brise et vitres</li>
      </ul>

      <h4>Technologie de pointe</h4>
      <p>Notre cabine de peinture a technologie infrarouge garantit un sechage optimal et une finition parfaite. Nous utilisons des peintures de marques premium et respectons les normes environnementales.</p>
    `
  },
  climatisation: {
    title: 'Climatisation & refroidissement',
    content: `
      <p>Un systeme de climatisation performant est essentiel pour votre confort. Nous intervenons sur tous types de systemes de climatisation et de refroidissement moteur.</p>

      <h4>Prestations climatisation :</h4>
      <ul>
        <li>Diagnostic complet du systeme de climatisation</li>
        <li>Recharge en gaz refrigerant (R134a, R1234yf)</li>
        <li>Remplacement compresseur de climatisation</li>
        <li>Reparation circuit frigorifique</li>
        <li>Desinfection et assainissement habitacle</li>
        <li>Remplacement filtre d'habitacle</li>
      </ul>

      <h4>Refroidissement moteur :</h4>
      <ul>
        <li>Controle et remplacement liquide de refroidissement</li>
        <li>Radiateur moteur et de chauffage</li>
        <li>Thermostat et calorstat</li>
        <li>Pompe a eau et durites</li>
        <li>Ventilateur de refroidissement</li>
      </ul>
    `
  },
  electricite: {
    title: 'Electricite automobile',
    content: `
      <p>Les systemes electriques modernes necessitent une expertise pointue. Notre equipe maitrise toutes les technologies electriques et electroniques embarquees.</p>

      <h4>Interventions electriques :</h4>
      <ul>
        <li>Diagnostic electrique complet avec schemas constructeur</li>
        <li>Batterie : test, charge, remplacement</li>
        <li>Alternateur et regulateur de charge</li>
        <li>Demarreur et circuit de demarrage</li>
        <li>Faisceau electrique et connectique</li>
        <li>Eclairage (phares, feux, LED, Xenon)</li>
        <li>Systeme multimedia et autoradio</li>
        <li>Capteurs et actionneurs</li>
      </ul>

      <h4>Technologies modernes</h4>
      <p>Nous intervenons sur tous les systemes electroniques : multiplexage, bus CAN, systemes start&stop, gestion moteur et toutes technologies embarquees recentes.</p>
    `
  },
  geometrie: {
    title: 'Geometrie & suspension',
    content: `
      <p>Un train roulant en bon etat est essentiel pour votre securite et le confort de conduite. Notre banc de geometrie 3D derniere generation garantit des reglages au millimetre.</p>

      <h4>Geometrie et parallelisme :</h4>
      <ul>
        <li>Reglage geometrie 3D toutes marques</li>
        <li>Parallelisme avant et arriere</li>
        <li>Carrossage et chasse</li>
        <li>Angle de poussee</li>
        <li>Rapport detaille avant/apres intervention</li>
      </ul>

      <h4>Suspension et liaison au sol :</h4>
      <ul>
        <li>Amortisseurs et ressorts helicoidaux</li>
        <li>Triangle de suspension et rotules</li>
        <li>Silentblocs et barre stabilisatrice</li>
        <li>Roulements de roue</li>
        <li>Biellettes de direction</li>
      </ul>

      <h4>Signes d'usure</h4>
      <p>Usure anormale des pneus, vehicule qui tire d'un cote, direction bruyante ? Un controle de la geometrie et de la suspension s'impose.</p>
    `
  },
  controle: {
    title: 'Pre-controle technique',
    content: `
      <p>Maximisez vos chances de reussite au controle technique officiel avec notre pre-controle complet. Nous identifions et corrigeons les points qui pourraient poser probleme.</p>

      <h4>Notre pre-controle inclut :</h4>
      <ul>
        <li>Verification complete selon grille officielle de controle technique</li>
        <li>Eclairage et signalisation</li>
        <li>Direction et suspension</li>
        <li>Freinage (efficacite, equilibrage)</li>
        <li>Pneumatiques et roues</li>
        <li>Chassis et carrosserie</li>
        <li>Equipements de securite</li>
        <li>Emissions polluantes et niveau sonore</li>
        <li>Identification du vehicule</li>
      </ul>

      <h4>Service complet</h4>
      <p>En cas de defaut detecte, nous vous proposons immediatement les reparations necessaires pour que votre vehicule soit conforme. Sur demande, nous pouvons prendre en charge la prise de rendez-vous au centre de controle technique.</p>
    `
  },
  hybride: {
    title: 'Vehicules hybrides & electriques',
    content: `
      <p>Les vehicules hybrides et 100% electriques necessitent une expertise specifique et des equipements adaptes. Nos techniciens sont formes aux dernieres technologies electriques et hybrides.</p>

      <h4>Nos competences hybride/electrique :</h4>
      <ul>
        <li>Diagnostic systemes haute tension (jusqu'a 800V)</li>
        <li>Entretien specifique vehicules electriques et hybrides</li>
        <li>Batterie haute tension (controle, reequilibrage)</li>
        <li>Moteur electrique et inverter</li>
        <li>Systeme de charge (chargeur embarque, cables)</li>
        <li>Climatisation specifique (pompe a chaleur)</li>
        <li>Freinage regeneratif</li>
        <li>Gestion thermique batterie</li>
      </ul>

      <h4>Securite maximale</h4>
      <p>Nos techniciens certifies B2XL (habilitation haute tension) interviennent en toute securite sur les systemes electriques haute puissance. Atelier equipe selon normes constructeur.</p>
    `
  },
  sinistres: {
    title: 'Gestion sinistres & assurances',
    content: `
      <p>Un accident, un sinistre ? Nous vous accompagnons dans toutes les demarches administratives et prenons en charge la reparation complete de votre vehicule.</p>

      <h4>Notre service sinistre :</h4>
      <ul>
        <li>Expertise contradictoire avec votre assureur</li>
        <li>Devis detaille conforme aux exigences assureurs</li>
        <li>Gestion administrative complete du dossier</li>
        <li>Reparation carrosserie et mecanique</li>
        <li>Vehicule de remplacement (selon contrat)</li>
        <li>Suivi du dossier jusqu'a cloture</li>
      </ul>

      <h4>Partenaire des assurances</h4>
      <p>Nous travaillons avec toutes les compagnies d'assurance marocaines : Wafa Assurance, Saham Assurance, AXA Assurance, Atlanta, RMA Watanya, Allianz, MCMA et autres. Agree SNTL pour les controles apres reparation.</p>

      <h4>Transparence totale</h4>
      <p>Nous vous tenons informe a chaque etape : de l'expertise initiale a la livraison du vehicule repare. Un seul interlocuteur pour toute la duree du sinistre.</p>
    `
  }
};

function initMobileMenu() {
  const trigger = document.querySelector('.menu-trigger');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!trigger || !overlay) return;

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isOpen));
    trigger.classList.toggle('is-active', !isOpen);
    overlay.classList.toggle('is-open', !isOpen);
    overlay.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-active');
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initScrollReveal() {
  const items = document.querySelectorAll('.sv-reveal');
  if (!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
}

function initCategoryFilters() {
  const buttons = document.querySelectorAll('.sv-filters__btn');
  const cards = document.querySelectorAll('.sv-card[data-category]');
  const liveRegion = document.getElementById('sv-filter-status');
  if (!buttons.length || !cards.length) return;

  // [PATCH] Keep visual state and ARIA state synchronized for category filtering
  const applyFilter = (activeBtn) => {
    const filter = activeBtn.getAttribute('data-filter');
    let visibleCount = 0;

    buttons.forEach((button) => {
      const isActive = button === activeBtn;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      card.classList.toggle('is-hidden', !show);
      card.setAttribute('aria-hidden', String(!show));
      if (show) visibleCount += 1;
    });

    if (liveRegion) {
      liveRegion.textContent = `${visibleCount} service${visibleCount > 1 ? 's' : ''} affiche${visibleCount > 1 ? 's' : ''}`;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button));
  });

  const initialActive = Array.from(buttons).find((button) => button.classList.contains('is-active')) || buttons[0];
  applyFilter(initialActive);
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.sv-faq__item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.sv-faq__trigger');
    const answer = item.querySelector('.sv-faq__answer');
    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          other.querySelector('.sv-faq__trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.sv-faq__answer').style.maxHeight = '0';
        }
      });

      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? '0' : `${answer.scrollHeight}px`;
    });
  });
}

function initServiceModal() {
  const modal = document.getElementById('service-modal');
  if (!modal) return;

  const modalTitle = modal.querySelector('.service-modal__title');
  const modalBody = modal.querySelector('.service-modal__body');
  const modalClose = modal.querySelector('.service-modal__close');
  const modalOverlay = modal.querySelector('.service-modal__overlay');

  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = trigger.getAttribute('data-modal-trigger');
      const service = serviceDetails[serviceId];

      if (service) {
        modalTitle.textContent = service.title;
        modalBody.innerHTML = service.content;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
}

function initFooterAccordions() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

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

    if (expanded) {
      panel.style.maxHeight = reduceMotionQuery.matches ? 'none' : `${panel.scrollHeight}px`;
    } else {
      panel.style.maxHeight = '0px';
    }
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

function initStatCounters() {
  const stats = document.querySelectorAll('.sv-hero__stat[data-count]');
  if (!stats.length) return;

  const formatNumber = (num, format) => {
    if (format === 'space') {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return num.toString();
  };

  const animateCounter = (el) => {
    const valueEl = el.querySelector('.sv-hero__stat-value');
    if (!valueEl || el.classList.contains('is-counted')) return;

    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const format = el.dataset.format || '';
    const duration = 1800;
    const startTime = performance.now();

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(easedProgress * target);

      valueEl.textContent = formatNumber(current, format) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        valueEl.textContent = formatNumber(target, format) + suffix;
        el.classList.add('is-counted');
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -50px 0px' }
  );

  stats.forEach((stat) => observer.observe(stat));
}

function initXenonAmbience() {
  const el = document.querySelector('.xenon-ambience');
  if (!el) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
    const intensity = 0.08 + progress * 0.22;
    el.style.setProperty('--xenon-intensity', intensity.toFixed(3));
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

function initCurrentYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initCategoryFilters();
  initFaqAccordion();
  initServiceModal();
  initFooterAccordions();
  initCurrentYear();
  initStatCounters();
  initXenonAmbience();
});
