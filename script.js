// CV Download
document.querySelector('.btn-outline').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'my_cv.pdf';
  link.download = 'Shiva_Saini_CV.pdf';
  link.click();
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu-overlay');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  if (!menuOpen) {
    gsap.to(menu, {
      clipPath: 'circle(150% at top right)',
      duration: 0.6,
      ease: "power2.out"
    });
    document.body.style.overflow = 'hidden';
    menuOpen = true;
  } else {
    gsap.to(menu, {
      clipPath: 'circle(0% at top right)',
      duration: 0.6,
      ease: "power2.in"
    });
    document.body.style.overflow = '';
    menuOpen = false;
  }
});

// Close menu when link clicked
document.querySelectorAll('.menu-overlay a').forEach(link => {
  link.addEventListener('click', () => {
    gsap.to(menu, { clipPath: 'circle(0% at top right)', duration: 0.6, ease: "power2.in" });
    document.body.style.overflow = '';
    menuOpen = false;
  });
});

// Feedback Form Handling with LocalStorage
const feedbackForm = document.querySelector('.feedback-form');
const feedbackList = document.getElementById('feedback-list');

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

// Load old feedbacks
feedbacks.forEach(f => addFeedback(f.name, f.message, false));

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = feedbackForm.name.value.trim();
  const message = feedbackForm.message.value.trim();

  if (name && message) {
    addFeedback(name, message, true); // save new one
    feedbackForm.reset();
  }
});

// Single function with delete button
function addFeedback(name, msg, save = false) {
  const li = document.createElement("li");

  // text span
  const textSpan = document.createElement("span");
  textSpan.textContent = `${name}: ${msg}`;
  li.appendChild(textSpan);

  // ❌ delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  delBtn.classList.add("delete-btn"); // css se style karenge

  delBtn.addEventListener("click", () => {
    li.remove();
    feedbacks = feedbacks.filter(f => !(f.name === name && f.message === msg));
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  });

  li.appendChild(delBtn);
  feedbackList.appendChild(li);

  if (save) {
    feedbacks.push({ name, message: msg });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }
}


