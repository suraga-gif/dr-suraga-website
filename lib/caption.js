// Helpers for Instagram captions pasted into the editor.

// Lines made only of hashtags (e.g. "#cancer #awareness") are left out on the website and in Google updates.
export function stripHashtagLines(text = "") {
  return String(text)
    .split(/\r?\n/)
    .filter((line) => !/^\s*(#[\p{L}\p{N}_]+\s*)+$/u.test(line))
    .join("\n")
    .trim();
}

// Caption as HTML: blank lines start a new paragraph, single line breaks are kept.
export function captionHtml(text = "") {
  const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return stripHashtagLines(text)
    .split(/\n\s*\n/)
    .map((para) => `<p>${escape(para.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

// First sentence or so of the caption, for cards and search results (about 160 characters).
export function captionSummary(text = "") {
  const plain = stripHashtagLines(text).replace(/\s+/g, " ").trim();
  if (plain.length <= 160) return plain;
  const cut = plain.slice(0, 160);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}
