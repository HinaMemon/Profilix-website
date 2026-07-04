/* =========================================
   PROFILIX — MAIN JAVASCRIPT
   - Navbar scroll
   - Mobile menu
   - Scroll animations
   - Counter animation
   - Project filter
   - Card click animations + ripple
   - WhatsApp form integration
   - Typed hero text
========================================= */

// ---- Navbar scroll (navbar removed) ----
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ---- Mobile menu (navbar removed) ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const open = navLinks.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity  = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ---- Scroll fade-up animations ----
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ---- Counter animation ----
function animateCount(el, target, duration = 1800) {
  let current = 0;
  const step = target / (duration / 16);
  const suffix = el.dataset.suffix || '';
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + suffix; clearInterval(timer); }
    else el.textContent = Math.floor(current) + suffix;
  }, 16);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = 'true';
      animateCount(e.target, parseInt(e.target.dataset.target));
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ---- Project filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (match) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.93)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ---- Card click animation + color glow ----
projectCards.forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't trigger on link clicks
    if (e.target.tagName === 'A') return;

    const color = this.dataset.color || '#0077ff';
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);

    // Dynamic border color flash
    this.style.borderColor = color;
    this.style.boxShadow = `0 0 0 3px ${color}55, 0 20px 48px ${color}33`;
    setTimeout(() => {
      this.style.borderColor = '';
      this.style.boxShadow = '';
    }, 800);

    // Ripple effect
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const size = Math.max(this.offsetWidth, this.offsetHeight);
    ripple.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(${r},${g},${b},0.22);
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);

    // Pulse class
    this.classList.remove('clicked');
    void this.offsetWidth; // reflow
    this.style.setProperty('--card-glow-color', color + '55');
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 600);
  });
});

// ---- WhatsApp Form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const fname   = document.getElementById('fname').value.trim();
    const lname   = document.getElementById('lname').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate required fields
    if (!fname || !lname || !email || !message) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }

    // Compose WhatsApp message
    let waMsg = `*New Inquiry from Profilix Website*\n\n`;
    waMsg += `👤 *Name:* ${fname} ${lname}\n`;
    waMsg += `📧 *Email:* ${email}\n`;
    if (phone) waMsg += `📱 *Phone:* ${phone}\n`;
    if (service) waMsg += `🛠 *Service:* ${service}\n`;
    waMsg += `\n💬 *Message:*\n${message}\n`;
    waMsg += `\n— Sent from profilix.com`;

    const waNumber = '923362065358'; // +92 336 2065358 without + or spaces
    const encoded = encodeURIComponent(waMsg);
    const waURL = `https://wa.me/${waNumber}?text=${encoded}`;

    // Show success feedback briefly then open WA
    const btn = this.querySelector('.btn-submit');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>✅ Opening WhatsApp...</span>';
    btn.disabled = true;

    setTimeout(() => {
      window.open(waURL, '_blank');
      btn.innerHTML = original;
      btn.disabled = false;
      contactForm.reset();
    }, 800);
  });
}

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

// ---- Typed hero text ----
const typedEl = document.getElementById('typed-text');
const phrases = ['Digital Profiles', 'Smart Business Cards', 'Professional Brands', 'Online Identities'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const cur = phrases[phraseIndex];
  typedEl.textContent = isDeleting ? cur.substring(0, charIndex - 1) : cur.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;

  if (!isDeleting && charIndex === cur.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(typeEffect, isDeleting ? 50 : 85);
}
if (typedEl) typeEffect();
