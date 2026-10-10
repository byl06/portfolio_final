// =========================================================
// TRANSITION SIGNATURE — BylDesign
// Intercepte les clics sur les liens internes et joue
// l'animation avant de naviguer vers la nouvelle page.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.transition-overlay');
  if (!overlay) return; // pas d'overlay sur cette page

  const DURATION = 1400;  // durée d'écriture
  const PAUSE    = 500;   // pause après l'écriture avant navigation

  // Déclenche l'animation puis navigue
  function playTransition(url) {
    overlay.classList.remove('active');
    void overlay.offsetWidth;
    overlay.classList.add('active');

    setTimeout(() => {
      window.location.href = url;
    }, DURATION + PAUSE);
  }

  // Intercepte tous les liens internes avec data-transition
  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Ignore si ancre seule, lien externe, ou nouvel onglet
      if (!href || href.startsWith('#') || href.startsWith('http') || link.target === '_blank') return;

      e.preventDefault();
      playTransition(href);
    });
  });

  // Bonus : si on arrive sur la page via la transition, on peut
  // faire apparaître un léger fade-in
  document.body.style.opacity = '1';
});