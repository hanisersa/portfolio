// Automatically sets the current year in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

toggleBtn.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');

if (document.body.classList.contains('dark-mode')) {
  toggleBtn.textContent = '☀️'; 
} else {
  toggleBtn.textContent = '🌙'; 
}
});
const scriptURL = 'https://script.google.com/macros/s/AKfycby9WvzYciBHy-nmoDKR3F1OAEu_6gsKg0KTJdcjN4Xm0fap2ASqdtWKArX95VaKubo/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
e.preventDefault();
fetch(scriptURL, { method: 'POST', body: new FormData(form) })
  .then(response => {
    msg.innerHTML = "Message sent successfully";
    setTimeout(function(){
      msg.innerHTML = "";
    }, 5000);
    form.reset();
  })
  .catch(error => console.error('Error!', error.message));
});
// Get the menu and the button by their ID
const sidemenu = document.getElementById("sidemenu");
const menuBtn = document.getElementById("menu-btn");

// This function opens and closes the menu, and toggles the icon
function toggleMenu() {
sidemenu.classList.toggle('active');

if (menuBtn.classList.contains("fa-bars")) {
  menuBtn.classList.remove("fa-bars");
  menuBtn.classList.add("fa-times");
} else {
  menuBtn.classList.remove("fa-times");
  menuBtn.classList.add("fa-bars");
}
}
// --- Feature 1: Close the menu when a link is clicked ---
const menuLinks = document.querySelectorAll('#sidemenu a');
menuLinks.forEach(link => {
link.addEventListener('click', () => {
  // Check if the menu is open before trying to close it
  if (sidemenu.classList.contains('active')) {
    toggleMenu();
  }
});
});

// --- Feature 2: Close the menu when clicking outside of it ---
window.addEventListener('click', function(event) {
// Check if the menu is open AND if the click was outside the menu AND outside the button
if (sidemenu.classList.contains('active') && !sidemenu.contains(event.target) && !menuBtn.contains(event.target)) {
  toggleMenu();
}
});

