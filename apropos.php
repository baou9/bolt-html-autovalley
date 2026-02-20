<?php
$metaTitle = "À Propos – AutoValley | L'atelier de Casablanca";
$metaDescription = "Découvrez l'histoire, les valeurs et l'équipe d'AutoValley à Casablanca.";
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
$pageStyles = [
    './style/css/style.css',
    './style/css/header-responsive.css',
    './style/css/header-styles.css',
    './style/css/premium-styles.css',
    './style/css/pages-styles.css'
];
?>
<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <?php include __DIR__ . '/partials/head.php'; ?>
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
      <section class="pg-hero" id="apropos-hero">
        <div class="pg-hero__bg" aria-hidden="true">
          <img
            src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1920"
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
            <span aria-current="page">À Propos</span>
          </nav>

          <p class="pg-hero__kicker pg-reveal">NOTRE HISTOIRE</p>
          <h1 class="pg-hero__title pg-reveal">
            L'excellence automobile,<br><span class="pg-hero__title-accent">au cœur de Casablanca</span>
          </h1>
          <p class="pg-hero__subtitle pg-reveal">
            AutoValley est né d'une passion profonde pour l'automobile et d'un engagement
            indéfectible envers la qualité. Découvrez ce qui nous anime chaque jour.
          </p>
        </div>
      </section>

      <!-- STATS BAND -->
      <section aria-label="Chiffres clés" style="background: rgba(185,5,4,0.06); border-top: 1px solid rgba(185,5,4,0.15); border-bottom: 1px solid rgba(185,5,4,0.15); padding: 48px 24px;">
        <div class="apropos-stats" style="max-width: 1100px; margin: 0 auto;">
          <div class="apropos-stat pg-reveal">
            <span class="apropos-stat__value">15+</span>
            <span class="apropos-stat__label">Années d'expertise</span>
          </div>
          <div class="apropos-stat pg-reveal pg-reveal--delay-1">
            <span class="apropos-stat__value">10 000+</span>
            <span class="apropos-stat__label">Véhicules pris en charge</span>
          </div>
          <div class="apropos-stat pg-reveal pg-reveal--delay-2">
            <span class="apropos-stat__value">5,0/5</span>
            <span class="apropos-stat__label">Note Google vérifiée</span>
          </div>
          <div class="apropos-stat pg-reveal pg-reveal--delay-3">
            <span class="apropos-stat__value">20+</span>
            <span class="apropos-stat__label">Marques maîtrisées</span>
          </div>
        </div>
      </section>

      <!-- STORY SECTION -->
      <section aria-labelledby="story-title" style="background: #050609; padding: 96px 0;">
        <div class="pg-section">
          <div class="apropos-story">
            <div class="apropos-story__text">
              <p class="pg-section-kicker pg-reveal">NOTRE ADN</p>
              <h2 id="story-title" class="pg-section-title pg-reveal" style="text-align:left; margin-bottom: 28px;">
                Fondés sur la passion,<br>bâtis sur la confiance
              </h2>
              <div class="pg-reveal pg-reveal--delay-1">
                <p>
                  AutoValley est l'atelier automobile premium de référence à Casablanca, fondé par
                  des passionnés de l'automobile qui ont voulu créer une alternative sérieuse aux
                  concessionnaires traditionnels – sans compromis sur la qualité ni sur la transparence.
                </p>
                <p>
                  Depuis plus de 15 ans, nous accompagnons particuliers, entreprises et flottes avec
                  une approche rigoureuse : diagnostic précis, délais respectés, communication claire.
                  Chaque véhicule qui entre dans notre atelier est traité avec le même soin, qu'il
                  s'agisse d'une citadine ou d'un SUV de luxe.
                </p>
                <p>
                  Agréés SNTL et partenaires des plus grandes compagnies d'assurance du Maroc, nous
                  disposons des équipements les plus avancés et d'une équipe de techniciens certifiés,
                  constamment formés aux dernières technologies automobiles.
                </p>
              </div>
            </div>
            <div class="apropos-story__img-wrap pg-reveal pg-reveal--delay-2">
              <img
                src="https://images.pexels.com/photos/4489765/pexels-photo-4489765.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Technicien AutoValley en atelier"
                class="apropos-story__img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- VALUES SECTION -->
      <section aria-labelledby="values-title" style="background: #0a0a0f; padding: 96px 0;">
        <div class="pg-section">
          <div class="pg-section-header">
            <span class="pg-section-kicker pg-reveal">CE QUI NOUS GUIDE</span>
            <h2 id="values-title" class="pg-section-title pg-reveal">Nos valeurs fondamentales</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              Chaque décision que nous prenons est guidée par ces principes qui définissent
              l'identité AutoValley.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="apropos-values-grid">
            <div class="apropos-value-card pg-reveal">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Transparence totale</h3>
              <p class="apropos-value-card__desc">
                Devis détaillés, explications claires, aucune surprise sur la facture.
                Vous savez exactement ce que nous faisons et pourquoi.
              </p>
            </div>

            <div class="apropos-value-card pg-reveal pg-reveal--delay-1">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Délais respectés</h3>
              <p class="apropos-value-card__desc">
                Votre temps est précieux. Nous nous engageons sur des délais réalistes
                et nous les tenons, systématiquement.
              </p>
            </div>

            <div class="apropos-value-card pg-reveal pg-reveal--delay-2">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Qualité certifiée</h3>
              <p class="apropos-value-card__desc">
                Pièces d'origine, techniciens certifiés, équipements de dernière génération.
                Aucun compromis sur la qualité de nos interventions.
              </p>
            </div>

            <div class="apropos-value-card pg-reveal pg-reveal--delay-1">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Relation client</h3>
              <p class="apropos-value-card__desc">
                Nous construisons des relations durables avec nos clients, fondées
                sur la confiance et un suivi personnalisé tout au long de la vie du véhicule.
              </p>
            </div>

            <div class="apropos-value-card pg-reveal pg-reveal--delay-2">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Innovation continue</h3>
              <p class="apropos-value-card__desc">
                Investissement permanent dans les outils, les formations et les procédures
                pour rester à la pointe de la technologie automobile.
              </p>
            </div>

            <div class="apropos-value-card pg-reveal pg-reveal--delay-3">
              <div class="apropos-value-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 class="apropos-value-card__title">Excellence sans compromis</h3>
              <p class="apropos-value-card__desc">
                Chaque intervention est réalisée avec le même niveau d'exigence, que ce soit
                pour une simple vidange ou une révision complète.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- TEAM SECTION -->
      <section aria-labelledby="team-title" style="background: #050609; padding: 96px 0;">
        <div class="pg-section">
          <div class="pg-section-header">
            <span class="pg-section-kicker pg-reveal">L'ÉQUIPE</span>
            <h2 id="team-title" class="pg-section-title pg-reveal">Les experts derrière AutoValley</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              Une équipe de professionnels passionnés, certifiés et expérimentés,
              dédiés à l'excellence de chaque intervention.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="apropos-team-grid">
            <article class="apropos-team-card pg-reveal">
              <div class="apropos-team-card__img-wrap">
                <img
                  src="https://images.pexels.com/photos/3807474/pexels-photo-3807474.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Directeur Technique AutoValley"
                  class="apropos-team-card__img"
                  loading="lazy"
                />
                <div class="apropos-team-card__overlay" aria-hidden="true"></div>
              </div>
              <div class="apropos-team-card__body">
                <p class="apropos-team-card__name">Youssef El Mansouri</p>
                <p class="apropos-team-card__role">Directeur Technique</p>
              </div>
            </article>

            <article class="apropos-team-card pg-reveal pg-reveal--delay-1">
              <div class="apropos-team-card__img-wrap">
                <img
                  src="https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Chef d'atelier AutoValley"
                  class="apropos-team-card__img"
                  loading="lazy"
                />
                <div class="apropos-team-card__overlay" aria-hidden="true"></div>
              </div>
              <div class="apropos-team-card__body">
                <p class="apropos-team-card__name">Karim Bensouda</p>
                <p class="apropos-team-card__role">Chef d'Atelier</p>
              </div>
            </article>

            <article class="apropos-team-card pg-reveal pg-reveal--delay-2">
              <div class="apropos-team-card__img-wrap">
                <img
                  src="https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Responsable Carrosserie AutoValley"
                  class="apropos-team-card__img"
                  loading="lazy"
                />
                <div class="apropos-team-card__overlay" aria-hidden="true"></div>
              </div>
              <div class="apropos-team-card__body">
                <p class="apropos-team-card__name">Samir Alaoui</p>
                <p class="apropos-team-card__role">Responsable Carrosserie</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- CERTIFICATIONS SECTION -->
      <section aria-labelledby="certs-title" style="background: #0a0a0f; padding: 80px 0;">
        <div class="pg-section">
          <div class="pg-section-header" style="margin-bottom: 48px;">
            <span class="pg-section-kicker pg-reveal">AGRÉMENTS &amp; PARTENAIRES</span>
            <h2 id="certs-title" class="pg-section-title pg-reveal">Certifications &amp; partenariats</h2>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="apropos-certs pg-reveal pg-reveal--delay-1">
            <div class="apropos-cert-badge">
              <img src="./public/img/refs/sntl.svg" alt="SNTL" />
              <span class="apropos-cert-badge__name">Agréé SNTL</span>
            </div>
            <div class="apropos-cert-badge">
              <img src="./public/img/refs/allianz.svg" alt="Allianz" />
              <span class="apropos-cert-badge__name">Partenaire Allianz</span>
            </div>
            <div class="apropos-cert-badge">
              <img src="./public/img/refs/axa.svg" alt="AXA" />
              <span class="apropos-cert-badge__name">Partenaire AXA</span>
            </div>
            <div class="apropos-cert-badge">
              <img src="./public/img/refs/wafa.svg" alt="Wafa Assurance" />
              <span class="apropos-cert-badge__name">Partenaire Wafa</span>
            </div>
            <div class="apropos-cert-badge">
              <img src="./public/img/refs/rma.svg" alt="RMA" />
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

    <script type="module" src="./style/js/premium-effects.js"></script>
    <script type="module" src="./style/js/pages-common.js"></script>
  </body>
</html>
