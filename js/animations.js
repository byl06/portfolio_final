// =========================================================
// ANIMATIONS — BylDesign
// Reveal au scroll + parallax + compteurs + tilt
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. REVEAL AU SCROLL (IntersectionObserver)
  // ============================================================
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ============================================================
  // 2. COMPTEURS ANIMÉS (stats bar)
  // ============================================================
  const counters = document.querySelectorAll('.counter');

  if (counters.length && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600; // ms
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing : easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(c => counterObserver.observe(c));
  } else {
    // Fallback : affiche directement la valeur
    counters.forEach(c => {
      c.textContent = c.dataset.target;
    });
  }

  // ============================================================
  // 3. PARALLAX LÉGER SUR LE HERO
  // ============================================================
  const heroPhoto = document.querySelector('.hero-photo');
  const heroGhost = document.querySelector('.hero-ghost');
  const hero = document.querySelector('.hero');

  if (hero && (heroPhoto || heroGhost)) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      if (scrollY <= heroHeight) {
        const progress = scrollY / heroHeight;

        if (heroPhoto) {
          heroPhoto.style.transform =
            `translateX(-50%) translateY(${progress * 80}px) scale(${1 - progress * 0.05})`;
        }

        if (heroGhost) {
          heroGhost.style.transform =
            `translateY(${progress * -60}px)`;
        }
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================================
  // 4. TILT 3D SUR LES CARTES AU HOVER
  // ============================================================
  const tiltCards = document.querySelectorAll(
    '.real-card, .service-card, .skill-card'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ============================================================
  // 5. NAV — RÉTRACTION AU SCROLL
  // ============================================================
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  if (nav) {
    // Active la transition CSS
    nav.style.transition = 'transform .4s cubic-bezier(.22,.9,.3,1), opacity .4s ease';

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        nav.style.transform = '';
        nav.style.opacity = '';
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Descend → cache
        nav.style.transform = 'translateY(-100%)';
        nav.style.opacity = '0';
      } else {
        // Remonte → affiche
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

});