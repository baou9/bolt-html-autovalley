import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function htmlIncludePlugin() {
  return {
    name: 'html-include',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return html.replace(
          /<!--\s*@include\s+"([^"]+)"\s*-->/g,
          (_match, file) => {
            const filePath = resolve(__dirname, file);
            return readFileSync(filePath, 'utf-8');
          }
        );
      },
    },
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
      },
    },
  },
});
