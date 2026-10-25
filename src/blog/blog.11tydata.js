// Settings shared by every blog post in this folder.
// A post marked "Hide from website" (draft) gets no page and is left out of every list.
// A post with a future publish date stays hidden until 7 am (India time) on that date.
import { isPublished, isScheduled } from "../../lib/schedule.js";

export default {
  layout: "layouts/post.njk",
  isPost: true,
  parent: { title: "Blog", url: "/blog/" },
  eleventyComputed: {
    permalink: (data) => (isPublished(data) ? `/blog/${data.page.fileSlug}/` : false),
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
    scheduled: (data) => isScheduled(data),
    futureUrl: (data) => `/blog/${data.page.fileSlug}/`,
  },
};
