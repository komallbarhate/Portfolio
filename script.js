// Custom cursor disabled – using default OS pointer

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));

// ── TYPEWRITER ──
const words = ['Web Developer.', 'Python Enthusiast.', 'CS Student.', 'UI/UX Explorer.', 'Prodigy InfoTech Intern.'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = words[wi];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci === word.length + 1) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── SKILL BAR ANIMATION ──
const skillCards = document.querySelectorAll('.skill-card');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.dataset.delay || 0);
      setTimeout(() => {
        card.classList.add('animate');
        const fill = card.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.pct + '%';
      }, delay);
      skillObs.unobserve(card);
    }
  });
}, { threshold: 0.3 });
skillCards.forEach(c => skillObs.observe(c));

// ── ACHIEVEMENT CARD ANIMATION ──
const achieveCards = document.querySelectorAll('.achieve-card');
const achObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('animate'), i * 100);
      achObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
achieveCards.forEach(c => achObs.observe(c));

// ── TABS ──
document.getElementById('about-tabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.tab).classList.add('active');
});

// ── PROJECT FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// ── CONTACT FORM ──
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.add('show');
    this.reset();
    btn.innerHTML = 'Send Message <span class="arrow">→</span>';
    btn.disabled = false;
    setTimeout(() => document.getElementById('form-success').classList.remove('show'), 4000);
  }, 1200);
});

// ── SCROLL REVEAL (project cards, timeline, contact items) ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.project-card, .contact-item, .timeline-item').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObs.observe(el);
});
