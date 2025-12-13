/* ============================================================
   TÉMOIGNAGES / NOS CLIENTS - Enhanced Interactive Module
   ============================================================ */

const TESTIMONIALS_DATA = [
  {
    id: 1,
    category: 'Mécanique',
    quote: 'Service irréprochable, diagnostic transparent et prêt de véhicule premium. L\'équipe AutoValley a su gérer ma Porsche avec le même niveau d\'exigence qu\'un concessionnaire officiel.',
    quoteShort: 'Service irréprochable, diagnostic transparent et prêt de véhicule premium.',
    rating: 5,
    clientName: 'Yassine A.',
    clientPhoto: 'https://i.pravatar.cc/240?img=12',
    clientInitial: 'Y',
    vehicle: 'Porsche Macan',
    service: 'Révision complète',
    location: 'Casablanca',
    date: '2024-11-15',
    dateText: 'Il y a 1 mois',
    verified: true,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=AutoValley',
    isFeatured: true
  },
  {
    id: 2,
    category: 'Mécanique',
    quote: 'AutoValley gère notre flotte BMW avec un niveau d\'exigence digne d\'un concessionnaire.',
    rating: 5,
    clientName: 'Salma R.',
    clientPhoto: 'https://i.pravatar.cc/240?img=47',
    clientInitial: 'S',
    vehicle: 'BMW Série 5',
    service: 'Gestion de flotte',
    location: 'Casablanca',
    date: '2024-10-20',
    dateText: 'Il y a 2 mois',
    verified: true,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=AutoValley'
  },
  {
    id: 3,
    category: 'Carrosserie',
    quote: 'Un accueil chaleureux, des délais respectés et une carrosserie sortie d\'usine.',
    rating: 5,
    clientName: 'Mehdi L.',
    clientPhoto: 'https://i.pravatar.cc/240?img=32',
    clientInitial: 'M',
    vehicle: 'Range Rover Sport',
    service: 'Carrosserie & Peinture',
    location: 'Casablanca',
    date: '2024-11-01',
    dateText: 'Il y a 1 mois',
    verified: true,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=AutoValley'
  },
  {
    id: 4,
    category: 'Diagnostic',
    quote: 'Diagnostics haute tension précis et explications pédagogiques pour mon Audi e-tron.',
    rating: 5,
    clientName: 'Lina M.',
    clientPhoto: 'https://i.pravatar.cc/240?img=5',
    clientInitial: 'L',
    vehicle: 'Audi e-tron',
    service: 'Diagnostic électrique',
    location: 'Casablanca',
    date: '2024-11-10',
    dateText: 'Il y a 3 semaines',
    verified: true,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=AutoValley'
  },
  {
    id: 5,
    category: 'Service Client',
    quote: 'Transparence totale sur les interventions et tarifs clairement expliqués. J\'apprécie vraiment cette honnêteté.',
    rating: 5,
    clientName: 'Karim B.',
    clientPhoto: 'https://i.pravatar.cc/240?img=68',
    clientInitial: 'K',
    vehicle: 'Mercedes Classe C',
    service: 'Entretien complet',
    location: 'Casablanca',
    date: '2024-10-28',
    dateText: 'Il y a 1 mois',
    verified: true,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=AutoValley'
  },
  {
    id: 6,
    category: 'Carrosserie',
    quote: 'Réparation après accident impeccable. La peinture est parfaitement alignée, impossible de voir où était le choc.',
    rating: 5,
    clientName: 'Amina Z.',
    clientPhoto: 'https://i.pravatar.cc/240?img=20',
    clientInitial: 'A',
    vehicle: 'Volkswagen Tiguan',
    service: 'Réparation collision',
    location: 'Casablanca',
    date: '2024-09-15',
    dateText: 'Il y a 3 mois',
    verified: true,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=AutoValley'
  }
];

class TestimonialsManager {
  constructor() {
    this.section = document.querySelector('.testimonials-section');
    if (!this.section) return;

    this.data = TESTIMONIALS_DATA;
    this.currentFilter = 'tous';
    this.currentMobileIndex = 0;
    this.mobileAutoplayInterval = null;

    this.init();
  }

  init() {
    this.initScrollReveal();
    this.initMetricCounters();
    this.renderGridTestimonials();
    this.initFilters();
    this.initMobileCarousel();
    this.initAccessibility();
  }

  initScrollReveal() {
    const revealSection = () => {
      this.section.classList.add('is-visible');
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealSection();
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });

      observer.observe(this.section);
    } else {
      revealSection();
    }
  }

  initMetricCounters() {
    const metricValues = this.section.querySelectorAll('.metric-value[data-count]');

    if (!metricValues.length || !('IntersectionObserver' in window)) return;

    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 60;
      const duration = 1500;
      const stepTime = duration / 60;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          clearInterval(counter);
        } else {
          element.textContent = Math.floor(current);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    metricValues.forEach(el => observer.observe(el));
  }

  renderGridTestimonials() {
    const gridContainer = document.getElementById('testimonials-grid-items');
    if (!gridContainer) return;

    const nonFeaturedTestimonials = this.data.filter(t => !t.isFeatured);

    gridContainer.innerHTML = nonFeaturedTestimonials.map((testimonial, index) =>
      this.createTestimonialCard(testimonial, index + 1)
    ).join('');
  }

  createTestimonialCard(testimonial, index) {
    const stars = Array(testimonial.rating).fill('<span class="star">★</span>').join('');

    return `
      <article class="testimonial-card"
               role="article"
               data-category="${testimonial.category}"
               data-card-index="${index}"
               aria-label="Témoignage de ${testimonial.clientName}">
        <div class="card-badge-group">
          <span class="service-badge">${testimonial.category}</span>
          ${testimonial.verified ? `
            <span class="verified-badge" aria-label="Avis vérifié">
              <svg class="verified-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Vérifié
            </span>
          ` : ''}
        </div>

        <blockquote class="card-quote">
          <p>${testimonial.quote}</p>
        </blockquote>

        <div class="card-rating" aria-label="Note ${testimonial.rating} sur 5 étoiles">
          ${stars}
        </div>

        <footer class="card-profile">
          <img src="${testimonial.clientPhoto}"
               width="56"
               height="56"
               loading="lazy"
               alt="Portrait de ${testimonial.clientName.split(' ')[0]}"
               class="profile-photo" />
          <div class="profile-info">
            <cite class="profile-name">${testimonial.clientName}</cite>
            <p class="profile-vehicle">${testimonial.vehicle}</p>
            <p class="profile-service">${testimonial.service}</p>
            <p class="profile-meta">
              ${testimonial.location ? `<span class="profile-location">${testimonial.location}</span><span class="meta-divider">•</span>` : ''}
              <time datetime="${testimonial.date}" class="profile-date">${testimonial.dateText}</time>
            </p>
          </div>
        </footer>

        <a href="${testimonial.googleUrl}"
           target="_blank"
           rel="noopener"
           class="card-google-link">
          <svg class="google-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Voir sur Google
        </a>
      </article>
    `;
  }

  initFilters() {
    const filterBtns = this.section.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    this.updateFilterCounts();

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.setActiveFilter(filter, btn);
        this.filterTestimonials(filter);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  updateFilterCounts() {
    const filterBtns = this.section.querySelectorAll('.filter-btn');
    const categoryCounts = {};

    this.data.forEach(t => {
      if (!t.isFeatured) {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
      }
    });

    filterBtns.forEach(btn => {
      const filter = btn.dataset.filter;
      const countSpan = btn.querySelector('.filter-count');

      if (countSpan) {
        if (filter === 'tous') {
          countSpan.textContent = `(${this.data.filter(t => !t.isFeatured).length})`;
        } else {
          const count = categoryCounts[filter] || 0;
          countSpan.textContent = count > 0 ? `(${count})` : '';
        }
      }
    });
  }

  setActiveFilter(filter, activeBtn) {
    this.currentFilter = filter;

    this.section.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-selected', 'false');
    });

    activeBtn.classList.add('is-active');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  filterTestimonials(filter) {
    const cards = this.section.querySelectorAll('#testimonials-grid-items .testimonial-card');

    cards.forEach((card, index) => {
      const category = card.dataset.category;
      const shouldShow = filter === 'tous' || category === filter;

      card.classList.add('fade-out');

      setTimeout(() => {
        if (shouldShow) {
          card.classList.remove('is-hidden', 'fade-out');
          card.classList.add('fade-in');

          setTimeout(() => {
            card.classList.remove('fade-in');
          }, 400);
        } else {
          card.classList.add('is-hidden');
          card.classList.remove('fade-out');
        }
      }, 300);
    });
  }

  initMobileCarousel() {
    const carousel = document.querySelector('.testimonials-carousel-mobile');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const paginationContainer = carousel.querySelector('.carousel-pagination');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (!track || !paginationContainer) return;

    track.innerHTML = this.data.map((testimonial, index) =>
      this.createTestimonialCard(testimonial, index)
    ).join('');

    paginationContainer.innerHTML = this.data.map((_, index) =>
      `<button class="carousel-dot ${index === 0 ? 'is-active' : ''}"
              role="tab"
              aria-label="Témoignage ${index + 1}"
              aria-selected="${index === 0}"
              data-index="${index}"></button>`
    ).join('');

    const dots = paginationContainer.querySelectorAll('.carousel-dot');

    const updateCarousel = (index) => {
      const cards = track.querySelectorAll('.testimonial-card');
      const targetCard = cards[index];

      if (!targetCard) return;

      const scrollLeft = targetCard.offsetLeft - (track.clientWidth - targetCard.clientWidth) / 2;

      track.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-selected', i === index);
      });

      this.currentMobileIndex = index;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const newIndex = (this.currentMobileIndex - 1 + this.data.length) % this.data.length;
        updateCarousel(newIndex);
        this.resetMobileAutoplay(updateCarousel);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const newIndex = (this.currentMobileIndex + 1) % this.data.length;
        updateCarousel(newIndex);
        this.resetMobileAutoplay(updateCarousel);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateCarousel(index);
        this.resetMobileAutoplay(updateCarousel);
      });
    });

    const handleScroll = () => {
      const cards = track.querySelectorAll('.testimonial-card');
      const trackCenter = track.scrollLeft + track.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(trackCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== this.currentMobileIndex) {
        this.currentMobileIndex = closestIndex;
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === closestIndex);
          dot.setAttribute('aria-selected', i === closestIndex);
        });
      }
    };

    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    }, { passive: true });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery.matches) {
      this.startMobileAutoplay(updateCarousel);
    }

    track.addEventListener('touchstart', () => this.stopMobileAutoplay());
    track.addEventListener('mouseenter', () => this.stopMobileAutoplay());
    track.addEventListener('mouseleave', () => this.startMobileAutoplay(updateCarousel));
  }

  startMobileAutoplay(updateFn) {
    if (this.mobileAutoplayInterval) return;

    this.mobileAutoplayInterval = setInterval(() => {
      const newIndex = (this.currentMobileIndex + 1) % this.data.length;
      updateFn(newIndex);
    }, 5000);
  }

  stopMobileAutoplay() {
    if (this.mobileAutoplayInterval) {
      clearInterval(this.mobileAutoplayInterval);
      this.mobileAutoplayInterval = null;
    }
  }

  resetMobileAutoplay(updateFn) {
    this.stopMobileAutoplay();
    this.startMobileAutoplay(updateFn);
  }

  initAccessibility() {
    const cards = this.section.querySelectorAll('.testimonial-card');

    cards.forEach(card => {
      card.setAttribute('tabindex', '0');

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const googleLink = card.querySelector('.card-google-link');
          if (googleLink) googleLink.click();
        }
      });
    });

    const focusTrapElements = this.section.querySelectorAll(
      'button, a, input, [tabindex]:not([tabindex="-1"])'
    );

    if (focusTrapElements.length > 0) {
      const firstElement = focusTrapElements[0];
      const lastElement = focusTrapElements[focusTrapElements.length - 1];

      lastElement.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          const nextSection = this.section.nextElementSibling;
          if (nextSection) {
            const nextFocusable = nextSection.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
            if (nextFocusable) {
              e.preventDefault();
              nextFocusable.focus();
            }
          }
        }
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsManager();
  });
} else {
  new TestimonialsManager();
}

export { TestimonialsManager, TESTIMONIALS_DATA };
