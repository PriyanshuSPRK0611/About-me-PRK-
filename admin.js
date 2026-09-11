// =========================
// PRK ADMIN DASHBOARD
// SUPABASE AUTH
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

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  loginStatus.textContent = "Signing in...";

  try {

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

    if (error) {

      console.error("SUPABASE LOGIN ERROR:", error);

      // Show the REAL error
      loginStatus.textContent =
        error.message;

      return;
    }

    console.log("LOGIN SUCCESS:", data);

    loginStatus.textContent = "";

    showDashboard();

    loadSubmissions();

  } catch (error) {

    console.error("LOGIN CRASH:", error);

    loginStatus.textContent =
      error.message || "Login failed.";

  }

});


// =========================
// LOGOUT
// =========================

logoutBtn.addEventListener("click", async () => {

  await supabase.auth.signOut();

  showLogin();

});


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
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {

      console.error(
        "SUBMISSIONS ERROR:",
        error
      );

      submissionsList.innerHTML =
        `<div class="empty-state">
          ${error.message}
        </div>`;

      return;
    }

    totalSubmissions.textContent =
      data.length;

    if (data.length === 0) {

      latestSubmission.textContent = "—";

      submissionsList.innerHTML =
        `<div class="empty-state">
          No submissions yet.
        </div>`;

      return;
    }

    latestSubmission.textContent =
      new Date(data[0].created_at)
        .toLocaleDateString("en-IN");

    submissionsList.innerHTML =
      data.map((item) => {

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
              ${new Date(item.created_at)
                .toLocaleString("en-IN")}
            </div>

          </article>
        `;

      }).join("");

  } catch (error) {

    console.error(error);

    submissionsList.innerHTML =
      `<div class="empty-state">
        ${error.message}
      </div>`;

  }

}


// =========================
// REFRESH
// =========================

if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    loadSubmissions
  );

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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


// =========================
// CHECK EXISTING SESSION
// =========================

async function checkLogin() {

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {

    showDashboard();

    loadSubmissions();

  } else {

    showLogin();

  }

}


// =========================
// START
// =========================

checkLogin();