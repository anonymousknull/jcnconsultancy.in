document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mayvlkay'; // replace later with your own Formspree endpoint

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      status.textContent = 'Message sent! We’ll get back to you soon.';
      form.reset();
    } else {
      throw new Error('Form error');
    }
  } catch (err) {
    window.location.href = `mailto:contact@jcnconsultancy.in?subject=Website Inquiry&body=${encodeURIComponent(data.message)}`;
    status.textContent = 'Opened your email client as fallback.';
  }
});
