const btn = document.getElementById("continueBtn");
const siteContent = document.getElementById("siteContent");
document.body.classList.add("locked");

btn.addEventListener("click", () => {
  document.body.classList.remove("locked");
  siteContent.scrollIntoView({behavior:"smooth"});
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
