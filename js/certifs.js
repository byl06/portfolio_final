// =========================================================
// MODALE CERTIFICAT — Ouverture au clic
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certifModal');
  const modalImg = document.getElementById('certifModalImg');
  const modalCaption = document.getElementById('certifModalCaption');
  const cards = document.querySelectorAll('.certif-card');

  if (!modal || !cards.length) return;

  // Mapping certif → image + légende
  const data = {
    python: {
      img: 'assets/certifs/b.png',
      caption: 'Python Essentials 1 — Cisco Networking Academy'
    },
    cyber: {
      img: 'assets/certifs/bb.png',
      caption: 'Introduction à la Cybersécurité — Cisco Networking Academy'
    }
  };

  // Ouvre la modale
  function openModal(key) {
    const certif = data[key];
    if (!certif) return;

    modalImg.src = certif.img;
    modalImg.alt = certif.caption;
    modalCaption.textContent = certif.caption;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Ferme la modale
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Vide l'image après la fermeture pour éviter un flash
    setTimeout(() => {
      modalImg.src = '';
    }, 300);
  }

  // Clic sur une carte (badge ou bouton)
  cards.forEach(card => {
    const key = card.dataset.certif;
    const badge = card.querySelector('.certif-badge');
    const btn = card.querySelector('.certif-btn');

    if (badge) badge.addEventListener('click', () => openModal(key));
    if (btn) btn.addEventListener('click', () => openModal(key));
  });

  // Clic sur backdrop ou bouton close
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // Touche Échap pour fermer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
});