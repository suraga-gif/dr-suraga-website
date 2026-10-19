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
