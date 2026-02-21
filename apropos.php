<?php
$metaTitle = "À propos de l’atelier | AutoValley Casablanca";
$metaDescription = "Découvrez notre atelier de réparation automobile à Casablanca : diagnostic, carrosserie, entretien et accompagnement de votre véhicule.";
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
$pageStyles = [
    './style/css/style.css',
    './style/css/header-styles.css',
    './style/css/header-responsive.css',
    './style/css/premium-styles.css',
    './style/css/pages-styles.css'
];
$structuredData = [
    [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => [
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Accueil', 'item' => 'https://autovalley.ma/'],
            ['@type' => 'ListItem', 'position' => 2, 'name' => 'À propos', 'item' => 'https://autovalley.ma/apropos.php'],
        ],
    ],
    [
        '@context' => 'https://schema.org',
        '@type' => 'AutoRepair',
        'name' => 'AutoValley',
        'url' => 'https://autovalley.ma/apropos.php',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'Sapino, Nouaceur',
            'addressLocality' => 'Casablanca',
            'addressCountry' => 'Maroc',
        ],
        'telephone' => '+212 6 00 00 00 00',
        'email' => 'contact@autovalley.ma',
        'openingHoursSpecification' => [
            [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens' => '08:30',
                'closes' => '18:30',
            ],
            [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => 'Saturday',
                'opens' => '09:00',
                'closes' => '13:00',
            ],
        ],
    ],
];
?>
<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <?php include __DIR__ . '/partials/head.php'; ?>
  </head>
<body class="pg-page pg-page-apropos">
    <a href="#main" class="skip-link">Aller au contenu principal</a>

    <?php include __DIR__ . "/partials/header.php"; ?>

    <div class="xenon-ambience" aria-hidden="true">
      <div class="xenon-ambience__beam xenon-ambience__beam--top"></div>
      <div class="xenon-ambience__beam xenon-ambience__beam--left"></div>
      <div class="xenon-ambience__beam xenon-ambience__beam--right"></div>
      <div class="xenon-ambience__wash"></div>
    </div>

    <main id="main">
      <section class="pg-hero" id="apropos-hero">
        <div class="pg-hero__bg" aria-hidden="true">
          <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1920', 'alt' => '', 'width' => 1920, 'height' => 1198, 'class' => 'pg-hero__bg-img', 'loading' => 'eager', 'decoding' => 'async', 'sizes' => '100vw', 'fetchpriority' => 'high']); ?>
          <div class="pg-hero__overlay"></div>
        </div>

        <div class="pg-hero__inner apropos-hero__inner">
          <nav class="pg-hero__breadcrumb" aria-label="Fil d'Ariane">
            <a href="./index.php">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">À Propos</span>
          </nav>

          <p class="pg-hero__kicker pg-reveal">À PROPOS D'AUTOVALLEY</p>
          <h1 class="pg-hero__title pg-reveal">
            Un atelier automobile structuré,<br><span class="pg-hero__title-accent">centré sur la qualité d'exécution</span>
          </h1>
          <p class="pg-hero__subtitle pg-reveal">
            Depuis Casablanca, nous accompagnons particuliers et professionnels avec un service clair,
            des diagnostics précis et un suivi constant du véhicule.
          </p>

          <div class="apropos-hero__actions pg-reveal pg-reveal--delay-1">
            <a class="apropos-hero__btn apropos-hero__btn--primary" href="./contact.php">Prendre rendez-vous</a>
            <a class="apropos-hero__btn apropos-hero__btn--ghost" href="./services.php">Voir nos services</a>
          </div>

          <div aria-label="Chiffres clés" class="apropos-hero-stats pg-reveal pg-reveal--delay-2" role="region">
            <div class="apropos-stats">
              <article class="apropos-stat" aria-label="15 ans et plus d'expertise">
              <div class="apropos-stat__icon-wrap" aria-hidden="true">
                <div class="apropos-stat__icon-ring"></div>
                <svg class="apropos-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="apropos-stat__accent"></div>
              <span class="apropos-stat__value"><span class="apropos-stat__count" data-count-to="15">15</span><span class="apropos-stat__suffix">+</span></span>
              <span class="apropos-stat__label">Années d'expertise</span>
              <div class="apropos-stat__shadow" aria-hidden="true"></div>
            </article>

            <article class="apropos-stat" aria-label="Plus de 10 000 véhicules pris en charge">
              <div class="apropos-stat__icon-wrap" aria-hidden="true">
                <div class="apropos-stat__icon-ring"></div>
                <svg class="apropos-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div class="apropos-stat__accent"></div>
              <span class="apropos-stat__value"><span class="apropos-stat__count" data-count-to="10000">10 000</span><span class="apropos-stat__suffix">+</span></span>
              <span class="apropos-stat__label">Véhicules pris en charge</span>
              <div class="apropos-stat__shadow" aria-hidden="true"></div>
            </article>

            <article class="apropos-stat apropos-stat--rating" aria-label="Note Google vérifiée de 5 sur 5">
              <div class="apropos-stat__icon-wrap" aria-hidden="true">
                <div class="apropos-stat__icon-ring"></div>
                <svg class="apropos-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="apropos-stat__accent"></div>
              <span class="apropos-stat__value"><span class="apropos-stat__count" data-count-to="5" data-decimals="1">5,0</span><span class="apropos-stat__suffix">/5</span></span>
              <span class="apropos-stat__label">Note Google vérifiée</span>
              <div class="apropos-stat__shadow" aria-hidden="true"></div>
            </article>

            <article class="apropos-stat" aria-label="Plus de 20 marques maîtrisées">
              <div class="apropos-stat__icon-wrap" aria-hidden="true">
                <div class="apropos-stat__icon-ring"></div>
                <svg class="apropos-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="apropos-stat__accent"></div>
              <span class="apropos-stat__value"><span class="apropos-stat__count" data-count-to="20">20</span><span class="apropos-stat__suffix">+</span></span>
              <span class="apropos-stat__label">Marques maîtrisées</span>
              <div class="apropos-stat__shadow" aria-hidden="true"></div>
            </article>
            </div>
          </div>

          <ul class="apropos-hero__highlights" aria-label="Repères AutoValley">
            <li>Atelier basé à Casablanca</li>
            <li>Interventions documentées</li>
            <li>Suivi adapté aux flottes et particuliers</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="story-title" class="pg-surface-dark">
        <div class="pg-section">
          <div class="apropos-story">
            <div class="apropos-story__text">
              <p class="pg-section-kicker pg-reveal">NOTRE MÉTHODE</p>
              <h2 id="story-title" class="pg-section-title pg-reveal pg-section-title--left">
                Une organisation stable, du diagnostic à la restitution
              </h2>
              <div class="pg-reveal pg-reveal--delay-1">
                <p>
                  AutoValley a été construit autour d'une idée simple : offrir un service automobile fiable,
                  lisible et régulier, quelle que soit la nature de l'intervention.
                </p>
                <p>
                  Nous structurons chaque prise en charge avec un diagnostic détaillé, un plan d'action
                  validé avec le client et un suivi d'avancement jusqu'à la livraison.
                </p>
                <p>
                  Cette approche permet de garder une exécution constante pour l'entretien courant,
                  la carrosserie et les opérations techniques complexes.
                </p>
              </div>
            </div>

            <div class="apropos-story__media">
              <div class="apropos-story__img-wrap pg-reveal pg-reveal--delay-2">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/4489765/pexels-photo-4489765.jpeg?auto=compress&cs=tinysrgb&w=900', 'alt' => 'Technicien AutoValley en atelier', 'width' => 900, 'height' => 1350, 'class' => 'apropos-story__img', 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw']); ?>
              </div>
              <aside class="apropos-story__panel pg-reveal pg-reveal--delay-3" aria-label="Repères de fonctionnement">
                <h3 class="apropos-story__panel-title">Repères de fonctionnement</h3>
                <ul class="apropos-story__panel-list">
                  <li>Diagnostic initial avec synthèse partagée</li>
                  <li>Validation des actions avant intervention</li>
                  <li>Contrôle final avant restitution</li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" class="pg-surface-dark-soft">
        <div class="pg-section">
          <div class="pg-section-header">
            <span class="pg-section-kicker pg-reveal">CE QUI NOUS GUIDE</span>
            <h2 id="values-title" class="pg-section-title pg-reveal">Nos engagements opérationnels</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              Ces principes structurent la relation client et la qualité d'exécution sur chaque dossier.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="apropos-values-grid">
            <article class="apropos-value-card pg-reveal">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Transparence</h3>
              <p class="apropos-value-card__desc">
                Les étapes et coûts sont expliqués avant intervention, avec une validation claire.
              </p>
            </article>

            <article class="apropos-value-card pg-reveal pg-reveal--delay-1">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Ponctualité</h3>
              <p class="apropos-value-card__desc">
                Les délais annoncés sont planifiés selon la charge atelier et communiqués sans ambiguïté.
              </p>
            </article>

            <article class="apropos-value-card pg-reveal pg-reveal--delay-2">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Fiabilité technique</h3>
              <p class="apropos-value-card__desc">
                Les opérations suivent des standards contrôlés par une équipe formée en continu.
              </p>
            </article>

            <article class="apropos-value-card pg-reveal pg-reveal--delay-1">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Accompagnement</h3>
              <p class="apropos-value-card__desc">
                Le client suit l'avancement de son dossier avec un interlocuteur identifié.
              </p>
            </article>

            <article class="apropos-value-card pg-reveal pg-reveal--delay-2">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Amélioration continue</h3>
              <p class="apropos-value-card__desc">
                L'atelier ajuste ses procédures et équipements pour maintenir un niveau de service stable.
              </p>
            </article>

            <article class="apropos-value-card pg-reveal pg-reveal--delay-3">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Exigence constante</h3>
              <p class="apropos-value-card__desc">
                Chaque intervention suit le même niveau de contrôle, de la maintenance simple aux travaux lourds.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" class="pg-surface-dark">
        <div class="pg-section">
          <div class="pg-section-header">
            <span class="pg-section-kicker pg-reveal">L'ÉQUIPE</span>
            <h2 id="team-title" class="pg-section-title pg-reveal">Les experts derrière AutoValley</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              Une équipe de professionnels expérimentés dédiée à la qualité de traitement des dossiers clients.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="apropos-team-grid">
            <article class="apropos-team-card pg-reveal">
              <div class="apropos-team-card__img-wrap">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3807474/pexels-photo-3807474.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Directeur Technique AutoValley', 'width' => 600, 'height' => 400, 'class' => 'apropos-team-card__img', 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw']); ?>
                <div class="apropos-team-card__overlay" aria-hidden="true"></div>
              </div>
              <div class="apropos-team-card__body">
                <h3 class="apropos-team-card__name">Youssef El Mansouri</h3>
                <p class="apropos-team-card__role">Directeur Technique</p>
              </div>
            </article>

            <article class="apropos-team-card pg-reveal pg-reveal--delay-1">
              <div class="apropos-team-card__img-wrap">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Chef d\'atelier AutoValley', 'width' => 600, 'height' => 400, 'class' => 'apropos-team-card__img', 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw']); ?>
                <div class="apropos-team-card__overlay" aria-hidden="true"></div>
              </div>
              <div class="apropos-team-card__body">
                <h3 class="apropos-team-card__name">Karim Bensouda</h3>
                <p class="apropos-team-card__role">Chef d'Atelier</p>
              </div>
            </article>

            <article class="apropos-team-card pg-reveal pg-reveal--delay-2">
              <div class="apropos-team-card__img-wrap">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Responsable Carrosserie AutoValley', 'width' => 600, 'height' => 400, 'class' => 'apropos-team-card__img', 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw']); ?>
                <div class="apropos-team-card__overlay" aria-hidden="true"></div>
              </div>
              <div class="apropos-team-card__body">
                <h3 class="apropos-team-card__name">Samir Alaoui</h3>
                <p class="apropos-team-card__role">Responsable Carrosserie</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="certs-title" class="pg-surface-dark-soft pg-surface-dark-soft--compact">
        <div class="pg-section">
          <div class="pg-section-header pg-section-header--compact">
            <span class="pg-section-kicker pg-reveal">AGRÉMENTS &amp; PARTENAIRES</span>
            <h2 id="certs-title" class="pg-section-title pg-reveal">Certifications &amp; partenariats</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              AutoValley collabore avec des organismes et assureurs reconnus au Maroc.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="apropos-certs pg-reveal pg-reveal--delay-1">
            <div class="apropos-cert-badge">
              <img width="120" height="40" src="./public/img/refs/sntl.svg" alt="SNTL" />
              <span class="apropos-cert-badge__name">Agréé SNTL</span>
            </div>
            <div class="apropos-cert-badge">
              <img width="120" height="40" src="./public/img/refs/allianz.svg" alt="Allianz" />
              <span class="apropos-cert-badge__name">Partenaire Allianz</span>
            </div>
            <div class="apropos-cert-badge">
              <img width="120" height="40" src="./public/img/refs/axa.svg" alt="AXA" />
              <span class="apropos-cert-badge__name">Partenaire AXA</span>
            </div>
            <div class="apropos-cert-badge">
              <img width="120" height="40" src="./public/img/refs/wafa.svg" alt="Wafa Assurance" />
              <span class="apropos-cert-badge__name">Partenaire Wafa</span>
            </div>
            <div class="apropos-cert-badge">
              <img width="120" height="40" src="./public/img/refs/rma.svg" alt="RMA" />
              <span class="apropos-cert-badge__name">Partenaire RMA</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <?php include __DIR__ . "/partials/footer-cta.php"; ?>
    <?php include __DIR__ . "/partials/footer.php"; ?>
    <?php include __DIR__ . "/partials/mobile-float-cta.php"; ?>

    <button class="pg-back-top" aria-label="Retour en haut de page">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>

    <script type="module" src="./style/js/nav-active.js"></script>
    <script type="module" src="./style/js/premium-effects.js"></script>
    <script type="module" src="./style/js/pages-common.js"></script>
  </body>
</html>
