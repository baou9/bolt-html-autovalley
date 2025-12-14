/* ============================================================
   Location Section - Premium Effects & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const locationSection = document.querySelector('.section-noustrouver');
  if (!locationSection) return;

  const mapCard = locationSection.querySelector('.noustrouver-map-card');
  const infoCard = locationSection.querySelector('.noustrouver-info-card');
  const detailItems = locationSection.querySelectorAll('.noustrouver-details li');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal animation
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal map card
            if (mapCard) {
              setTimeout(() => {
                mapCard.style.opacity = '1';
                mapCard.style.transform = 'translateY(0)';
              }, 100);
            }

            // Reveal info card
            if (infoCard) {
              setTimeout(() => {
                infoCard.style.opacity = '1';
                infoCard.style.transform = 'translateY(0)';
              }, 250);
            }

            // Stagger reveal detail items
            detailItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
              }, 400 + index * 80);
            });

            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Set initial states
    if (mapCard) {
      mapCard.style.opacity = '0';
      mapCard.style.transform = 'translateY(40px)';
      mapCard.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    if (infoCard) {
      infoCard.style.opacity = '0';
      infoCard.style.transform = 'translateY(40px)';
      infoCard.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    detailItems.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    revealObserver.observe(locationSection);
  }

  // Subtle parallax effect on scroll for cards
  if (!prefersReducedMotion) {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = locationSection.getBoundingClientRect();
          const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));

          if (scrollProgress > 0 && scrollProgress < 1) {
            if (mapCard) {
              const parallaxOffset = scrollProgress * 20;
              mapCard.style.transform = `translateY(${parallaxOffset}px)`;
            }

            if (infoCard) {
              const parallaxOffset = scrollProgress * 15;
              infoCard.style.transform = `translateY(${-parallaxOffset}px)`;
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Add icon indicators to detail items
  const iconMap = {
    'Adresse :': '📍',
    'Téléphone :': '📞',
    'WhatsApp :': '💬',
    'Horaires :': '🕐',
    'Accès :': '🚗'
  };

  detailItems.forEach((item) => {
    const label = item.querySelector('.noustrouver-detail-label');
    if (label) {
      const labelText = label.textContent.trim();
      const icon = iconMap[labelText];
      if (icon) {
        label.innerHTML = `<span style="margin-right: 6px;">${icon}</span>${labelText}`;
      }
    }
  });

  // Enhanced button ripple effect
  const buttons = locationSection.querySelectorAll('.btn-noustrouver-main, .btn-noustrouver-secondary');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple-animation 0.6s ease-out;
      `;

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS animation for ripple
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
