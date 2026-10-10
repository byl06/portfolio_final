// =========================================================
// SCRIPT PRINCIPAL — BylDesign
// Filtres + Formulaire contact + Menu mobile
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. FILTRE RÉALISATIONS PAR SECTEUR (index.html)
  // ============================================================
  const filtres = document.querySelectorAll('.filtre');
  const cards = document.querySelectorAll('.real-card');

  if (filtres.length && cards.length) {
    filtres.forEach(btn => {
      btn.addEventListener('click', () => {
        filtres.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.cat === filter;
          card.classList.toggle('hidden', !match);
        });
      });
    });
  }

  // ============================================================
  // 2. FORMULAIRE CONTACT → WHATSAPP
  // ============================================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Merci de remplir les champs obligatoires (Nom, Email, Message).');
        return;
      }

      const phone = '2290151596397';

      const lines = [
        `Bonjour BylDesign 👋`,
        ``,
        `*Nom :* ${name}`,
        `*Email :* ${email}`,
        subject ? `*Sujet :* ${subject}` : null,
        ``,
        `*Message :*`,
        message
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join('\n'));
      const waUrl = `https://wa.me/${phone}?text=${text}`;

      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }

  // ============================================================
  // 3. MENU MOBILE (hamburger ↔ croix)
  //    Fonctionne sur TOUTES les pages (index, projets, design, dev, montage)
  // ============================================================
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {

    // --- Ouvre / ferme ---
    function toggleMenu() {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    }

    // --- Ferme ---
    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }

    // Clic sur le hamburger
    hamburger.addEventListener('click', toggleMenu);

    // Clic sur un lien du menu → ferme (sauf liens externes)
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (link.target === '_blank') return;
        closeMenu();
      });
    });

    // Touche Échap → ferme
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Redimensionnement vers desktop → ferme
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

});

console.log("Portfolio BylDesign — ready ✨");