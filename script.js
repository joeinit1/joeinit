const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("joe-in-it-theme");
const activeTheme = savedTheme || "dark";

document.body.classList.toggle("dark", activeTheme === "dark");

function updateThemeButton() {
  const darkMode = document.body.classList.contains("dark");
  themeToggle.textContent = darkMode ? "☾" : "☀";
  themeToggle.setAttribute("aria-pressed", String(darkMode));
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("joe-in-it-theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeButton();
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("form-status");
    const spamField = document.getElementById("company");

    if (spamField.value) return;

    status.textContent = "This form is ready to connect to a form service before publishing.";
  });
}
