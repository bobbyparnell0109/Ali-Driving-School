/* ══════════════════════════════════════════
   Ali's Driving School — script.js
   Vanilla JS, no frameworks, no build step
══════════════════════════════════════════ */

// ─── Header scroll effect ───────────────
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ─── Mobile hamburger ────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('header-nav');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

// Close nav when a link is tapped
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

// ─── Booking form — Formspree AJAX ──────
const form    = document.getElementById('booking-form');
const success = document.getElementById('form-success');
const error   = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    success.hidden = true;
    error.hidden   = true;

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.reset();
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      error.hidden = false;
      error.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitBtn.disabled  = false;
      submitBtn.textContent = 'Send Booking Request →';
    }
  });
}

// ─── Smooth scroll for anchor buttons ───
// (Handles browsers that don't support scroll-behavior CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h'), 10) || 68;
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
