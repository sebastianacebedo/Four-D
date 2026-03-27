/* ============================================================
   FOUR-D FURNITURE MANUFACTURING
   login.js  —  Admin login page logic

   Responsibilities:
     1. Real-time field validation (clear errors as user types)
     2. Full validation on submit
     3. Loading state (spinner + disabled button)
     4. Credential check with simulated 820 ms round-trip
     5. Success → sets sessionStorage flag, redirects to admin.html
     6. Failure → error alert + card shake animation

   Demo credentials (replace with real server-side auth):
     Username : sebastian
     Password : fourd2025
   ============================================================ */

(() => {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     CONFIG
     Change these to match your real authentication endpoint.
  ────────────────────────────────────────────────────────── */
  const VALID_USER    = 'sebastian';
  const VALID_PASS    = 'fourd2025';
  const REDIRECT_URL  = 'admin.html';
  const NETWORK_DELAY = 820;   /* ms — simulates server round-trip */


  /* ──────────────────────────────────────────────────────────
     DOM REFERENCES
     All IDs match login.html exactly.
  ────────────────────────────────────────────────────────── */
  const form     = document.getElementById('loginForm');
  const userEl   = document.getElementById('loginUser');
  const passEl   = document.getElementById('loginPass');
  const userErr  = document.getElementById('userErr');
  const passErr  = document.getElementById('passErr');
  const alertBox = document.getElementById('loginAlert');
  const alertMsg = document.getElementById('loginAlertMsg');
  const btn      = document.getElementById('loginBtn');
  const card     = document.getElementById('loginCard');


  /* ──────────────────────────────────────────────────────────
     VALIDATION HELPERS
  ────────────────────────────────────────────────────────── */

  /**
   * Mark a field and its error element as invalid.
   * Adds .is-error to the input and .visible to the error span.
   */
  function markError(input, errEl) {
    input.classList.add('is-error');
    errEl.classList.add('visible');
  }

  /**
   * Clear the error state from a field.
   * Removes .is-error and .visible so CSS hides the message.
   */
  function clearError(input, errEl) {
    input.classList.remove('is-error');
    errEl.classList.remove('visible');
  }

  /**
   * Validate a single required field.
   * Returns true when the field has a non-empty value.
   */
  function validate(input, errEl) {
    if (!input.value.trim()) {
      markError(input, errEl);
      return false;
    }
    clearError(input, errEl);
    return true;
  }


  /* ──────────────────────────────────────────────────────────
     ALERT HELPERS
  ────────────────────────────────────────────────────────── */

  /** Display the error alert banner with a custom message. */
  function showAlert(msg) {
    alertMsg.textContent = msg;
    alertBox.classList.add('visible');
  }

  /** Hide the error alert banner. */
  function hideAlert() {
    alertBox.classList.remove('visible');
  }


  /* ──────────────────────────────────────────────────────────
     LOADING STATE
  ────────────────────────────────────────────────────────── */

  /**
   * Toggle the button's loading state.
   * .is-loading hides the label text and shows the CSS spinner.
   */
  function setLoading(on) {
    btn.classList.toggle('is-loading', on);
  }


  /* ──────────────────────────────────────────────────────────
     SHAKE ANIMATION
     Triggered on wrong credentials. Removes the card's entrance
     animation, forces a reflow, then applies loginShake.
  ────────────────────────────────────────────────────────── */
  function shakeCard() {
    card.style.animation = 'none';
    void card.offsetHeight;                       /* force reflow */
    card.style.animation = 'loginShake 0.44s ease both';
  }


  /* ──────────────────────────────────────────────────────────
     LIVE CLEAR-ON-TYPE
     As soon as Sebastian starts correcting a field, errors
     and the alert banner disappear immediately.
  ────────────────────────────────────────────────────────── */
  userEl.addEventListener('input', () => {
    clearError(userEl, userErr);
    hideAlert();
  });

  passEl.addEventListener('input', () => {
    clearError(passEl, passErr);
    hideAlert();
  });


  /* ──────────────────────────────────────────────────────────
     FORM SUBMIT
  ────────────────────────────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    /* 1. Validate both fields before touching the network */
    const userOk = validate(userEl, userErr);
    const passOk = validate(passEl, passErr);
    if (!userOk || !passOk) return;

    /* 2. Show loading state */
    setLoading(true);

    /* 3. Simulate network round-trip */
    setTimeout(() => {
      setLoading(false);

      const user = userEl.value.trim().toLowerCase();
      const pass = passEl.value;

      if (user === VALID_USER && pass === VALID_PASS) {
        /* ── SUCCESS ─────────────────────────────────────── */
        /*
          Set a session flag so admin.html can check that the
          user came through the login page.
          Replace this with a real token/cookie in production.
        */
        sessionStorage.setItem('fourd_admin_auth', '1');

        /* Update button text before redirect */
        btn.querySelector('.btn-text').textContent = 'Redirecting\u2026';

        /* Short pause so the text change is visible */
        setTimeout(() => {
          window.location.href = REDIRECT_URL;
        }, 300);

      } else {
        /* ── FAILURE ─────────────────────────────────────── */
        showAlert('Incorrect username or password. Please try again.');

        /* Clear password field only — keep username for correction */
        passEl.value = '';
        passEl.focus();

        /* Visual feedback */
        shakeCard();
      }
    }, NETWORK_DELAY);
  });

})();
