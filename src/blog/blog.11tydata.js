// Settings shared by every blog post in this folder.
// A post marked "Hide from website" (draft) gets no page and is left out of every list.
export default {
  layout: "layouts/post.njk",
  parent: { title: "Blog", url: "/blog/" },
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/blog/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
  },
};
