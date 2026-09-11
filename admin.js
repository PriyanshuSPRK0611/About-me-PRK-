// =========================
// PRK ADMIN DASHBOARD
// =========================
// Uses Supabase Auth.
// Never put a service_role/secret key here.
// =========================


// =========================
// SUPABASE
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

const refreshBtn =
  document.getElementById("refreshBtn");

const submissionsList =
  document.getElementById("submissionsList");

const totalSubmissions =
  document.getElementById("totalSubmissions");

const latestSubmission =
  document.getElementById("latestSubmission");

const themeToggle =
  document.getElementById("themeToggle");


// =========================
// SHOW LOGIN
// =========================

function showLogin() {

  loginScreen.hidden = false;
  dashboardScreen.hidden = true;

}


// =========================
// SHOW DASHBOARD
// =========================

function showDashboard() {

  loginScreen.hidden = true;
  dashboardScreen.hidden = false;

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
        document
          .getElementById("loginEmail")
          .value
          .trim();

      const password =
        document
          .getElementById("loginPassword")
          .value;

      loginStatus.textContent =
        "Signing in...";


      try {

        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });


        if (error) {

          console.error(
            "Login error:",
            error
          );

          loginStatus.textContent =
            "Invalid email or password.";

          return;
        }


        loginStatus.textContent = "";

        showDashboard();

        loadSubmissions();

      } catch (error) {

        console.error(error);

        loginStatus.textContent =
          "Something went wrong. Please try again.";

      }

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
// LOAD SUBMISSIONS
// =========================

async function loadSubmissions() {

  submissionsList.innerHTML =
    '<div class="empty-state">Loading submissions...</div>';


  try {

    const {
      data,
      error
    } = await supabase
      .from("join_us")
      .select("id, name, email, message, created_at")
      .order("created_at", {
        ascending: false
      });


    if (error) {

      console.error(
        "Supabase submissions error:",
        error
      );

      submissionsList.innerHTML =
        `<div class="empty-state">
          Unable to load submissions.<br>
          <small>${escapeHTML(error.message)}</small>
        </div>`;

      return;
    }


    // Update total

    totalSubmissions.textContent =
      data.length;


    // No submissions

    if (data.length === 0) {

      latestSubmission.textContent = "—";

      submissionsList.innerHTML =
        `<div class="empty-state">
          No submissions yet.
        </div>`;

      return;
    }


    // Latest submission

    latestSubmission.textContent =
      formatDate(data[0].created_at);


    // Create submission cards

    submissionsList.innerHTML =
      data
        .map((item) => {

          return `
            <article class="submission">

              <div class="submission-top">

                <div>
                  <div class="submission-name">
                    ${escapeHTML(item.name)}
                  </div>

                  <div class="submission-email">
                    ${escapeHTML(item.email)}
                  </div>
                </div>

              </div>

              <p class="submission-message">
                ${escapeHTML(item.message)}
              </p>

              <div class="submission-date">
                ${formatDate(item.created_at)}
              </div>

            </article>
          `;

        })
        .join("");

  } catch (error) {

    console.error(error);

    submissionsList.innerHTML =
      `<div class="empty-state">
        Unable to connect to the database.
      </div>`;

  }

}


// =========================
// REFRESH
// =========================

if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    () => {

      loadSubmissions();

    }
  );

}


// =========================
// DATE FORMAT
// =========================

function formatDate(dateString) {

  if (!dateString) {
    return "—";
  }

  const date =
    new Date(dateString);

  return date.toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  );

}


// =========================
// SECURITY
// Prevent HTML injection
// =========================

function escapeHTML(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// =========================
// DARK MODE
// =========================

const savedTheme =
  localStorage.getItem("prk-admin-theme");


if (savedTheme === "dark") {

  document.body.classList.add(
    "dark-mode"
  );

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
// CHECK EXISTING LOGIN
// =========================

async function checkLogin() {

  try {

    const {
      data: {
        session
      }
    } = await supabase.auth.getSession();


    if (session) {

      showDashboard();

      loadSubmissions();

    } else {

      showLogin();

    }

  } catch (error) {

    console.error(
      "Session error:",
      error
    );

    showLogin();

  }

}


// =========================
// START
// =========================

checkLogin();