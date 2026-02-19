/* ============================================================
   TÉMOIGNAGES / NOS CLIENTS - Pure Frontend Interactive Module
   No database - works with HTML already in the DOM
   ============================================================ */

class TestimonialsManager {
  constructor() {
    this.section = document.querySelector('.testimonials-section');
    if (!this.section) {
      console.warn('TestimonialsManager: Section not found in DOM');
      return;
    }

    this.currentFilter = 'tous';
    this.currentMobileIndex = 0;
    this.mobileAutoplayInterval = null;
    this.isInitialized = false;

    this.init();
  }

  init() {
    try {
      this.initScrollReveal();
      this.initMetricCounters();
      this.initFilters();
      this.initMobileCarousel();
      this.initAccessibility();
      this.isInitialized = true;
    } catch (error) {
      console.error('TestimonialsManager initialization error:', error);
      this.section.classList.add('is-visible');
    }
  }

  initScrollReveal() {
    const revealSection = () => {
      this.section.classList.add('is-visible');
    };

    if ('IntersectionObserver' in window) {
      let hasRevealed = false;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasRevealed) {
            hasRevealed = true;
            revealSection();
            observer.disconnect();
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
      });

      observer.observe(this.section);

      const rect = this.section.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        revealSection();
        observer.disconnect();
      }

      setTimeout(() => {
        if (!hasRevealed) {
          revealSection();
          observer.disconnect();
        }
      }, 1000);
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
    const allCards = this.section.querySelectorAll('#testimonials-grid-items .testimonial-card');
    const featuredCard = this.section.querySelector('.testimonial-featured');

    const categoryCounts = {};

    allCards.forEach(card => {
      const category = card.dataset.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    if (featuredCard) {
      const featuredCategory = featuredCard.dataset.category;
      categoryCounts[featuredCategory] = (categoryCounts[featuredCategory] || 0) + 1;
    }

    filterBtns.forEach(btn => {
      const filter = btn.dataset.filter;
      const countSpan = btn.querySelector('.filter-count');

      if (countSpan) {
        if (filter === 'tous') {
          const total = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
          countSpan.textContent = `(${total})`;
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
    // [PATCH] Limit filtering to the desktop set; rebuild mobile carousel separately
    const cards = this.section.querySelectorAll('.testimonials-layout .testimonial-card, .testimonials-layout .testimonial-featured');
    const layout = this.section.querySelector('.testimonials-layout');
    const featuredCard = this.section.querySelector('.testimonials-layout .testimonial-featured');

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

    if (layout) {
      const featuredVisible = featuredCard && !featuredCard.classList.contains('is-hidden');
      layout.classList.toggle('testimonials-layout--single', !featuredVisible); // [PATCH] Expand grid when featured is hidden
    }

    if (this.renderMobileCarousel) {
      this.renderMobileCarousel(filter);
    }
  }

  initMobileCarousel() {
    const carouselMobile = document.querySelector('.testimonials-carousel-mobile');
    if (!carouselMobile) return;

    const track = carouselMobile.querySelector('.carousel-track');
    const paginationContainer = carouselMobile.querySelector('.carousel-pagination');
    const prevBtn = carouselMobile.querySelector('.carousel-prev');
    const nextBtn = carouselMobile.querySelector('.carousel-next');

    if (!track || !paginationContainer) return;

    this.renderMobileCarousel = (activeFilter = 'tous') => {
      const sourceCards = Array.from(this.section.querySelectorAll('.testimonials-layout .testimonial-card, .testimonials-layout .testimonial-featured'));
      const filteredCards = sourceCards.filter((card) => activeFilter === 'tous' || card.dataset.category === activeFilter);

      this.stopMobileAutoplay();
      this.currentMobileIndex = 0;
      track.innerHTML = '';

      filteredCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.remove('testimonial-featured', 'is-hidden', 'fade-out', 'fade-in');
        clone.style.animation = 'none';
        clone.style.opacity = '1';
        clone.style.transform = 'none';
        track.appendChild(clone);
      });

      const mobileCards = track.querySelectorAll('.testimonial-card');

      paginationContainer.innerHTML = Array.from(mobileCards).map((_, index) =>
        `<button class="carousel-dot ${index === 0 ? 'is-active' : ''}"
                role="tab"
                aria-label="Témoignage ${index + 1}"
                aria-selected="${index === 0}"
                data-index="${index}"></button>`
      ).join('');

      const dots = paginationContainer.querySelectorAll('.carousel-dot');

      const updateCarousel = (index) => {
        const targetCard = mobileCards[index];

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
        prevBtn.onclick = () => {
          const newIndex = (this.currentMobileIndex - 1 + mobileCards.length) % mobileCards.length;
          updateCarousel(newIndex);
          this.resetMobileAutoplay(updateCarousel, mobileCards.length);
        };
      }

      if (nextBtn) {
        nextBtn.onclick = () => {
          const newIndex = (this.currentMobileIndex + 1) % mobileCards.length;
          updateCarousel(newIndex);
          this.resetMobileAutoplay(updateCarousel, mobileCards.length);
        };
      }

      dots.forEach((dot, index) => {
        dot.onclick = () => {
          updateCarousel(index);
          this.resetMobileAutoplay(updateCarousel, mobileCards.length);
        };
      });

      const handleScroll = () => {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        mobileCards.forEach((card, index) => {
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

      track.onscroll = () => {
        clearTimeout(this.mobileScrollTimeout);
        this.mobileScrollTimeout = setTimeout(handleScroll, 100);
      };

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (!motionQuery.matches) {
        this.startMobileAutoplay(updateCarousel, mobileCards.length);
      }

      track.ontouchstart = () => this.stopMobileAutoplay();
      track.onmouseenter = () => this.stopMobileAutoplay();
      track.onmouseleave = () => this.startMobileAutoplay(updateCarousel, mobileCards.length);
      track.ontouchend = () => this.startMobileAutoplay(updateCarousel, mobileCards.length);
    };

    this.renderMobileCarousel('tous');
  }

  startMobileAutoplay(updateFn, totalCards) {
    if (this.mobileAutoplayInterval) return;

    this.mobileAutoplayInterval = setInterval(() => {
      const newIndex = (this.currentMobileIndex + 1) % totalCards;
      updateFn(newIndex);
    }, 5000);
  }

  stopMobileAutoplay() {
    if (this.mobileAutoplayInterval) {
      clearInterval(this.mobileAutoplayInterval);
      this.mobileAutoplayInterval = null;
    }
  }

  resetMobileAutoplay(updateFn, totalCards) {
    this.stopMobileAutoplay();
    this.startMobileAutoplay(updateFn, totalCards);
  }

  initAccessibility() {
    const cards = this.section.querySelectorAll('.testimonial-card');

    cards.forEach(card => {
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const googleLink = card.querySelector('.card-google-link');
          if (googleLink) googleLink.click();
        }
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsManager();
  });
} else {
  new TestimonialsManager();
}

export { TestimonialsManager };
