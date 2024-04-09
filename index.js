window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
  const hero = document.querySelectorAll(".grid-item");

  // Initialise Hero
  const initMenu = () => {
    gsap.to(hero, {
      delay: 0.8,
      autoAlpha: 1,
      stagger: 0.2,
      ease: Power1.easeOut,
    });
  };

  gsap.to(".main", {
    scrollTrigger: {
      trigger: ".navbar",
      start: "700 10%",
      end: "4400 20%",
      toggleClass: "navbar-bg",
      // markers: true,
      onEnter: () => {
        console.log("Entered!");
      },
    },
  });

  // Horizontal-scroll
  const sections = gsap.utils.toArray(".scroll");
  // setting up a horizontal-scroll
  let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".main",
      pin: true,
      scrub: 1,
      end: `+=3200`,
      // snap: 1 / (sections.length - 1),
    },
  });

  gsap.to(".grid-mission > *", {
    autoAlpha: 1, // Automatically handles both visibility and opacity
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      // containerAnimation: scrollTween,
      trigger: ".main",
      start: "top 90%",
      end: "bottom 20%",
      // scrub:true,
      // markers: true,
    },
  });

  gsap.to(".team-inline", {
    scrollTrigger: {
      containerAnimation: scrollTween,
      trigger: ".team",
      start: "top 20%",
      // end:"bottom 90%",
      scrub: true,
      // markers: true,
      onEnter: () => {
        revealElements.forEach((element) => {
          revealObserver.observe(element);
        });
      },
    },
  });

  // custom reveal animations
  const revealElements = document.querySelectorAll(".text-reveal-inner");
  // observer to trigger reveal animations
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal");
          revealLines(entry.target.querySelectorAll("span"));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  function revealLines(lines) {
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "1";
      }, index * 300); // Adjust the delay as needed
    });
  }

  gsap.from(".event", {
    x: 800,
    duration: 5,
    ease: "elastic.in",
    scrollTrigger: {
      containerAnimation: scrollTween,
      trigger: ".contact",
      start: "top 80%",
      end: "+=1000",
      scrub: true,
      markers: true,
    },
  });

  // sliders
  var actionLinks = document.querySelectorAll(".action");
  actionLinks.forEach(function (actionLink) {
    actionLink.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".slide").forEach(function (slide) {
        slide.classList.remove("active");
      });
      var slide = this.closest(".slide");
      slide.classList.add("active");
    });
  });

  // checkWidth
  var checkWidth = function () {
    var windowsize = window.innerWidth;
    if (windowsize > 480) {
      var activeSlide = document.querySelector(".slide.active");
      var slideWidth = activeSlide.offsetWidth;
      document
        .querySelectorAll(".slide-content")
        .forEach(function (slideContent) {
          slideContent.style.width = slideWidth + "px";
        });
    }
  };

  window.addEventListener("resize", function () {
    // onresize
    checkWidth();

    // finish resize
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(checkWidth, 500);
  });

  initMenu();
  gsap;
});
