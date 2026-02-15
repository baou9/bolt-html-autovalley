    <header class="site-header">
      <div class="header-glass-container">
        <div class="logo-wrapper">
          <a href="./index.php" aria-label="Retour à l'accueil">
            <img src="https://avhtml.anyapi.ma/public/Converted-PNG.png"
                 alt="AutoValley – Full Car Service"
                 class="logo-img">
          </a>
        </div>

        <nav class="desktop-nav" aria-label="Navigation principale">
          <ul class="nav-links">
            <li><a href="./index.php" class="nav-link">Accueil</a></li>
            <li><a href="./services.php" class="nav-link">Services</a></li>
            <li><a href="./index.php#apropos" class="nav-link">À propos</a></li>
            <li><a href="./blog.php" class="nav-link">Blog</a></li>
            <li><a href="./index.php#carrieres" class="nav-link">Carrières</a></li>
            <li><a href="./index.php#faq" class="nav-link">FAQ</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <div class="lang-switcher">
            <label class="sr-only" for="header-language-select">Langue du site</label>
            <select
              id="header-language-select"
              class="lang-select"
              aria-label="Choisir la langue du site"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>

          <a href="./index.php#rdv" class="btn-header-magnetic">
            <span>Prendre RDV</span>
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
        <ul>
          <li style="--delay: 0.1s"><a href="./index.php" class="mobile-link">Accueil</a></li>
          <li style="--delay: 0.2s"><a href="./services.php" class="mobile-link">Services</a></li>
          <li style="--delay: 0.3s"><a href="./index.php#apropos" class="mobile-link">À propos</a></li>
          <li style="--delay: 0.4s"><a href="./blog.php" class="mobile-link">Blog</a></li>
          <li style="--delay: 0.5s"><a href="./index.php#carrieres" class="mobile-link">Carrières</a></li>
          <li style="--delay: 0.6s"><a href="./index.php#faq" class="mobile-link">FAQ</a></li>
        </ul>

        <div class="mobile-cta" style="--delay: 0.7s">
          <a href="./index.php#rdv" class="btn-mobile">Prendre RDV</a>
        </div>
      </nav>
    </div>
