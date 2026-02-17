/* ============================================
   DOM REFERENCES
   ============================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const revealEls = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const typingEl = document.getElementById("typingText");

/* ============================================
   DYNAMIC YEAR
   ============================================ */
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

/* ============================================
   MOBILE MENU
   ============================================ */
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    var isOpen = menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
var revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

/* ============================================
   ACTIVE SECTION TRACKING
   ============================================ */
var sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.getAttribute("id");
      navAnchors.forEach(function (link) {
        var href = link.getAttribute("href");
        var linkId = href ? href.replace("#", "") : "";
        link.classList.toggle("active", linkId === id);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

/* ============================================
   DARK MODE TOGGLE
   ============================================ */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// Listen for system preference changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
  if (!localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
  }
});

/* ============================================
   BACK TO TOP
   ============================================ */
if (backToTop) {
  var scrollTicking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 500) {
            backToTop.classList.add("visible");
          } else {
            backToTop.classList.remove("visible");
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================
   TYPING ANIMATION
   ============================================ */
var typingPhrases = [
  "intelligent products",
  "LLM-powered workflows",
  "modern web apps",
  "mobile experiences",
  "RAG pipelines",
];

var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;

function typeEffect() {
  if (!typingEl) return;

  var currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typingEl.textContent = currentPhrase.substring(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = currentPhrase.substring(0, charIndex);
  }

  var delay = isDeleting ? 35 : 70;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

// Start typing after a short initial delay
if (typingEl) {
  setTimeout(typeEffect, 800);
}
