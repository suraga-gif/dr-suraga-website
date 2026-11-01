// Helpers for Instagram captions pasted into the editor.
// On the website (and in Google update text) captions are tidied:
// - lines made only of hashtags (e.g. "#cancer #awareness") are left out
// - lines with phone numbers or "For appointments" are left out (hospital numbers stay on Instagram only)
// - the sign-off at the end ("Dr. Suraga Belakawadi / Surgical Oncologist / KIMS Hospital ...") is left out

const HASHTAG_LINE = /^\s*(#[\p{L}\p{N}_]+\s*)+$/u;
const PHONE = /\+?\d[\d\s-]{8,}\d/; // 10-digit mobiles, 080-xxxxxxxx landlines, +91 numbers
const APPOINTMENT_LINE = /^\s*((for\s+)?(appointments?|bookings?|enquir(y|ies))\b|contact\s*(us\b|:))/i;
const SIGN_OFF_LINE = /^\s*([-–—_.•]+|dr\.?\s*suraga\b.*|surgical oncologist.*|.*\bkims\b.*|.*\bmahadev(a)?pura\b.*|.*\bbengaluru\b.*)?\s*$/i;
const TRAILING_NAME = /\s*(?:[-–—|]\s*)?Dr\.?\s*Suraga(?:\s+Belakawadi)?\.?\s*$/i;

export function cleanCaption(text = "") {
  const lines = String(text)
    .split(/\r?\n/)
    .filter((line) => !HASHTAG_LINE.test(line) && !PHONE.test(line) && !APPOINTMENT_LINE.test(line))
    .map((line) => line.replace(TRAILING_NAME, ""));

  // Drop the sign-off block at the end (name, title, hospital, separators, blank lines)
  while (lines.length && SIGN_OFF_LINE.test(lines[lines.length - 1])) lines.pop();

  return lines.join("\n").trim();
}

// Caption as HTML: blank lines start a new paragraph, single line breaks are kept.
export function captionHtml(text = "") {
  const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return cleanCaption(text)
    .split(/\n\s*\n/)
    .map((para) => `<p>${escape(para.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

// First sentence or so of the caption, for cards and search results (about 160 characters).
export function captionSummary(text = "") {
  const plain = cleanCaption(text).replace(/\s+/g, " ").trim();
  if (plain.length <= 160) return plain;
  const cut = plain.slice(0, 160);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}
