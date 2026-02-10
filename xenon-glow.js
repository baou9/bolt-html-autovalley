(function () {
  if (!document.body.classList.contains('page-services')) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  var root = document.documentElement;
  var ticking = false;

  function update() {
    var docH = document.documentElement.scrollHeight;
    var viewH = window.innerHeight;
    var scrollable = docH - viewH;
    if (scrollable <= 0) {
      root.style.setProperty('--xenon-progress', '0');
      return;
    }
    var raw = window.scrollY / scrollable;
    var clamped = raw < 0 ? 0 : raw > 1 ? 1 : raw;
    var eased = Math.pow(clamped, 1.6);
    root.style.setProperty('--xenon-progress', eased.toFixed(4));
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  reducedMotion.addEventListener('change', function (e) {
    if (e.matches) {
      window.removeEventListener('scroll', onScroll);
      root.style.setProperty('--xenon-progress', '0.25');
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    }
  });
})();
