// =========================
// CONTINUE BUTTON
// =========================

const btn = document.getElementById("continueBtn");
const siteContent = document.getElementById("siteContent");

document.body.classList.add("locked");

if (btn && siteContent) {
  btn.addEventListener("click", () => {
    document.body.classList.remove("locked");
    siteContent.scrollIntoView({
      behavior: "smooth"
    });
  });
}


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});


// =========================
// FOOTER YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================
// SUPABASE
// =========================

const SUPABASE_URL =
  "https://kvzatgeeuatkcdvsibjt.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_s2Ym-RnAG49LFcS3L8DIbQ_UZ9V3oFw";


// =========================
// JOIN US FORM
// =========================

const joinForm = document.getElementById("joinForm");
const joinStatus = document.getElementById("joinStatus");

if (joinForm) {
  joinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("joinName").value.trim();
    const email = document.getElementById("joinEmail").value.trim();
    const message = document.getElementById("joinMessage").value.trim();

    if (!name || !email || !message) {
      joinStatus.textContent = "Please fill in all fields.";
      return;
    }

    joinStatus.textContent = "Sending...";

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/join_us`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Supabase error:", errorText);

        joinStatus.textContent =
          "Something went wrong. Please try again.";

        return;
      }

      joinStatus.textContent =
        "Thank you! Your message has been sent.";

      joinForm.reset();

    } catch (error) {
      console.error("Connection error:", error);

      joinStatus.textContent =
        "Unable to send right now. Please try again.";
    }
  });
}
// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
const savedTheme = localStorage.getItem("prk-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.textContent = "☀";
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeIcon.textContent = "☀";
      localStorage.setItem("prk-theme", "dark");
    } else {
      themeIcon.textContent = "☾";
      localStorage.setItem("prk-theme", "light");
    }
  });
}
