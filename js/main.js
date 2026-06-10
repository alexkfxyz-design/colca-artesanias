'use strict';

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile burger ── */
const burger = document.getElementById('navBurger');
let mobileMenu = null;
burger?.addEventListener('click', () => {
  if (mobileMenu) { mobileMenu.remove(); mobileMenu = null; return; }
  mobileMenu = document.createElement('div');
  mobileMenu.className = 'nav__mobile-menu';
  mobileMenu.style.cssText = 'position:fixed;top:65px;left:0;right:0;background:rgba(26,16,10,.98);backdrop-filter:blur(16px);padding:2rem;z-index:99;border-bottom:1px solid rgba(196,118,74,.2);';
  mobileMenu.innerHTML = `
    <a style="display:block;font-family:'Outfit',sans-serif;font-size:1rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,232,217,.8);padding:.9rem 0;border-bottom:1px solid rgba(196,118,74,.1);transition:color .2s" href="#nosotros"  onclick="this.closest('.nav__mobile-menu').remove()">Nosotros</a>
    <a style="display:block;font-family:'Outfit',sans-serif;font-size:1rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,232,217,.8);padding:.9rem 0;border-bottom:1px solid rgba(196,118,74,.1)" href="#catalogo"  onclick="this.closest('.nav__mobile-menu').remove()">Catálogo</a>
    <a style="display:block;font-family:'Outfit',sans-serif;font-size:1rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,232,217,.8);padding:.9rem 0;border-bottom:1px solid rgba(196,118,74,.1)" href="#artesanos" onclick="this.closest('.nav__mobile-menu').remove()">Artesanos</a>
    <a style="display:block;font-family:'Outfit',sans-serif;font-size:1rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,232,217,.8);padding:.9rem 0;border-bottom:1px solid rgba(196,118,74,.1)" href="#mercados"  onclick="this.closest('.nav__mobile-menu').remove()">Mercados</a>
    <a style="display:block;font-family:'Outfit',sans-serif;font-size:1rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,232,217,.8);padding:.9rem 0;border-bottom:1px solid rgba(196,118,74,.1)" href="#contacto"  onclick="this.closest('.nav__mobile-menu').remove()">Contacto</a>
    <a style="display:block;margin-top:1.5rem;text-align:center;padding:.85rem;background:#C4764A;color:#FEFCF8;border-radius:4px;font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase" href="pages/catalogo.html">Explorar tienda</a>
  `;
  document.body.appendChild(mobileMenu);
});

/* ── Reveal on scroll ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / (2000 / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat__num[data-target]').forEach(el => counterObs.observe(el));

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Lazy-load images with fade-in ── */
if ('IntersectionObserver' in window) {
  const imgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.onload  = () => img.classList.add('loaded');
          img.onerror = () => { /* keep gradient fallback */ };
        }
        imgObs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('img[data-src]').forEach(img => imgObs.observe(img));
} else {
  // Fallback: load all immediately
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
    img.onload = () => img.classList.add('loaded');
  });
}
