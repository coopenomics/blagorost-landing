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
 * Theme — светлая/тёмная тема
 */
(function () {
  const STORAGE_KEY = 'coop-theme';
  function getSystemTheme() { return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
  function getEffectiveTheme() { return localStorage.getItem(STORAGE_KEY) || getSystemTheme(); }
  function applyTheme(t) {
    const theme = t !== undefined ? t : (localStorage.getItem(STORAGE_KEY) || null);
    document.documentElement.removeAttribute('data-theme');
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    const effective = theme || getSystemTheme();
    const icon = document.querySelector('#theme-toggle .theme-icon');
    if (icon) {
      icon.className = 'theme-icon theme-icon-' + effective;
      icon.closest('button').setAttribute('title', effective === 'light' ? 'Тема: светлая' : 'Тема: тёмная');
    }
  }
  function cycleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', cycleTheme);
  applyTheme();
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { if (!localStorage.getItem(STORAGE_KEY)) applyTheme(); });
})();

/**
 * Nav — эффект фона при скролле
 */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

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
