<?php
$metaTitle = 'Blog entretien auto | AutoValley Casablanca';
$metaDescription = "Lisez les articles AutoValley pour comprendre l’entretien, le diagnostic et la réparation automobile à Casablanca.";
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
$pageStyles = [
    './style/css/style.css',
    './style/css/header-styles.css',
    './style/css/header-responsive.css',
    './style/css/premium-styles.css',
    './style/css/blog-styles.css'
];
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$articleUrl = sprintf('%s://%s/article.php', $scheme, $host);

$structuredData = [[
    '@context' => 'https://schema.org',
    '@type' => 'ItemList',
    'name' => 'Articles AutoValley',
    'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'url' => $articleUrl, 'name' => 'Comment lire un rapport de diagnostic comme un pro'],
        ['@type' => 'ListItem', 'position' => 2, 'url' => $articleUrl, 'name' => 'Peinture constructeur : le processus explique etape par etape'],
        ['@type' => 'ListItem', 'position' => 3, 'url' => $articleUrl, 'name' => "Les 5 verifications essentielles avant l'hiver"],
        ['@type' => 'ListItem', 'position' => 4, 'url' => $articleUrl, 'name' => 'Hybrides et electriques : ce qui change en atelier'],
        ['@type' => 'ListItem', 'position' => 5, 'url' => $articleUrl, 'name' => 'Assurance sinistre : vos droits en 5 points cles'],
        ['@type' => 'ListItem', 'position' => 6, 'url' => $articleUrl, 'name' => "Climatisation auto : pourquoi l'entretenir chaque annee"],
        ['@type' => 'ListItem', 'position' => 7, 'url' => $articleUrl, 'name' => 'ADAS et calibration : la securite invisible de votre vehicule'],
        ['@type' => 'ListItem', 'position' => 8, 'url' => $articleUrl, 'name' => 'Guide : votre premiere visite chez AutoValley'],
        ['@type' => 'ListItem', 'position' => 9, 'url' => $articleUrl, 'name' => 'Tendances auto 2025 au Maroc : ce qui va changer'],
    ],
]];

$headExtra = <<<HTML
<script>
      (function(){var t=localStorage.getItem('av-theme');if(t)document.documentElement.setAttribute('data-theme',t)})();
    </script>
HTML;
?>
<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <?php include __DIR__ . '/partials/head.php'; ?>
  </head>
<body class="blog-page">
    <a href="#main" class="skip-link">Aller au contenu principal</a>

    <?php include __DIR__ . "/partials/header.php"; ?>

    <main id="main">

      <section class="blog-hero">
        <div class="blog-hero__shapes" aria-hidden="true">
          <div class="blog-hero__shape blog-hero__shape--1"></div>
          <div class="blog-hero__shape blog-hero__shape--2"></div>
          <div class="blog-hero__shape blog-hero__shape--3"></div>
        </div>

        <div class="blog-hero__inner">
          <p class="blog-hero__eyebrow">
            <span class="blog-hero__eyebrow-line" aria-hidden="true"></span>
            LE BLOG AUTOVALLEY
          </p>
          <h1 class="blog-hero__title">
            Articles sur l’entretien<br>
            <span class="blog-hero__title-accent">et la réparation automobile.</span>
          </h1>
          <p class="blog-hero__subtitle">
            Contenus pratiques pour comprendre le diagnostic, la carrosserie,
            l’entretien courant et les démarches liées au véhicule.
          </p>

          <div class="blog-hero__controls">
            <div class="blog-filters" role="tablist" aria-label="Filtrer par categorie" id="blog-filters">
              <button class="blog-filter-btn is-active" role="tab" aria-selected="true" data-filter="tous" type="button">Tous</button>
              <button class="blog-filter-btn" role="tab" aria-selected="false" data-filter="Diagnostic" type="button">Diagnostic</button>
              <button class="blog-filter-btn" role="tab" aria-selected="false" data-filter="Carrosserie" type="button">Carrosserie</button>
              <button class="blog-filter-btn" role="tab" aria-selected="false" data-filter="Entretien" type="button">Entretien</button>
              <button class="blog-filter-btn" role="tab" aria-selected="false" data-filter="Performance" type="button">Performance</button>
              <button class="blog-filter-btn" role="tab" aria-selected="false" data-filter="Conseils" type="button">Conseils</button>
              <button class="blog-filter-btn" role="tab" aria-selected="false" data-filter="Actualites" type="button">Actualites</button>
            </div>

            <div class="blog-search">
              <svg class="blog-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="search"
                class="blog-search__input"
                id="blog-search"
                placeholder="Rechercher un article..."
                aria-label="Rechercher un article"
              />
            </div>
          </div>
        </div>
      </section>

      <hr class="blog-divider" aria-hidden="true">

      <section class="blog-content">
        <div class="blog-content__inner">

          <div class="blog-grid" id="blog-grid">

            <article class="blog-card blog-card--featured" data-category="Diagnostic">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/6870333/pexels-photo-6870333.jpeg?auto=compress&cs=tinysrgb&w=1200', 'alt' => 'Technicien effectuant un diagnostic electronique sur vehicule', 'width' => 600, 'height' => 380, 'loading' => 'eager', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw', 'fetchpriority' => 'high']); ?>
                <span class="blog-card__category">Diagnostic</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Comment lire un rapport de diagnostic comme un pro</h2>
                <p class="blog-card__excerpt">
                  Decrypter les codes defauts, distinguer critique vs preventif, et decider des priorites
                  sans perdre en garantie. Le guide complet de nos techniciens.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Nov 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    8 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Comment lire un rapport de diagnostic comme un pro"></a>
            </article>

            <article class="blog-card" data-category="Carrosserie">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/8986117/pexels-photo-8986117.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Travaux de carrosserie et peinture en cabine', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Carrosserie</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Peinture constructeur : le processus explique etape par etape</h2>
                <p class="blog-card__excerpt">
                  Preparation des panneaux, lecture du spectro, melange controle et vernis pour restituer la teinte d'origine.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Oct 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    6 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Peinture constructeur expliquee"></a>
            </article>

            <article class="blog-card" data-category="Entretien">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/4489710/pexels-photo-4489710.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Mecanicien effectuant une revision complete', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Entretien</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Les 5 verifications essentielles avant l'hiver</h2>
                <p class="blog-card__excerpt">
                  Batterie, pneus, liquides, freins et eclairage : le checklist complet pour affronter la saison froide.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Nov 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    4 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Les 5 verifications avant l'hiver"></a>
            </article>

            <article class="blog-card" data-category="Performance">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Vehicule hybride en cours de maintenance', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Performance</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Hybrides et electriques : ce qui change en atelier</h2>
                <p class="blog-card__excerpt">
                  Habilitations, batteries haute tension, protocoles specifiques. Tour d'horizon des evolutions.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Sep 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    7 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Hybrides et electriques en atelier"></a>
            </article>

            <article class="blog-card" data-category="Conseils">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Expert automobile examinant un dossier sinistre', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Conseils</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Assurance sinistre : vos droits en 5 points cles</h2>
                <p class="blog-card__excerpt">
                  Pieces d'origine, delais engages et controle qualite documente pour defendre la valeur residuelle.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Oct 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    5 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Assurance sinistre vos droits"></a>
            </article>

            <article class="blog-card" data-category="Entretien">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/4480500/pexels-photo-4480500.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Systeme de climatisation automobile', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Entretien</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Climatisation auto : pourquoi l'entretenir chaque annee</h2>
                <p class="blog-card__excerpt">
                  Recharge, traitement anti-odeurs et qualite de l'air : les cles d'un confort durable.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Aou 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    4 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Climatisation auto entretien annuel"></a>
            </article>

            <article class="blog-card" data-category="Performance">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/8986064/pexels-photo-8986064.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Calibration ADAS et systemes de securite avances', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Performance</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">ADAS et calibration : la securite invisible de votre vehicule</h2>
                <p class="blog-card__excerpt">
                  Comprendre les systemes d'aide a la conduite et pourquoi leur calibration est critique apres chaque intervention.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Sep 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    6 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : ADAS et calibration"></a>
            </article>

            <article class="blog-card" data-category="Conseils">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Accueil client dans un atelier automobile premium', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Conseils</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Guide : votre premiere visite chez AutoValley</h2>
                <p class="blog-card__excerpt">
                  Ce a quoi vous attendre, de la prise de rendez-vous a la restitution de votre vehicule.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Nov 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    3 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Guide premiere visite AutoValley"></a>
            </article>

            <article class="blog-card" data-category="Actualites">
              <div class="blog-card__media">
                <?php av_responsive_image(['src' => 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', 'alt' => 'Voitures neuves au salon automobile', 'width' => 400, 'height' => 220, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(max-width: 768px) 100vw, 400px']); ?>
                <span class="blog-card__category">Actualites</span>
              </div>
              <div class="blog-card__body">
                <h2 class="blog-card__title">Tendances auto 2025 au Maroc : ce qui va changer</h2>
                <p class="blog-card__excerpt">
                  Electrification, nouvelles normes et evolution du marche. Le point sur les tendances qui impactent l'apres-vente.
                </p>
                <div class="blog-card__meta">
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Jul 2025
                  </span>
                  <span class="blog-card__meta-item">
                    <svg class="blog-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    5 min
                  </span>
                </div>
                <div class="blog-card__read-indicator" aria-hidden="true"></div>
              </div>
              <a href="./article.php" class="blog-card__link" aria-label="Lire : Tendances auto 2025 au Maroc"></a>
            </article>

            <div class="blog-empty" id="blog-empty" style="display:none">
              <p class="blog-empty__title">Aucun article trouve</p>
              <p class="blog-empty__text">Essayez une autre categorie ou modifiez votre recherche.</p>
            </div>

          </div>

          <aside class="blog-sidebar">

            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Tendances</h3>
              <ol class="trending-list">
                <li class="trending-item">
                  <span class="trending-item__rank">01</span>
                  <div class="trending-item__content">
                    <a href="./article.php" class="trending-item__title">Comment lire un rapport diagnostic</a>
                    <span class="trending-item__views">2,4k vues</span>
                  </div>
                </li>
                <li class="trending-item">
                  <span class="trending-item__rank">02</span>
                  <div class="trending-item__content">
                    <a href="./article.php" class="trending-item__title">Peinture constructeur expliquee</a>
                    <span class="trending-item__views">1,8k vues</span>
                  </div>
                </li>
                <li class="trending-item">
                  <span class="trending-item__rank">03</span>
                  <div class="trending-item__content">
                    <a href="./article.php" class="trending-item__title">5 verifications avant l'hiver</a>
                    <span class="trending-item__views">1,5k vues</span>
                  </div>
                </li>
                <li class="trending-item">
                  <span class="trending-item__rank">04</span>
                  <div class="trending-item__content">
                    <a href="./article.php" class="trending-item__title">Hybrides : ce qui change</a>
                    <span class="trending-item__views">1,2k vues</span>
                  </div>
                </li>
              </ol>
            </div>

            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Nos services</h3>
              <div class="sidebar-service-cards">
                <a href="./services.php" class="sidebar-service-card">
                  <span class="sidebar-service-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  </span>
                  <span class="sidebar-service-card__text">
                    <span class="sidebar-service-card__name">Diagnostic &amp; Mecanique</span>
                    <span class="sidebar-service-card__desc">Analyse multi-marques</span>
                  </span>
                </a>
                <a href="./services.php" class="sidebar-service-card">
                  <span class="sidebar-service-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>
                  <span class="sidebar-service-card__text">
                    <span class="sidebar-service-card__name">Carrosserie &amp; Peinture</span>
                    <span class="sidebar-service-card__desc">Finition constructeur</span>
                  </span>
                </a>
                <a href="./services.php" class="sidebar-service-card">
                  <span class="sidebar-service-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></svg>
                  </span>
                  <span class="sidebar-service-card__text">
                    <span class="sidebar-service-card__name">Entretien &amp; Revision</span>
                    <span class="sidebar-service-card__desc">Plans personnalises</span>
                  </span>
                </a>
              </div>
            </div>

            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Archives</h3>
              <ul class="sidebar-archive" id="sidebar-archive">
                <li class="sidebar-archive__item">
                  <button class="sidebar-archive__trigger" type="button" aria-expanded="false">
                    <span>Novembre 2025</span>
                    <svg class="sidebar-archive__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="sidebar-archive__panel">
                    <ul class="sidebar-archive__links">
                      <li><a href="./article.php" class="sidebar-archive__link">Comment lire un rapport diagnostic</a></li>
                      <li><a href="./article.php" class="sidebar-archive__link">5 verifications avant l'hiver</a></li>
                      <li><a href="./article.php" class="sidebar-archive__link">Guide premiere visite AutoValley</a></li>
                    </ul>
                  </div>
                </li>
                <li class="sidebar-archive__item">
                  <button class="sidebar-archive__trigger" type="button" aria-expanded="false">
                    <span>Octobre 2025</span>
                    <svg class="sidebar-archive__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="sidebar-archive__panel">
                    <ul class="sidebar-archive__links">
                      <li><a href="./article.php" class="sidebar-archive__link">Peinture constructeur expliquee</a></li>
                      <li><a href="./article.php" class="sidebar-archive__link">Assurance sinistre : vos droits</a></li>
                    </ul>
                  </div>
                </li>
                <li class="sidebar-archive__item">
                  <button class="sidebar-archive__trigger" type="button" aria-expanded="false">
                    <span>Septembre 2025</span>
                    <svg class="sidebar-archive__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="sidebar-archive__panel">
                    <ul class="sidebar-archive__links">
                      <li><a href="./article.php" class="sidebar-archive__link">Hybrides et electriques en atelier</a></li>
                      <li><a href="./article.php" class="sidebar-archive__link">ADAS et calibration</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

          </aside>

        </div>
      </section>

    </main>

    <?php include __DIR__ . "/partials/footer-cta.php"; ?>
    <?php include __DIR__ . "/partials/footer.php"; ?>
    <?php include __DIR__ . "/partials/mobile-float-cta.php"; ?>

    <script type="module" src="./style/js/nav-active.js"></script>
    <script type="module" src="./style/js/premium-effects.js"></script>
    <script type="module" src="./style/js/blog.js"></script>
  </body>
</html>
