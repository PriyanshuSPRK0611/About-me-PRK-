// =========================
// PRK ADMIN DASHBOARD
// SUPABASE AUTHENTICATION
// =========================

const SUPABASE_URL =
  "https://kvzatgeeuatkcdvsibjt.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_s2Ym-RnAG49LFcS3L8DIbQ_UZ9V3oFw";

const { createClient } = window.supabase;

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// =========================
// ELEMENTS
// =========================

const loginScreen =
  document.getElementById("loginScreen");

const dashboardScreen =
  document.getElementById("dashboardScreen");

const loginForm =
  document.getElementById("loginForm");

const loginStatus =
  document.getElementById("loginStatus");

const logoutBtn =
  document.getElementById("logoutBtn");


// =========================
// SHOW DASHBOARD
// =========================

function showDashboard() {
  loginScreen.hidden = true;
  dashboardScreen.hidden = false;
}


// =========================
// SHOW LOGIN
// =========================

function showLogin() {
  loginScreen.hidden = false;
  dashboardScreen.hidden = true;
}


// =========================
// CHECK LOGIN
// =========================

async function checkUser() {

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    showDashboard();
  } else {
    showLogin();
  }
}


// =========================
// LOGIN
// =========================

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const email =
        document.getElementById("loginEmail")
          .value
          .trim();

      const password =
        document.getElementById("loginPassword")
          .value;

      loginStatus.textContent =
        "Signing in...";

      const {
        error
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {

        console.error(error);

        loginStatus.textContent =
          "Invalid email or password.";

        return;
      }

      loginStatus.textContent = "";

      showDashboard();
    }
  );

}


// =========================
// LOGOUT
// =========================

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async () => {

      await supabase.auth.signOut();

      showLogin();

    }
  );

}


// =========================
// DARK MODE
// =========================

const themeToggle =
  document.getElementById("themeToggle");

const savedTheme =
  localStorage.getItem("prk-admin-theme");

if (savedTheme === "dark") {

  document.body.classList.add("dark-mode");

  if (themeToggle) {
    themeToggle.textContent = "☀";
  }

}


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark-mode"
      );

      if (
        document.body.classList.contains(
          "dark-mode"
        )
      ) {

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

    }
  );

}


// =========================
// START
// =========================

checkUser();
