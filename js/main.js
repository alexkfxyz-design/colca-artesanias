/* ─────────────────────────────────────────────────────────────────────────────
   Colca Artesanías — Main JavaScript
───────────────────────────────────────────────────────────────────────────── */

'use strict';

// ── Nav scroll behaviour ───────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile burger menu ─────────────────────────────────────────────────────
const burger = document.getElementById('navBurger');
let mobileMenu = null;

burger?.addEventListener('click', () => {
  if (mobileMenu) {
    mobileMenu.remove();
    mobileMenu = null;
    return;
  }
  mobileMenu = document.createElement('div');
  mobileMenu.className = 'nav__mobile-menu';
  mobileMenu.innerHTML = `
    <style>
      .nav__mobile-menu {
        position: fixed;
        top: 65px; left: 0; right: 0;
        background: rgba(26,16,10,0.98);
        backdrop-filter: blur(16px);
        padding: 2rem;
        z-index: 99;
        border-bottom: 1px solid rgba(196,118,74,0.2);
      }
      .nav__mobile-menu a {
        display: block;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(242,232,217,0.8);
        padding: 0.9rem 0;
        border-bottom: 1px solid rgba(196,118,74,0.1);
        transition: color 0.2s;
        font-family: 'Outfit', sans-serif;
      }
      .nav__mobile-menu a:hover { color: #C4764A; }
      .nav__mobile-menu .mobile-cta {
        display: block;
        margin-top: 1.5rem;
        text-align: center;
        padding: 0.85rem;
        background: #C4764A;
        color: #FEFCF8;
        border-radius: 4px;
        letter-spacing: 0.1em;
      }
    </style>
    <a href="#nosotros"  onclick="closeMobileMenu()">Nosotros</a>
    <a href="#catalogo"  onclick="closeMobileMenu()">Catálogo</a>
    <a href="#artesanos" onclick="closeMobileMenu()">Artesanos</a>
    <a href="#mercados"  onclick="closeMobileMenu()">Mercados</a>
    <a href="#contacto"  onclick="closeMobileMenu()">Contacto</a>
    <a href="pages/catalogo.html" class="mobile-cta">Explorar tienda</a>
  `;
  document.body.appendChild(mobileMenu);
});

window.closeMobileMenu = () => {
  mobileMenu?.remove();
  mobileMenu = null;
};

// ── Intersection Observer for reveal animations ───────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Counter animation ─────────────────────────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 2000;
  const step     = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat__num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── Smooth scroll for anchor links ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link highlight on scroll ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? '#C4764A'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
