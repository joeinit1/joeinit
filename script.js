const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("joe-in-it-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

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
