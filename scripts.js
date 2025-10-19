// Basic JS: contact form using Formspree or fallback to mailto
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const resetBtn = document.getElementById('resetBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending…';
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  // === Option A: Formspree (recommended, free tier)
  // 1) Create a free form at https://formspree.io
  // 2) Replace the placeholder endpoint below with your endpoint:
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mayvlkay'; // <-- REPLACE with your own

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      status.textContent = 'Message sent — I will reply within 48 hours.';
      form.reset();
    } else {
      // fallback to mailto if formspree fails
      throw new Error('Formspree error');
    }
  } catch (err) {
    // fallback: open default mail client with prefilled body
    const subject = encodeURIComponent(`Inquiry from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
    window.location.href = `mailto:jyotirmay@jcnconsultancy.in?subject=${subject}&body=${body}`;
    status.textContent = 'Opened email client as fallback. If that failed, email directly to jyotirmay@jcnconsultancy.in';
  }
});

resetBtn.addEventListener('click', () => {
  form.reset(); status.textContent = '';
});
