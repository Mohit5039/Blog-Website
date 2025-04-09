// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmcIuNECGnxvDy58Cqp2MFx7KArV5jS4A",
  authDomain: "rationalbs-backend.firebaseapp.com",
  projectId: "rationalbs-backend",
  storageBucket: "rationalbs-backend.firebasestorage.app",
  messagingSenderId: "129821405436",
  appId: "1:129821405436:web:5e645796f0a380aa4aa779",
  measurementId: "G-9L5LVEMDCJ"
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.back form');
  const loginForm = document.querySelector('.fornt form'); // typo retained from HTML

  // Handle Signup
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = signupForm.querySelector('input[type="email"]').value;
      const password = signupForm.querySelector('input[name="signup-password"]').value;
      const confirmPassword = signupForm.querySelector('input[name="confirm-password"]').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Signup successful!");
          signupForm.reset();
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Login successful!");
          loginForm.reset();
          // TODO: Redirect to homepage
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
});
