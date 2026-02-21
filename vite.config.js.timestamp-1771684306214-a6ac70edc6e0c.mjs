// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.js";
var __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var tempDir = resolve(__dirname, ".vite-php-temp");
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
  return match ? match[1] : "AutoValley";
}
function extractMetaDescription(content) {
  const match = content.match(/\$metaDescription\s*=\s*["']([^"']+)["']/);
  return match ? match[1] : "";
}
function buildStaticHead(pageStyles, title, description, injectViteClient) {
  const styleLinks = pageStyles.map((href) => `    <link rel="stylesheet" href="${href}">`).join("\n");
  const viteClient = injectViteClient ? `    <script type="module" src="/@vite/client"></script>` : "";
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
      const src = srcMatch ? srcMatch[1] : "";
      const alt = altMatch ? altMatch[1].replace(/&amp;/g, "&") : "";
      const cls = classMatch ? ` class="${classMatch[1]}"` : "";
      return `<img src="${src}" alt="${alt}"${cls} loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">`;
    }
  );
}
function resolvePhpIncludes(content, baseDir) {
  return content.replace(
    /<\?php\s+include\s+(?:__DIR__\s*\.\s*)?["']([^"']+)["']\s*;\s*\?>/g,
    (_match, filePath) => {
      const normalizedPath = filePath.replace(/^\//, "");
      const fullPath = resolve(baseDir, normalizedPath);
      if (existsSync(fullPath)) {
        const partial = readFileSync(fullPath, "utf-8");
        return resolvePhpIncludes(partial, dirname(fullPath));
      }
      return "";
    }
  );
}
function processPhpContent(content, baseDir, injectViteClient = false) {
  const pageStyles = extractPageStyles(content);
  const title = extractMetaTitle(content);
  const description = extractMetaDescription(content);
  content = resolvePhpIncludes(content, baseDir);
  content = resolveAvResponsiveImage(content);
  content = content.replace(/<\?php[\s\S]*?\?>/g, "");
  const headContent = buildStaticHead(pageStyles, title, description, injectViteClient);
  content = content.replace(/(<head[^>]*>)([\s\S]*?)(<\/head>)/, `$1
${headContent}
$3`);
  return content;
}
function buildPhpToHtml() {
  const phpPages = [
    "index",
    "services",
    "blog",
    "article",
    "contact",
    "apropos",
    "faq",
    "carrieres",
    "mentions-legales",
    "politique-confidentialite"
  ];
  const input = {};
  mkdirSync(tempDir, { recursive: true });
  for (const page of phpPages) {
    const phpPath = resolve(__dirname, `${page}.php`);
    if (existsSync(phpPath)) {
      let content = readFileSync(phpPath, "utf-8");
      content = processPhpContent(content, __dirname, false);
      content = content.replace(/(src|href)="\.\//g, '$1="../');
      const htmlPath = resolve(tempDir, `${page}.html`);
      writeFileSync(htmlPath, content, "utf-8");
      input[page] = htmlPath;
    }
  }
  return input;
}
function phpPlugin() {
  return {
    name: "vite-plugin-php",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split("?")[0];
        let filePath = null;
        if (url === "/" || url === "/index.php") {
          filePath = resolve(__dirname, "index.php");
        } else if (url.endsWith(".php")) {
          filePath = resolve(__dirname, url.slice(1));
        }
        if (filePath && existsSync(filePath)) {
          let content = readFileSync(filePath, "utf-8");
          content = processPhpContent(content, __dirname, true);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(content);
          return;
        }
        next();
      });
    }
  };
}
var buildInput = buildPhpToHtml();
var vite_config_default = defineConfig({
  base: "./",
  plugins: [phpPlugin()],
  build: {
    rollupOptions: {
      input: buildInput
    }
  },
  server: {
    open: "/index.php"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYywgZXhpc3RzU3luYywgd3JpdGVGaWxlU3luYywgbWtkaXJTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcbmNvbnN0IHRlbXBEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJy52aXRlLXBocC10ZW1wJyk7XG5cbmZ1bmN0aW9uIGV4dHJhY3RQYWdlU3R5bGVzKGNvbnRlbnQpIHtcbiAgY29uc3QgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKC9cXCRwYWdlU3R5bGVzXFxzKj1cXHMqXFxbKFtcXHNcXFNdKj8pXFxdOy8pO1xuICBpZiAoIW1hdGNoKSByZXR1cm4gW107XG4gIGNvbnN0IGFycmF5Q29udGVudCA9IG1hdGNoWzFdO1xuICBjb25zdCBocmVmcyA9IFtdO1xuICBjb25zdCByZSA9IC9bJ1wiXShbXidcIl0rKVsnXCJdL2c7XG4gIGxldCBtO1xuICB3aGlsZSAoKG0gPSByZS5leGVjKGFycmF5Q29udGVudCkpICE9PSBudWxsKSB7XG4gICAgaHJlZnMucHVzaChtWzFdKTtcbiAgfVxuICByZXR1cm4gaHJlZnM7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RNZXRhVGl0bGUoY29udGVudCkge1xuICBjb25zdCBtYXRjaCA9IGNvbnRlbnQubWF0Y2goL1xcJG1ldGFUaXRsZVxccyo9XFxzKlsnXCJdKFteJ1wiXSspWydcIl0vKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnQXV0b1ZhbGxleSc7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RNZXRhRGVzY3JpcHRpb24oY29udGVudCkge1xuICBjb25zdCBtYXRjaCA9IGNvbnRlbnQubWF0Y2goL1xcJG1ldGFEZXNjcmlwdGlvblxccyo9XFxzKltcIiddKFteXCInXSspW1wiJ10vKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcbn1cblxuZnVuY3Rpb24gYnVpbGRTdGF0aWNIZWFkKHBhZ2VTdHlsZXMsIHRpdGxlLCBkZXNjcmlwdGlvbiwgaW5qZWN0Vml0ZUNsaWVudCkge1xuICBjb25zdCBzdHlsZUxpbmtzID0gcGFnZVN0eWxlcy5tYXAoaHJlZiA9PiBgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJHtocmVmfVwiPmApLmpvaW4oJ1xcbicpO1xuICBjb25zdCB2aXRlQ2xpZW50ID0gaW5qZWN0Vml0ZUNsaWVudCA/IGAgICAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiL0B2aXRlL2NsaWVudFwiPjwvc2NyaXB0PmAgOiAnJztcblxuICByZXR1cm4gYFxuICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiIC8+XG4gICAgPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9zdmcreG1sXCIgaHJlZj1cIi4vc3R5bGUvaW1hZ2VzL3ZpdGUuc3ZnXCIgLz5cbiAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgPHRpdGxlPiR7dGl0bGV9PC90aXRsZT5cbiAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJHtkZXNjcmlwdGlvbn1cIiAvPlxuICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbVwiPlxuICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiIGNyb3Nzb3JpZ2luPlxuICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRAMzAwOzQwMDs1MDA7NjAwJmZhbWlseT1Nb250c2VycmF0OndnaHRANDAwOzYwMDs3MDA7ODAwJmZhbWlseT1Mb3JhOml0YWwsd2dodEAwLDQwMDswLDYwMDsxLDQwMCZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4ke3N0eWxlTGlua3N9XG4ke3ZpdGVDbGllbnR9YDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUF2UmVzcG9uc2l2ZUltYWdlKGNvbnRlbnQpIHtcbiAgcmV0dXJuIGNvbnRlbnQucmVwbGFjZShcbiAgICAvPFxcP3BocFxccythdl9yZXNwb25zaXZlX2ltYWdlXFwoXFxzKlxcWyhbXFxzXFxTXSo/KVxcXVxccypcXClcXHMqO1xccypcXD8+L2csXG4gICAgKF9tYXRjaCwgYXJyYXlCb2R5KSA9PiB7XG4gICAgICBjb25zdCBzcmNNYXRjaCA9IGFycmF5Qm9keS5tYXRjaCgvJ3NyYydcXHMqPT5cXHMqJyhbXiddKyknLyk7XG4gICAgICBjb25zdCBhbHRNYXRjaCA9IGFycmF5Qm9keS5tYXRjaCgvJ2FsdCdcXHMqPT5cXHMqJyhbXiddKj8pJy8pO1xuICAgICAgY29uc3QgY2xhc3NNYXRjaCA9IGFycmF5Qm9keS5tYXRjaCgvJ2NsYXNzJ1xccyo9PlxccyonKFteJ10qPyknLyk7XG4gICAgICBjb25zdCBzcmMgPSBzcmNNYXRjaCA/IHNyY01hdGNoWzFdIDogJyc7XG4gICAgICBjb25zdCBhbHQgPSBhbHRNYXRjaCA/IGFsdE1hdGNoWzFdLnJlcGxhY2UoLyZhbXA7L2csICcmJykgOiAnJztcbiAgICAgIGNvbnN0IGNscyA9IGNsYXNzTWF0Y2ggPyBgIGNsYXNzPVwiJHtjbGFzc01hdGNoWzFdfVwiYCA6ICcnO1xuICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7c3JjfVwiIGFsdD1cIiR7YWx0fVwiJHtjbHN9IGxvYWRpbmc9XCJsYXp5XCIgZGVjb2Rpbmc9XCJhc3luY1wiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvYmplY3QtZml0OmNvdmVyO1wiPmA7XG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlUGhwSW5jbHVkZXMoY29udGVudCwgYmFzZURpcikge1xuICByZXR1cm4gY29udGVudC5yZXBsYWNlKFxuICAgIC88XFw/cGhwXFxzK2luY2x1ZGVcXHMrKD86X19ESVJfX1xccypcXC5cXHMqKT9bXCInXShbXlwiJ10rKVtcIiddXFxzKjtcXHMqXFw/Pi9nLFxuICAgIChfbWF0Y2gsIGZpbGVQYXRoKSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IGZpbGVQYXRoLnJlcGxhY2UoL15cXC8vLCAnJyk7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IHJlc29sdmUoYmFzZURpciwgbm9ybWFsaXplZFBhdGgpO1xuICAgICAgaWYgKGV4aXN0c1N5bmMoZnVsbFBhdGgpKSB7XG4gICAgICAgIGNvbnN0IHBhcnRpYWwgPSByZWFkRmlsZVN5bmMoZnVsbFBhdGgsICd1dGYtOCcpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZVBocEluY2x1ZGVzKHBhcnRpYWwsIGRpcm5hbWUoZnVsbFBhdGgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NQaHBDb250ZW50KGNvbnRlbnQsIGJhc2VEaXIsIGluamVjdFZpdGVDbGllbnQgPSBmYWxzZSkge1xuICBjb25zdCBwYWdlU3R5bGVzID0gZXh0cmFjdFBhZ2VTdHlsZXMoY29udGVudCk7XG4gIGNvbnN0IHRpdGxlID0gZXh0cmFjdE1ldGFUaXRsZShjb250ZW50KTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBleHRyYWN0TWV0YURlc2NyaXB0aW9uKGNvbnRlbnQpO1xuXG4gIGNvbnRlbnQgPSByZXNvbHZlUGhwSW5jbHVkZXMoY29udGVudCwgYmFzZURpcik7XG5cbiAgY29udGVudCA9IHJlc29sdmVBdlJlc3BvbnNpdmVJbWFnZShjb250ZW50KTtcblxuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC88XFw/cGhwW1xcc1xcU10qP1xcPz4vZywgJycpO1xuXG4gIGNvbnN0IGhlYWRDb250ZW50ID0gYnVpbGRTdGF0aWNIZWFkKHBhZ2VTdHlsZXMsIHRpdGxlLCBkZXNjcmlwdGlvbiwgaW5qZWN0Vml0ZUNsaWVudCk7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyg8aGVhZFtePl0qPikoW1xcc1xcU10qPykoPFxcL2hlYWQ+KS8sIGAkMVxcbiR7aGVhZENvbnRlbnR9XFxuJDNgKTtcblxuICByZXR1cm4gY29udGVudDtcbn1cblxuZnVuY3Rpb24gYnVpbGRQaHBUb0h0bWwoKSB7XG4gIGNvbnN0IHBocFBhZ2VzID0gW1xuICAgICdpbmRleCcsXG4gICAgJ3NlcnZpY2VzJyxcbiAgICAnYmxvZycsXG4gICAgJ2FydGljbGUnLFxuICAgICdjb250YWN0JyxcbiAgICAnYXByb3BvcycsXG4gICAgJ2ZhcScsXG4gICAgJ2NhcnJpZXJlcycsXG4gICAgJ21lbnRpb25zLWxlZ2FsZXMnLFxuICAgICdwb2xpdGlxdWUtY29uZmlkZW50aWFsaXRlJyxcbiAgXTtcbiAgY29uc3QgaW5wdXQgPSB7fTtcblxuICBta2RpclN5bmModGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgZm9yIChjb25zdCBwYWdlIG9mIHBocFBhZ2VzKSB7XG4gICAgY29uc3QgcGhwUGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCBgJHtwYWdlfS5waHBgKTtcbiAgICBpZiAoZXhpc3RzU3luYyhwaHBQYXRoKSkge1xuICAgICAgbGV0IGNvbnRlbnQgPSByZWFkRmlsZVN5bmMocGhwUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICBjb250ZW50ID0gcHJvY2Vzc1BocENvbnRlbnQoY29udGVudCwgX19kaXJuYW1lLCBmYWxzZSk7XG4gICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8oc3JjfGhyZWYpPVwiXFwuXFwvL2csICckMT1cIi4uLycpO1xuICAgICAgY29uc3QgaHRtbFBhdGggPSByZXNvbHZlKHRlbXBEaXIsIGAke3BhZ2V9Lmh0bWxgKTtcbiAgICAgIHdyaXRlRmlsZVN5bmMoaHRtbFBhdGgsIGNvbnRlbnQsICd1dGYtOCcpO1xuICAgICAgaW5wdXRbcGFnZV0gPSBodG1sUGF0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHBocFBsdWdpbigpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tcGhwJyxcbiAgICBlbmZvcmNlOiAncHJlJyxcblxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlcS51cmwuc3BsaXQoJz8nKVswXTtcbiAgICAgICAgbGV0IGZpbGVQYXRoID0gbnVsbDtcblxuICAgICAgICBpZiAodXJsID09PSAnLycgfHwgdXJsID09PSAnL2luZGV4LnBocCcpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXgucGhwJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodXJsLmVuZHNXaXRoKCcucGhwJykpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCB1cmwuc2xpY2UoMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbGVQYXRoICYmIGV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSByZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGYtOCcpO1xuICAgICAgICAgIGNvbnRlbnQgPSBwcm9jZXNzUGhwQ29udGVudChjb250ZW50LCBfX2Rpcm5hbWUsIHRydWUpO1xuXG4gICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbDsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICAgIHJlcy5lbmQoY29udGVudCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5jb25zdCBidWlsZElucHV0ID0gYnVpbGRQaHBUb0h0bWwoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy4vJyxcbiAgcGx1Z2luczogW3BocFBsdWdpbigpXSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogYnVpbGRJbnB1dFxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogJy9pbmRleC5waHAnXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxTQUFTLGNBQWMsWUFBWSxlQUFlLGlCQUFpQjtBQUNuRSxTQUFTLFNBQVMsZUFBZTtBQUNqQyxTQUFTLHFCQUFxQjtBQUhvRyxJQUFNLDJDQUEyQztBQUtuTCxJQUFNLFlBQVksUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFDeEQsSUFBTSxVQUFVLFFBQVEsV0FBVyxnQkFBZ0I7QUFFbkQsU0FBUyxrQkFBa0IsU0FBUztBQUNsQyxRQUFNLFFBQVEsUUFBUSxNQUFNLG9DQUFvQztBQUNoRSxNQUFJLENBQUMsTUFBTyxRQUFPLENBQUM7QUFDcEIsUUFBTSxlQUFlLE1BQU0sQ0FBQztBQUM1QixRQUFNLFFBQVEsQ0FB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
