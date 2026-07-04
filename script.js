// ========== FORM SUBMISSION ==========
function sendForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formSuccess = document.getElementById('formSuccess');
    
    // Get form data
    const formData = new FormData(form);
    
    // Show success message
    formSuccess.style.display = 'block';
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 5000);
}

// ========== SMOOTH SCROLL ==========
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close navbar on mobile after clicking
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar && navbar.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
    } else {
        navbar.classList.remove('shadow-sm');
    }
});

// ========== ANIMATION ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe plan cards and step cards
document.querySelectorAll('.plan-card, .step-card, .faq-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ========== RESPONSIVE IMAGE ==========
// Add responsive image handling if needed
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.backgroundColor = '#e0e0e0';
        });
    });
});

const plansContainer = document.getElementById('plansContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (plansContainer && prevBtn && nextBtn) {
    let currentIndex = 0;
    const totalCards = plansContainer.querySelectorAll('.col-lg-4').length;
    
    // Calculate card width with gap
    const getCardWidth = () => {
        const firstCard = plansContainer.querySelector('.col-lg-4');
        return firstCard.offsetWidth + 24; // card width + gap
    };
    
    const scrollToCard = (index) => {
        const cardWidth = getCardWidth();
        plansContainer.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    };
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            scrollToCard(currentIndex);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToCard(currentIndex);
        }
    });
}

// Hina project section animation

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}
 
// ---- Mobile menu (navbar removed from merged page) ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const open  = navLinks.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}
 
// ---- Scroll fade-up animations (updated selector) ----
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
 
// Observe all projects-fade-up elements
document.querySelectorAll('.projects-fade-up').forEach(el => fadeObserver.observe(el));
 
// ---- Counter animation ----
function animateCount(el, target, duration = 1800) {
  let current  = 0;
  const step   = target / (duration / 16);
  const suffix = el.dataset.suffix || '';
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
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
 
// Targets all counter elements across hero stats and stats banner
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
 
// ---- Project filter (updated selectors) ----
const filterBtns   = document.querySelectorAll('.projects-filter-btn');
const projectCards = document.querySelectorAll('.projects-project-card');
 
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
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = '';
        }, 10);
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'scale(0.93)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});
 
// ---- Card click animation + color glow (updated selectors) ----
projectCards.forEach(card => {
  card.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') return;
 
    const color = this.dataset.color || '#0077ff';
    const hex   = color.replace('#', '');
    const r     = parseInt(hex.substring(0, 2), 16);
    const g     = parseInt(hex.substring(2, 4), 16);
    const b     = parseInt(hex.substring(4, 6), 16);
 
    // Dynamic border colour flash
    this.style.borderColor = color;
    this.style.boxShadow   = `0 0 0 3px ${color}55, 0 20px 48px ${color}33`;
    setTimeout(() => {
      this.style.borderColor = '';
      this.style.boxShadow   = '';
    }, 800);
 
    // Ripple effect (updated class: projects-ripple)
    const rect   = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('projects-ripple');
    const size = Math.max(this.offsetWidth, this.offsetHeight);
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top  - size / 2}px;
      background: rgba(${r},${g},${b},0.22);
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
 
    // Pulse class
    this.classList.remove('clicked');
    void this.offsetWidth; // force reflow
    this.style.setProperty('--card-glow-color', color + '55');
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 600);
  });
});
 
// ---- WhatsApp Form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fname   = document.getElementById('fname').value.trim();
    const lname   = document.getElementById('lname').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();
 
    if (!fname || !lname || !email || !message) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }
 
    let waMsg  = `*New Inquiry from Profilix Website*\n\n`;
    waMsg     += `👤 *Name:* ${fname} ${lname}\n`;
    waMsg     += `📧 *Email:* ${email}\n`;
    if (phone)   waMsg += `📱 *Phone:* ${phone}\n`;
    if (service) waMsg += `🛠 *Service:* ${service}\n`;
    waMsg     += `\n💬 *Message:*\n${message}\n`;
    waMsg     += `\n— Sent from profilix.com`;
 
    const waNumber = '923362065358';
    const waURL    = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;
 
    const btn      = this.querySelector('.btn-submit');
    const original = btn.innerHTML;
    btn.innerHTML  = '<span>✅ Opening WhatsApp...</span>';
    btn.disabled   = true;
 
    setTimeout(() => {
      window.open(waURL, '_blank');
      btn.innerHTML = original;
      btn.disabled  = false;
      contactForm.reset();
    }, 800);
  });
}
 
// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});
 
// ---- Typed hero text ----
const typedEl = document.getElementById('typed-text');
const phrases = ['Digital Profiles', 'Smart Business Cards', 'Professional Brands', 'Online Identities'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
 
function typeEffect() {
  const cur = phrases[phraseIndex];
  typedEl.textContent = isDeleting
    ? cur.substring(0, charIndex - 1)
    : cur.substring(0, charIndex + 1);
 
  isDeleting ? charIndex-- : charIndex++;
 
  if (!isDeleting && charIndex === cur.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting    = false;
    phraseIndex   = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(typeEffect, isDeleting ? 50 : 85);
}
 
if (typedEl) typeEffect();