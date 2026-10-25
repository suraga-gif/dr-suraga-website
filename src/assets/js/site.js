// Small page interactions: video players, video topic filter, "Copy link" buttons
(function () {
  document.addEventListener("click", function (event) {
    var copyButton = event.target.closest("[data-copy-link]");
    if (!copyButton || !navigator.clipboard) return;
    navigator.clipboard.writeText(copyButton.getAttribute("data-copy-link")).then(function () {
      var original = copyButton.textContent;
      copyButton.textContent = "Link copied";
      setTimeout(function () { copyButton.textContent = original; }, 2000);
    });
  });

  // Swap a video thumbnail for the real player when tapped
  document.addEventListener("click", function (event) {
    var button = event.target.closest(".video-play");
    if (!button) return;
    var frame = button.closest(".video-frame");
    var iframe = document.createElement("iframe");
    iframe.src = frame.getAttribute("data-embed");
    iframe.title = frame.getAttribute("data-title") || "Video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.setAttribute("loading", "lazy");
    frame.replaceChildren(iframe);
    iframe.focus();
  });

  var filters = document.querySelectorAll("[data-video-filter]");
  if (!filters.length) return;
  var cards = document.querySelectorAll(".video-card");
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-video-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === button)); });
      cards.forEach(function (card) {
        card.hidden = category !== "" && card.getAttribute("data-category") !== category;
      });
    });
  });
})();

// Carousel slides: swipe on phones, arrow buttons and a "2 / 7" counter everywhere
(function () {
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = carousel.querySelectorAll(".carousel-slide");
    var current = carousel.querySelector(".carousel-current");
    var prev = carousel.querySelector(".carousel-prev");
    var next = carousel.querySelector(".carousel-next");
    if (!track || slides.length < 2) return;

    function index() { return Math.round(track.scrollLeft / track.clientWidth); }
    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    }
    function update() {
      var i = index();
      current.textContent = String(i + 1);
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }
    prev.addEventListener("click", function () { go(index() - 1); });
    next.addEventListener("click", function () { go(index() + 1); });
    track.addEventListener("scroll", function () { window.requestAnimationFrame(update); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
    });
    update();
  });
})();
