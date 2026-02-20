<?php
$metaTitle = "Carrières atelier automobile | AutoValley Casablanca";
$metaDescription = "Consultez la page Carrières AutoValley à Casablanca: postes ouverts, profils recherchés et informations sur la candidature.";
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
      <section class="pg-hero" id="carrieres-hero">
        <div class="pg-hero__bg" aria-hidden="true">
          <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/4489744/pexels-photo-4489744.jpeg?auto=compress&cs=tinysrgb&w=1920', 'alt' => '', 'width' => 1200, 'height' => 800, 'class' => 'pg-hero__bg-img', 'loading' => 'eager', 'decoding' => 'async', 'sizes' => '100vw', 'fetchpriority' => 'high']); ?>
          <div class="pg-hero__overlay"></div>
        </div>

        <div class="pg-hero__inner">
          <nav class="pg-hero__breadcrumb" aria-label="Fil d'Ariane">
            <a href="./index.php">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Carrières</span>
          </nav>

          <p class="pg-hero__kicker pg-reveal">REJOIGNEZ-NOUS</p>
          <h1 class="pg-hero__title pg-reveal">
            Construisez votre carrière<br><span class="pg-hero__title-accent">avec les meilleurs</span>
          </h1>
          <p class="pg-hero__subtitle pg-reveal">
            Vous êtes passionné d'automobile et vous recherchez un environnement
            où l'excellence est une culture ? AutoValley est fait pour vous.
          </p>
        </div>
      </section>

      <!-- CULTURE SECTION -->
      <section aria-labelledby="culture-title" class="pg-surface-dark">
        <div class="pg-section">
          <div class="pg-section-header">
            <span class="pg-section-kicker pg-reveal">NOTRE CULTURE</span>
            <h2 id="culture-title" class="pg-section-title pg-reveal">Pourquoi rejoindre AutoValley ?</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              Un environnement stimulant, des outils de pointe et une équipe
              qui partage la même passion pour l'automobile.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="car-culture-grid">
            <div class="car-culture-card pg-reveal">
              <div class="car-culture-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3 class="car-culture-card__title">Formation continue</h3>
              <p class="car-culture-card__desc">
                Accès aux formations constructeur, certifications internationales et
                ateliers pratiques sur les technologies les plus récentes.
              </p>
            </div>

            <div class="car-culture-card pg-reveal pg-reveal--delay-1">
              <div class="car-culture-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 class="car-culture-card__title">Équipements premium</h3>
              <p class="car-culture-card__desc">
                Travaillez avec les outils de diagnostic les plus avancés du marché,
                dans un atelier aux standards les plus élevés.
              </p>
            </div>

            <div class="car-culture-card pg-reveal pg-reveal--delay-2">
              <div class="car-culture-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="car-culture-card__title">Esprit d'équipe</h3>
              <p class="car-culture-card__desc">
                Une culture collaborative où chacun contribue, partage ses connaissances
                et évolue dans un environnement respectueux et motivant.
              </p>
            </div>

            <div class="car-culture-card pg-reveal pg-reveal--delay-1">
              <div class="car-culture-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 class="car-culture-card__title">Évolution de carrière</h3>
              <p class="car-culture-card__desc">
                Des parcours de progression clairs, des responsabilités croissantes
                et la valorisation des talents internes.
              </p>
            </div>

            <div class="car-culture-card pg-reveal pg-reveal--delay-2">
              <div class="car-culture-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 class="car-culture-card__title">Impact réel</h3>
              <p class="car-culture-card__desc">
                Votre travail a un impact direct et visible sur la satisfaction de nos clients
                et sur la réputation d'AutoValley.
              </p>
            </div>

            <div class="car-culture-card pg-reveal pg-reveal--delay-3">
              <div class="car-culture-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 class="car-culture-card__title">Environnement sûr</h3>
              <p class="car-culture-card__desc">
                Atelier aux normes de sécurité les plus strictes, équipements de protection
                individuels et protocoles rigoureusement respectés.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- PERKS SECTION -->
      <section aria-labelledby="perks-title" class="pg-surface-dark-soft pg-surface-dark-soft--compact">
        <div class="pg-section">
          <div class="pg-section-header pg-section-header--compact">
            <span class="pg-section-kicker pg-reveal">AVANTAGES</span>
            <h2 id="perks-title" class="pg-section-title pg-reveal">Ce que nous offrons</h2>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="car-perks-grid">
            <div class="car-perk-card pg-reveal">
              <div class="car-perk-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <p class="car-perk-card__title">Salaire compétitif</p>
              <p class="car-perk-card__desc">Rémunération au-dessus du marché + primes de performance</p>
            </div>

            <div class="car-perk-card pg-reveal pg-reveal--delay-1">
              <div class="car-perk-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p class="car-perk-card__title">Mutuelle santé</p>
              <p class="car-perk-card__desc">Couverture médicale complète pour vous et votre famille</p>
            </div>

            <div class="car-perk-card pg-reveal pg-reveal--delay-2">
              <div class="car-perk-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <p class="car-perk-card__title">Formation payée</p>
              <p class="car-perk-card__desc">Budget annuel de formation et certifications prises en charge</p>
            </div>

            <div class="car-perk-card pg-reveal pg-reveal--delay-3">
              <div class="car-perk-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                  <path d="M5 17H3V6a1 1 0 0 1 1-1h11v11M9 17h6m-6 0h-2"/>
                </svg>
              </div>
              <p class="car-perk-card__title">Tarifs préférentiels</p>
              <p class="car-perk-card__desc">Entretien de votre véhicule personnel à tarif employé</p>
            </div>
          </div>
        </div>
      </section>

      <!-- JOB LISTINGS -->
      <section aria-labelledby="jobs-title" class="pg-surface-dark">
        <div class="pg-section">
          <div class="pg-section-header">
            <span class="pg-section-kicker pg-reveal">OFFRES D'EMPLOI</span>
            <h2 id="jobs-title" class="pg-section-title pg-reveal">Postes ouverts</h2>
            <p class="pg-section-subtitle pg-reveal pg-reveal--delay-1">
              Rejoignez une équipe d'experts passionnés dans un environnement
              où le mérite est reconnu et l'excellence encouragée.
            </p>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="car-jobs-list pg-reveal pg-reveal--delay-1">

            <article class="car-job-card">
              <div class="car-job-card__info">
                <h3 class="car-job-card__title">Technicien Diagnostic Senior</h3>
                <div class="car-job-card__tags">
                  <span class="car-job-tag car-job-tag--dept">Mécanique</span>
                  <span class="car-job-tag car-job-tag--type">CDI – Temps plein</span>
                  <span class="car-job-tag car-job-tag--location">Casablanca</span>
                </div>
              </div>
              <a href="#apply-form" class="car-job-card__apply" data-apply="diagnostic-senior" aria-label="Postuler pour Technicien Diagnostic Senior">
                Postuler
              </a>
            </article>

            <article class="car-job-card">
              <div class="car-job-card__info">
                <h3 class="car-job-card__title">Carrossier-Peintre Qualifié</h3>
                <div class="car-job-card__tags">
                  <span class="car-job-tag car-job-tag--dept">Carrosserie</span>
                  <span class="car-job-tag car-job-tag--type">CDI – Temps plein</span>
                  <span class="car-job-tag car-job-tag--location">Casablanca</span>
                </div>
              </div>
              <a href="#apply-form" class="car-job-card__apply" data-apply="carrossier-peintre" aria-label="Postuler pour Carrossier-Peintre Qualifié">
                Postuler
              </a>
            </article>

            <article class="car-job-card">
              <div class="car-job-card__info">
                <h3 class="car-job-card__title">Conseiller Service Client</h3>
                <div class="car-job-card__tags">
                  <span class="car-job-tag car-job-tag--dept">Commercial</span>
                  <span class="car-job-tag car-job-tag--type">CDI – Temps plein</span>
                  <span class="car-job-tag car-job-tag--location">Casablanca</span>
                </div>
              </div>
              <a href="#apply-form" class="car-job-card__apply" data-apply="conseiller-service" aria-label="Postuler pour Conseiller Service Client">
                Postuler
              </a>
            </article>

            <article class="car-job-card">
              <div class="car-job-card__info">
                <h3 class="car-job-card__title">Technicien Électricien Automobile</h3>
                <div class="car-job-card__tags">
                  <span class="car-job-tag car-job-tag--dept">Électronique</span>
                  <span class="car-job-tag car-job-tag--type">CDI – Temps plein</span>
                  <span class="car-job-tag car-job-tag--location">Casablanca</span>
                </div>
              </div>
              <a href="#apply-form" class="car-job-card__apply" data-apply="electricien-auto" aria-label="Postuler pour Technicien Électricien Automobile">
                Postuler
              </a>
            </article>

          </div>
        </div>
      </section>

      <!-- APPLICATION FORM -->
      <section id="apply-form" aria-labelledby="apply-title" class="pg-surface-dark-soft car-apply-section">
        <div class="pg-section pg-section--narrow">
          <div class="pg-section-header pg-section-header--compact">
            <span class="pg-section-kicker pg-reveal">CANDIDATURE</span>
            <h2 id="apply-title" class="pg-section-title pg-reveal">Postulez en ligne</h2>
            <span class="pg-title-line" aria-hidden="true"></span>
          </div>

          <div class="car-apply-form-wrap pg-reveal pg-reveal--delay-1">
            <h3 class="car-apply-form-title">Votre candidature</h3>
            <p class="car-apply-form-subtitle">Remplissez le formulaire ci-dessous. Nous vous répondrons dans les 48 heures ouvrées.</p>

            <form class="car-apply-form contact-form" novalidate aria-label="Formulaire de candidature">
              <div class="contact-form__row">
                <div class="form-field">
                  <label class="form-label" for="apply-nom">Nom complet <span class="required" aria-hidden="true">*</span></label>
                  <input id="apply-nom" class="form-input" type="text" name="nom" placeholder="Votre nom et prénom" required autocomplete="name" />
                  <span class="form-error-msg" role="alert"></span>
                </div>
                <div class="form-field">
                  <label class="form-label" for="apply-email">Email <span class="required" aria-hidden="true">*</span></label>
                  <input id="apply-email" class="form-input" type="email" name="email" placeholder="vous@exemple.ma" required autocomplete="email" />
                  <span class="form-error-msg" role="alert"></span>
                </div>
              </div>

              <div class="contact-form__row">
                <div class="form-field">
                  <label class="form-label" for="apply-tel">Téléphone <span class="required" aria-hidden="true">*</span></label>
                  <input id="apply-tel" class="form-input" type="tel" name="telephone" placeholder="+212 6 00 00 00 00" required autocomplete="tel" />
                  <span class="form-error-msg" role="alert"></span>
                </div>
                <div class="form-field">
                  <label class="form-label" for="apply-experience">Années d'expérience</label>
                  <select id="apply-experience" class="form-select" name="experience">
                    <option value="" disabled selected>Sélectionner…</option>
                    <option value="0-1">Moins d'1 an</option>
                    <option value="1-3">1 – 3 ans</option>
                    <option value="3-5">3 – 5 ans</option>
                    <option value="5-10">5 – 10 ans</option>
                    <option value="10+">Plus de 10 ans</option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label" for="apply-position">Poste souhaité <span class="required" aria-hidden="true">*</span></label>
                <select id="apply-position" class="form-select" name="poste" required>
                  <option value="" disabled selected>Sélectionner un poste…</option>
                  <option value="diagnostic-senior">Technicien Diagnostic Senior</option>
                  <option value="carrossier-peintre">Carrossier-Peintre Qualifié</option>
                  <option value="conseiller-service">Conseiller Service Client</option>
                  <option value="electricien-auto">Technicien Électricien Automobile</option>
                  <option value="spontanee">Candidature spontanée</option>
                </select>
                <span class="form-error-msg" role="alert"></span>
              </div>

              <div class="form-field">
                <label class="form-label">CV (PDF, DOC)</label>
                <div class="form-file-wrap">
                  <label class="form-file-label" for="apply-cv" aria-label="Télécharger votre CV">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Cliquez pour sélectionner votre CV
                  </label>
                  <input id="apply-cv" type="file" class="form-file-input" accept=".pdf,.doc,.docx" aria-label="Télécharger votre CV" />
                  <p class="form-file-name">Aucun fichier sélectionné</p>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label" for="apply-lettre">Lettre de motivation</label>
                <textarea id="apply-lettre" class="form-textarea form-textarea--tall" name="motivation" placeholder="Décrivez votre parcours, vos motivations et pourquoi vous souhaitez rejoindre AutoValley…"></textarea>
                <span class="form-error-msg" role="alert"></span>
              </div>

              <button class="form-submit" type="submit" aria-label="Envoyer ma candidature">
                <span class="form-submit__text">Envoyer ma candidature</span>
                <span class="form-submit__spinner" aria-hidden="true"></span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>

              <div class="form-success-banner" role="status" aria-live="polite">
                <p>✓ Votre candidature a bien été reçue. Nous vous répondrons dans les 48 heures ouvrées.</p>
              </div>
            </form>
          </div>

          <!-- Spontaneous CTA -->
          <div class="pg-card pg-reveal pg-card-cta pg-card-cta--compact">
            <p class="pg-card-cta__kicker">AUCUN POSTE NE CORRESPOND ?</p>
            <h3 class="pg-card-cta__title pg-card-cta__title--compact">Candidature spontanée</h3>
            <p class="pg-card-cta__desc pg-card-cta__desc--tight">
              Envoyez votre CV à <a href="mailto:carrieres@autovalley.ma" class="pg-inline-link-underlined">carrieres@autovalley.ma</a> avec la mention "Candidature spontanée". Nous étudions toutes les candidatures de profils talentueux.
            </p>
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
