// ── Smooth Scroll for all anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: "smooth" });
    }
  });
});

// ── Mobile Hamburger Menu ─────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});
