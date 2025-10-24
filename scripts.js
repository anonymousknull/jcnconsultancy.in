/* scripts.js — contact + UI enhancements */

// Contact form handling (Formspree recommended)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

// Replace with your Formspree endpoint when ready:
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mayvlkay'; // <-- Change this

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    const data = {
      name: form.name.value,
      company: form.company ? form.company.value : '',
      email: form.email.value,
      phone: form.phone ? form.phone.value : '',
      message: form.message.value
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        status.textContent = 'Thanks — your message was sent. We will reply within 24 hours.';
        form.reset();
      } else {
        throw new Error('Form error');
      }
    } catch (err) {
      // fallback to mail client
      const subject = encodeURIComponent(`Inquiry from ${data.name}`);
      const body = encodeURIComponent(`Company: ${data.company}\nPhone: ${data.phone}\n\n${data.message}`);
      window.location.href = `mailto:contact@jcnconsultancy.in?subject=${subject}&body=${body}`;
      status.textContent = 'Opened your mail client as fallback.';
    }
  });
}

// Simple nav toggle for small screens
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });
}

// Scroll reveal: add .is-visible when element is visible
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // optionally unobserve to avoid re-trigger
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Smooth internal link behavior
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if (href.length > 1){
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
