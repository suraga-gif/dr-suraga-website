// Settings shared by every robotic surgery page in this folder
export default {
  layout: "layouts/page.njk",
  permalink: (data) => `/robotic-surgery/${data.page.fileSlug}/`,
  parent: { title: "Robotic surgery", url: "/robotic-surgery/" },
  reviewPending: false,
};
