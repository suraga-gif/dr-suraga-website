// Newspaper columns: each file is one column, shown as a blog post with the newspaper's name,
// an optional photo of the printed clipping and a link to the original.
import { isPublished, isScheduled } from "../../../lib/schedule.js";

export default {
  layout: "layouts/post.njk",
  isPost: true,
  isColumn: true,
  parent: { title: "Blog", url: "/blog/" },
  eleventyComputed: {
    permalink: (data) => (isPublished(data) ? `/blog/${data.page.fileSlug}/` : false),
    scheduled: (data) => isScheduled(data),
    futureUrl: (data) => `/blog/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
    cover: (data) => data.cover || (Array.isArray(data.clippings) ? data.clippings[0] : data.clippings) || "",
    coverAlt: (data) => data.coverAlt || `Newspaper clipping: ${data.title}`,
  },
};
