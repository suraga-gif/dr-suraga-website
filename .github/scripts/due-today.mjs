// Prints the titles of blog posts and carousels whose publish date is today (India time).
// Used by the daily-publish workflow to decide whether the website needs rebuilding.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()); // yyyy-mm-dd

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".md") ? [path] : [];
  });
}

const due = walk("src/blog").filter((file) => {
  const front = readFileSync(file, "utf8").split(/^---\s*$/m)[1] || "";
  const date = (front.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m) || [])[1];
  const draft = /^draft:\s*true\s*$/m.test(front);
  return date === today && !draft;
}).map((file) => {
  const front = readFileSync(file, "utf8").split(/^---\s*$/m)[1] || "";
  return ((front.match(/^title:\s*(.+)$/m) || [])[1] || file).replace(/^["']|["']$/g, "");
});

console.log(due.join("\n"));
