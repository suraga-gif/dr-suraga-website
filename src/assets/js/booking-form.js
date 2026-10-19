// Appointment form: friendly validation, sending to Formspree without leaving the page, and the click-to-load map
(function () {
  var form = document.querySelector(".booking-form");
  var errorBox = document.querySelector(".form-errors");
  var status = document.querySelector(".form-status");

  // The map only loads (and only contacts Google) when the visitor asks for it
  var mapButton = document.querySelector(".map-load");
  if (mapButton) {
    mapButton.addEventListener("click", function () {
      var map = mapButton.closest(".map");
      var iframe = document.createElement("iframe");
      iframe.src = map.getAttribute("data-map-src");
      iframe.title = "Map showing the hospital location";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      map.replaceChildren(iframe);
    });
  }

  if (!form) return;

  // Dates: no past dates; a Sunday gets a gentle note
  var dateInput = form.querySelector("#f-date");
  var today = new Date();
  var todayIso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (dateInput) {
    dateInput.min = todayIso;
    dateInput.addEventListener("change", function () {
      var hint = document.getElementById("f-date-hint");
      var picked = dateInput.value ? new Date(dateInput.value + "T00:00:00") : null;
      hint.textContent = picked && picked.getDay() === 0
        ? "The clinic is closed on Sundays. Please choose Monday to Saturday."
        : "The clinic is open Monday to Saturday.";
    });
  }

  function fieldProblem(input) {
    if (input.validity.valid) return null;
    return input.getAttribute("data-error") || "Check this field";
  }

  function showErrors(problems) {
    var list = errorBox.querySelector("ul");
    list.replaceChildren();
    problems.forEach(function (p) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + p.input.id;
      a.textContent = p.message;
      a.addEventListener("click", function (e) { e.preventDefault(); p.input.focus(); });
      li.appendChild(a);
      list.appendChild(li);
    });
    errorBox.hidden = problems.length === 0;
    if (problems.length) errorBox.focus();
  }

  function markField(input, message) {
    var field = input.closest(".field");
    var existing = field.querySelector(".field-error");
    if (existing) existing.remove();
    input.removeAttribute("aria-invalid");
    if (!message) return;
    input.setAttribute("aria-invalid", "true");
    var p = document.createElement("p");
    p.className = "field-error";
    p.id = input.id ? input.id + "-error" : "";
    p.textContent = message;
    field.appendChild(p);
  }

  // Re-check a field when the visitor leaves it, once they have tried to send
  var attempted = false;
  form.addEventListener("focusout", function (e) {
    if (attempted && e.target.matches("input, select, textarea")) markField(e.target, fieldProblem(e.target));
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    attempted = true;

    // Make sure every checked field has an id for the error links
    var inputs = Array.prototype.slice.call(form.querySelectorAll("input:not([type=hidden]):not([name=_gotcha]), select, textarea"));
    inputs.forEach(function (input, i) { if (!input.id) input.id = "f-field-" + i; });

    var problems = [];
    inputs.forEach(function (input) {
      var message = fieldProblem(input);
      if (!message && input === dateInput && input.value && input.value < todayIso) message = input.getAttribute("data-error");
      markField(input, message);
      if (message) problems.push({ input: input, message: message });
    });
    showErrors(problems);
    if (problems.length) return;

    var button = form.querySelector(".btn-submit");
    button.disabled = true;
    button.textContent = "Sending…";
    status.textContent = "";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          window.location.href = form.getAttribute("data-thanks-url");
          return;
        }
        throw new Error("Request failed");
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = "Send request";
        var phone = form.getAttribute("data-phone");
        var phoneLink = document.createElement("a");
        phoneLink.href = "tel:" + phone;
        phoneLink.textContent = form.getAttribute("data-phone-display");
        status.replaceChildren(
          document.createTextNode("Your request could not be sent. Please check your internet connection and try again, or call or WhatsApp "),
          phoneLink,
          document.createTextNode(".")
        );
      });
  });
})();
