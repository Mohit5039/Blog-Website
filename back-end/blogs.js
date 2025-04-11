// blogs.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmcIuNECGnxvDy58Cqp2MFx7KArV5jS4A",
  authDomain: "rationalbs-backend.firebaseapp.com",
  projectId: "rationalbs-backend",
  storageBucket: "rationalbs-backend.appspot.com",
  messagingSenderId: "129821405436",
  appId: "1:129821405436:web:5e645796f0a380aa4aa779",
  measurementId: "G-9L5LVEMDCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and render blogs
async function loadBlogs() {
  const latestBlogsContainer = document.getElementById("latest-blogs");
  if (!latestBlogsContainer) return;

  latestBlogsContainer.innerHTML = ""; // Clear any existing content

  const q = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const blog = doc.data();
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <img src="${blog.imageUrl}" class="blog-bg" alt="Blog Cover" />
      <div class="overlay">
        <div class="blog-content">
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-excerpt">${blog.excerpt}</p>
          <button class="read-more-btn">Read More</button>
        </div>
        <div class="blog-footer">
          <span>by ${blog.author}</span>
          <span class="category-badge">${blog.category}</span>
        </div>
      </div>
    `;
    latestBlogsContainer.appendChild(card);
  });
}

// Load blogs when DOM is ready
document.addEventListener("DOMContentLoaded", loadBlogs);
