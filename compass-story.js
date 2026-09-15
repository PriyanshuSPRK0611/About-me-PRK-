// =====================================================
// PRK+ COMPASS STORY
// Scroll-controlled cinematic animation
// =====================================================

(() => {

  "use strict";


  /* =====================================================
     ELEMENTS
  ====================================================== */

  const intro = document.querySelector(".compass-introduction");
  const needle = document.getElementById("giantNeedle");
  const earth = document.getElementById("earth");
  const earthLarge = document.getElementById("earthLarge");

  const steps = [
    ...document.querySelectorAll(".compass-story-step")
  ];


  if (!intro || !needle || !earth) return;


  /* =====================================================
     STATE
  ====================================================== */

  let targetProgress = 0;
  let currentProgress = 0;

  let targetNeedle = 0;
  let currentNeedle = 0;

  let targetEarthRotation = 0;
  let currentEarthRotation = 0;

  let ticking = false;


  /* =====================================================
     HELPERS
  ====================================================== */

  function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
  }


  function lerp(current, target, amount){
    return current + (target - current) * amount;
  }


  /*
    Keeps rotation smooth even when crossing
    from 359° → 0°.
  */

  function shortestAngle(current, target){

    let difference = target - current;

    while(difference > 180){
      difference -= 360;
    }

    while(difference < -180){
      difference += 360;
    }

    return current + difference;
  }


  /* =====================================================
     CALCULATE INTRO SCROLL PROGRESS
  ====================================================== */

  function updateScrollTarget(){

    const rect = intro.getBoundingClientRect();

    const scrollableDistance =
      intro.offsetHeight - window.innerHeight;

    if(scrollableDistance <= 0){
      targetProgress = 0;
      return;
    }

    const travelled = -rect.top;

    targetProgress = clamp(
      travelled / scrollableDistance,
      0,
      1
    );

  }


  /* =====================================================
     NEEDLE MOVEMENT
  ====================================================== */

  function updateNeedle(){

    /*
      Story progression:

      0%   → North
      20%  → 45°
      40%  → East
      60%  → South
      80%  → West
      100% → North
    */

    const p = targetProgress;

    let heading;

    if(p < .20){

      heading = (p / .20) * 45;

    }else if(p < .40){

      heading = 45 + ((p - .20) / .20) * 45;

    }else if(p < .60){

      heading = 90 + ((p - .40) / .20) * 90;

    }else if(p < .80){

      heading = 180 + ((p - .60) / .20) * 90;

    }else{

      heading = 270 + ((p - .80) / .20) * 90;

    }

    targetNeedle = heading;

  }


  /* =====================================================
     EARTH ROTATION
  ====================================================== */

  function updateEarth(){

    /*
      Earth rotates continuously with scroll.
      Multiple rotations create the feeling of
      travelling around the planet.
    */

    targetEarthRotation =
      targetProgress * 540;

  }


  /* =====================================================
     STORY STEP ACTIVATION
  ====================================================== */

  function updateStorySteps(){

    if(!steps.length) return;

    const count = steps.length;

    /*
      Divide the cinematic section into
      equal storytelling zones.
    */

    let index = Math.floor(
      targetProgress * count
    );

    index = clamp(index,0,count - 1);


    steps.forEach((step,i)=>{

      step.classList.toggle(
        "active",
        i === index
      );

    });

  }


  /* =====================================================
     ANIMATION LOOP
  ====================================================== */

  function animate(){

    currentProgress = lerp(
      currentProgress,
      targetProgress,
      .075
    );


    /*
      Smooth needle rotation
    */

    currentNeedle = shortestAngle(
      currentNeedle,
      targetNeedle
    );

    currentNeedle = lerp(
      currentNeedle,
      targetNeedle,
      .09
    );


    /*
      Smooth Earth rotation
    */

    currentEarthRotation = lerp(
      currentEarthRotation,
      targetEarthRotation,
      .06
    );


    /*
      Apply transforms
    */

    needle.style.transform =
      `rotate(${currentNeedle}deg)`;


    earth.style.transform =
      `rotate(${currentEarthRotation}deg)`;


    if(earthLarge){

      const largeRotation =
        currentProgress * 180;

      earthLarge.style.transform =
        `rotate(${largeRotation}deg)`;

    }


    requestAnimationFrame(animate);

  }


  /* =====================================================
     SCROLL EVENT
  ====================================================== */

  function handleScroll(){

    updateScrollTarget();
    updateNeedle();
    updateEarth();
    updateStorySteps();

  }


  window.addEventListener(
    "scroll",
    handleScroll,
    {passive:true}
  );


  window.addEventListener(
    "resize",
    handleScroll,
    {passive:true}
  );


  /* =====================================================
     NAVIGATION LINKS
  ====================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const id =
          link.getAttribute("href");

        const target =
          document.querySelector(id);

        if(!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior:"smooth"
        });

      });

    });


  /* =====================================================
     INITIAL STATE
  ====================================================== */

  steps.forEach((step,i)=>{

    step.classList.toggle(
      "active",
      i === 0
    );

  });


  handleScroll();
  animate();


})();
