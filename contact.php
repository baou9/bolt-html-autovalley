<?php
$metaTitle = 'Coordonnées et rendez-vous | AutoValley Casablanca';
$metaDescription = "Retrouvez les coordonnées AutoValley à Casablanca: adresse, téléphone, horaires et formulaire de contact pour planifier un rendez-vous ou poser une question.";
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
$pageStyles = [
    './style/css/style.css',
    './style/css/header-responsive.css',
    './style/css/header-styles.css',
    './style/css/premium-styles.css',
    './style/css/pages-styles.css'
];

// [PATCH] ContactPage + Organization contact schema from visible contact details.
$structuredData = [
    [
        '@context' => 'https://schema.org',
        '@type' => 'ContactPage',
        'name' => 'Nous Contacter – AutoValley | Casablanca',
        'description' => "Coordonnées, formulaire de contact, WhatsApp et horaires d'ouverture d'AutoValley à Casablanca.",
    ],
    [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'AutoValley',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'Sapino, Nouaceur',
            'addressLocality' => 'Casablanca',
            'addressCountry' => 'MA',
        ],
        'telephone' => '+212600000000',
        'email' => 'contact@autovalley.ma',
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'telephone' => '+212600000000',
            'email' => 'contact@autovalley.ma',
            'contactType' => 'customer service',
            'availableLanguage' => ['fr'],
        ],
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
      <section class="pg-hero pg-hero--compact" id="contact-hero">
        <div class="pg-hero__bg" aria-hidden="true">
          <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1920', 'alt' => '', 'width' => 1200, 'height' => 800, 'class' => 'pg-hero__bg-img', 'loading' => 'eager', 'decoding' => 'async', 'sizes' => '100vw', 'fetchpriority' => 'high']); ?>
          <div class="pg-hero__overlay"></div>
        </div>

        <div class="pg-hero__inner">
          <nav class="pg-hero__breadcrumb" aria-label="Fil d'Ariane">
            <a href="./index.php">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>

          <p class="pg-hero__kicker pg-reveal">DISPONIBLES POUR VOUS</p>
          <h1 class="pg-hero__title pg-reveal">
            Parlons de <span class="pg-hero__title-accent">votre véhicule</span>
          </h1>
          <p class="pg-hero__subtitle pg-reveal">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            et vous accompagner dans la prise en charge de votre véhicule.
          </p>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section aria-labelledby="contact-section-title" class="pg-section-shell pg-section-shell--bottom-lg">
        <div class="pg-section">
          <div class="contact-layout">

            <!-- Left: info -->
            <aside>
              <h2 id="contact-section-title" class="pg-section-title pg-section-title--left pg-section-title--sm pg-section-title--mb-lg pg-reveal">
                Nos coordonnées
              </h2>

              <div class="contact-info-stack">
                <div class="contact-info-card pg-reveal">
                  <div class="contact-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span class="contact-info-card__label">Adresse</span>
                    <a href="https://maps.google.com/?q=Sapino+Nouaceur+Casablanca" target="_blank" rel="noopener" class="contact-info-card__value">
                      Sapino, Nouaceur – Casablanca, Maroc
                    </a>
                  </div>
                </div>

                <div class="contact-info-card pg-reveal pg-reveal--delay-1">
                  <div class="contact-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="contact-info-card__label">Téléphone</span>
                    <a href="tel:+212600000000" class="contact-info-card__value">+212 6 00 00 00 00</a>
                  </div>
                </div>

                <div class="contact-info-card pg-reveal pg-reveal--delay-2">
                  <div class="contact-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="contact-info-card__label">WhatsApp Service</span>
                    <a href="https://wa.me/212600000000" target="_blank" rel="noopener" class="contact-info-card__value">Écrire sur WhatsApp</a>
                  </div>
                </div>

                <div class="contact-info-card pg-reveal pg-reveal--delay-3">
                  <div class="contact-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span class="contact-info-card__label">Email</span>
                    <a href="mailto:contact@autovalley.ma" class="contact-info-card__value">contact@autovalley.ma</a>
                  </div>
                </div>
              </div>

              <div class="contact-hours pg-reveal pg-reveal--delay-4">
                <p class="contact-hours__title">Horaires d'ouverture</p>
                <div class="contact-hours__row">
                  <span class="contact-hours__day">Lundi – Vendredi</span>
                  <span class="contact-hours__time">08h30 – 18h30</span>
                </div>
                <div class="contact-hours__row">
                  <span class="contact-hours__day">Samedi</span>
                  <span class="contact-hours__time">09h00 – 13h00</span>
                </div>
                <div class="contact-hours__row">
                  <span class="contact-hours__day">Dimanche</span>
                  <span class="contact-hours__closed">Fermé</span>
                </div>
              </div>
            </aside>

            <!-- Right: form -->
            <div class="contact-form-wrap pg-reveal pg-reveal--delay-1">
              <h2 class="contact-form-title">Envoyez-nous un message</h2>
              <p class="contact-form-subtitle">Réponse garantie en moins de 2 heures ouvrées.</p>

              <form class="contact-form" novalidate aria-label="Formulaire de contact">
                <div class="contact-form__row">
                  <div class="form-field">
                    <label class="form-label" for="contact-nom">Nom complet <span class="required" aria-hidden="true">*</span></label>
                    <input id="contact-nom" class="form-input" type="text" name="nom" placeholder="Ahmed Benali" required autocomplete="name" />
                    <span class="form-error-msg" role="alert"></span>
                  </div>
                  <div class="form-field">
                    <label class="form-label" for="contact-email">Email <span class="required" aria-hidden="true">*</span></label>
                    <input id="contact-email" class="form-input" type="email" name="email" placeholder="vous@exemple.ma" required autocomplete="email" />
                    <span class="form-error-msg" role="alert"></span>
                  </div>
                </div>

                <div class="contact-form__row">
                  <div class="form-field">
                    <label class="form-label" for="contact-tel">Téléphone</label>
                    <input id="contact-tel" class="form-input" type="tel" name="telephone" placeholder="+212 6 00 00 00 00" autocomplete="tel" />
                    <span class="form-error-msg" role="alert"></span>
                  </div>
                  <div class="form-field">
                    <label class="form-label" for="contact-vehicule">Véhicule</label>
                    <input id="contact-vehicule" class="form-input" type="text" name="vehicule" placeholder="Marque, modèle, année" />
                    <span class="form-error-msg" role="alert"></span>
                  </div>
                </div>

                <div class="form-field">
                  <label class="form-label" for="contact-service">Type de service <span class="required" aria-hidden="true">*</span></label>
                  <select id="contact-service" class="form-select" name="service" required>
                    <option value="" disabled selected>Sélectionnez un service…</option>
                    <option value="diagnostic">Diagnostic électronique</option>
                    <option value="entretien">Entretien &amp; révision</option>
                    <option value="mecanique">Mécanique générale</option>
                    <option value="carrosserie">Carrosserie &amp; peinture</option>
                    <option value="pieces">Pièces d'origine</option>
                    <option value="autre">Autre demande</option>
                  </select>
                  <span class="form-error-msg" role="alert"></span>
                </div>

                <div class="form-field">
                  <label class="form-label" for="contact-message">Message <span class="required" aria-hidden="true">*</span></label>
                  <textarea id="contact-message" class="form-textarea" name="message" placeholder="Décrivez votre demande ou le problème rencontré avec votre véhicule…" required></textarea>
                  <span class="form-error-msg" role="alert"></span>
                </div>

                <button class="form-submit" type="submit" aria-label="Envoyer le message">
                  <span class="form-submit__text">Envoyer le message</span>
                  <span class="form-submit__spinner" aria-hidden="true"></span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>

                <div class="form-success-banner" role="status" aria-live="polite">
                  <p>✓ Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.</p>
                </div>
              </form>
            </div>
          </div>

          <!-- Map -->
          <div class="contact-map pg-reveal">
            <div class="contact-map__placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <strong class="contact-map__address">AutoValley – Sapino, Nouaceur – Casablanca</strong>
                <a href="https://maps.google.com/?q=Sapino+Nouaceur+Casablanca" target="_blank" rel="noopener"
                   class="contact-map__link">
                  Voir sur Google Maps →
                </a>
              </div>
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
