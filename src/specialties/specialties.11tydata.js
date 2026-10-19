// Settings shared by every cancer page in this folder
export default {
  layout: "layouts/page.njk",
  permalink: (data) => `/specialties/${data.page.fileSlug}/`,
  parent: { title: "Cancers treated", url: "/specialties/" },
  reviewPending: false,
};
