/* =====================================================
   PRK WELCOME SCREEN
   ===================================================== */

const welcomeScreen =
  document.getElementById("welcomeScreen");

const enterPRK =
  document.getElementById("enterPRK");

if (enterPRK && welcomeScreen) {

  enterPRK.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");

    document.body.style.overflow = "auto";

    setTimeout(() => {
      welcomeScreen.remove();
    }, 1000);

  });

}