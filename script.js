document.addEventListener("DOMContentLoaded",function(){

  const body=document.body;
  const welcome=document.querySelector(".welcome-screen");
  const welcomeButton=document.querySelector(".welcome-button");
  const themeButton=document.querySelector(".theme-toggle");
  const nav=document.querySelector("nav");
  const reduceMotion=window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* WELCOME SCREEN */

  if(welcomeButton){
    welcomeButton.addEventListener("click",function(){

      if(welcome){
        welcome.classList.add("hide");
      }

      body.classList.remove("locked");

      sessionStorage.setItem(
        "prk-welcome-seen",
        "true"
      );
    });
  }

  /* THEME */

  const savedTheme=localStorage.getItem("prk-theme");

  if(savedTheme==="dark"){
    body.classList.add("dark");
  }

  if(savedTheme==="light"){
    body.classList.remove("dark");
  }

  function updateThemeIcon(){

    if(!themeButton) return;

    const isDark=body.classList.contains("dark");

    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeButton.textContent=isDark ? "○" : "●";
  }

  updateThemeIcon();

  if(themeButton){
    themeButton.addEventListener("click",function(){

      body.classList.toggle("dark");

      localStorage.setItem(
        "prk-theme",
        body.classList.contains("dark")
          ? "dark"
          : "light"
      );

      updateThemeIcon();
    });
  }

  /* SCROLL REVEAL */

  const revealItems=document.querySelectorAll(".reveal");

  if(reduceMotion){
    revealItems.forEach(function(item){
      item.classList.add("visible");
    });
  }else{

    const revealObserver=new IntersectionObserver(
      function(entries){

        entries.forEach(function(entry){

          if(entry.isIntersecting){
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }

        });

      },
      {
        threshold:.12,
        rootMargin:"0px 0px -40px 0px"
      }
    );

    revealItems.forEach(function(item){
      revealObserver.observe(item);
    });
  }

  /* NAVIGATION */

  function updateNav(){

    if(!nav) return;

    if(window.scrollY>40){
      nav.classList.add("nav-scrolled");
    }else{
      nav.classList.remove("nav-scrolled");
    }
  }

  updateNav();

  window.addEventListener(
    "scroll",
    updateNav,
    {passive:true}
  );

  /* ACTIVE NAV SECTION */

  const sections=document.querySelectorAll(
    "main section[id]"
  );

  const navLinks=document.querySelectorAll(
    "nav a[href^='#']"
  );

  if(sections.length && navLinks.length){

    const sectionObserver=new IntersectionObserver(
      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          navLinks.forEach(function(link){

            link.classList.remove("active");

            if(
              link.getAttribute("href") ===
              "#" + entry.target.id
            ){
              link.classList.add("active");
            }

          });

        });

      },
      {
        rootMargin:"-35% 0px -55% 0px"
      }
    );

    sections.forEach(function(section){
      sectionObserver.observe(section);
    });
  }

  /* SMOOTH INTERNAL LINKS */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(function(link){

    link.addEventListener("click",function(event){

      const targetId=
        link.getAttribute("href");

      if(!targetId || targetId==="#") return;

      const target=
        document.querySelector(targetId);

      if(!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior:reduceMotion
          ? "auto"
          : "smooth",
        block:"start"
      });

    });

  });

  /* ABOUT TEXT FADE */

  const aboutFade=
    document.querySelector(".about-fade-text");

  function updateAboutFade(){

    if(!aboutFade) return;

    const rect=
      aboutFade.getBoundingClientRect();

    const viewport=
      window.innerHeight;

    const start=
      viewport*.9;

    const end=
      viewport*.18;

    let progress=
      (start-rect.top)/(start-end);

    progress=
      Math.max(0,Math.min(1,progress));

    const opacity=
      .08+(progress*.92);

    aboutFade.style.opacity=
      reduceMotion ? "1" : opacity.toFixed(3);
  }

  updateAboutFade();

  window.addEventListener(
    "scroll",
    updateAboutFade,
    {passive:true}
  );

  window.addEventListener(
    "resize",
    updateAboutFade
  );

  /* CINEMATIC IMAGE PARALLAX */

  const connectVisual=
    document.querySelector(".connect-visual");

  const connectPhoto=
    document.querySelector(".connect-photo");

  function updateParallax(){

    if(!connectVisual || !connectPhoto || reduceMotion){
      return;
    }

    const rect=
      connectVisual.getBoundingClientRect();

    const viewport=
      window.innerHeight;

    if(
      rect.bottom<0 ||
      rect.top>viewport
    ){
      return;
    }

    const center=
      rect.top+rect.height/2;

    const distance=
      (center-viewport/2)/viewport;

    const move=
      distance*-24;

    connectPhoto.style.transform=
      "translate3d(0,"+
      move.toFixed(2)+
      "px,0) scale(1.08)";
  }

  updateParallax();

  window.addEventListener(
    "scroll",
    updateParallax,
    {passive:true}
  );

  window.addEventListener(
    "resize",
    updateParallax
  );

  /* WELCOME KEYBOARD ACCESS */

  document.addEventListener(
    "keydown",
    function(event){

      if(
        event.key==="Enter" &&
        body.classList.contains("locked")
      ){
        if(welcomeButton){
          welcomeButton.click();
        }
      }

      if(event.key==="Escape"){
        body.classList.remove("locked");
      }

    }
  );

});



/* FINAL POLISH + INTERACTION PATCH */

(function(){

  const root=document.documentElement;
  const body=document.body;

  /* PREVENT FLASH AFTER WELCOME */

  const welcomeSeen=sessionStorage.getItem("prk-welcome-seen");

  if(welcomeSeen){
    const screen=document.querySelector(".welcome-screen");

    if(screen){
      screen.classList.add("hide");
    }

    body.classList.remove("locked");
  }

  /* POINTER DEPTH */

  const depthItems=document.querySelectorAll(
    ".project-card, .team-card, .vision-node, .drive-card"
  );

  if(
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(pointer:fine)").matches
  ){

    depthItems.forEach(function(item){

      item.addEventListener("pointermove",function(event){

        const rect=item.getBoundingClientRect();

        const x=
          (event.clientX-rect.left)/rect.width-.5;

        const y=
          (event.clientY-rect.top)/rect.height-.5;

        item.style.transform=
          "perspective(900px) rotateX("+
          (-y*2.5).toFixed(2)+
          "deg) rotateY("+
          (x*2.5).toFixed(2)+
          "deg) translateY(-3px)";
      });

      item.addEventListener("pointerleave",function(){

        item.style.transform="";
      });

    });
  }

  /* CONNECT DOT FIELD */

  const dotContainers=
    document.querySelectorAll(".connect-dots");

  dotContainers.forEach(function(container){

    if(container.children.length>0) return;

    const fragment=document.createDocumentFragment();

    for(let i=0;i<48;i++){

      const dot=document.createElement("span");

      dot.className="connect-dot";

      dot.style.setProperty(
        "--delay",
        (Math.random()*4).toFixed(2)+"s"
      );

      dot.style.setProperty(
        "--scale",
        (.45+Math.random()*.9).toFixed(2)
      );

      fragment.appendChild(dot);
    }

    container.appendChild(fragment);
  });

  /* IMAGE HOVER DEPTH */

  const photos=
    document.querySelectorAll(".connect-photo");

  if(window.matchMedia("(pointer:fine)").matches){

    photos.forEach(function(photo){

      photo.addEventListener("pointermove",function(event){

        const rect=
          photo.getBoundingClientRect();

        const x=
          (event.clientX-rect.left)/rect.width-.5;

        photo.style.transform=
          "translate3d("+
          (x*12).toFixed(2)+
          "px,0,0) scale(1.08)";
      });

      photo.addEventListener("pointerleave",function(){

        photo.style.transform=
          "translate3d(0,0,0) scale(1.08)";
      });

    });
  }

  /* PAGE LOADED */

  window.requestAnimationFrame(function(){

    root.classList.add("prk-ready");

  });

})();
