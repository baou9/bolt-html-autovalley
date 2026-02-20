import { initMagneticButtons } from './premium-effects.js';

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
  if (!buttons.length || !cards.length) return;

  const liveRegionId = 'sv-filter-status';
  let liveRegion = document.getElementById(liveRegionId);

  if (!liveRegion) {
    liveRegion = document.createElement('p');
    liveRegion.id = liveRegionId;
    liveRegion.className = 'visually-hidden';
    liveRegion.setAttribute('aria-live', 'polite');
    const filters = document.querySelector('.sv-filters');
    if (filters && filters.parentNode) {
      filters.parentNode.insertBefore(liveRegion, filters.nextSibling);
    } else {
      document.body.appendChild(liveRegion);
    }
  }

  const applyFilter = (filter) => {
    let visibleCount = 0;

    buttons.forEach(button => {
      const isActive = button.getAttribute('data-filter') === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      card.classList.toggle('is-hidden', !show);
      card.setAttribute('aria-hidden', String(!show));
      if (show) visibleCount += 1;
    });

    liveRegion.textContent = `${visibleCount} service${visibleCount > 1 ? 's' : ''} affich${visibleCount > 1 ? 'es' : 'e'}.`;
  };

  const initialActiveButton = document.querySelector('.sv-filters__btn.is-active') || buttons[0];
  const initialFilter = initialActiveButton?.getAttribute('data-filter') || 'all';
  applyFilter(initialFilter);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';
      applyFilter(filter);
    });
  });
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

  if (modal.dataset.modalInitialized === 'true') return;
  modal.dataset.modalInitialized = 'true';

  const modalTitle = modal.querySelector('.service-modal__title');
  const modalBody = modal.querySelector('.service-modal__body');
  const modalClose = modal.querySelector('.service-modal__close');
  const modalOverlay = modal.querySelector('.service-modal__overlay');
  let activeTrigger = null;

  const getFocusableElements = () => Array.from(
    modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null);

  const focusInitialControl = () => {
    const [firstFocusable] = getFocusableElements();
    const target = modalClose || firstFocusable;

    if (target) target.focus();
  };

  const trapFocus = (event) => {
    const focusableElements = getFocusableElements();
    if (!focusableElements.length) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = trigger.getAttribute('data-modal-trigger');
      const service = serviceDetails[serviceId];

      if (service) {
        activeTrigger = trigger;
        modalTitle.textContent = service.title;
        modalBody.innerHTML = service.content;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        focusInitialControl();
      }
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (activeTrigger && typeof activeTrigger.focus === 'function') {
      activeTrigger.focus();
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    const isOpen = modal.getAttribute('aria-hidden') === 'false';
    if (!isOpen) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      trapFocus(e);
    }
  });
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

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCategoryFilters();
  initFaqAccordion();
  initServiceModal();
  initStatCounters();
  initXenonAmbience();
  initMagneticButtons();
});
