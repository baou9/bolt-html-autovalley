import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Notre Approche animations
export function initApproche() {
  // Viewport detection for card animations
  const cards = document.querySelectorAll('.timeline-card');

  cards.forEach((card, index) => {
    // Icon glow intensity on viewport entry
    const icon = card.querySelector('.card-icon-wrapper');

    gsap.fromTo(icon,
      {
        boxShadow: '0 4px 16px rgba(185, 5, 4, 0.1)'
      },
      {
        boxShadow: '0 8px 32px rgba(185, 5, 4, 0.4), 0 0 40px rgba(185, 5, 4, 0.25)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Parallax effect - cards move at different speeds
    gsap.to(card, {
      y: () => -20 * (index % 2 === 0 ? 1 : 0.5),
      ease: 'none',
      scrollTrigger: {
        trigger: '.approche-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Shadow projection that moves with scroll
    const shadowIntensity = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 0.5
      }
    });

    shadowIntensity.to(card, {
      '--shadow-opacity': 0.15,
      '--shadow-blur': '30px',
      '--shadow-spread': '20px',
      duration: 1
    });
  });

  // Red beam extension animation (sequential)
  const connector = document.querySelector('.timeline-connector');
  if (connector) {
    gsap.fromTo(connector,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.timeline-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // CTA card scroll-tied gradient shift
  const ctaCard = document.querySelector('.approche-cta-card');
  if (ctaCard) {
    ScrollTrigger.create({
      trigger: ctaCard,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => ctaCard.classList.add('scrolled'),
      onLeave: () => ctaCard.classList.remove('scrolled'),
      onEnterBack: () => ctaCard.classList.add('scrolled'),
      onLeaveBack: () => ctaCard.classList.remove('scrolled')
    });
  }

  // Cinematic scroll delay for header
  const header = document.querySelector('.approche-header');
  if (header) {
    gsap.fromTo(header,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.approche-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // Ambient scanning light sync with scroll
  const section = document.querySelector('.approche-section');
  if (section) {
    gsap.to(section, {
      '--ambient-position': '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });
  }

  // Haptic feedback simulation (visual pulse on mobile)
  if ('ontouchstart' in window) {
    cards.forEach(card => {
      card.addEventListener('touchstart', () => {
        gsap.to(card, {
          scale: 0.98,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });

        // Try to trigger haptic if available
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      });
    });
  }

  console.log('✨ Notre Approche animations initialized');
}

// Performance monitoring
export function monitorPerformance() {
  if (typeof performance !== 'undefined') {
    const entries = performance.getEntriesByType('measure');
    entries.forEach(entry => {
      if (entry.name.includes('approche')) {
        console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    });
  }
}
