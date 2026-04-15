
/* Four-D Furniture — Main JS */

/* --- Mobile Menu --- */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
  highlightActiveNav();
  initScrollReveal();
});

/* --- Active Nav --- */
function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = href.replace('./', '/').replace('index.html', '/');
    if (path === linkPath || (path === '/' && href === 'index.html') ||
        (path.endsWith(href) && href !== 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* --- Portfolio Filter --- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('noResults');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selected = btn.dataset.filter;
      let visible = 0;
      cards.forEach(card => {
        const match = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      if (noResults) noResults.classList.toggle('show', visible === 0);
    });
  });
}
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

/* --- Form Validation Utility --- */
function validateField(field, errorEl, message) {
  if (!field) return true;
  const value = field.value.trim();
  const isEmpty = value === '';
  const isEmail = field.type === 'email';
  const emailBad = isEmail && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const invalid = isEmpty || emailBad;
  field.classList.toggle('error', invalid);
  if (errorEl) {
    errorEl.textContent = emailBad ? 'Please enter a valid email address.' : message;
    errorEl.classList.toggle('show', invalid);
  }
  return !invalid;
}

function addFieldListeners(fields) {
  fields.forEach(({ field, errorEl, message }) => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field, errorEl, message));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field, errorEl, message);
    });
  });
}

function showSuccessAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (!alert) return;
  alert.classList.add('show');
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => alert.classList.remove('show'), 6000);
}

/* --- Appointment Form --- */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;
  const fields = [
    { field: document.getElementById('apptName'),  errorEl: document.getElementById('apptNameErr'),  message: 'Full name is required.' },
    { field: document.getElementById('apptEmail'), errorEl: document.getElementById('apptEmailErr'), message: 'Email address is required.' },
    { field: document.getElementById('apptPhone'), errorEl: document.getElementById('apptPhoneErr'), message: 'Phone number is required.' },
    { field: document.getElementById('apptDate'),  errorEl: document.getElementById('apptDateErr'),  message: 'Preferred date is required.' },
    { field: document.getElementById('apptTime'),  errorEl: document.getElementById('apptTimeErr'),  message: 'Preferred time is required.' },
  ];
  addFieldListeners(fields);
  const dateField = document.getElementById('apptDate');
  if (dateField) dateField.min = new Date().toISOString().split('T')[0];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.every(({ field, errorEl, message }) => validateField(field, errorEl, message));
    if (allValid) { showSuccessAlert('apptSuccess'); form.reset(); }
  });
}
document.addEventListener('DOMContentLoaded', initAppointmentForm);

/* --- Inquiry Form --- */
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;
  const fields = [
    { field: document.getElementById('inqName'),    errorEl: document.getElementById('inqNameErr'),    message: 'Full name is required.' },
    { field: document.getElementById('inqEmail'),   errorEl: document.getElementById('inqEmailErr'),   message: 'Email address is required.' },
    { field: document.getElementById('inqPhone'),   errorEl: document.getElementById('inqPhoneErr'),   message: 'Phone number is required.' },
    { field: document.getElementById('inqProduct'), errorEl: document.getElementById('inqProductErr'), message: 'Please enter a product of interest.' },
    { field: document.getElementById('inqMessage'), errorEl: document.getElementById('inqMessageErr'), message: 'Please include a message.' },
  ];
  addFieldListeners(fields);

  // Pre-fill product from URL param
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get('product');
  const productField = document.getElementById('inqProduct');
  if (productParam && productField) productField.value = productParam;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.every(({ field, errorEl, message }) => validateField(field, errorEl, message));
    if (allValid) { showSuccessAlert('inqSuccess'); form.reset(); }
  });
}
document.addEventListener('DOMContentLoaded', initInquiryForm);

/* --- Smooth Anchor Scroll --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
