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

// ------------------ The code for when the customer chooses 'In-person' in book a session' ---------
/* Logic for book a session where the customer chooses -in person tutoring BUT THEY ARE NOT FROM SILANG*/

//Please review this
document.querySelector("form").addEventListener("submit", function () {
  const checked = [...document.querySelectorAll(".subject-check:checked")]
    .map((cb) => cb.value)
    .join(", ");
  document.getElementById("subjects-hidden").value = checked;
});

// Location restriction logic
const sessionSelect = document.getElementById("session");
const locationContainer = document.getElementById("location-check-container");
const silangSelect = document.getElementById("is-in-silang");
const silangDetailsContainer = document.getElementById(
  "silang-details-container",
);
const outOfBoundsNote = document.getElementById("out-of-bounds-note");

// Get our three new address inputs
const addrHouse = document.getElementById("addr-house");
const addrBarangay = document.getElementById("addr-barangay");
const addrLandmark = document.getElementById("addr-landmark");

function toggleAddressFields(isRequired) {
  if (isRequired) {
    addrHouse.setAttribute("required", "required");
    addrBarangay.setAttribute("required", "required");
    addrLandmark.setAttribute("required", "required");
  } else {
    addrHouse.removeAttribute("required");
    addrBarangay.removeAttribute("required");
    addrLandmark.removeAttribute("required");
    // Clear values safely
    addrHouse.value = "";
    addrBarangay.value = "";
    addrLandmark.value = "";
  }
}

// Track changes on the primary session dropdown
sessionSelect.addEventListener("change", function () {
  if (this.value === "In-Person") {
    locationContainer.style.display = "block";
    silangSelect.setAttribute("required", "required");
    outOfBoundsNote.style.display = "none";
  } else {
    // Reset everything if they choose "Online"
    locationContainer.style.display = "none";
    silangDetailsContainer.style.display = "none";
    outOfBoundsNote.style.display = "none";
    silangSelect.removeAttribute("required");
    silangSelect.value = "";
    toggleAddressFields(false);
  }
});

// Track changes on the Silang location verification dropdown
silangSelect.addEventListener("change", function () {
  if (this.value === "Yes") {
    silangDetailsContainer.style.display = "block";
    toggleAddressFields(true); // Makes all 3 parts mandatory
    outOfBoundsNote.style.display = "none";
  } else if (this.value === "No") {
    silangDetailsContainer.style.display = "none";
    toggleAddressFields(false);
    outOfBoundsNote.style.display = "block";

    // Wait 3.5 seconds, then auto-revert to Online
    setTimeout(() => {
      sessionSelect.value = "Online";
      sessionSelect.dispatchEvent(new Event("change"));
    }, 3500);
  }
});
