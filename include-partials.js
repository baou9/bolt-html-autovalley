export async function includePartials(root = document) {
  const nodes = Array.from(root.querySelectorAll('[data-include]'));
  if (!nodes.length) return;

  await Promise.all(
    nodes.map(async (node) => {
      const src = node.getAttribute('data-include');
      if (!src) return;

      try {
        const response = await fetch(src, { credentials: 'same-origin' });
        if (!response.ok) return;

        const html = await response.text();
        node.insertAdjacentHTML('beforebegin', html);
        node.remove();
      } catch (_error) {
        // [PATCH] fail silently to avoid blocking page rendering if a partial is unavailable
      }
    })
  );

  document.dispatchEvent(new CustomEvent('partials:loaded'));
}
