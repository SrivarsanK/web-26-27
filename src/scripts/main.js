/* ============================================================
   DSC Website — JavaScript
   Hero Animation Engine + Interactions
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 2. NAVIGATION
  // ============================================================

  const Navigation = {
    init() {
      this.setupHamburger();
      this.setupScrollSpy();
      this.setupNavScroll();
      this.setupSmoothScroll();
    },

    setupHamburger() {
      const hamburger = document.getElementById('hamburger');
      const drawer = document.getElementById('mobile-drawer');
      if (!hamburger || !drawer) return;

      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        drawer.classList.toggle('open');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
      });

      // Close drawer when clicking a link
      drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          drawer.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    },

    setupScrollSpy() {
      const sections = document.querySelectorAll('section[id], footer[id]');
      const navLinks = document.querySelectorAll('.nav-links a');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                  link.classList.add('active');
                }
              });
            }
          });
        },
        {
          rootMargin: '-40% 0px -60% 0px',
        }
      );

      sections.forEach((section) => observer.observe(section));
    },

    setupNavScroll() {
      const navbar = document.getElementById('navbar');
      if (!navbar) return;

      window.addEventListener(
        'scroll',
        () => {
          if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        },
        { passive: true }
      );
    },

    setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            const navHeight = 106; // ticker + nav height
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({
              top: targetPos,
              behavior: 'smooth',
            });
          }
        });
      });
    },
  };

  // ============================================================
  // 3. SCROLL REVEAL ANIMATIONS
  // ============================================================

  const ScrollReveal = {
    init() {
      const elements = document.querySelectorAll('.reveal');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
    },
  };

  // ============================================================
  // 4. ANIMATED STAT COUNTERS
  // ============================================================

  const StatCounters = {
    init() {
      const statNumbers = document.querySelectorAll('.stat-number[data-target]');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      statNumbers.forEach((el) => observer.observe(el));
    },

    animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const startTime = performance.now();

      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);
        el.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + '+';
        }
      };

      requestAnimationFrame(update);
    },
  };

  // ============================================================
  // 6. INITIALIZATION
  // ============================================================

  document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    ScrollReveal.init();
    StatCounters.init();

    // Defer loading footer background video using IntersectionObserver
    const video = document.querySelector('video.contra-art');
    if (video && video.dataset.src) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.src = video.dataset.src;
            video.play().catch((err) => console.log('Autoplay prevented:', err));
            observer.unobserve(video);
          }
        });
      }, { rootMargin: '100px' });
      observer.observe(video);
    }

    // Eye Comfort Shield Toggle
    const eyeComfortBtn = document.getElementById('eye-comfort-toggle');
    if (eyeComfortBtn) {
      eyeComfortBtn.addEventListener('click', () => {
        document.body.classList.toggle('eye-comfort-mode');
        eyeComfortBtn.classList.toggle('active');
      });
    }
  });
})();
