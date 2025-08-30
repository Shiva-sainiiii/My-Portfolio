document.querySelector('.btn-outline').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'my_cv.pdf';
  link.download = 'Shiva_Saini_CV.pdf';
  link.click();
});


const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu-overlay');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  if (!menuOpen) {
    // Open menu
    gsap.to(menu, {
      clipPath: 'circle(150% at top right)',
      duration: 0.6,
      ease: "power2.out"
    });
    document.body.style.overflow = 'hidden'; // disable page scroll
    menuOpen = true;
  } else {
    // Close menu
    gsap.to(menu, {
      clipPath: 'circle(0% at top right)',
      duration: 0.6,
      ease: "power2.in"
    });
    document.body.style.overflow = ''; // re-enable scroll
    menuOpen = false;
  }
});

// Close menu when a link is clicked
document.querySelectorAll('.menu-overlay a').forEach(link => {
  link.addEventListener('click', () => {
    gsap.to(menu, { clipPath: 'circle(0% at top right)', duration: 0.6, ease: "power2.in" });
    document.body.style.overflow = ''; // re-enable scroll
    menuOpen = false;
  });
});

// Feedback Form Handling
const feedbackForm = document.querySelector('.feedback-form');
const feedbackList = document.getElementById('feedback-list');

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = feedbackForm.name.value.trim();
  const message = feedbackForm.message.value.trim();

  if (name && message) {
    const li = document.createElement('li');
    li.textContent = `${name}: ${message}`;
    feedbackList.appendChild(li);

    feedbackForm.reset();
  }
});