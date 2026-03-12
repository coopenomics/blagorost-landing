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

/**
 * Калькулятор — модальное окно
 */
const calcModal = document.getElementById('calc-modal');
const calcOpen = document.querySelector('.calc-open');
const calcClose = document.querySelector('.calc-modal-close');
const calcBackdrop = document.querySelector('.calc-modal-backdrop');

function openCalcModal() {
  if (calcModal) {
    calcModal.classList.add('is-open');
    calcModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeCalcModal() {
  if (calcModal) {
    calcModal.classList.remove('is-open');
    calcModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

if (calcOpen) calcOpen.addEventListener('click', openCalcModal);
if (calcClose) calcClose.addEventListener('click', closeCalcModal);
if (calcBackdrop) calcBackdrop.addEventListener('click', closeCalcModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && calcModal?.classList.contains('is-open')) {
    closeCalcModal();
  }
});
