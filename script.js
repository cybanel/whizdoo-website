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
