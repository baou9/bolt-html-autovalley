<?php
$pageTitle = 'Article Template';
?><!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
  <meta name="description" content="Long-form article template with reading progress and sticky table of contents." />
  <style>
    :root {
      --surface: #ffffff;
      --surface-muted: #f8f9fb;
      --text-primary: #111827;
      --text-muted: #4b5563;
      --border: #e5e7eb;
      --accent: #1d4ed8;
      --accent-soft: #dbeafe;
      --focus-ring: #2563eb;
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 20px;
      --space-6: 24px;
      --space-8: 32px;
      --space-10: 40px;
      --space-12: 48px;
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
      --max-width: 1200px;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      color: var(--text-primary);
      background: var(--surface);
      font-family: Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.65;
    }

    body {
      min-height: 100vh;
    }

    /* [PATCH] Top reading progress indicator driven by scroll position. */
    .reading-progress {
      position: fixed;
      inset: 0 0 auto;
      height: var(--space-1);
      width: 100%;
      background: var(--surface-muted);
      z-index: 1000;
    }

    .reading-progress__bar {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, var(--accent), #1e40af);
      transition: width 0.12s linear;
    }

    .article-shell {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: calc(var(--space-12) + var(--space-4)) var(--space-4) var(--space-12);
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .article-main {
      min-width: 0;
    }

    .article-header {
      margin-bottom: var(--space-10);
      border-bottom: 1px solid var(--border);
      padding-bottom: var(--space-6);
    }

    .article-kicker {
      margin: 0 0 var(--space-3);
      color: var(--text-muted);
      font-size: 0.875rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 var(--space-4);
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .article-dek {
      margin: 0 0 var(--space-5);
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 70ch;
    }

    .article-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4);
      margin: 0;
      padding: 0;
      list-style: none;
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .article-meta strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    .article-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-10);
    }

    .article-section h2,
    .article-section h3 {
      margin: 0 0 var(--space-4);
      scroll-margin-top: calc(var(--space-12) + var(--space-6));
      line-height: 1.25;
    }

    .article-section h2 {
      font-size: clamp(1.4rem, 2.6vw, 2rem);
    }

    .article-section h3 {
      margin-top: var(--space-5);
      font-size: clamp(1.1rem, 2.2vw, 1.45rem);
    }

    .article-section p {
      margin: 0 0 var(--space-4);
      max-width: 72ch;
    }

    .article-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
      align-items: start;
    }

    .article-toc {
      border: 1px solid var(--border);
      border-radius: var(--space-2);
      padding: var(--space-4);
      background: var(--surface-muted);
      box-shadow: var(--shadow-sm);
      align-self: start;
    }

    .article-toc h2 {
      margin: 0 0 var(--space-4);
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-muted);
    }

    .article-toc ol {
      margin: 0;
      padding-left: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .article-toc a {
      color: var(--text-primary);
      text-decoration: none;
      border-radius: var(--space-1);
      padding: var(--space-1) var(--space-2);
      display: inline-block;
    }

    .article-toc a:hover {
      background: #eef2ff;
    }

    .article-toc a:focus-visible {
      outline: 2px solid var(--focus-ring);
      outline-offset: 2px;
      background: #eef2ff;
    }

    .article-toc a[aria-current="true"] {
      background: var(--accent-soft);
      color: var(--accent);
      font-weight: 600;
    }

    @media (min-width: 1024px) {
      .article-layout {
        grid-template-columns: minmax(0, 3fr) minmax(220px, 1fr);
      }

      .article-toc {
        position: sticky;
        top: calc(var(--space-12) + var(--space-4));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }

      .reading-progress__bar {
        transition: none;
      }
    }
  </style>
</head>
<body>
  <div class="reading-progress" role="presentation" aria-hidden="true">
    <div class="reading-progress__bar" id="readingProgressBar"></div>
  </div>

  <main class="article-shell">
    <article class="article-main" aria-labelledby="article-title">
      <header class="article-header">
        <p class="article-kicker">Article Template</p>
        <h1 id="article-title">Long-Form Article Title Placeholder</h1>
        <p class="article-dek">This template includes metadata, a sticky table of contents, and section-aware navigation.</p>
        <ul class="article-meta" aria-label="Article metadata">
          <li><strong>Author:</strong> TODO:[PLACEHOLDER]</li>
          <li><strong>Published:</strong> TODO:[PLACEHOLDER]</li>
          <li><strong>Tags:</strong> TODO:[PLACEHOLDER]</li>
        </ul>
      </header>

      <div class="article-layout">
        <div class="article-body" id="articleContent">
          <section class="article-section" id="introduction">
            <h2>Introduction</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus pretium arcu, non luctus ex aliquet quis. Fusce ac magna in lorem ultricies vestibulum.</p>
            <p>Nulla facilisi. Curabitur eleifend, neque sed iaculis sollicitudin, ante sapien convallis justo, at semper nisl magna id lorem.</p>
          </section>

          <section class="article-section" id="core-concepts">
            <h2>Core Concepts</h2>
            <p>Aliquam erat volutpat. Donec pharetra enim eget mauris gravida, eu consequat mi tristique. Cras et mauris quis nunc feugiat blandit id in ipsum.</p>

            <h3 id="concept-1">Concept One</h3>
            <p>Integer id nunc nec ipsum varius gravida. Quisque congue gravida magna, ac volutpat libero finibus vel.</p>

            <h3 id="concept-2">Concept Two</h3>
            <p>Praesent nec metus non ligula vulputate ullamcorper. Sed dapibus ligula a mi mollis volutpat.</p>
          </section>

          <section class="article-section" id="implementation-details">
            <h2>Implementation Details</h2>
            <p>Vestibulum malesuada semper ullamcorper. Curabitur tincidunt, elit eu iaculis posuere, magna augue ullamcorper erat, at faucibus ipsum ex ut quam.</p>
            <p>Morbi bibendum est vitae sem efficitur, ut ultricies nisl tincidunt. Integer sollicitudin eros at nisl tincidunt luctus.</p>
          </section>

          <section class="article-section" id="summary">
            <h2>Summary</h2>
            <p>Nam eu eros mi. Suspendisse eu diam ullamcorper, venenatis sapien ac, viverra erat. Sed et fermentum urna.</p>
          </section>
        </div>

        <aside class="article-toc" aria-labelledby="toc-title">
          <h2 id="toc-title">On this page</h2>
          <ol>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#core-concepts">Core Concepts</a></li>
            <li><a href="#implementation-details">Implementation Details</a></li>
            <li><a href="#summary">Summary</a></li>
          </ol>
        </aside>
      </div>
    </article>
  </main>

  <script>
    // [PATCH] Update reading progress bar and active table-of-contents link using section intersection.
    (function () {
      const progressBar = document.getElementById('readingProgressBar');
      const article = document.getElementById('articleContent');
      if (!progressBar || !article) {
        return;
      }

      const tocLinks = Array.from(document.querySelectorAll('.article-toc a[href^="#"]'));
      const sections = tocLinks
        .map((link) => {
          const sectionId = link.getAttribute('href')?.slice(1);
          return sectionId ? document.getElementById(sectionId) : null;
        })
        .filter(Boolean);

      const setActiveLink = (sectionId) => {
        tocLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${sectionId}`;
          link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      };

      const updateProgress = () => {
        const rect = article.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        const current = Math.min(Math.max(-rect.top, 0), Math.max(totalScrollable, 0));
        const progress = totalScrollable > 0 ? (current / totalScrollable) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      };

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length > 0) {
            setActiveLink(visible[0].target.id);
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0.2, 0.4, 0.6],
        }
      );

      sections.forEach((section) => observer.observe(section));

      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
      updateProgress();
      if (sections[0]) {
        setActiveLink(sections[0].id);
      }
    })();
  </script>
</body>
</html>
