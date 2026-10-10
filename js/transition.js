// =========================================================
// TRANSITION SIGNATURE — BylDesign
// Version rapide + préchargement au survol
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.transition-overlay');
  if (!overlay) return;

  // ---------------------------------------------------------
  // CONFIG — Modifie ces valeurs pour ajuster la vitesse
  // ---------------------------------------------------------
  const DURATION = 700;   // durée de l'écriture de la signature (ms)
  const PAUSE    = 100;   // petite pause avant navigation (ms)

  // Injecte la durée dans le CSS (utilisée par --trans-duration)
  overlay.style.setProperty('--trans-duration', DURATION + 'ms');

  // ---------------------------------------------------------
  // Fonction : joue la transition puis navigue
  // ---------------------------------------------------------
  let isTransitioning = false;

  function playTransition(url) {
    // Évite les doubles clics
    if (isTransitioning) return;
    isTransitioning = true;

    overlay.classList.remove('active');
    void overlay.offsetWidth; // force reflow
    overlay.classList.add('active');

    setTimeout(() => {
      window.location.href = url;
    }, DURATION + PAUSE);
  }

  // ---------------------------------------------------------
  // Intercepte les clics sur les liens [data-transition]
  // ---------------------------------------------------------
  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignore : ancres, liens externes, target _blank, modifier keys
      if (!href) return;
      if (href.startsWith('#')) return;
      if (href.startsWith('http')) return;
      if (link.target === '_blank') return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      playTransition(href);
    });
  });

  // ---------------------------------------------------------
  // Préchargement au survol (accélère la navigation)
  // ---------------------------------------------------------
  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;

      // Évite les doublons
      if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = href;
      document.head.appendChild(prefetch);
    });
  });

  // ---------------------------------------------------------
  // Ferme l'overlay si l'utilisateur revient en arrière
  // ---------------------------------------------------------
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      overlay.classList.remove('active');
      isTransitioning = false;
    }
  });

});