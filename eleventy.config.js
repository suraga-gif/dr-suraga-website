import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import { videoInfo } from "./lib/video.js";
import { schemaGraph } from "./lib/schema.js";
import { captionHtml, stripHashtagLines } from "./lib/caption.js";

// Font files are copied from the installed @fontsource packages, so no font binaries live in the repo
const FONT_FILES = [
  "poppins/files/poppins-latin-500-normal.woff2",
  "poppins/files/poppins-latin-600-normal.woff2",
  "lora/files/lora-latin-400-normal.woff2",
  "lora/files/lora-latin-400-italic.woff2",
  "lora/files/lora-latin-600-normal.woff2",
];

export default function (eleventyConfig) {
  // Static assets. Photos in src/assets/photos are NOT copied: the image plugin makes resized versions instead.
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" }); // e.g. /admin opens the editor
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" }); // caching and security headers
  // Files uploaded through the editor (images, PDFs). Images are also resized wherever a page shows them.
  eleventyConfig.addPassthroughCopy("src/uploads");
  for (const file of FONT_FILES) {
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource/${file}`]: `assets/fonts/${file.split("/").pop()}`,
    });
  }

  // Every <img> in the built pages is resized and converted to modern formats (AVIF/WebP) automatically
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [400, 800, 1200],
    urlPath: "/img/",
    outputDir: "./_site/img/",
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
    },
  });

  // Markdown: allow HTML, turn plain web addresses into links, use curly quotes
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdown", (text) => (text ? md.render(String(text)) : ""));

  // Cancer pages, in the order set by the "order" field
  eleventyConfig.addCollection("specialties", (api) =>
    api.getFilteredByGlob("src/specialties/*.md").sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // Blog posts (hidden drafts left out), newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/**/*.md").filter((p) => !p.data.draft && !p.data.scheduled).sort((a, b) => b.date - a.date)
  );

  // Newspaper columns (published), newest first
  eleventyConfig.addCollection("columns", (api) =>
    api.getFilteredByGlob("src/blog/columns/*.md").filter((p) => !p.data.draft && !p.data.scheduled).sort((a, b) => b.date - a.date)
  );

  // Posts and carousels waiting for their publish date, soonest first (shown only in the Share kit)
  eleventyConfig.addCollection("scheduledPosts", (api) =>
    api.getFilteredByGlob("src/blog/**/*.md").filter((p) => p.data.scheduled).sort((a, b) => a.date - b.date)
  );

  // Videos with a recognised YouTube or Instagram link, newest first
  eleventyConfig.addCollection("videos", (api) =>
    api.getFilteredByGlob("src/videos/*.md").filter((v) => videoInfo(v.data.url)).sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("videoInfo", videoInfo);
  eleventyConfig.addFilter("whereCategory", (items = [], category) =>
    category ? items.filter((item) => item.data.category === category) : items
  );
  // Topic names (from categories.json) that have at least one item in the given list
  eleventyConfig.addFilter("categoriesUsedIn", (categories = [], items = []) =>
    categories.filter((cat) => items.some((item) => item.data.category === cat.name))
  );
  eleventyConfig.addFilter("whereFeatured", (items = []) => items.filter((item) => item.data.featured));
  eleventyConfig.addFilter("excludeUrl", (items = [], url) => items.filter((item) => item.url !== url));
  eleventyConfig.addFilter("limit", (items = [], n) => items.slice(0, n));

  const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  eleventyConfig.addFilter("readableDate", (date) => dateFormat.format(new Date(date)));
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingTime", (html = "") => {
    const words = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
  });

  // Publications, newest first
  eleventyConfig.addCollection("publications", (api) =>
    api.getFilteredByGlob("src/publications/*.md").sort((a, b) => b.date - a.date)
  );

  // Group a list of publications into [{ year, items }], keeping their order (newest first)
  eleventyConfig.addFilter("groupByYear", (items = []) => {
    const groups = [];
    for (const item of items) {
      const year = item.data.year;
      if (!groups.length || groups[groups.length - 1].year !== year) groups.push({ year, items: [] });
      groups[groups.length - 1].items.push(item);
    }
    return groups;
  });

  // Bold Dr. Suraga's name in author lists, however it is written
  eleventyConfig.addFilter("highlightAuthor", (authors = "") =>
    String(authors)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/\b(Belakawadi S|Suraga B|Suraga Belakawadi|Belakawadi)\b/g, "<strong>$1</strong>")
  );

  // Share image for WhatsApp/LinkedIn previews: the given photo cropped to 1200x630.
  // Falls back to the default card when there is no photo.
  eleventyConfig.addAsyncFilter("ogImage", async (src) => {
    if (!src || /^https?:/.test(src)) return src || "/assets/img/og-default.jpg";
    const stats = await Image(`./src${src}`, {
      widths: [1200],
      formats: ["jpeg"],
      outputDir: "./_site/img/og/",
      urlPath: "/img/og/",
      sharpJpegOptions: { quality: 80, mozjpeg: true },
      transform: (sharp) => sharp.resize(1200, 630, { fit: "cover", position: "attention" }),
    });
    return stats.jpeg[0].url;
  });

  eleventyConfig.addFilter("schemaGraph", schemaGraph);
  eleventyConfig.addFilter("captionHtml", captionHtml);
  eleventyConfig.addFilter("stripHashtagLines", stripHashtagLines);
  eleventyConfig.addFilter("asList", (value) => (Array.isArray(value) ? value : value ? [value] : []));

  // Sitemap: every published page except those marked noindex
  eleventyConfig.addFilter("sitemapPages", (pages = []) =>
    pages.filter((p) => p.url && !p.data.noindex && !p.url.startsWith("/404") && p.outputPath?.endsWith(".html"))
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("telLink", (phone) => `tel:${phone}`);
  eleventyConfig.addFilter("whatsappLink", (number, message) =>
    `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    // Markdown written in the editor is treated as plain Markdown, so stray "{{" in an article can't break the build
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
