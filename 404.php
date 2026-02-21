<?php
http_response_code(404);
$metaTitle = 'Page introuvable | AutoValley';
$metaDescription = "La page que vous recherchez n'existe pas. Retournez à l'accueil ou consultez nos services AutoValley à Casablanca.";
$metaRobots = 'noindex,follow';
$ogType = 'website';
$metaImagePath = '/public/Converted-PNG2.png';
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
      <section class="pg-hero pg-hero--compact" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:70vh;padding:160px 24px 80px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(185,5,4,0.18) 0%, rgba(5,6,9,0) 70%);pointer-events:none;" aria-hidden="true"></div>
        <div style="position:relative;z-index:1;max-width:600px;margin:0 auto;">
          <p style="font-size:7rem;font-weight:800;font-family:'Montserrat',sans-serif;color:var(--brand-red);line-height:1;margin-bottom:16px;opacity:0.9;">404</p>
          <h1 style="font-size:var(--font-size-h2);font-family:'Montserrat',sans-serif;font-weight:700;color:var(--text-white);margin-bottom:16px;line-height:1.2;">Page introuvable</h1>
          <p style="font-size:var(--font-size-body);color:rgba(255,255,255,0.7);margin-bottom:40px;line-height:1.6;">La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou consultez nos services.</p>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
            <a href="./index.php" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:var(--brand-red);color:#fff;font-weight:600;font-size:0.95rem;border-radius:8px;text-decoration:none;transition:opacity 0.2s;">
              Retour à l'accueil
            </a>
            <a href="./services.php" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.85);font-weight:500;font-size:0.95rem;border-radius:8px;text-decoration:none;transition:opacity 0.2s;">
              Voir nos services
            </a>
          </div>
        </div>
      </section>
    </main>

    <?php include __DIR__ . "/partials/footer.php"; ?>

    <script type="module" src="./style/js/nav-active.js"></script>
</body>
</html>
