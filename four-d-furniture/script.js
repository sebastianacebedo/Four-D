/* ============================================================
   FOUR-D FURNITURE MANUFACTURING — Main JavaScript
   ============================================================ */

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Highlight active nav link
  highlightActiveNav();
});

function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   PORTFOLIO FILTERING
   ============================================================ */
function initPortfolioFilter() {
  const filterSelect = document.getElementById('categoryFilter');
  const cards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('noResults');

  if (!filterSelect) return;

  filterSelect.addEventListener('change', () => {
    const selected = filterSelect.value; // 'all' | 'seating' | 'desking' | 'storage'
    let visible = 0;

    cards.forEach(card => {
      const category = card.dataset.category;
      const show = selected === 'all' || category === selected;
      card.style.display = show ? 'block' : 'none';
      if (show) visible++;
    });

    if (noResults) {
      noResults.style.display = visible === 0 ? 'block' : 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', initPortfolioFilter);

/* ============================================================
   FORM VALIDATION — SHARED UTILITY
   ============================================================ */

/**
 * Validate a single field and show/hide error message.
 * @param {HTMLElement} field
 * @param {HTMLElement} errorEl
 * @param {string} message
 * @returns {boolean} isValid
 */
function validateField(field, errorEl, message) {
  const value = field.value.trim();
  const isEmpty = value === '';
  const isEmailField = field.type === 'email';
  const emailInvalid = isEmailField && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const invalid = isEmpty || emailInvalid;

  if (invalid) {
    field.classList.add('error');
    if (errorEl) {
      errorEl.textContent = emailInvalid ? 'Please enter a valid email address.' : message;
      errorEl.classList.add('show');
    }
  } else {
    field.classList.remove('error');
    if (errorEl) errorEl.classList.remove('show');
  }

  return !invalid;
}

/**
 * Add real-time field feedback on blur.
 */
function addFieldListeners(fields) {
  fields.forEach(({ field, errorEl, message }) => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field, errorEl, message));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field, errorEl, message);
      }
    });
  });
}

/* ============================================================
   APPOINTMENT FORM
   ============================================================ */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  const fields = [
    { field: document.getElementById('apptName'),    errorEl: document.getElementById('apptNameErr'),    message: 'Full name is required.' },
    { field: document.getElementById('apptEmail'),   errorEl: document.getElementById('apptEmailErr'),   message: 'Email address is required.' },
    { field: document.getElementById('apptPhone'),   errorEl: document.getElementById('apptPhoneErr'),   message: 'Phone number is required.' },
    { field: document.getElementById('apptDate'),    errorEl: document.getElementById('apptDateErr'),    message: 'Preferred date is required.' },
    { field: document.getElementById('apptTime'),    errorEl: document.getElementById('apptTimeErr'),    message: 'Preferred time is required.' },
    { field: document.getElementById('apptMessage'), errorEl: document.getElementById('apptMessageErr'), message: 'Please include a message.' },
  ];

  addFieldListeners(fields);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Set min date to today
    const dateField = document.getElementById('apptDate');
    if (dateField && !dateField.min) {
      const today = new Date().toISOString().split('T')[0];
      dateField.min = today;
    }

    const allValid = fields.every(({ field, errorEl, message }) =>
      validateField(field, errorEl, message)
    );

    if (allValid) {
      showSuccessAlert('apptSuccess');
      form.reset();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAppointmentForm();

  // Set min date for appointment
  const dateField = document.getElementById('apptDate');
  if (dateField) {
    dateField.min = new Date().toISOString().split('T')[0];
  }
});

/* ============================================================
   INQUIRY FORM
   ============================================================ */
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const fields = [
    { field: document.getElementById('inqName'),    errorEl: document.getElementById('inqNameErr'),    message: 'Full name is required.' },
    { field: document.getElementById('inqEmail'),   errorEl: document.getElementById('inqEmailErr'),   message: 'Email address is required.' },
    { field: document.getElementById('inqPhone'),   errorEl: document.getElementById('inqPhoneErr'),   message: 'Phone number is required.' },
    { field: document.getElementById('inqProduct'), errorEl: document.getElementById('inqProductErr'), message: 'Please select a product of interest.' },
    { field: document.getElementById('inqMessage'), errorEl: document.getElementById('inqMessageErr'), message: 'Please include a message.' },
  ];

  addFieldListeners(fields);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const allValid = fields.every(({ field, errorEl, message }) =>
      validateField(field, errorEl, message)
    );

    if (allValid) {
      showSuccessAlert('inqSuccess');
      form.reset();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

document.addEventListener('DOMContentLoaded', initInquiryForm);

/* ============================================================
   SHOW SUCCESS ALERT
   ============================================================ */
function showSuccessAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (!alert) return;

  alert.classList.add('show');
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide after 6 seconds
  setTimeout(() => {
    alert.classList.remove('show');
  }, 6000);
}

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
