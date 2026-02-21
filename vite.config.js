import { defineConfig } from 'vite';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = resolve(__dirname, '.vite-php-temp');

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
      content = content.replace(/<\?php[\s\S]*?\?>\s*/g, '');
      content = resolvePhpIncludes(content, __dirname);
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
          content = resolvePhpIncludes(content, __dirname);

          content = content.replace(
            '</head>',
            `  <script type="module" src="/@vite/client"></script>\n</head>`
          );

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
