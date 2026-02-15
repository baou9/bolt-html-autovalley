import { defineConfig } from 'vite';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function htmlIncludePlugin() {
  function processIncludes(html, baseDir) {
    return html.replace(
      /<!--\s*@include\s+"([^"]+)"\s*-->/g,
      (_match, filePath) => {
        const fullPath = resolve(baseDir, filePath);
        if (existsSync(fullPath)) {
          return readFileSync(fullPath, 'utf-8');
        }
        return '';
      }
    );
  }

  return {
    name: 'html-include',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const base = ctx.filename ? dirname(ctx.filename) : __dirname;
        return processIncludes(html, base);
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [htmlIncludePlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        blog: resolve(__dirname, 'blog.html'),
        article: resolve(__dirname, 'article.html'),
      }
    }
  }
});
