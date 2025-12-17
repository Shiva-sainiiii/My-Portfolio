// ==================== CV Download ====================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.btn-outline').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'my_cv.pdf';  
    link.download = 'Shiva_Saini_CV.pdf';
    link.click();
  });

  // ==================== Hamburger Menu ====================
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
      gsap.to(menu, { 
        clipPath: 'circle(0% at top right)', 
        duration: 0.6, 
        ease: "power2.in" 
      });
      document.body.style.overflow = '';
      menuOpen = false;
    });
  });
});


// ==================== Firebase Feedback ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyASTJgKYVhI_tkYxCQxCO7K4vIymwTh9mA",
  authDomain: "feedback-form-d2682.firebaseapp.com",
  projectId: "feedback-form-d2682",
  storageBucket: "feedback-form-d2682.firebasestorage.app",
  messagingSenderId: "542315428719",
  appId: "1:542315428719:web:7018a1621d4f2a6f4c869a",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form & List
const feedbackForm = document.querySelector('.feedback-form');
const feedbackList = document.getElementById('feedback-list');
const messageInput = feedbackForm.message;
const charCount = document.getElementById("char-count");

// Character counter
messageInput.addEventListener("input", () => {
  charCount.textContent = `${messageInput.value.length} / 200`;
});

// Submit feedback → Firestore
feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = feedbackForm.name.value.trim();
  const message = feedbackForm.message.value.trim();

  if (name && message) {
    await addDoc(collection(db, "feedbacks"), {
      name,
      message,
      timestamp: serverTimestamp()
    });
    feedbackForm.reset();
    charCount.textContent = "0 / 200";
  }
});

// Real-time listener
const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  feedbackList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    addFeedback(data.name, data.message, docSnap.id);
  });
});

// Add feedback to UI
function addFeedback(name, msg, id) {
  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = `${name}: ${msg}`;
  li.appendChild(textSpan);

  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  delBtn.classList.add("delete-btn");

  delBtn.addEventListener("click", async () => {
    await deleteDoc(doc(db, "feedbacks", id));
  });

  li.appendChild(delBtn);
  feedbackList.appendChild(li);
}

// Gsap 

gsap.registerPlugin(TextPlugin);

// Clear text first
document.querySelector(".hi").textContent = "";
document.querySelector(".name").textContent = "";

// Step 1: "Hi, I'm " type white me
gsap.to(".hi", {
  duration: 1,
  text: "Hi, I'm ",
  ease: "none",
  delay: 0.1

});

// Step 2: "Shiva Saini 👋" type purple me
gsap.to(".name", {
  duration: 1.5,
  text: "Shiva Saini 👋",
  ease: "none",
  delay: 1.5
});


// ===== PDF Preview Modal =====
const modal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const closeBtn = document.querySelector(".close-pdf");

document.querySelectorAll(".offer-card a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // new tab stop
    const pdfUrl = link.getAttribute("href");
    pdfFrame.src = pdfUrl;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  pdfFrame.src = "";
  document.body.style.overflow = "";
});
