/**
 * Interactive 3D Cube & Modular Particle Canvas for YM INNOTECH Hero
 */
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('.hero-stage');
  const card = document.querySelector('.cube-card-interactive');
  
  if (stage && card) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (-y / (rect.height / 2)) * 14;
      const rotateY = (x / (rect.width / 2)) * 18;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    stage.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    stage.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  }
});
