import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const PHP_ENTRIES = ['index.php', 'services.php'];

function processPhpIncludes(content, baseDir) {
  content = content.replace(/<\?php\s*\n?\s*\$partialsCandidates[\s\S]*?\?>/g, '');
  content = content.replace(
    /<\?php\s+include\s+\$partialsDir\s*\.\s*'([^']+)'\s*;\s*\?>/g,
    (_match, file) => {
      const filePath = resolve(baseDir, 'partials', file.replace(/^\//, ''));
      if (existsSync(filePath)) {
        return readFileSync(filePath, 'utf-8');
      }
      return '';
    }
  );
  return content;
}

function phpIncludePlugin() {
  const generatedFiles = [];

  return {
    name: 'php-include',
    enforce: 'pre',

    config(_config, { command }) {
      if (command === 'build') {
        const inputs = {};
        PHP_ENTRIES.forEach(phpFile => {
          const phpPath = resolve(__dirname, phpFile);
          if (existsSync(phpPath)) {
            const htmlFile = phpFile.replace('.php', '.html');
            const htmlPath = resolve(__dirname, htmlFile);
            const content = processPhpIncludes(readFileSync(phpPath, 'utf-8'), __dirname);
            writeFileSync(htmlPath, content, 'utf-8');
            generatedFiles.push(htmlPath);
            const name = phpFile === 'index.php' ? 'main' : phpFile.replace('.php', '');
            inputs[name] = htmlPath;
          }
        });
        return { build: { rollupOptions: { input: inputs } } };
      }
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '/').split('?')[0].split('#')[0];
        let phpFile = null;

        if (url === '/' || url === '/index.php') {
          phpFile = 'index.php';
        } else {
          const match = url.match(/^\/([^/]+\.php)$/);
          if (match) phpFile = match[1];
        }

        if (phpFile) {
          const phpPath = resolve(__dirname, phpFile);
          if (existsSync(phpPath)) {
            try {
              let html = readFileSync(phpPath, 'utf-8');
              html = processPhpIncludes(html, __dirname);
              const transformed = await server.transformIndexHtml(req.url, html);
              res.setHeader('Content-Type', 'text/html');
              res.statusCode = 200;
              res.end(transformed);
              return;
            } catch (e) {
              return next(e);
            }
          }
        }
        next();
      });
    },

    closeBundle() {
      generatedFiles.forEach(f => {
        if (existsSync(f)) unlinkSync(f);
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [phpIncludePlugin()],
});
