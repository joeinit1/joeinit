const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("joe-in-it-theme");
const activeTheme = savedTheme || "dark";

document.body.classList.toggle("dark", activeTheme === "dark");

function updateThemeButton() {
  if (!themeToggle) {
    return;
  }

  const darkMode = document.body.classList.contains("dark");

  themeToggle.textContent = darkMode ? "☾" : "☀";
  themeToggle.setAttribute("aria-pressed", String(darkMode));
}

if (themeToggle) {
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "joe-in-it-theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );

    updateThemeButton();
  });
}


const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const status = document.getElementById("form-status");
  const spamField = document.getElementById("company");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (spamField && spamField.value) {
      return;
    }

    if (status) {
      status.textContent = "Sending...";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        if (status) {
          status.textContent = "Thanks! Your message has been sent.";
        }

        contactForm.reset();
      } else {
        const data = await response.json();

        if (status) {
          if (data.errors) {
            status.textContent = data.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            status.textContent = "Something went wrong. Please try again.";
          }
        }
      }
    } catch (error) {
      console.error("Contact form error:", error);

      if (status) {
        status.textContent =
          "Unable to send your message. Please try again.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
      }
    }
  });
}
