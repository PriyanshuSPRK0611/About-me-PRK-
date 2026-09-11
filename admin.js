// =========================
// PRK ADMIN DASHBOARD
// =========================

const themeToggle = document.getElementById("themeToggle");


// =========================
// DARK MODE
// =========================

const savedTheme = localStorage.getItem("prk-admin-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  if (themeToggle) {
    themeToggle.textContent = "☀";
  }
}


if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

      themeToggle.textContent = "☀";

      localStorage.setItem(
        "prk-admin-theme",
        "dark"
      );

    } else {

      themeToggle.textContent = "☾";

      localStorage.setItem(
        "prk-admin-theme",
        "light"
      );

    }

  });
}
