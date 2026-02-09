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

const serviceDetails = {
  diagnostic: {
    title: 'Diagnostic électronique & mécanique',
    content: `
      <p>Notre diagnostic de précision utilise les équipements les plus avancés du marché pour identifier avec exactitude toute anomalie mécanique ou électronique sur votre véhicule.</p>

      <h4>Nos prestations incluent :</h4>
      <ul>
        <li>Diagnostic électronique multi-marques avec valises professionnelles</li>
        <li>Analyse complète du moteur (compression, fuites, performances)</li>
        <li>Diagnostic de la boîte de vitesses et transmission</li>
        <li>Vérification des systèmes de sécurité (ABS, ESP, airbags)</li>
        <li>Contrôle des systèmes de confort (climatisation, multimédia)</li>
        <li>Rapport détaillé avec photos et recommandations</li>
      </ul>

      <h4>Pourquoi choisir notre diagnostic ?</h4>
      <p>Nos techniciens certifiés utilisent des équipements de dernière génération compatibles avec toutes les marques. Vous recevez un rapport détaillé et transparent, sans jargon technique inutile, pour prendre les meilleures décisions concernant votre véhicule.</p>
    `
  },
  entretien: {
    title: 'Entretien & maintenance',
    content: `
      <p>Un entretien régulier est la clé pour préserver la longévité et les performances de votre véhicule. Nos forfaits d'entretien sont adaptés à chaque type de véhicule et respectent scrupuleusement les préconisations constructeur.</p>

      <h4>Services d'entretien :</h4>
      <ul>
        <li>Révision complète selon plan d'entretien constructeur</li>
        <li>Vidange moteur avec huiles premium et filtres de qualité</li>
        <li>Remplacement de tous les filtres (air, habitacle, carburant)</li>
        <li>Contrôle et remplacement des bougies d'allumage</li>
        <li>Vérification des niveaux et fluides</li>
        <li>Contrôle 50 points de sécurité gratuit</li>
        <li>Remise à zéro du témoin d'entretien</li>
      </ul>

      <h4>Forfaits sur mesure</h4>
      <p>Nous proposons des forfaits d'entretien annuels adaptés à votre utilisation, avec des tarifs préférentiels et la garantie d'un suivi personnalisé de votre véhicule.</p>
    `
  },
  mecanique: {
    title: 'Mécanique générale',
    content: `
      <p>Notre atelier de mécanique générale prend en charge toutes les réparations mécaniques, des plus simples aux plus complexes, avec des techniciens expérimentés et des pièces de qualité.</p>

      <h4>Interventions mécaniques :</h4>
      <ul>
        <li>Réparation et révision moteur (distribution, joints, culasse)</li>
        <li>Boîte de vitesses (manuelle, automatique, robotisée)</li>
        <li>Embrayage (disque, mécanisme, butée hydraulique)</li>
        <li>Système de freinage (plaquettes, disques, étriers, liquide)</li>
        <li>Suspension et amortisseurs</li>
        <li>Direction assistée (électrique, hydraulique)</li>
        <li>Échappement complet</li>
        <li>Turbocompresseur et système d'admission</li>
      </ul>

      <h4>Qualité garantie</h4>
      <p>Toutes nos interventions sont réalisées dans le respect des procédures constructeur, avec des pièces d'origine ou équivalentes de qualité supérieure. Garantie sur main d'œuvre et pièces.</p>
    `
  },
  carrosserie: {
    title: 'Carrosserie & peinture',
    content: `
      <p>Notre atelier de carrosserie dispose d'équipements professionnels et d'une cabine de peinture dernière génération pour une remise en état impeccable de votre véhicule.</p>

      <h4>Services de carrosserie :</h4>
      <ul>
        <li>Débosselage sans peinture pour petits impacts</li>
        <li>Réparation de chocs et déformations</li>
        <li>Remplacement d'éléments de carrosserie</li>
        <li>Peinture en cabine professionnelle avec teinte d'origine</li>
        <li>Polissage et lustrage haute qualité</li>
        <li>Rénovation d'optiques de phares</li>
        <li>Pose de pare-brise et vitres</li>
      </ul>

      <h4>Technologie de pointe</h4>
      <p>Notre cabine de peinture à technologie infrarouge garantit un séchage optimal et une finition parfaite. Nous utilisons des peintures de marques premium et respectons les normes environnementales.</p>
    `
  },
  climatisation: {
    title: 'Climatisation & refroidissement',
    content: `
      <p>Un système de climatisation performant est essentiel pour votre confort. Nous intervenons sur tous types de systèmes de climatisation et de refroidissement moteur.</p>

      <h4>Prestations climatisation :</h4>
      <ul>
        <li>Diagnostic complet du système de climatisation</li>
        <li>Recharge en gaz réfrigérant (R134a, R1234yf)</li>
        <li>Remplacement compresseur de climatisation</li>
        <li>Réparation circuit frigorifique</li>
        <li>Désinfection et assainissement habitacle</li>
        <li>Remplacement filtre d'habitacle</li>
      </ul>

      <h4>Refroidissement moteur :</h4>
      <ul>
        <li>Contrôle et remplacement liquide de refroidissement</li>
        <li>Radiateur moteur et de chauffage</li>
        <li>Thermostat et calorstat</li>
        <li>Pompe à eau et durites</li>
        <li>Ventilateur de refroidissement</li>
      </ul>
    `
  },
  electricite: {
    title: 'Électricité automobile',
    content: `
      <p>Les systèmes électriques modernes nécessitent une expertise pointue. Notre équipe maîtrise toutes les technologies électriques et électroniques embarquées.</p>

      <h4>Interventions électriques :</h4>
      <ul>
        <li>Diagnostic électrique complet avec schémas constructeur</li>
        <li>Batterie : test, charge, remplacement</li>
        <li>Alternateur et régulateur de charge</li>
        <li>Démarreur et circuit de démarrage</li>
        <li>Faisceau électrique et connectique</li>
        <li>Éclairage (phares, feux, LED, Xénon)</li>
        <li>Système multimédia et autoradio</li>
        <li>Capteurs et actionneurs</li>
      </ul>

      <h4>Technologies modernes</h4>
      <p>Nous intervenons sur tous les systèmes électroniques : multiplexage, bus CAN, systèmes start&stop, gestion moteur et toutes technologies embarquées récentes.</p>
    `
  },
  geometrie: {
    title: 'Géométrie & suspension',
    content: `
      <p>Un train roulant en bon état est essentiel pour votre sécurité et le confort de conduite. Notre banc de géométrie 3D dernière génération garantit des réglages au millimètre.</p>

      <h4>Géométrie et parallélisme :</h4>
      <ul>
        <li>Réglage géométrie 3D toutes marques</li>
        <li>Parallélisme avant et arrière</li>
        <li>Carrossage et chasse</li>
        <li>Angle de poussée</li>
        <li>Rapport détaillé avant/après intervention</li>
      </ul>

      <h4>Suspension et liaison au sol :</h4>
      <ul>
        <li>Amortisseurs et ressorts hélicoïdaux</li>
        <li>Triangle de suspension et rotules</li>
        <li>Silentblocs et barre stabilisatrice</li>
        <li>Roulements de roue</li>
        <li>Biellettes de direction</li>
      </ul>

      <h4>Signes d'usure</h4>
      <p>Usure anormale des pneus, véhicule qui tire d'un côté, direction bruyante ? Un contrôle de la géométrie et de la suspension s'impose.</p>
    `
  },
  controle: {
    title: 'Pré-contrôle technique',
    content: `
      <p>Maximisez vos chances de réussite au contrôle technique officiel avec notre pré-contrôle complet. Nous identifions et corrigeons les points qui pourraient poser problème.</p>

      <h4>Notre pré-contrôle inclut :</h4>
      <ul>
        <li>Vérification complète selon grille officielle de contrôle technique</li>
        <li>Éclairage et signalisation</li>
        <li>Direction et suspension</li>
        <li>Freinage (efficacité, équilibrage)</li>
        <li>Pneumatiques et roues</li>
        <li>Châssis et carrosserie</li>
        <li>Équipements de sécurité</li>
        <li>Émissions polluantes et niveau sonore</li>
        <li>Identification du véhicule</li>
      </ul>

      <h4>Service complet</h4>
      <p>En cas de défaut détecté, nous vous proposons immédiatement les réparations nécessaires pour que votre véhicule soit conforme. Sur demande, nous pouvons prendre en charge la prise de rendez-vous au centre de contrôle technique.</p>
    `
  },
  hybride: {
    title: 'Véhicules hybrides & électriques',
    content: `
      <p>Les véhicules hybrides et 100% électriques nécessitent une expertise spécifique et des équipements adaptés. Nos techniciens sont formés aux dernières technologies électriques et hybrides.</p>

      <h4>Nos compétences hybride/électrique :</h4>
      <ul>
        <li>Diagnostic systèmes haute tension (jusqu'à 800V)</li>
        <li>Entretien spécifique véhicules électriques et hybrides</li>
        <li>Batterie haute tension (contrôle, rééquilibrage)</li>
        <li>Moteur électrique et inverter</li>
        <li>Système de charge (chargeur embarqué, câbles)</li>
        <li>Climatisation spécifique (pompe à chaleur)</li>
        <li>Freinage régénératif</li>
        <li>Gestion thermique batterie</li>
      </ul>

      <h4>Sécurité maximale</h4>
      <p>Nos techniciens certifiés B2XL (habilitation haute tension) interviennent en toute sécurité sur les systèmes électriques haute puissance. Atelier équipé selon normes constructeur.</p>
    `
  },
  sinistres: {
    title: 'Gestion sinistres & assurances',
    content: `
      <p>Un accident, un sinistre ? Nous vous accompagnons dans toutes les démarches administratives et prenons en charge la réparation complète de votre véhicule.</p>

      <h4>Notre service sinistre :</h4>
      <ul>
        <li>Expertise contradictoire avec votre assureur</li>
        <li>Devis détaillé conforme aux exigences assureurs</li>
        <li>Gestion administrative complète du dossier</li>
        <li>Réparation carrosserie et mécanique</li>
        <li>Véhicule de remplacement (selon contrat)</li>
        <li>Suivi du dossier jusqu'à clôture</li>
      </ul>

      <h4>Partenaire des assurances</h4>
      <p>Nous travaillons avec toutes les compagnies d'assurance marocaines : Wafa Assurance, Saham Assurance, AXA Assurance, Atlanta, RMA Watanya, Allianz, MCMA et autres. Agréé SNTL pour les contrôles après réparation.</p>

      <h4>Transparence totale</h4>
      <p>Nous vous tenons informé à chaque étape : de l'expertise initiale à la livraison du véhicule réparé. Un seul interlocuteur pour toute la durée du sinistre.</p>
    `
  }
};

function initServicesPage() {
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

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFooterAccordions();
  initServicesPage();
});
