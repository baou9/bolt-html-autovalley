/* ============================================================
   Blog Cards - Premium 3D Tilt Effect
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const blogCards = document.querySelectorAll('.blog-card');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if (prefersReducedMotion || isCoarsePointer || !blogCards.length) return;

  blogCards.forEach(card => {
    const maxTilt = 3;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX.toFixed(2)}deg)
        rotateY(${rotateY.toFixed(2)}deg)
        translateY(-12px)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });

  // Intersection Observer for scroll reveal animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  blogCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    revealObserver.observe(card);
  });
});
