/* ===========================================================
   Service Informatique à la Carte — Scripts
   - Menu mobile
   - Header scroll effect
   - Reveal on scroll
   - Formulaire de contact (démo côté client)
   - Back to top
   =========================================================== */
(function () {
  "use strict";

  // ---- Menu mobile ----
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Ferme le menu quand on clique sur un lien
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Header scroll effect ----
  var header = document.getElementById("header");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backToTop) backToTop.classList.toggle("show", y > 400);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Reveal on scroll ----
  var revealTargets = document.querySelectorAll(
    ".service, .quote, .stat, .apropos__content, .apropos__stats, .section__head, .contact-form, .hero__card"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Formulaire de contact (démo) ----
  var form = document.getElementById("contactForm");
  var feedback = document.getElementById("formFeedback");

  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validation basique
      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.value.trim()) { name.focus(); return; }
      if (!emailRe.test(email.value.trim())) { email.focus(); return; }
      if (!message.value.trim()) { message.focus(); return; }

      feedback.hidden = false;
      form.reset();
      setTimeout(function () { feedback.hidden = true; }, 6000);
    });
  }

  // ---- Année footer ----
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
