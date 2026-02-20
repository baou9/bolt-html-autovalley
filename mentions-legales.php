<?php
$metaTitle = 'Mentions Légales – AutoValley';
$metaDescription = 'Mentions légales du site AutoValley : éditeur, hébergeur et informations juridiques.';
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
$metaRobots = 'noindex';
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

    <main id="main">

      <!-- HERO -->
      <section class="pg-hero pg-hero--compact" id="legal-hero" style="min-height: 38vh;">
        <div class="pg-hero__bg" aria-hidden="true">
          <div class="pg-hero__overlay" style="background: linear-gradient(180deg, rgba(5,6,9,0.85) 0%, rgba(5,6,9,0.6) 40%, rgba(5,6,9,0.98) 100%);"></div>
        </div>

        <div class="pg-hero__inner">
          <nav class="pg-hero__breadcrumb" aria-label="Fil d'Ariane">
            <a href="./index.php">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Mentions Légales</span>
          </nav>
          <p class="pg-hero__kicker pg-reveal">LÉGAL</p>
          <h1 class="pg-hero__title pg-reveal" style="font-size: clamp(1.8rem, 4vw, 2.6rem);">
            Mentions <span class="pg-hero__title-accent">légales</span>
          </h1>
        </div>
      </section>

      <!-- CONTENT -->
      <section aria-labelledby="mentions-heading" class="pg-section-shell pg-section-shell--legal">
        <div class="pg-section pg-section--wide pg-section--flush-y">

          <div class="legal-layout">

            <!-- TOC -->
            <aside aria-label="Table des matières">
              <nav class="legal-toc">
                <p class="legal-toc__title">Table des matières</p>
                <ul class="legal-toc__list">
                  <li class="legal-toc__item"><a href="#editeur">Éditeur du site</a></li>
                  <li class="legal-toc__item"><a href="#hebergeur">Hébergement</a></li>
                  <li class="legal-toc__item"><a href="#propriete">Propriété intellectuelle</a></li>
                  <li class="legal-toc__item"><a href="#responsabilite">Limitation de responsabilité</a></li>
                  <li class="legal-toc__item"><a href="#donnees">Données personnelles</a></li>
                  <li class="legal-toc__item"><a href="#cookies">Cookies</a></li>
                  <li class="legal-toc__item"><a href="#liens">Liens hypertextes</a></li>
                  <li class="legal-toc__item"><a href="#droit">Droit applicable</a></li>
                </ul>
              </nav>
            </aside>

            <!-- Body -->
            <article class="legal-body" id="mentions-heading">

              <div class="legal-updated" aria-label="Date de mise à jour">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Dernière mise à jour : Janvier 2025
              </div>

              <div class="legal-section" id="editeur">
                <h2><span class="legal-num">01</span> Éditeur du site</h2>
                <p>Le site <strong>autovalley.ma</strong> est édité par :</p>
                <ul>
                  <li><strong>Dénomination sociale :</strong> AutoValley SARL</li>
                  <li><strong>Siège social :</strong> Sapino, Nouaceur – Casablanca, Maroc</li>
                  <li><strong>Téléphone :</strong> <a href="tel:+212600000000">+212 6 00 00 00 00</a></li>
                  <li><strong>Email :</strong> <a href="mailto:contact@autovalley.ma">contact@autovalley.ma</a></li>
                  <li><strong>Registre du Commerce :</strong> RC Casablanca n° 000000</li>
                  <li><strong>Identifiant fiscal (IF) :</strong> 00000000</li>
                  <li><strong>Directeur de la publication :</strong> Direction AutoValley</li>
                </ul>
              </div>

              <div class="legal-section" id="hebergeur">
                <h2><span class="legal-num">02</span> Hébergement</h2>
                <p>Le site est hébergé par :</p>
                <ul>
                  <li><strong>Hébergeur :</strong> Prestataire d'hébergement web</li>
                  <li><strong>Adresse :</strong> Maroc / Union Européenne</li>
                </ul>
                <p>
                  En cas de demande relative à l'hébergement du site, vous pouvez nous contacter
                  à l'adresse <a href="mailto:contact@autovalley.ma">contact@autovalley.ma</a>.
                </p>
              </div>

              <div class="legal-section" id="propriete">
                <h2><span class="legal-num">03</span> Propriété intellectuelle</h2>
                <p>
                  L'ensemble du contenu de ce site (textes, images, graphismes, logos, icônes,
                  vidéos, sons, mise en page) est la propriété exclusive d'AutoValley ou de ses
                  partenaires et est protégé par les lois marocaines et internationales relatives
                  à la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation ou
                  exploitation de tout ou partie des éléments du site est strictement interdite
                  sans l'accord préalable écrit d'AutoValley.
                </p>
                <p>
                  Les marques et logos figurant sur le site sont des marques déposées.
                  Leur utilisation sans autorisation expresse est susceptible de constituer
                  une contrefaçon au sens des articles pertinents de la loi marocaine.
                </p>
              </div>

              <div class="legal-section" id="responsabilite">
                <h2><span class="legal-num">04</span> Limitation de responsabilité</h2>
                <p>
                  AutoValley s'efforce de fournir sur ce site des informations aussi précises
                  que possible. Toutefois, il ne pourra être tenu responsable des omissions,
                  inexactitudes et carences dans la mise à jour, qu'elles soient de son fait
                  ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p>
                  AutoValley décline toute responsabilité pour tout dommage résultant d'une
                  intrusion frauduleuse d'un tiers ayant entraîné une modification des
                  informations mises à disposition sur le site.
                </p>
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et
                  le site remis à jour à différentes périodes de l'année, mais peut toutefois
                  contenir des inexactitudes ou des omissions.
                </p>
              </div>

              <div class="legal-section" id="donnees">
                <h2><span class="legal-num">05</span> Données personnelles</h2>
                <p>
                  Dans le cadre de l'utilisation de ce site, AutoValley est susceptible de
                  collecter des données personnelles vous concernant. Le traitement de ces
                  données est détaillé dans notre
                  <a href="./politique-confidentialite.php">Politique de confidentialité</a>.
                </p>
                <p>
                  Conformément à la loi marocaine 09-08 relative à la protection des
                  personnes physiques à l'égard du traitement des données à caractère
                  personnel, vous disposez d'un droit d'accès, de rectification, d'opposition
                  et de suppression des données vous concernant.
                </p>
                <div class="legal-contact-box">
                  <p><strong>Pour exercer vos droits :</strong></p>
                  <p>Par email : <a href="mailto:privacy@autovalley.ma">privacy@autovalley.ma</a></p>
                  <p>Par courrier : AutoValley, Sapino, Nouaceur – Casablanca, Maroc</p>
                </div>
              </div>

              <div class="legal-section" id="cookies">
                <h2><span class="legal-num">06</span> Cookies</h2>
                <p>
                  Le site autovalley.ma peut utiliser des cookies pour améliorer l'expérience
                  utilisateur. En naviguant sur ce site, vous acceptez l'utilisation de cookies
                  conformément à notre politique de gestion des cookies.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies, sachant
                  que cela peut altérer certaines fonctionnalités du site.
                </p>
                <button class="cookie-manage-btn" type="button" aria-label="Gérer les préférences de cookies">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
                  </svg>
                  Gérer mes préférences cookies
                </button>
              </div>

              <div class="legal-section" id="liens">
                <h2><span class="legal-num">07</span> Liens hypertextes</h2>
                <p>
                  Le site autovalley.ma peut contenir des liens hypertextes vers d'autres sites.
                  AutoValley n'exerce aucun contrôle sur ces sites et décline toute responsabilité
                  quant à leur contenu.
                </p>
                <p>
                  La création de liens vers le site autovalley.ma est autorisée sous réserve
                  que ces liens ne portent pas atteinte à l'image d'AutoValley et qu'ils soient
                  clairement identifiés comme tels.
                </p>
              </div>

              <div class="legal-section" id="droit">
                <h2><span class="legal-num">08</span> Droit applicable et juridiction compétente</h2>
                <p>
                  Les présentes mentions légales sont régies par le droit marocain.
                  En cas de litige et à défaut de résolution amiable, les tribunaux
                  compétents de Casablanca seront seuls compétents.
                </p>
                <p>
                  Pour toute question relative aux présentes mentions légales, vous pouvez
                  nous contacter à l'adresse <a href="mailto:contact@autovalley.ma">contact@autovalley.ma</a>.
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

    <script type="module" src="./style/js/premium-effects.js"></script>
    <script type="module" src="./style/js/pages-common.js"></script>
  </body>
</html>
