/**
 * Scroll reveal — анимация появления элементов при скролле
 */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
reveals.forEach((el) => observer.observe(el));

/**
 * Hero — анимация появления при загрузке
 */
setTimeout(() => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
}, 100);

/**
 * Nav — эффект фона при скролле
 */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.background = 'rgba(8,10,14,0.97)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(8,10,14,0.95), transparent)';
  }
});
