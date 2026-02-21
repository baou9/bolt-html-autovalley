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

function extractMetaTitle(content) {
  const match = content.match(/\$metaTitle\s*=\s*['"]([^'"]+)['"]/);
  return match ? match[1] : 'AutoValley';
}

function extractMetaDescription(content) {
  const match = content.match(/\$metaDescription\s*=\s*["']([^"']+)["']/);
  return match ? match[1] : '';
}

function buildStaticHead(pageStyles, title, description, injectViteClient) {
  const styleLinks = pageStyles.map(href => `    <link rel="stylesheet" href="${href}">`).join('\n');
  const viteClient = injectViteClient ? `    <script type="module" src="/@vite/client"></script>` : '';

  return `
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./style/images/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
${styleLinks}
${viteClient}`;
}

function resolveAvResponsiveImage(content) {
  return content.replace(
    /<\?php\s+av_responsive_image\(\s*\[([\s\S]*?)\]\s*\)\s*;\s*\?>/g,
    (_match, arrayBody) => {
      const srcMatch = arrayBody.match(/'src'\s*=>\s*'([^']+)'/);
      const altMatch = arrayBody.match(/'alt'\s*=>\s*'([^']*?)'/);
      const classMatch = arrayBody.match(/'class'\s*=>\s*'([^']*?)'/);
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1].replace(/&amp;/g, '&') : '';
      const cls = classMatch ? ` class="${classMatch[1]}"` : '';
      return `<img src="${src}" alt="${alt}"${cls} loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">`;
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
  const title = extractMetaTitle(content);
  const description = extractMetaDescription(content);

  content = resolvePhpIncludes(content, baseDir);

  content = resolveAvResponsiveImage(content);

  content = content.replace(/<\?php[\s\S]*?\?>/g, '');

  const headContent = buildStaticHead(pageStyles, title, description, injectViteClient);
  content = content.replace(/(<head[^>]*>)([\s\S]*?)(<\/head>)/, `$1\n${headContent}\n$3`);

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
