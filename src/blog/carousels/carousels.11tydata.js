// Instagram carousels: each file is one carousel, shown as a blog post with swipeable slides.
// The first slide doubles as the cover image; the summary falls back to the start of the caption.
import { captionSummary } from "../../../lib/caption.js";
import { isPublished, isScheduled } from "../../../lib/schedule.js";

export default {
  layout: "layouts/post.njk",
  isPost: true,
  isCarousel: true,
  parent: { title: "Blog", url: "/blog/" },
  eleventyComputed: {
    permalink: (data) => (isPublished(data) ? `/blog/${data.page.fileSlug}/` : false),
    scheduled: (data) => isScheduled(data),
    futureUrl: (data) => `/blog/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
    cover: (data) => data.cover || (Array.isArray(data.slides) ? data.slides[0] : data.slides) || "",
    coverAlt: (data) => data.coverAlt || `First slide: ${data.title}`,
    summary: (data) => data.summary || captionSummary(data.caption),
  },
};
