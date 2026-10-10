// ========================================
// PORTFOLIO BYLDESIGN — SCRIPT PRINCIPAL
// ========================================

// Ici on ajoutera les animations premium à l'étape 5.
// Pour l'instant, ce fichier est prêt mais volontairement vide
// (le JS newwave qui ciblait des éléments inexistants a été supprimé).

console.log("Portfolio BylDesign — ready ✨");
// ========================================
// FILTRE RÉALISATIONS PAR SECTEUR
// ========================================
const filtres = document.querySelectorAll('.filtre');
const cards = document.querySelectorAll('.real-card');

filtres.forEach(btn => {
  btn.addEventListener('click', () => {
    // état actif
    filtres.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});
// ========================================
// FORMULAIRE CONTACT → WHATSAPP
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation simple
    if (!name || !email || !message) {
      alert('Merci de remplir les champs obligatoires (Nom, Email, Message).');
      return;
    }

    // Numéro WhatsApp (format international sans +, sans espaces)
    const phone = '22901515963';

    // Construction du message WhatsApp
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

    // Ouvrir WhatsApp
    window.open(waUrl, '_blank');

    // Reset après envoi
    contactForm.reset();
  });
}
// =========================================================
// MENU HAMBURGER MOBILE
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  // Ouvre / ferme le menu
  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  }

  // Ferme le menu
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  // Clic sur le hamburger
  hamburger.addEventListener('click', toggleMenu);

  // Clic sur un lien du menu → ferme
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Si le lien est externe (target _blank), ne pas fermer immédiatement
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

  // Si on redimensionne vers desktop → ferme le menu
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
});