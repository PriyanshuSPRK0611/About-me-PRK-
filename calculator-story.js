/* =========================================
   PRK+ CALCULATOR STORY
   Cinematic Scroll + Product Animations
========================================= */

const $ = id => document.getElementById(id);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px"
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});


/* =========================================
   CALCULATOR STORY ANIMATION
========================================= */

const expressions = [
  ["128 + 64", "192"],
  ["248 × 16", "3968"],
  ["900 ÷ 12", "75"],
  ["1250 − 475", "775"],
  ["45 × 24", "1080"]
];

let calculationIndex = 0;

function animateCalculation(){

  const expression = $("storyExpression");
  const result = $("storyResult");

  if (!expression || !result) return;

  expression.style.opacity = "0";
  result.style.opacity = "0";
  expression.style.transform = "translateY(10px)";
  result.style.transform = "translateY(10px)";

  setTimeout(() => {

    const current = expressions[calculationIndex];

    expression.textContent = current[0];
    result.textContent = current[1];

    expression.style.opacity = "1";
    result.style.opacity = "1";

    expression.style.transform = "translateY(0)";
    result.style.transform = "translateY(0)";

    calculationIndex =
      (calculationIndex + 1) % expressions.length;

  }, 500);
}

setInterval(animateCalculation, 3200);


/* =========================================
   HERO CALCULATOR DISPLAY
========================================= */

const heroExpression =
  document.querySelector(".calc-expression");

const heroResult =
  document.querySelector(".calc-result");

const heroCalculations = [
  ["24 × 18", "432"],
  ["128 + 256", "384"],
  ["900 ÷ 15", "60"],
  ["75 × 12", "900"],
  ["1200 − 325", "875"]
];

let heroIndex = 0;

function animateHeroCalculator(){

  if (!heroExpression || !heroResult) return;

  heroExpression.style.opacity = "0";
  heroResult.style.opacity = "0";
  heroExpression.style.transform = "translateY(8px)";
  heroResult.style.transform = "translateY(8px)";

  setTimeout(() => {

    const value = heroCalculations[heroIndex];

    heroExpression.textContent = value[0];
    heroResult.textContent = value[1];

    heroExpression.style.opacity = "1";
    heroResult.style.opacity = "1";

    heroExpression.style.transform = "translateY(0)";
    heroResult.style.transform = "translateY(0)";

    heroIndex =
      (heroIndex + 1) % heroCalculations.length;

  }, 450);
}

setInterval(animateHeroCalculator, 3600);


/* =========================================
   FAKE KEY INTERACTION
========================================= */

document.querySelectorAll(".fake-key").forEach((key, index) => {

  key.addEventListener("mouseenter", () => {
    key.style.transform = "translateY(-3px) scale(1.025)";
  });

  key.addEventListener("mouseleave", () => {
    key.style.transform = "";
  });

  key.addEventListener("click", () => {

    key.animate(
      [
        {
          transform:"scale(1)"
        },
        {
          transform:"scale(.92)"
        },
        {
          transform:"scale(1)"
        }
      ],
      {
        duration:220,
        easing:"cubic-bezier(.22,1,.36,1)"
      }
    );

  });

});


/* =========================================
   ABACUS ANIMATION
========================================= */

const abacusRows =
  document.querySelectorAll(".abacus-row");

function animateAbacus(){

  abacusRows.forEach((row, rowIndex) => {

    const beads =
      row.querySelectorAll(".abacus-bead");

    beads.forEach((bead, beadIndex) => {

      const movement =
        ((rowIndex + beadIndex) % 3 + 1) * 12;

      bead.animate(
        [
          {
            transform:"translateX(0)"
          },
          {
            transform:`translateX(${movement}px)`
          },
          {
            transform:"translateX(0)"
          }
        ],
        {
          duration:1800 + rowIndex * 120,
          delay:beadIndex * 90,
          easing:"cubic-bezier(.22,1,.36,1)"
        }
      );

    });

  });

}

const abacusObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){
          animateAbacus();
        }

      });

    },
    {
      threshold:.35
    }
  );

const abacusStage =
  document.querySelector(".abacus-stage");

if(abacusStage){
  abacusObserver.observe(abacusStage);
}


/* =========================================
   BMI ANIMATION
========================================= */

const bmiNumber =
  document.querySelector(".bmi-number");

if(bmiNumber){

  const bmiObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if(!entry.isIntersecting) return;

          let current = 0;
          const target = 21.8;

          const timer = setInterval(() => {

            current += .4;

            if(current >= target){

              current = target;
              clearInterval(timer);

            }

            bmiNumber.textContent =
              current.toFixed(1);

          },35);

          bmiObserver.unobserve(entry.target);

        });

      },
      {
        threshold:.6
      }
    );

  bmiObserver.observe(bmiNumber);
}


/* =========================================
   PERCENTAGE ANIMATION
========================================= */

const percentageVisual =
  document.querySelector(".percentage-visual");

if(percentageVisual){

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if(!entry.isIntersecting) return;

          percentageVisual.animate(
            [
              {
                opacity:0,
                transform:"scale(.94)"
              },
              {
                opacity:1,
                transform:"scale(1)"
              }
            ],
            {
              duration:900,
              easing:"cubic-bezier(.22,1,.36,1)"
            }
          );

          observer.unobserve(entry.target);

        });

      },
      {
        threshold:.35
      }
    );

  observer.observe(percentageVisual);
}


/* =========================================
   CONVERTER ARROW
========================================= */

const conversionArrow =
  document.querySelector(".conversion-arrow");

if(conversionArrow){

  setInterval(() => {

    conversionArrow.animate(
      [
        {
          transform:"translateX(-8px)",
          opacity:.4
        },
        {
          transform:"translateX(8px)",
          opacity:1
        },
        {
          transform:"translateX(0)",
          opacity:.8
        }
      ],
      {
        duration:1100,
        easing:"cubic-bezier(.22,1,.36,1)"
      }
    );

  },2200);
}


/* =========================================
   PARALLAX
========================================= */

let ticking = false;

function updateParallax(){

  const scrollY = window.scrollY;

  document.querySelectorAll(
    ".hero-glow,.glass-demo,.abacus-stage"
  ).forEach((element,index) => {

    const speed =
      index === 0 ? .08 : .035;

    const rect =
      element.getBoundingClientRect();

    const center =
      rect.top + rect.height / 2;

    const offset =
      (window.innerHeight / 2 - center) * speed;

    element.style.transform =
      `translate3d(0,${offset}px,0)`;

  });

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {

    if(!ticking){

      requestAnimationFrame(
        updateParallax
      );

      ticking = true;

    }

  },
  {
    passive:true
  }
);


/* =========================================
   SMOOTH ANCHOR NAVIGATION
========================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(link => {

  link.addEventListener("click", event => {

    const target =
      document.querySelector(
        link.getAttribute("href")
      );

    if(!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});


/* =========================================
   DYNAMIC GLASS LIGHT
========================================= */

document.querySelectorAll(
  ".glass-card,.glass-panel,.calculator-showcase,.floating-glass-card"
).forEach(card => {

  card.addEventListener("pointermove", event => {

    const rect =
      card.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty(
      "--light-x",
      `${x}%`
    );

    card.style.setProperty(
      "--light-y",
      `${y}%`
    );

  });

});


/* =========================================
   REDUCED MOTION
========================================= */

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

if(reducedMotion.matches){

  document
    .querySelectorAll(".reveal")
    .forEach(el => {
      el.classList.add("visible");
    });

}


/* =========================================
   INITIAL STATE
========================================= */

window.addEventListener("load", () => {

  document
    .querySelectorAll(".hero .reveal")
    .forEach((el,index) => {

      setTimeout(() => {
        el.classList.add("visible");
      }, index * 150);

    });

});
