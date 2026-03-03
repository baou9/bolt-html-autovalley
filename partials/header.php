    <div class="bg-3d" aria-hidden="true">
      <div class="haze"></div>
      <div class="plane"></div>
    </div>
    <div class="grain" aria-hidden="true"></div>

    <header class="site-header">
      <div class="header-glass-container">
        <div class="logo-wrapper">
          <a href="./index.php" aria-label="Retour à l'accueil">
            <img src="./style/images/Converted-PNG.png"
                 alt="AutoValley - Full Car Service"
                 class="logo-img">
          </a>
        </div>

        <nav class="desktop-nav" aria-label="Navigation principale">
          <ul class="nav-links">
            <li><a href="./index.php" class="nav-link" data-nav-key="home">Accueil</a></li>
            <li><a href="./services.php" class="nav-link" data-nav-key="services">Services</a></li>
            <li><a href="./apropos.php" class="nav-link" data-nav-key="about">À propos</a></li>
            <li><a href="./blog.php" class="nav-link" data-nav-key="blog">Blog</a></li>
            <li><a href="./carrieres.php" class="nav-link" data-nav-key="careers">Carrières</a></li>
            <li><a href="./faq.php" class="nav-link" data-nav-key="faq">FAQ</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <div class="lang-switcher">
            <label class="sr-only" for="header-language-select">Langue du site</label>
            <select
              id="header-language-select"
              class="lang-select"
              aria-label="Choisir la langue du site"
              data-language-routes="{}"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>

          <a href="./contact.php" class="btn-header-magnetic">
            <span>Prendre rendez-vous</span>
            <span class="btn-shimmer" aria-hidden="true"></span>
          </a>

          <button
              class="menu-trigger"
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded="false"
              aria-controls="mobile-nav"
          >
            <span class="hamburger">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-nav-overlay" aria-hidden="true">
      <nav class="mobile-nav-content" id="mobile-nav" aria-label="Navigation mobile">
        <button class="mobile-nav-close" type="button" aria-label="Fermer le menu mobile">Fermer</button>
        <ul>
          <li style="--delay: 0.1s"><a href="./index.php" class="mobile-link" data-nav-key="home">Accueil</a></li>
          <li style="--delay: 0.2s"><a href="./services.php" class="mobile-link" data-nav-key="services">Services</a></li>
          <li style="--delay: 0.3s"><a href="./apropos.php" class="mobile-link" data-nav-key="about">À propos</a></li>
          <li style="--delay: 0.4s"><a href="./blog.php" class="mobile-link" data-nav-key="blog">Blog</a></li>
          <li style="--delay: 0.5s"><a href="./carrieres.php" class="mobile-link" data-nav-key="careers">Carrières</a></li>
          <li style="--delay: 0.6s"><a href="./faq.php" class="mobile-link" data-nav-key="faq">FAQ</a></li>
        </ul>

        <div class="mobile-cta" style="--delay: 0.7s">
          <a href="./contact.php" class="btn-mobile">Prendre RDV</a>
        </div>
      </nav>
    </div>
