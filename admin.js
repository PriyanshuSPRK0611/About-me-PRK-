// =========================
// PRK ADMIN DASHBOARD
// =========================


// =========================
// SUPABASE
// =========================

const SUPABASE_URL =
  "https://kvzatgeeuatkcdvsibjt.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_s2Ym-RnAG49LFcS3L8DIbQ_UZ9V3oFw";


// Make sure Supabase library loaded

if (!window.supabase) {

  document.getElementById("loginMessage").textContent =
    "Supabase could not load. Please refresh the page.";

  throw new Error("Supabase library not loaded.");

}


const supabase =
  window.supabase.createClient(
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

const loginMessage =
  document.getElementById("loginMessage");

const logoutButton =
  document.getElementById("logoutButton");

const refreshButton =
  document.getElementById("refreshButton");

const submissions =
  document.getElementById("submissions");

const total =
  document.getElementById("total");

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

loginForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    const email =
      document
        .getElementById("email")
        .value
        .trim();

    const password =
      document
        .getElementById("password")
        .value;

    loginMessage.textContent =
      "Signing in...";


    try {

      const {
        data,
        error
      } =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });


      if (error) {

        console.error(
          "LOGIN ERROR:",
          error
        );

        loginMessage.textContent =
          error.message;

        return;
      }


      console.log(
        "LOGIN SUCCESS:",
        data.user
      );


      loginMessage.textContent = "";

      showDashboard();

      loadSubmissions();

    }

    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      loginMessage.textContent =
        "Something went wrong. Please try again.";

    }

  }
);


// =========================
// LOGOUT
// =========================

logoutButton.addEventListener(
  "click",
  async function () {

    await supabase.auth.signOut();

    showLogin();

  }
);


// =========================
// LOAD SUBMISSIONS
// =========================

async function loadSubmissions() {

  submissions.innerHTML =
    '<p class="loading">Loading submissions...</p>';


  const {
    data,
    error
  } =
    await supabase
      .from("join_us")
      .select(
        "id, name, email, message, created_at"
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "DATABASE ERROR:",
      error
    );

    submissions.innerHTML =
      `<p class="empty">
        Database error: ${escapeHTML(error.message)}
      </p>`;

    return;
  }


  // Total

  total.textContent =
    data.length;


  // No submissions

  if (data.length === 0) {

    latestSubmission.textContent =
      "—";

    submissions.innerHTML =
      '<p class="empty">No submissions yet.</p>';

    return;
  }


  // Latest

  latestSubmission.textContent =
    new Date(
      data[0].created_at
    ).toLocaleDateString(
      "en-IN"
    );


  // Display submissions

  submissions.innerHTML =
    data
      .map(function (item) {

        return `

          <article class="submission">

            <div class="submission-name">
              ${escapeHTML(item.name)}
            </div>

            <div class="submission-email">
              ${escapeHTML(item.email)}
            </div>

            <p class="submission-message">
              ${escapeHTML(item.message)}
            </p>

            <div class="submission-date">
              ${new Date(
                item.created_at
              ).toLocaleString("en-IN")}
            </div>

          </article>

        `;

      })
      .join("");

}


// =========================
// REFRESH
// =========================

refreshButton.addEventListener(
  "click",
  function () {

    loadSubmissions();

  }
);


// =========================
// SECURITY
// =========================

function escapeHTML(value) {

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// =========================
// CHECK EXISTING SESSION
// =========================

async function checkSession() {

  const {
    data: {
      session
    }
  } =
    await supabase.auth.getSession();


  if (session) {

    showDashboard();

    loadSubmissions();

  }

  else {

    showLogin();

  }

}


// =========================
// START
// =========================

checkSession();