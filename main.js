/* The Patiala Cuts — interactions */
(function () {
  // Intro overlay
  window.addEventListener("load", function () {
    setTimeout(function () { document.body.classList.add("intro-done"); }, 1500);
  });
  // Fallback if load is slow
  setTimeout(function () { document.body.classList.add("intro-done"); }, 2600);

  // Nav scroll state
  var nav = document.querySelector("header.nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 40); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Hero rolling slides
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-dots button"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length) {
    var i = 0;
    var show = function (n) {
      slides.forEach(function (s, idx) { s.classList.toggle("active", idx === n); });
      dots.forEach(function (d, idx) { d.classList.toggle("active", idx === n); });
      i = n;
    };
    show(0);
    if (!reduce && slides.length > 1) {
      var timer = setInterval(function () { show((i + 1) % slides.length); }, 6000);
      dots.forEach(function (d, idx) {
        d.addEventListener("click", function () { clearInterval(timer); show(idx); timer = setInterval(function () { show((i + 1) % slides.length); }, 6000); });
      });
    }
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Year stamp
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
