/* ============================================================
   AutoValley – Hero Liquid Glass + Header Behaviors
   ============================================================ */

import { initAllPremiumEffects } from './premium-effects.js';
import './testimonials.js';

document.documentElement.classList.remove('no-js');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllPremiumEffects, { once: true });
} else {
  initAllPremiumEffects();
}

document.addEventListener("DOMContentLoaded", () => {
  const videoEl = document.getElementById("heroVideo");
  const videoSourceEl = document.getElementById("heroVideoSource");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // [PATCH]
  const prefersSaveData = navigator.connection && navigator.connection.saveData; // [PATCH]
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches; // [PATCH]
  const isNarrowViewport = window.matchMedia("(max-width: 1024px)").matches; // [PATCH]
  const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4; // [PATCH]
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent); // [PATCH]

  const shouldLimitHeroEffects = reduceMotion || prefersSaveData || isCoarsePointer || isNarrowViewport || isLowMemory || isIOS; // [PATCH]

  /* ===================== 1. VIDEO PLAYLIST ===================== */

  const videoPlaylist = [
    "https://www.shutterstock.com/shutterstock/videos/1066902424/preview/stock-footage-service-of-the-car-in-the-technical-center-the-master-records-information-about-the-machine.webm",
    "https://www.shutterstock.com/shutterstock/videos/1099285173/preview/stock-footage-cars-moves-on-lifts-in-modern-service-station-and-men-repair-cars-and-make-diagnostics-timelapse.webm",
    "https://www.shutterstock.com/shutterstock/videos/3672297003/preview/stock-footage-mechanic-repairing-a-car-engine-with-a-handheld-wrench-tool-demonstrating-expertise-and-precision.webm",
    "https://www.shutterstock.com/shutterstock/videos/3826878337/preview/stock-footage-close-up-view-of-process-of-pointless-dent-repair-on-car-body-mechanic-at-the-auto-shop-with-tools.webm",
    "https://www.shutterstock.com/shutterstock/videos/1111239387/preview/stock-footage-auto-painter-spraying-red-paint-on-car-door-in-special-booth-painting-vehicle-parts-at-car-service.webm",
    "https://www.shutterstock.com/shutterstock/videos/1100126843/preview/stock-footage-close-up-of-a-man-polishing-a-headlight-with-a-polishing-machine-on-a-car-in-a-service-station.webm"
  ];

  let currentVideo = 0;

  if (videoEl && videoSourceEl && videoPlaylist.length) {
    if (shouldLimitHeroEffects) {
      videoEl.setAttribute("autoplay", "true"); // [PATCH] keep a single source playing without swaps
      videoEl.setAttribute("loop", "true"); // [PATCH]
      videoEl.preload = "auto"; // [PATCH] allow smooth playback of the first video only
      videoSourceEl.src = videoPlaylist[0]; // [PATCH] lock to the first video to avoid reloading the playlist
      videoEl.classList.remove("hero-lg__video--disabled"); // [PATCH]
      videoEl.load(); // [PATCH]

      const ensureSinglePlay = () => {
        const p = videoEl.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            // Autoplay might be blocked; fail silently.
          });
        }
      };

      videoEl.addEventListener("canplay", ensureSinglePlay, { once: true }); // [PATCH]
      ensureSinglePlay(); // [PATCH]

      return; // [PATCH]
    }

    const ensurePlay = () => {
      const p = videoEl.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay might be blocked; fail silently.
        });
      }
    };

    videoEl.addEventListener("canplay", ensurePlay, { once: true });
    ensurePlay();

    videoEl.addEventListener("ended", () => {
      currentVideo = (currentVideo + 1) % videoPlaylist.length;
      videoSourceEl.src = videoPlaylist[currentVideo];
      videoEl.load();
      ensurePlay();
    });
  }

  /* ===================== 2. WEBGL LIQUID GLASS ===================== */

  const canvas = document.getElementById("heroLiquidCanvas");
  if (canvas && shouldLimitHeroEffects) { // [PATCH]
    canvas.classList.add("hero-lg__liquid-canvas--disabled"); // [PATCH]
    return; // [PATCH]
  }

  if (canvas) {
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });

    if (!gl) {
      canvas.style.display = "none";
    } else {
      const vertSrc = document.getElementById("hero-lg-vert").textContent.trim();
      const fragSrc = document.getElementById("hero-lg-frag").textContent.trim();

      function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vertShader = createShader(gl.VERTEX_SHADER, vertSrc);
      const fragShader = createShader(gl.FRAGMENT_SHADER, fragSrc);

      const program = gl.createProgram();
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("Program link error:", gl.getProgramInfoLog(program));
      }

      gl.useProgram(program);

      const positionLoc = gl.getAttribLocation(program, "a_position");
      const timeLoc = gl.getUniformLocation(program, "u_time");
      const resLoc = gl.getUniformLocation(program, "u_resolution");
      const pointerLoc = gl.getUniformLocation(program, "u_pointer");
      const intensityLoc = gl.getUniformLocation(program, "u_intensity");

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1
        ]),
        gl.STATIC_DRAW
      );

      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      let startTime = performance.now();
      let pointer = { x: 0.3, y: 0.4 };
      let intensity = 0.6;

      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        const width = rect.width * dpr;
        const height = rect.height * dpr;
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
          gl.uniform2f(resLoc, width, height);
        }
      }

      resize();
      window.addEventListener("resize", resize);

      function toShaderCoords(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width;
        const y = 1.0 - (clientY - rect.top) / rect.height;
        return { x, y };
      }

      const pointerHandler = (e) => {
        if (e.touches && e.touches.length) {
          e = e.touches[0];
        }
        const p = toShaderCoords(e.clientX, e.clientY);
        pointer.x = p.x;
        pointer.y = p.y;
        intensity = 1.0;
      };

      canvas.addEventListener("mousemove", pointerHandler);
      canvas.addEventListener("touchmove", pointerHandler, { passive: true });

      function render() {
        const now = performance.now();
        const t = (now - startTime) / 1000;

        intensity += (0.55 - intensity) * 0.02;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(timeLoc, t);
        gl.uniform2f(pointerLoc, pointer.x, pointer.y);
        gl.uniform1f(intensityLoc, intensity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
      }

      render();
    }
  }

  /* ===================== 3. FLOATING CAPSULE HEADER ===================== */

  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-trigger");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-link, .btn-mobile");

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  const toggleMenu = () => {
    const isOpen = overlay.classList.contains("active");

    if (isOpen) {
      overlay.classList.remove("active");
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "auto";
    } else {
      overlay.classList.add("active");
      menuBtn.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", toggleMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (overlay.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // ILS NOUS FONT CONFIANCE – infinite loop for logo carousel
  const trustTrack = document.getElementById("trust-carousel-track");
  const trustWrapper = document.querySelector(".trust-section .carousel-wrapper");

  if (trustTrack && trustWrapper && trustTrack.dataset.cloned !== "true") {
    const originals = Array.from(trustTrack.children).map((node) => node.cloneNode(true));
    trustTrack.innerHTML = "";

    // [PATCH] Build exactly two identical sets for a seamless 0% → -50% marquee
    originals.forEach((node) => trustTrack.appendChild(node.cloneNode(true)));
    originals.forEach((node) => trustTrack.appendChild(node.cloneNode(true)));

    // Guard: if the duplicated width is still smaller than the viewport, append one more set
    if (trustTrack.scrollWidth < trustWrapper.clientWidth * 1.5) {
      originals.forEach((node) => trustTrack.appendChild(node.cloneNode(true)));
    }

    trustTrack.dataset.cloned = "true";
  }
});

// ─────────────────────────────────────────────────────────
// 6. Services Section – Glassmorphism Load Animation
// ─────────────────────────────────────────────────────────

// Simple load animation: when the section enters viewport, reveal cards
(function () {
  const section = document.getElementById("services-excellence");
  if (!section) return;

  const activate = () => section.classList.add("loaded");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(section);
  } else {
    // Fallback
    window.addEventListener("load", activate);
  }
})();

// ─────────────────────────────────────────────────────────
// 7. Témoignages Section – NOW HANDLED BY testimonials.js MODULE
// ─────────────────────────────────────────────────────────
/* OLD CODE REPLACED BY NEW MODULE - COMMENTED OUT
const testimonialsSection = document.querySelector('.test-sec');

if (testimonialsSection) {
  const revealTestimonials = () => {
    testimonialsSection.classList.add('is-visible');
  };

  const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  if (!canObserve) {
    revealTestimonials();
  } else {
    try {
      const testimonialsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      testimonialsObserver.observe(testimonialsSection);
    } catch (error) {
      console.warn('Testimonials reveal disabled – falling back to static view', error);
      revealTestimonials();
    }
  }
}

const carouselWrap = document.querySelector('.test-carousel-wrap');
const testimonialCarousel = carouselWrap ? carouselWrap.querySelector('.test-carousel') : null;
const testimonialCards = testimonialCarousel ? Array.from(testimonialCarousel.querySelectorAll('.test-card')) : [];
const prevControl = carouselWrap ? carouselWrap.querySelector('.prev') : null;
const nextControl = carouselWrap ? carouselWrap.querySelector('.next') : null;

if (testimonialCarousel && testimonialCards.length > 0) {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const AUTO_SLIDE_DELAY = 6000;
  let autoSlideTimeout = null;
  let activeTestimonial = 0;
  let scrollSyncTimeout;
  let pointerHovering = false;

  function updateActiveTestimonial() {
    testimonialCards.forEach((card, index) => {
      const isActive = index === activeTestimonial;
      card.setAttribute('data-active', isActive.toString());
      card.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function getScrollBehavior() {
    return motionQuery.matches ? 'auto' : 'smooth';
  }

  function pauseAutoSlide() {
    if (autoSlideTimeout) {
      clearTimeout(autoSlideTimeout);
      autoSlideTimeout = null;
    }
  }

  function scheduleAutoSlide() {
    pauseAutoSlide();

    if (motionQuery.matches || testimonialCards.length < 2) {
      return;
    }

    autoSlideTimeout = window.setTimeout(() => {
      moveTestimonial(1, { triggeredByAuto: true });
    }, AUTO_SLIDE_DELAY);
  }

  function scrollToTestimonial(index, { triggeredByAuto = false } = {}) {
    const target = testimonialCards[index];
    if (!target) return;

    activeTestimonial = index;
    const left = target.offsetLeft - ((testimonialCarousel.clientWidth - target.clientWidth) / 2);
    const behavior = getScrollBehavior();

    if (typeof testimonialCarousel.scrollTo === 'function') {
      try {
        testimonialCarousel.scrollTo({ left, behavior });
      } catch (error) {
        testimonialCarousel.scrollLeft = left;
      }
    } else {
      testimonialCarousel.scrollLeft = left;
    }

    updateActiveTestimonial();

    if (triggeredByAuto) {
      scheduleAutoSlide();
    }
  }

  function moveTestimonial(step, { triggeredByAuto = false } = {}) {
    const nextIndex = (activeTestimonial + step + testimonialCards.length) % testimonialCards.length;
    scrollToTestimonial(nextIndex, { triggeredByAuto });

    if (!triggeredByAuto) {
      if (pointerHovering) {
        pauseAutoSlide();
      } else {
        scheduleAutoSlide();
      }
    }
  }

  function handleMotionPreference() {
    if (motionQuery.matches) {
      pauseAutoSlide();
    } else {
      scheduleAutoSlide();
    }
  }

  updateActiveTestimonial();
  handleMotionPreference();

  window.requestAnimationFrame(() => {
    scrollToTestimonial(activeTestimonial);
    scheduleAutoSlide();
  });

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', handleMotionPreference);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(handleMotionPreference);
  }

  if (prevControl) {
    prevControl.addEventListener('click', () => moveTestimonial(-1));
  }

  if (nextControl) {
    nextControl.addEventListener('click', () => moveTestimonial(1));
  }

  const handleInteractionStart = () => pauseAutoSlide();
  const handleInteractionEnd = () => {
    if (!pointerHovering) {
      scheduleAutoSlide();
    }
  };
  const handlePointerCancel = () => {
    pointerHovering = false;
    scheduleAutoSlide();
  };

  if ('PointerEvent' in window) {
    testimonialCarousel.addEventListener('pointerdown', handleInteractionStart, { passive: true });
    testimonialCarousel.addEventListener('pointerup', handleInteractionEnd, { passive: true });
    testimonialCarousel.addEventListener('pointercancel', handlePointerCancel, { passive: true });
  } else {
    testimonialCarousel.addEventListener('mousedown', handleInteractionStart);
    testimonialCarousel.addEventListener('mouseup', handleInteractionEnd);
    testimonialCarousel.addEventListener('touchstart', handleInteractionStart, { passive: true });
    testimonialCarousel.addEventListener('touchend', handleInteractionEnd, { passive: true });
    testimonialCarousel.addEventListener('touchcancel', handleInteractionEnd, { passive: true });
  }

  testimonialCarousel.addEventListener('touchstart', handleInteractionStart, { passive: true });
  testimonialCarousel.addEventListener('touchend', handleInteractionEnd, { passive: true });
  testimonialCarousel.addEventListener('touchcancel', handleInteractionEnd, { passive: true });
  testimonialCarousel.addEventListener('mouseenter', () => {
    pointerHovering = true;
    handleInteractionStart();
  });
  testimonialCarousel.addEventListener('mouseleave', () => {
    pointerHovering = false;
    handleInteractionEnd();
  });

  testimonialCarousel.addEventListener('scroll', () => {
    pauseAutoSlide();
    clearTimeout(scrollSyncTimeout);

    scrollSyncTimeout = window.setTimeout(() => {
      const carouselCenter = testimonialCarousel.scrollLeft + (testimonialCarousel.offsetWidth / 2);
      let closestIndex = activeTestimonial;
      let closestDistance = Number.POSITIVE_INFINITY;

      testimonialCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeTestimonial) {
        activeTestimonial = closestIndex;
        updateActiveTestimonial();
      }

      if (!pointerHovering) {
        scheduleAutoSlide();
      }
    }, 140);
  }, { passive: true });

  if (carouselWrap) {
    carouselWrap.addEventListener('mouseenter', () => {
      pointerHovering = true;
      pauseAutoSlide();
    });
    carouselWrap.addEventListener('mouseleave', () => {
      pointerHovering = false;
      scheduleAutoSlide();
    });

    carouselWrap.addEventListener('focusin', pauseAutoSlide);
    carouselWrap.addEventListener('focusout', (event) => {
      if (!carouselWrap.contains(event.relatedTarget)) {
        scheduleAutoSlide();
      }
    });
  }

  testimonialCards.forEach((card, index) => {
    card.addEventListener('focus', () => {
      scrollToTestimonial(index);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToTestimonial(index);
      }
    });
  });

  let resizeRaf = null;
  const handleResize = () => {
    if (resizeRaf !== null) {
      cancelAnimationFrame(resizeRaf);
    }

    resizeRaf = window.requestAnimationFrame(() => {
      resizeRaf = null;
      scrollToTestimonial(activeTestimonial);

      if (!pointerHovering) {
        scheduleAutoSlide();
      }
    });
  };

  window.addEventListener('resize', handleResize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAutoSlide();
    } else if (!pointerHovering) {
      scheduleAutoSlide();
    }
  });

  if (testimonialsSection) {
    testimonialsSection.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveTestimonial(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveTestimonial(-1);
      }
    });
  }
}
END OF OLD TESTIMONIALS CODE */


// NOS CLIENTS – CINEMATIC STRIP INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#nos-clients-strip");
    if (!section) return;

    const pills = Array.from(section.querySelectorAll(".clients-strip__pill"));
    const panels = Array.from(section.querySelectorAll(".clients-strip__panel"));
    const indicator = section.querySelector(".clients-strip__pill-indicator");

    if (!pills.length || !panels.length || !indicator) return;

    const isMobileLayout = () =>
        window.matchMedia("(max-width: 1024px)").matches;

    const moveIndicator = (activePill) => {
        if (!activePill) return;
        const navRect = activePill.parentElement.getBoundingClientRect();
        const pillRect = activePill.getBoundingClientRect();

        if (isMobileLayout()) {
            const left = pillRect.left - navRect.left;
            const width = pillRect.width;

            indicator.style.top = "auto";
            indicator.style.bottom = "0";
            indicator.style.right = "auto";
            indicator.style.left = "0";
            indicator.style.transform = `translateX(${left}px)`;
            indicator.style.width = `${width}px`;
            indicator.style.height = `3px`;
        } else {
            const top = pillRect.top - navRect.top;
            const height = pillRect.height;

            indicator.style.top = "0";
            indicator.style.bottom = "auto";
            indicator.style.left = "0";
            indicator.style.right = "auto";
            indicator.style.transform = `translateY(${top}px)`;
            indicator.style.height = `${height}px`;
            indicator.style.width = `3px`;
        }
    };

    const activateTab = (targetKey, focusPill = false) => {
        let activePill = null;

        pills.forEach((pill) => {
            const key = pill.getAttribute("data-strip-target");
            const isActive = key === targetKey;

            pill.classList.toggle("is-active", isActive);
            pill.setAttribute("aria-selected", isActive ? "true" : "false");
            pill.setAttribute("tabindex", isActive ? "0" : "-1");

            if (isActive) activePill = pill;
        });

        panels.forEach((panel) => {
            const key = panel.getAttribute("data-strip-panel");
            const isActive = key === targetKey;
            panel.classList.toggle("is-active", isActive);
        });

        if (activePill) {
            if (focusPill) activePill.focus();
            requestAnimationFrame(() => moveIndicator(activePill));
        }
    };

    pills.forEach((pill) => {
        pill.addEventListener("click", () => {
            const key = pill.getAttribute("data-strip-target");
            if (!key) return;
            activateTab(key, false);
        });

        pill.addEventListener("keydown", (e) => {
            const currentIndex = pills.indexOf(pill);
            if (currentIndex === -1) return;

            let nextIndex = null;

            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % pills.length;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + pills.length) % pills.length;
            } else if (e.key === "Home") {
                nextIndex = 0;
            } else if (e.key === "End") {
                nextIndex = pills.length - 1;
            }

            if (nextIndex !== null) {
                e.preventDefault();
                const nextPill = pills[nextIndex];
                const key = nextPill.getAttribute("data-strip-target");
                if (key) activateTab(key, true);
            }

            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const key = pill.getAttribute("data-strip-target");
                if (key) activateTab(key, false);
            }
        });
    });

    window.addEventListener("resize", () => {
        const activePill = section.querySelector(".clients-strip__pill.is-active");
        if (activePill) {
            requestAnimationFrame(() => moveIndicator(activePill));
        }
    });

    const initialKey = pills[0].getAttribute("data-strip-target");
    activateTab(initialKey || "particuliers", false);

    setTimeout(() => {
        const activePill = section.querySelector(".clients-strip__pill.is-active");
        if (activePill) moveIndicator(activePill);
    }, 150);
});

// ─────────────────────────────────────────────────────────
// 8. Client Experience Cards – staggered reveal & hover polish
// ─────────────────────────────────────────────────────────
const initClientExperienceCards = () => {
  const cards = Array.from(document.querySelectorAll('.client-type-card'));

  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  if (prefersReducedMotion || !canObserve) {
    cards.forEach((card) => {
      card.classList.remove('is-reveal-init');
      card.classList.add('is-visible');
      card.style.removeProperty('--card-delay');
    });
    return;
  }

  let observer;

  try {
    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25,
    });
  } catch (error) {
    cards.forEach((card) => {
      card.classList.remove('is-reveal-init');
      card.classList.add('is-visible');
      card.style.removeProperty('--card-delay');
    });
    return;
  }

  cards.forEach((card, index) => {
    card.classList.add('is-reveal-init');
    card.style.setProperty('--card-delay', `${index * 120}ms`);
    observer.observe(card);
  });
};

// ─────────────────────────────────────────────────────────
// 9. Notre Approche - Progressive Animations
// ─────────────────────────────────────────────────────────
const bootApprocheAnimations = () => {
  import('./approche-animations.js')
    .then((module) => {
      if (module && typeof module.initApproche === 'function') {
        module.initApproche();
      }
    })
    .catch((error) => {
      console.warn('Approche animations unavailable', error);
    });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApprocheAnimations, { once: true });
} else {
  bootApprocheAnimations();
}

// ─────────────────────────────────────────────────────────
// 10. Partners Logos – Liquid Glass Sphere Parallax
// ─────────────────────────────────────────────────────────
const initPartnersSphere = () => {
  const sphere = document.querySelector('.partners-sphere');
  const inner = document.querySelector('.partners-sphere-inner');

  if (!sphere || !inner) return;

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // No JS parallax: keep idle CSS animation only
    return;
  }

  let pointerActive = false;
  let idleTimeoutId = null;

  const setTilt = (xDeg, yDeg) => {
    inner.style.setProperty('--partners-tilt-x', `${xDeg}deg`);
    inner.style.setProperty('--partners-tilt-y', `${yDeg}deg`);
  };

  const resetTilt = () => {
    pointerActive = false;
    setTilt(0, 0);
  };

  const handlePointerMove = (event) => {
    const rect = sphere.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    const tiltX = relX * 16;   // horizontal tilt
    const tiltY = -relY * 12;  // vertical tilt

    pointerActive = true;
    setTilt(tiltX, tiltY);

    if (idleTimeoutId) {
      window.clearTimeout(idleTimeoutId);
    }

    idleTimeoutId = window.setTimeout(() => {
      pointerActive = false;
    }, 1200);
  };

  let animationFrameId;
  const startIdleLoop = () => {
    let start = null;

    const loop = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (!pointerActive) {
        const idleX = Math.sin(elapsed * 0.0004) * 4;
        const idleY = Math.cos(elapsed * 0.0003) * 3;
        setTilt(idleX, idleY);
      }

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);
  };

  sphere.addEventListener('pointermove', handlePointerMove);
  sphere.addEventListener('pointerleave', resetTilt);

  startIdleLoop();

  window.addEventListener('beforeunload', () => {
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
  });
};

// ─────────────────────────────────────────────────────────
// 11. Technologie & Marques – Gallery parallax tilt
// ─────────────────────────────────────────────────────────
const initBrandSphere = () => {
  const gallery = document.querySelector('.all-brands-gallery');

  if (!gallery) return;

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gallery.style.setProperty('--tilt-x', '0deg');
    gallery.style.setProperty('--tilt-y', '0deg');
    return;
  }

  let pointerActive = false;
  let idleId = null;

  const setTilt = (xDeg, yDeg) => {
    gallery.style.setProperty('--tilt-x', `${xDeg}deg`);
    gallery.style.setProperty('--tilt-y', `${yDeg}deg`);
  };

  const handleMove = (event) => {
    const rect = gallery.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    const tiltX = relX * 4;
    const tiltY = -relY * 3;

    pointerActive = true;
    setTilt(tiltX, tiltY);

    if (idleId) window.clearTimeout(idleId);
    idleId = window.setTimeout(() => { pointerActive = false; }, 1200);
  };

  const resetTilt = () => {
    pointerActive = false;
    setTilt(0, 0);
  };

  let frameId;
  const startIdle = () => {
    let start = null;

    const loop = (ts) => {
      if (!start) start = ts;
      const t = ts - start;

      if (!pointerActive) {
        const idleX = Math.sin(t * 0.0004) * 2;
        const idleY = Math.cos(t * 0.00035) * 1.5;
        setTilt(idleX, idleY);
      }

      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);
  };

  gallery.addEventListener('pointermove', handleMove);
  gallery.addEventListener('pointerleave', resetTilt);
  startIdle();

  window.addEventListener('beforeunload', () => {
    if (frameId) window.cancelAnimationFrame(frameId);
  });
};

// BRANDS SECTION – mouse-follow shine on logos
const initBrandLogoShine = () => {
  const logos = document.querySelectorAll('.brands-universe__logo');
  if (!logos.length) return;

  logos.forEach((logo) => {
    logo.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      logo.style.setProperty('--shine-x', `${x}%`);
      logo.style.setProperty('--shine-y', `${y}%`);
    });

    logo.addEventListener('mouseleave', () => {
      logo.style.setProperty('--shine-x', '50%');
      logo.style.setProperty('--shine-y', '50%');
    });
  });
};

const initTiltCards = () => {
  const cards = document.querySelectorAll('[data-tilt]');

  const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (!cards.length || isCoarsePointer) return;

  cards.forEach(card => {
    const maxTilt = 5;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initClientExperienceCards();
    initBrandSphere();
    initPartnersSphere();
    initBrandLogoShine();
    initTiltCards();
  }, { once: true });
} else {
  initClientExperienceCards();
  initBrandSphere();
  initPartnersSphere();
  initBrandLogoShine();
  initTiltCards();
}

// PRECISION SECTION INTERACTIONS
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".precision-std");
  const cards = document.querySelectorAll(".precision-std .js-precision-tilt");

  if (!section || !cards.length) return;

  // 1. Scroll-reveal using IntersectionObserver
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("precision-std--revealed");
          io.disconnect();
        }
      });
    },
    {
      root: null,
      threshold: 0.25,
    }
  );

  io.observe(section);

  // 2. Subtle 3D tilt on cards
  const maxTilt = 6; // degrees

  cards.forEach((card) => {
    const resetTilt = () => {
      card.style.setProperty("--tilt-rotate-x", "0deg");
      card.style.setProperty("--tilt-rotate-y", "0deg");
      card.style.setProperty("--tilt-translate-y", "0px");
    };

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateY = percentX * maxTilt;
      const rotateX = -percentY * maxTilt;

      card.style.setProperty("--tilt-rotate-x", `${rotateX}deg`);
      card.style.setProperty("--tilt-rotate-y", `${rotateY}deg`);
      card.style.setProperty("--tilt-translate-y", "-4px");
    });

    card.addEventListener("mouseleave", () => {
      resetTilt();
    });

    resetTilt();
  });
});

// ─────────────────────────────────────────────────────────
// 12. Footer – Dynamic Year Stamp
// ─────────────────────────────────────────────────────────
const yearTarget = document.getElementById('current-year');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear().toString();
}
