<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog Entretien Automobile | AutoValley Casablanca</title>
    <meta name="description" content="Conseils d'entretien automobile, diagnostic et bonnes pratiques pour prolonger la durée de vie de votre véhicule à Casablanca." />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./header-responsive.css">
    <link rel="stylesheet" href="./header-styles.css">
  </head>
  <body class="blog-page">
    <?php
    $partialsCandidates = [
      __DIR__ . '/partials',
      dirname(__DIR__) . '/partials',
    ];
    $partialsDir = is_dir($partialsCandidates[0]) ? $partialsCandidates[0] : $partialsCandidates[1];
    ?>

    <a href="#main" class="skip-link">Aller au contenu principal</a>

    <?php include $partialsDir . '/header.php'; ?>

    <main id="main">
      <section class="blog-section" aria-labelledby="blog-title">
        <div class="blog-section__inner">
          <header class="blog-section__header">
            <p class="section-kicker">RESSOURCES</p>
            <h1 id="blog-title" class="blog-section__title">Blog AutoValley</h1>
            <p class="blog-section__subtitle">Guides pratiques et points de contrôle pour entretenir votre véhicule au quotidien.</p>
          </header>

          <div class="blog-grid">
            <article class="blog-card blog-card--featured">
              <a class="blog-card__media" href="#" aria-label="Lire l'article Préparer sa voiture avant un long trajet">
                <img
                  src="https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1280"
                  alt="Technicien réalisant un contrôle complet avant départ"
                  loading="lazy"
                  width="1280"
                  height="853"
                />
              </a>
              <div class="blog-card__content">
                <span class="blog-card__category">Entretien</span>
                <h2 class="blog-card__title"><a href="#">Préparer sa voiture avant un long trajet</a></h2>
                <p class="blog-card__excerpt">Une checklist simple pour vérifier les niveaux, la pression des pneus et les points de sécurité avant la route.</p>
                <div class="blog-card__meta">
                  <time datetime="2026-02-10">10 fév 2026</time>
                  <span aria-hidden="true">•</span>
                  <span>6 min de lecture</span>
                </div>
                <a class="blog-card__cta" href="#">Lire l'article</a>
              </div>
            </article>

            <article class="blog-card">
              <a class="blog-card__media" href="#" aria-label="Lire l'article Comprendre les voyants moteur">
                <img
                  src="https://images.pexels.com/photos/4489709/pexels-photo-4489709.jpeg?auto=compress&cs=tinysrgb&w=960"
                  alt="Tableau de bord automobile avec voyants allumés"
                  loading="lazy"
                  width="960"
                  height="640"
                />
              </a>
              <div class="blog-card__content">
                <span class="blog-card__category">Diagnostic</span>
                <h2 class="blog-card__title"><a href="#">Comprendre les voyants moteur sans stress</a></h2>
                <p class="blog-card__excerpt">Ce que signifient les principaux témoins et quand planifier une vérification atelier.</p>
                <div class="blog-card__meta">
                  <time datetime="2026-02-03">3 fév 2026</time>
                  <span aria-hidden="true">•</span>
                  <span>4 min de lecture</span>
                </div>
                <a class="blog-card__cta" href="#">Lire l'article</a>
              </div>
            </article>

            <article class="blog-card">
              <a class="blog-card__media" href="#" aria-label="Lire l'article Fréquence de vidange">
                <img
                  src="https://images.pexels.com/photos/3807330/pexels-photo-3807330.jpeg?auto=compress&cs=tinysrgb&w=960"
                  alt="Vidange moteur avec huile neuve"
                  loading="lazy"
                  width="960"
                  height="640"
                />
              </a>
              <div class="blog-card__content">
                <span class="blog-card__category">Mécanique</span>
                <h2 class="blog-card__title"><a href="#">À quelle fréquence faire la vidange ?</a></h2>
                <p class="blog-card__excerpt">Repères par kilométrage et par usage pour préserver le moteur dans de bonnes conditions.</p>
                <div class="blog-card__meta">
                  <time datetime="2026-01-28">28 jan 2026</time>
                  <span aria-hidden="true">•</span>
                  <span>5 min de lecture</span>
                </div>
                <a class="blog-card__cta" href="#">Lire l'article</a>
              </div>
            </article>

            <article class="blog-card">
              <a class="blog-card__media" href="#" aria-label="Lire l'article Entretien climatisation">
                <img
                  src="https://images.pexels.com/photos/6873110/pexels-photo-6873110.jpeg?auto=compress&cs=tinysrgb&w=960"
                  alt="Contrôle du système de climatisation d'un véhicule"
                  loading="lazy"
                  width="960"
                  height="640"
                />
              </a>
              <div class="blog-card__content">
                <span class="blog-card__category">Confort</span>
                <h2 class="blog-card__title"><a href="#">Entretien climatisation: les bons réflexes</a></h2>
                <p class="blog-card__excerpt">Filtre habitacle, recharge gaz et contrôle antibactérien: les étapes utiles avant l'été.</p>
                <div class="blog-card__meta">
                  <time datetime="2026-01-20">20 jan 2026</time>
                  <span aria-hidden="true">•</span>
                  <span>3 min de lecture</span>
                </div>
                <a class="blog-card__cta" href="#">Lire l'article</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <?php include $partialsDir . '/footer.php'; ?>
  </body>
</html>
