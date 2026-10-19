import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";

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
