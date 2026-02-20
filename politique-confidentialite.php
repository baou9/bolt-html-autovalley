<?php
$metaTitle = 'Politique de Confidentialité – AutoValley';
$metaDescription = "Politique de confidentialité d'AutoValley : collecte, utilisation et protection des données personnelles.";
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
$metaRobots = 'noindex,follow';
$pageStyles = [
    './style/css/style.css',
    './style/css/header-styles.css',
    './style/css/header-responsive.css',
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

    <main id="main">

      <!-- HERO -->
      <section class="pg-hero pg-hero--compact pg-hero--legal" id="privacy-hero">
        <div class="pg-hero__bg" aria-hidden="true">
          <div class="pg-hero__overlay pg-hero__overlay--legal"></div>
        </div>

        <div class="pg-hero__inner">
          <nav class="pg-hero__breadcrumb" aria-label="Fil d'Ariane">
            <a href="./index.php">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Politique de confidentialité</span>
          </nav>
          <p class="pg-hero__kicker pg-reveal">VOS DONNÉES</p>
          <h1 class="pg-hero__title pg-hero__title--legal pg-reveal">
            Politique de <span class="pg-hero__title-accent">confidentialité</span>
          </h1>
        </div>
      </section>

      <!-- CONTENT -->
      <section aria-labelledby="privacy-heading" class="pg-section-shell pg-section-shell--legal">
        <div class="pg-section pg-section--wide pg-section--flush-y">

          <div class="legal-layout">

            <!-- TOC -->
            <aside aria-label="Table des matières">
              <nav class="legal-toc">
                <p class="legal-toc__title">Table des matières</p>
                <ul class="legal-toc__list">
                  <li class="legal-toc__item"><a href="#responsable">Responsable du traitement</a></li>
                  <li class="legal-toc__item"><a href="#collecte">Données collectées</a></li>
                  <li class="legal-toc__item"><a href="#finalites">Finalités du traitement</a></li>
                  <li class="legal-toc__item"><a href="#base-legale">Base légale</a></li>
                  <li class="legal-toc__item"><a href="#conservation">Conservation des données</a></li>
                  <li class="legal-toc__item"><a href="#partage">Partage des données</a></li>
                  <li class="legal-toc__item"><a href="#droits">Vos droits</a></li>
                  <li class="legal-toc__item"><a href="#cookies-detail">Cookies</a></li>
                  <li class="legal-toc__item"><a href="#securite">Sécurité</a></li>
                  <li class="legal-toc__item"><a href="#contact-dpo">Nous contacter</a></li>
                </ul>
              </nav>
            </aside>

            <!-- Body -->
            <article class="legal-body" id="privacy-heading">

              <div class="legal-updated" aria-label="Date de mise à jour">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Dernière mise à jour : Janvier 2025
              </div>

              <div class="legal-section" id="responsable">
                <h2><span class="legal-num">01</span> Responsable du traitement</h2>
                <p>
                  Le responsable du traitement des données personnelles collectées sur le site
                  <strong>autovalley.ma</strong> est :
                </p>
                <div class="legal-contact-box">
                  <p><strong>AutoValley SARL</strong></p>
                  <p>Sapino, Nouaceur – Casablanca, Maroc</p>
                  <p>Email : <a href="mailto:privacy@autovalley.ma">privacy@autovalley.ma</a></p>
                  <p>Téléphone : <a href="tel:+212600000000">+212 6 00 00 00 00</a></p>
                </div>
              </div>

              <div class="legal-section" id="collecte">
                <h2><span class="legal-num">02</span> Données collectées</h2>
                <p>
                  Dans le cadre de l'utilisation de nos services et de notre site web,
                  nous sommes susceptibles de collecter les catégories de données suivantes :
                </p>
                <p><strong>Données d'identification :</strong></p>
                <ul>
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                </ul>
                <p><strong>Données relatives au véhicule :</strong></p>
                <ul>
                  <li>Marque, modèle et année du véhicule</li>
                  <li>Numéro d'immatriculation (si nécessaire pour l'intervention)</li>
                  <li>Kilométrage et historique d'entretien</li>
                </ul>
                <p><strong>Données de navigation (collectées automatiquement) :</strong></p>
                <ul>
                  <li>Adresse IP (anonymisée)</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>Pages consultées et durée de visite</li>
                  <li>Source de la visite (via cookies analytiques)</li>
                </ul>
              </div>

              <div class="legal-section" id="finalites">
                <h2><span class="legal-num">03</span> Finalités du traitement</h2>
                <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
                <ul>
                  <li><strong>Gestion des rendez-vous et interventions :</strong> planification, suivi et facturation des prestations</li>
                  <li><strong>Communication :</strong> réponse à vos demandes, envoi de confirmations de rendez-vous, notifications de suivi</li>
                  <li><strong>Gestion de la relation client :</strong> historique des interventions, suivi de garantie</li>
                  <li><strong>Obligations légales :</strong> archivage des factures et documents comptables</li>
                  <li><strong>Amélioration du service :</strong> analyse anonymisée de la satisfaction client</li>
                  <li><strong>Communication commerciale :</strong> envoi d'offres et actualités (avec votre consentement explicite)</li>
                </ul>
              </div>

              <div class="legal-section" id="base-legale">
                <h2><span class="legal-num">04</span> Base légale du traitement</h2>
                <p>Le traitement de vos données personnelles repose sur les bases légales suivantes :</p>
                <ul>
                  <li><strong>Exécution d'un contrat :</strong> pour la gestion des rendez-vous et des interventions</li>
                  <li><strong>Obligation légale :</strong> pour la conservation des pièces comptables et fiscales</li>
                  <li><strong>Intérêt légitime :</strong> pour l'amélioration de nos services et la sécurité de notre site</li>
                  <li><strong>Consentement :</strong> pour l'envoi de communications commerciales et l'utilisation de cookies non essentiels</li>
                </ul>
              </div>

              <div class="legal-section" id="conservation">
                <h2><span class="legal-num">05</span> Durée de conservation des données</h2>
                <p>Vos données personnelles sont conservées pendant les durées suivantes :</p>
                <ul>
                  <li><strong>Données clients actifs :</strong> pendant toute la durée de la relation commerciale + 3 ans après le dernier contact</li>
                  <li><strong>Données de facturation :</strong> 10 ans (obligation comptable légale)</li>
                  <li><strong>Demandes de contact sans suite :</strong> 1 an maximum</li>
                  <li><strong>Candidatures :</strong> 2 ans si candidature non retenue, avec votre accord explicite</li>
                  <li><strong>Données de navigation (cookies analytiques) :</strong> 13 mois maximum</li>
                </ul>
                <p>
                  À l'expiration de ces délais, vos données sont supprimées ou anonymisées
                  de manière sécurisée.
                </p>
              </div>

              <div class="legal-section" id="partage">
                <h2><span class="legal-num">06</span> Partage des données</h2>
                <p>
                  AutoValley ne vend jamais vos données personnelles à des tiers.
                  Vos données peuvent être partagées uniquement dans les cas suivants :
                </p>
                <ul>
                  <li><strong>Prestataires techniques :</strong> hébergement, outils de communication (sous contrat de confidentialité)</li>
                  <li><strong>Compagnies d'assurance partenaires :</strong> uniquement dans le cadre de la gestion d'un sinistre et avec votre accord</li>
                  <li><strong>Autorités compétentes :</strong> sur demande légale expresse</li>
                </ul>
                <p>
                  Tous nos prestataires sont tenus contractuellement de protéger vos données
                  et de ne les utiliser qu'aux fins pour lesquelles elles ont été partagées.
                </p>
              </div>

              <div class="legal-section" id="droits">
                <h2><span class="legal-num">07</span> Vos droits</h2>
                <p>
                  Conformément à la loi marocaine 09-08 relative à la protection des données
                  personnelles, vous disposez des droits suivants :
                </p>
                <ul>
                  <li><strong>Droit d'accès :</strong> obtenir confirmation du traitement et accéder à vos données</li>
                  <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement pour des raisons légitimes</li>
                  <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données (sous réserve d'obligations légales)</li>
                  <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                  <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment pour les traitements basés sur celui-ci</li>
                </ul>
                <div class="legal-contact-box">
                  <p><strong>Pour exercer vos droits, contactez-nous :</strong></p>
                  <p>Email : <a href="mailto:privacy@autovalley.ma">privacy@autovalley.ma</a></p>
                  <p>Courrier : AutoValley – Protection des données, Sapino, Nouaceur – Casablanca</p>
                  <p class="legal-note legal-note--muted">Nous accuserons réception de votre demande dans les 72 heures et y répondrons dans un délai maximum d'un mois.</p>
                </div>
              </div>

              <div class="legal-section" id="cookies-detail">
                <h2><span class="legal-num">08</span> Cookies</h2>
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation.
                  Voici les catégories de cookies utilisés :
                </p>
                <ul>
                  <li><strong>Cookies strictement nécessaires :</strong> indispensables au fonctionnement du site, non soumis à consentement</li>
                  <li><strong>Cookies de performance (analytiques) :</strong> mesure d'audience anonymisée, soumis à votre consentement</li>
                  <li><strong>Cookies de préférences :</strong> mémorisation de vos choix (langue, etc.)</li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences cookies à tout moment via le gestionnaire
                  disponible sur notre site ou dans les paramètres de votre navigateur.
                </p>
                <button class="cookie-manage-btn" type="button" aria-label="Gérer les préférences de cookies">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
                  </svg>
                  Gérer mes préférences cookies
                </button>
              </div>

              <div class="legal-section" id="securite">
                <h2><span class="legal-num">09</span> Sécurité des données</h2>
                <p>
                  AutoValley met en œuvre des mesures techniques et organisationnelles
                  appropriées pour protéger vos données personnelles contre tout accès
                  non autorisé, divulgation, altération ou destruction :
                </p>
                <ul>
                  <li>Chiffrement SSL/TLS pour toutes les communications</li>
                  <li>Contrôle d'accès strict aux systèmes d'information</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                  <li>Formation de notre personnel aux bonnes pratiques de sécurité</li>
                  <li>Procédures de gestion des incidents de sécurité</li>
                </ul>
                <p>
                  En cas de violation de données susceptible de porter atteinte à vos droits,
                  vous serez notifié dans les délais légaux requis.
                </p>
              </div>

              <div class="legal-section" id="contact-dpo">
                <h2><span class="legal-num">10</span> Nous contacter</h2>
                <p>
                  Pour toute question relative à cette politique de confidentialité ou à
                  l'exercice de vos droits, notre équipe est à votre disposition :
                </p>
                <div class="legal-contact-box">
                  <p><strong>AutoValley – Référent données personnelles</strong></p>
                  <p>Email : <a href="mailto:privacy@autovalley.ma">privacy@autovalley.ma</a></p>
                  <p>Téléphone : <a href="tel:+212600000000">+212 6 00 00 00 00</a></p>
                  <p>Adresse : Sapino, Nouaceur – Casablanca, Maroc</p>
                </div>
                <p class="legal-note legal-note--mt-md">
                  Cette politique de confidentialité est susceptible d'être mise à jour.
                  En cas de modification substantielle, nous vous en informerons par email
                  ou via un avis visible sur notre site. La date de dernière mise à jour
                  est toujours indiquée en haut de ce document.
                </p>
              </div>

            </article>
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

    <script type="module" src="./style/js/nav-active.js"></script>
    <script type="module" src="./style/js/premium-effects.js"></script>
    <script type="module" src="./style/js/pages-common.js"></script>
  </body>
</html>
