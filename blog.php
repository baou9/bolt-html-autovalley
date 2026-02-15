<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Académie AutoValley | Blog</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./header-responsive.css">
    <link rel="stylesheet" href="./header-styles.css">
    <link rel="stylesheet" href="./premium-styles.css">
  </head>
  <body>
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
      <section class="blog-hero" aria-labelledby="blog-hero-title">
        <div class="blog-hero__inner">
          <div class="blog-hero__content">
            <h1 class="blog-hero__title" id="blog-hero-title">Académie AutoValley</h1>
            <p class="blog-hero__mission">
              Ressources éditoriales pour expliquer les bonnes pratiques d’entretien, de diagnostic et de réparation automobile avec une approche claire et utile.
            </p>

            <div class="blog-hero__controls" aria-label="Filtres du blog">
              <div class="blog-hero__categories" role="group" aria-label="Catégories d’articles">
                <button type="button" class="blog-hero__category is-active" data-category="all">Tous</button>
                <button type="button" class="blog-hero__category" data-category="diagnostic">Diagnostic</button>
                <button type="button" class="blog-hero__category" data-category="carrosserie">Carrosserie</button>
                <button type="button" class="blog-hero__category" data-category="assurance">Assurance</button>
                <button type="button" class="blog-hero__category" data-category="entretien">Entretien</button>
              </div>

              <label class="blog-hero__search-wrap">
                <span class="blog-hero__search-label">Rechercher</span>
                <input
                  type="search"
                  class="blog-hero__search"
                  name="blog-search"
                  aria-label="Rechercher un article de l’Académie AutoValley"
                  placeholder="Rechercher un article"
                />
              </label>
            </div>
          </div>

          <div class="blog-hero__media" aria-hidden="true">
            <div class="blog-hero__media-placeholder">Visuel éditorial</div>
          </div>
        </div>
      </section>
    </main>

    <?php include $partialsDir . '/footer.php'; ?>
  </body>
</html>
