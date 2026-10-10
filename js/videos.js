// =========================================================
// GESTION DES VIDÉOS — Une seule joue à la fois
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.proj-video-embed video');
  if (!videos.length) return;

  // Quand une vidéo joue, on pause les autres
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(v => {
        if (v !== video && !v.paused) {
          v.pause();
        }
      });
    });
  });

  // Pause les vidéos qui sortent du viewport (économie de bande passante)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
      }
    });
  }, {
    threshold: 0.25
  });

  videos.forEach(video => observer.observe(video));
});