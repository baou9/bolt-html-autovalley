<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./style/images/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FAQ – Questions Fréquentes | AutoValley Casablanca</title>
    <meta name="description" content="Toutes les réponses à vos questions sur les services AutoValley : tarifs, réservations, garanties, délais et fonctionnement de l'atelier." />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./style/css/style.css">
    <link rel="stylesheet" href="./style/css/header-responsive.css">
    <link rel="stylesheet" href="./style/css/header-styles.css">
    <link rel="stylesheet" href="./style/css/premium-styles.css">
    <link rel="stylesheet" href="./style/css/pages-styles.css">
  </head>
  <body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>

    <?php include __DIR__ . "/partials/header.php"; ?>

    <div class="xenon-ambience" aria-hidden="true">
      <div class="xenon-ambience__beam xenon-ambience__beam--top"></div>
      <div class="xenon-ambience__beam xenon-ambience__beam--left"></div>
      <div class="xenon-ambience__beam xenon-ambience__beam--right"></div>
      <div class="xenon-ambience__wash"></div>
    </div>

    <main id="main">

      <!-- HERO -->
      <section class="pg-hero pg-hero--compact" id="faq-hero">
        <div class="pg-hero__bg" aria-hidden="true">
          <img
            src="https://images.pexels.com/photos/4489761/pexels-photo-4489761.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            class="pg-hero__bg-img"
            loading="eager"
          />
          <div class="pg-hero__overlay"></div>
        </div>

        <div class="pg-hero__inner">
          <nav class="pg-hero__breadcrumb" aria-label="Fil d'Ariane">
            <a href="./index.php">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">FAQ</span>
          </nav>

          <p class="pg-hero__kicker pg-reveal">CENTRE D'AIDE</p>
          <h1 class="pg-hero__title pg-reveal">
            Questions <span class="pg-hero__title-accent">fréquentes</span>
          </h1>
          <p class="pg-hero__subtitle pg-reveal">
            Tout ce que vous devez savoir sur nos services, nos tarifs,
            les délais et notre fonctionnement. Une question non listée ? Contactez-nous.
          </p>
        </div>
      </section>

      <!-- FAQ SECTION -->
      <section aria-labelledby="faq-section-title" style="background: #050609; padding: 96px 0;">
        <div class="pg-section pg-section--narrow">

          <h2 id="faq-section-title" class="sr-only">Questions fréquemment posées</h2>

          <!-- Search -->
          <div class="faq-search-wrap pg-reveal">
            <span class="faq-search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="search"
              class="faq-search-input"
              placeholder="Rechercher une question…"
              aria-label="Rechercher dans la FAQ"
            />
          </div>

          <!-- Categories -->
          <div class="faq-cats pg-reveal pg-reveal--delay-1" role="group" aria-label="Filtrer par catégorie">
            <button class="faq-cat-btn is-active" data-cat="all" type="button">Toutes</button>
            <button class="faq-cat-btn" data-cat="services" type="button">Services</button>
            <button class="faq-cat-btn" data-cat="rdv" type="button">Rendez-vous</button>
            <button class="faq-cat-btn" data-cat="tarifs" type="button">Tarifs</button>
            <button class="faq-cat-btn" data-cat="garantie" type="button">Garantie</button>
            <button class="faq-cat-btn" data-cat="general" type="button">Général</button>
          </div>

          <!-- FAQ Items -->
          <div class="faq-list pg-reveal pg-reveal--delay-2" role="list">

            <!-- Services -->
            <div class="faq-item" data-cat="services" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Quelles marques de véhicules prenez-vous en charge ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Nous intervenons sur toutes les marques : Renault, Peugeot, Citroën, Volkswagen, BMW, Mercedes, Audi, Toyota, Hyundai, Kia, Dacia, Ford, Fiat, Opel, Seat, Skoda, Nissan, Changan, BYD, MG, Cupra et bien d'autres. Nos équipements multimarques et nos techniciens certifiés nous permettent de couvrir l'ensemble du parc automobile, thermique, hybride et électrique.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="services" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Réalisez-vous des diagnostics pour les véhicules électriques et hybrides ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Oui, nous disposons d'équipements spécifiques pour les véhicules hybrides et électriques. Nos techniciens sont formés aux hautes tensions et aux architectures électriques modernes. Nous réalisons des diagnostics de batterie, des contrôles des systèmes de recharge et des interventions sur les composants haute tension.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="services" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Utilisez-vous des pièces d'origine ou des pièces génériques ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Nous privilégions systématiquement les pièces d'origine (OEM) pour garantir la conformité avec les spécifications constructeur. Sur demande et avec accord préalable, nous pouvons utiliser des pièces de première monte équivalentes. Nous vous présentons toujours les options disponibles avec leurs avantages et différences de prix avant toute intervention.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="services" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Proposez-vous un service de carrosserie et peinture complète ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Oui, notre département carrosserie offre un service complet : débosselage, remplacement de pièces, peinture exacte code couleur, polissage et lustrage. Nous travaillons avec des systèmes de teinte informatisés pour un rendu parfaitement identique à la peinture d'origine. Notre cabine de peinture est aux normes environnementales les plus strictes.
                </div>
              </div>
            </div>

            <!-- RDV -->
            <div class="faq-item" data-cat="rdv" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Comment prendre rendez-vous à AutoValley ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Vous pouvez prendre rendez-vous de plusieurs façons : via le formulaire en ligne sur notre site, par téléphone au +212 6 00 00 00 00, par WhatsApp ou par email à contact@autovalley.ma. Nous vous confirmons le rendez-vous dans un délai de 2 heures ouvrées. Pour les urgences mécaniques, nous faisons notre possible pour vous accueillir le jour même.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="rdv" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Puis-je déposer mon véhicule en dehors des horaires d'ouverture ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Nous proposons un service de dépôt en dehors des horaires d'ouverture sur arrangement préalable. Contactez-nous pour organiser les modalités de remise des clés. Votre véhicule sera sécurisé dans notre parking fermé et pris en charge dès l'ouverture de l'atelier.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="rdv" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Combien de temps dure une intervention moyenne ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  La durée varie selon le type d'intervention : un diagnostic électronique prend 1 à 2 heures, une révision complète entre 2 et 4 heures, et une réparation carrosserie peut nécessiter plusieurs jours. Lors de la prise de rendez-vous, nous vous communiquons une estimation précise du délai. Vous serez contacté si des travaux supplémentaires sont identifiés.
                </div>
              </div>
            </div>

            <!-- Tarifs -->
            <div class="faq-item" data-cat="tarifs" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Comment sont calculés vos tarifs ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Nos tarifs sont établis sur la base du temps de travail, du coût des pièces et de la complexité de l'intervention. Nous vous remettons systématiquement un devis détaillé avant tout début de travaux. Aucune surprise sur la facture : ce que vous acceptez est ce que vous payez. Nous appliquons des tarifs compétitifs, inférieurs aux concessionnaires pour une qualité identique ou supérieure.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="tarifs" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Travaillez-vous avec les compagnies d'assurance ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Oui, nous sommes partenaires agréés de plusieurs grandes compagnies d'assurance : Allianz, AXA, Wafa Assurance, RMA et d'autres. Nous gérons directement les dossiers sinistres et vous accompagnons dans les démarches administratives. Vous pouvez nous confier votre véhicule après un sinistre avec la certitude que tout sera pris en charge de manière professionnelle.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="tarifs" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Proposez-vous des forfaits d'entretien annuels ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Oui, nous proposons des contrats d'entretien annuels adaptés à votre utilisation et à votre type de véhicule. Ces forfaits incluent généralement la révision annuelle, le contrôle 50 points, les vidanges programmées et une remise sur les pièces. Contactez-nous pour obtenir un devis personnalisé selon votre kilométrage annuel estimé.
                </div>
              </div>
            </div>

            <!-- Garantie -->
            <div class="faq-item" data-cat="garantie" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Quelle garantie offrez-vous sur vos prestations ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Toutes nos interventions mécaniques sont garanties. Les pièces d'origine bénéficient de la garantie constructeur (généralement 12 à 24 mois ou selon le kilométrage). La main d'œuvre est garantie 6 mois. En cas de problème lié à notre intervention, nous reprenons le travail sans frais supplémentaires. Votre satisfaction est notre priorité absolue.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="garantie" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Passer chez AutoValley annule-t-il la garantie constructeur de mon véhicule neuf ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Non. Selon la réglementation en vigueur, faire entretenir votre véhicule dans un atelier indépendant qualifié n'annule pas la garantie constructeur, à condition que les travaux soient effectués conformément aux préconisations constructeur, avec les pièces et fluides requis. C'est exactement ce que nous faisons. Nous vous remettons un carnet d'entretien tamponné et une facture détaillée.
                </div>
              </div>
            </div>

            <!-- Général -->
            <div class="faq-item" data-cat="general" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Puis-je rester sur place pendant l'intervention ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Oui, nous disposons d'un espace d'attente confortable avec Wi-Fi. Pour les interventions courtes (moins de 2 heures), vous pouvez patienter sur place. Pour les réparations plus longues, nous pouvons vous appeler dès que votre véhicule est prêt ou vous envoyer des mises à jour par SMS/WhatsApp.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="general" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Êtes-vous agréé pour les véhicules de flottes d'entreprise ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  Oui, nous sommes agréés SNTL et nous proposons des contrats spécifiques pour les entreprises, loueurs de véhicules et gestionnaires de flotte. Nous offrons une facturation centralisée, des rapports d'intervention détaillés et des conditions tarifaires préférentielles pour les flottes. Contactez-nous pour discuter d'un accord de partenariat adapté à votre activité.
                </div>
              </div>
            </div>

            <div class="faq-item" data-cat="general" role="listitem">
              <button class="faq-item__trigger" type="button" aria-expanded="false">
                <span class="faq-item__question">Comment suivre l'avancement des travaux sur mon véhicule ?</span>
                <span class="faq-item__icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div class="faq-item__panel">
                <div class="faq-item__answer">
                  À chaque étape clé, vous êtes informé par SMS ou WhatsApp : réception du véhicule, début des travaux, découverte de travaux supplémentaires éventuels, fin des travaux et disponibilité pour la restitution. Vous pouvez également nous appeler à tout moment pour obtenir un point d'avancement.
                </div>
              </div>
            </div>

          </div>

          <div class="faq-no-results" role="status" aria-live="polite">
            Aucun résultat ne correspond à votre recherche. <a href="./contact.php" style="color: var(--brand-red);">Contactez-nous directement →</a>
          </div>

          <!-- CTA Contact -->
          <div class="pg-card pg-reveal" style="text-align:center; margin-top: 64px; padding: 48px 32px;">
            <p style="font-family: 'Montserrat', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-red); margin-bottom: 12px;">BESOIN D'UNE RÉPONSE PERSONNALISÉE ?</p>
            <h3 style="font-family: 'Montserrat', sans-serif; font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 12px;">Nous sommes là pour vous aider</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 0.93rem; color: rgba(255,255,255,0.55); margin-bottom: 28px; max-width: 460px; margin-left: auto; margin-right: auto;">
              Notre équipe répond à toutes vos questions en moins de 2 heures ouvrées.
            </p>
            <a href="./contact.php" style="display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; background: var(--brand-red); border: none; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #fff; text-decoration: none; transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;">
              Nous contacter
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

        </div>
      </section>

    </main>

    <?php include __DIR__ . "/partials/footer.php"; ?>
    <?php include __DIR__ . "/partials/mobile-float-cta.php"; ?>

    <button class="pg-back-top" aria-label="Retour en haut de page">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>

    <script type="module" src="./style/js/premium-effects.js"></script>
    <script type="module" src="./style/js/pages-common.js"></script>
  </body>
</html>
