<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog AutoValley | Conseils et actualités automobile à Casablanca</title>
    <meta
      name="description"
      content="Consultez les derniers articles AutoValley sur l'entretien automobile, la carrosserie, le diagnostic et les bonnes pratiques pour votre véhicule à Casablanca."
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="./style.css" />
    <link rel="stylesheet" href="./header-responsive.css" />
    <link rel="stylesheet" href="./header-styles.css" />
    <link rel="stylesheet" href="./premium-styles.css" />
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
      <section aria-labelledby="blog-title">
        <header>
          <h1 id="blog-title">Blog AutoValley</h1>
          <p>
            Retrouvez nos articles pour mieux comprendre l'entretien automobile, les interventions
            de carrosserie et les points de contrôle essentiels pour votre véhicule.
          </p>
        </header>

        <article>
          <h2>Quand réaliser un diagnostic électronique complet&nbsp;?</h2>
          <p>
            Un diagnostic est recommandé dès l'apparition d'un voyant, d'une perte de performance
            ou d'un comportement inhabituel. Une lecture précoce des défauts limite les pannes plus
            coûteuses et facilite une intervention ciblée.
          </p>
        </article>

        <article>
          <h2>Entretien périodique&nbsp;: les points à ne pas négliger</h2>
          <p>
            Le suivi des vidanges, filtres, freins et pneumatiques contribue à la fiabilité du
            véhicule. Respecter les intervalles constructeur aide à préserver les performances et la
            sécurité au quotidien.
          </p>
        </article>

        <article>
          <h2>Carrosserie et peinture&nbsp;: comment préserver la finition</h2>
          <p>
            Un lavage adapté, la correction rapide des impacts et l'utilisation de produits non
            abrasifs permettent de conserver l'aspect d'origine. En cas de choc, une réparation
            structurée évite la dégradation progressive des éléments.
          </p>
        </article>
      </section>
    </main>

    <?php include $partialsDir . '/footer.php'; ?>
    <script type="module" src="./nav-active.js"></script>
  </body>
</html>
