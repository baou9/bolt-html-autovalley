import { defineConfig } from 'vite';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = resolve(__dirname, '.vite-php-temp');

function extractPageStyles(content) {
  const match = content.match(/\$pageStyles\s*=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const arrayContent = match[1];
  const hrefs = [];
  const re = /['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(arrayContent)) !== null) {
    hrefs.push(m[1]);
  }
  return hrefs;
}

function resolveAvResponsiveImage(content) {
  return content.replace(
    /av_responsive_image\(\s*\[[\s\S]*?'src'\s*=>\s*'([^']+)'[\s\S]*?'alt'\s*=>\s*'([^']*)'[\s\S]*?\]\s*\)\s*;/g,
    (_match, src, alt) => {
      const cleanSrc = src.replace(/&amp;/g, '&');
      const cleanAlt = alt.replace(/&amp;/g, '&');
      return `<img src="${cleanSrc}" alt="${cleanAlt}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">`;
    }
  );
}

function resolvePhpIncludes(content, baseDir) {
  return content.replace(
    /<\?php\s+include\s+(?:__DIR__\s*\.\s*)?["']([^"']+)["']\s*;\s*\?>/g,
    (_match, filePath) => {
      const normalizedPath = filePath.replace(/^\//, '');
      const fullPath = resolve(baseDir, normalizedPath);
      if (existsSync(fullPath)) {
        const partial = readFileSync(fullPath, 'utf-8');
        return resolvePhpIncludes(partial, dirname(fullPath));
      }
      return '';
    }
  );
}

function processPhpContent(content, baseDir, injectViteClient = false) {
  const pageStyles = extractPageStyles(content);

  content = resolveAvResponsiveImage(content);

  content = content.replace(/<\?php[\s\S]*?\?>\s*/g, '');

  content = resolvePhpIncludes(content, baseDir);

  if (pageStyles.length > 0) {
    const linkTags = pageStyles
      .map(href => `    <link rel="stylesheet" href="${href}">`)
      .join('\n');
    content = content.replace('</head>', `${linkTags}\n</head>`);
  }

  if (injectViteClient) {
    content = content.replace(
      '</head>',
      `  <script type="module" src="/@vite/client"></script>\n</head>`
    );
  }

  return content;
}

function buildPhpToHtml() {
  const phpPages = [
    'index',
    'services',
    'blog',
    'article',
    'contact',
    'apropos',
    'faq',
    'carrieres',
    'mentions-legales',
    'politique-confidentialite',
  ];
  const input = {};

  mkdirSync(tempDir, { recursive: true });

  for (const page of phpPages) {
    const phpPath = resolve(__dirname, `${page}.php`);
    if (existsSync(phpPath)) {
      let content = readFileSync(phpPath, 'utf-8');
      content = processPhpContent(content, __dirname, false);
      content = content.replace(/(src|href)="\.\//g, '$1="../');
      const htmlPath = resolve(tempDir, `${page}.html`);
      writeFileSync(htmlPath, content, 'utf-8');
      input[page] = htmlPath;
    }
  }

  return input;
}

function phpPlugin() {
  return {
    name: 'vite-plugin-php',
    enforce: 'pre',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];
        let filePath = null;

        if (url === '/' || url === '/index.php') {
          filePath = resolve(__dirname, 'index.php');
        } else if (url.endsWith('.php')) {
          filePath = resolve(__dirname, url.slice(1));
        }

        if (filePath && existsSync(filePath)) {
          let content = readFileSync(filePath, 'utf-8');
          content = processPhpContent(content, __dirname, true);

          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(content);
          return;
        }

        next();
      });
    }
  };
}

const buildInput = buildPhpToHtml();

export default defineConfig({
  base: './',
  plugins: [phpPlugin()],
  build: {
    rollupOptions: {
      input: buildInput
    }
  },
  server: {
    open: '/index.php'
  }
});
