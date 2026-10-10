// =========================================================
// FILTRE INTERNE — PAGE SECTEUR
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const sfiltres = document.querySelectorAll('.sfiltre');
  const cards = document.querySelectorAll('.proj-card');
  const emptyMsg = document.querySelector('.secteur-empty');

  if (!sfiltres.length || !cards.length) return;

  sfiltres.forEach(btn => {
    btn.addEventListener('click', () => {
      sfiltres.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.sub;
      let visibleCount = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.sub === filter;
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
      });

      if (emptyMsg) emptyMsg.hidden = visibleCount > 0;
    });
  });
});