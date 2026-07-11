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

/* for Programs dropdown on mobile (tap to open/close) */
document.querySelectorAll(".nav-dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      this.parentElement.classList.toggle("open");
    }
  });
});

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

// Scoped to the booking form specifically — only runs if #booking-form
// actually exists on the current page.
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const silangVal = document.getElementById("is-in-silang").value;
    const sessionVal = document.getElementById("session").value;

    if (sessionVal === "In-Person" && silangVal === "No") {
      alert(
        "⚠️ We cannot accommodate your location for In-Person tutoring. Please switch your session preference to Online to continue.",
      );
      return;
    }

    const confirmed = confirm(
      "Please review your details before sending. Have you filled in everything correctly?",
    );

    if (confirmed) {
      const generalChecked = [
        ...document.querySelectorAll(".subject-check:checked"),
      ]
        .map((cb) => cb.value)
        .join(", ");
      const specialChecked = [
        ...document.querySelectorAll(".special-subject-check:checked"),
      ]
        .map((cb) => cb.value)
        .join(", ");
      document.getElementById("subjects-hidden").value = generalChecked;
      document.getElementById("special-subjects-hidden").value = specialChecked;
      this.submit();
    }
  });
}

// Location restriction logic — also scoped, only runs on pages that
// actually have these elements (i.e. bookASession.html).
const sessionSelect = document.getElementById("session");
const locationContainer = document.getElementById("location-check-container");
const silangSelect = document.getElementById("is-in-silang");
const meetingTypeContainer = document.getElementById("meeting-type-container");
const meetingTypeSelect = document.getElementById("meeting-type");
const silangDetailsContainer = document.getElementById(
  "silang-details-container",
);
const outOfBoundsNote = document.getElementById("out-of-bounds-note");

const programSelect = document.getElementById("program");
const generalSubjectsContainer = document.getElementById(
  "general-subjects-container",
);
const specialSubjectsContainer = document.getElementById(
  "special-subjects-container",
);

if (programSelect) {
  programSelect.addEventListener("change", function () {
    if (this.value === "General Tutoring") {
      generalSubjectsContainer.style.display = "block";
      specialSubjectsContainer.style.display = "none";
      document
        .querySelectorAll(".special-subject-check")
        .forEach((cb) => (cb.checked = false));
    } else if (this.value === "Special Sessions") {
      specialSubjectsContainer.style.display = "block";
      generalSubjectsContainer.style.display = "none";
      document
        .querySelectorAll(".subject-check")
        .forEach((cb) => (cb.checked = false));
    } else {
      generalSubjectsContainer.style.display = "none";
      specialSubjectsContainer.style.display = "none";
    }
  });
}

const addrBarangay = document.getElementById("addr-barangay");
const addrVillage = document.getElementById("addr-village");
const addrCity = document.getElementById("addr-city");
const addrProvince = document.getElementById("addr-province");
const addrPostal = document.getElementById("addr-postal");
const addrLandmark = document.getElementById("addr-landmark");

function toggleAddressFields(isRequired) {
  const requiredFields = [
    addrBarangay,
    addrCity,
    addrProvince,
    addrPostal,
    addrLandmark,
  ];
  if (isRequired) {
    requiredFields.forEach((f) => f.setAttribute("required", "required"));
  } else {
    requiredFields.forEach((f) => {
      f.removeAttribute("required");
      f.value = "";
    });
    if (addrVillage) addrVillage.value = "";
  }
}

function resetMeetingType() {
  meetingTypeContainer.style.display = "none";
  meetingTypeSelect.removeAttribute("required");
  meetingTypeSelect.value = "";
  silangDetailsContainer.style.display = "none";
  toggleAddressFields(false);
}

if (sessionSelect) {
  sessionSelect.addEventListener("change", function () {
    if (this.value === "In-Person") {
      locationContainer.style.display = "block";
      silangSelect.setAttribute("required", "required");
      outOfBoundsNote.style.display = "none";
      resetMeetingType();
    } else {
      locationContainer.style.display = "none";
      outOfBoundsNote.style.display = "none";
      silangSelect.removeAttribute("required");
      silangSelect.value = "";
      resetMeetingType();
    }
  });
}

if (silangSelect) {
  silangSelect.addEventListener("change", function () {
    if (this.value === "Yes") {
      meetingTypeContainer.style.display = "block";
      meetingTypeSelect.setAttribute("required", "required");
      outOfBoundsNote.style.display = "none";
    } else if (this.value === "No") {
      resetMeetingType();
      outOfBoundsNote.style.display = "block";
      // No auto-switch — the warning just shows and stays
    }
  });
}

if (meetingTypeSelect) {
  meetingTypeSelect.addEventListener("change", function () {
    if (this.value === "Home-setup" || this.value === "Public place") {
      silangDetailsContainer.style.display = "block";
      toggleAddressFields(true);
    } else {
      silangDetailsContainer.style.display = "none";
      toggleAddressFields(false);
    }
  });
}
