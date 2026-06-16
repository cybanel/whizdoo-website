function toggle(btn) {
  const ans = btn.nextElementSibling;
  const span = btn.querySelector("span");
  const isOpen = ans.classList.contains("open");
  document
    .querySelectorAll(".faq-a")
    .forEach((a) => a.classList.remove("open"));
  document
    .querySelectorAll(".faq-q span")
    .forEach((s) => (s.textContent = "+"));
  if (!isOpen) {
    ans.classList.add("open");
    span.textContent = "−";
  }
}

/* for hamburger menu  */
function toggleMenu() {
  const links = document.getElementById("nav-links");
  links.classList.toggle("open");
}

/* for fade in animation while scrolling */
/* fade in on scroll */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
