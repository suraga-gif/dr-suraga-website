# How to edit your website

This guide is for Dr. Suraga. You don't need any technical knowledge, and you never need to touch the files in this folder.

**To edit anything:** open **drsuraga.com/admin** (or **app.pagescms.org**) and sign in with your GitHub account (`suraga-gif`).

Every time you click **Save**, the website updates by itself within about 2 minutes. Every save is also kept as a version, so nothing is ever lost. If something goes wrong, ask for help and it can be put back.

---

## Add a blog post

1. In the left menu, click **Blog posts**, then **Add an entry**.
2. Fill in:
   - **Title**
   - **Publish date**
   - **Short summary**: one or two sentences. This shows on the blog list and in Google.
   - **Topic**: choose one from the list.
   - **Cover image** (optional): click to upload a photo. Never use a photo that shows a patient.
   - **Describe the cover image**: a few words describing the photo.
   - **Article**: write or paste your text. Use the toolbar for headings, **bold** and lists.
   - **Key points**: 3 to 5 short points. Click **Add** for each one.
   - **Related Instagram post** (optional): paste the link.
3. Click **Save**.

To save a post without publishing it yet, switch on **Hide from website**. Switch it off when it's ready.

## Schedule posts in advance

In **Blog posts** or **Instagram carousels**, choose a **future Publish date** and click **Save**. The post stays hidden and goes live by itself at about **7 am** on that date. You can schedule a whole week (or month) in one sitting.

Scheduled posts appear at the top of **drsuraga.com/share/** with their future link, so you can prepare the matching Google updates in advance.

## Edit or delete a blog post

1. Click **Blog posts** and open the post.
2. Edit it and click **Save**.

To delete a post, use the **⋯** menu next to it and choose **Delete**.

## Add an Instagram carousel

1. Click **Instagram carousels**, then **Add an entry**.
2. Fill in:
   - **Title**: a short headline, e.g. "5 early signs of mouth cancer"
   - **Publish date** and **Topic**
   - **Slides**: upload the carousel images **in order**, first slide first (you can select several at once)
   - **Caption**: paste the Instagram caption (lines with only hashtags are hidden on the website)
   - **Instagram post link** (optional)
3. Click **Save**. It appears on the Blog page, the home page and the matching cancer page, with swipeable slides.
4. To post it on Google: open **drsuraga.com/share/**, find it, copy the **Google update text** and **article link**, and download the **first slide** for the photo.

## Add a video

1. On YouTube or Instagram, tap **Share**, then **Copy link**.
2. In the editor, click **Videos**, then **Add an entry**.
3. Fill in a **Title**, paste the **Video link**, choose a **Topic**, and optionally add a **Short description**.
4. To show it on the home page, switch on **Show on the home page**.
5. Click **Save**.

## Add a publication

1. Click **Publications**, then **Add an entry**.
2. Fill in the title, authors, journal, year and publication date. If you only know the year, choose 1 January.
3. Paste a **Link to the paper**, or upload a **PDF** if the journal allows it.
4. Click **Save**. The list on the website puts the newest first automatically.

## Change contact details, hours or add a notice

Click **Contact details and settings**. There you can:

- change the phone number, WhatsApp number, email, clinic hours or address
- add or remove social media links (leave a link empty to hide that icon)
- add an **Announcement banner**, e.g. "Dr. Suraga is on leave from 12 to 15 November". Empty it again to remove the banner.

## Edit page text

| To change | Open |
|---|---|
| The text on the home page | **Home page text** |
| A cancer page, including its common questions | **Cancer pages** |
| Robotic surgery, RIA-MIND or PRIA | **Robotic surgery pages** |
| Your biography, training and interests | **About page** |
| Information for referring doctors | **For doctors page** |

## Share an article on Google and Instagram

After publishing a blog post, open **your website address + /share/** (for example drsuraga.com/share/). Each article has:

- **Copy Google update text** and **Copy article link**, for an update on your Google Business Profile
- **Copy Instagram caption**, for @onco_outreach

The page also has step-by-step instructions for posting the Google update.

## Good practice

- **Never** put patient names, photos or identifiable details on the website.
- Avoid words like "best", "No. 1" or success-rate claims. The medical council does not allow them.
- Keep articles in plain language. Explain medical terms the first time you use them.

## Where things are

- **Website:** drsuraga.com (preview: the `.pages.dev` address from Cloudflare)
- **Editor:** drsuraga.com/admin or app.pagescms.org
- **Appointment requests:** arrive by email from Formspree at suraga.b@gmail.com
- **Hosting:** Cloudflare (dash.cloudflare.com)
- **Files:** GitHub, suraga-gif/dr-suraga-website

---

<details>
<summary>Technical notes (for a developer)</summary>

- Eleventy 3 static site. `npm install`, then `npm start` to preview at http://localhost:8080 or `npm run build` to build to `_site/`.
- Content lives in `src/` as Markdown with YAML front matter. Site settings are in `src/_data/site.json` and home page text in `src/_data/home.json`.
- The editor configuration is `.pages.yml` (Pages CMS). `settings.content.merge: true` keeps front matter keys the editor doesn't show.
- Hosting is Cloudflare Pages: build command `npx @11ty/eleventy`, output `_site`, Node version from `.node-version`.
- Images in pages are resized to AVIF/WebP by `@11ty/eleventy-img`. Uploads go to `src/uploads/`.
- Before launch, `site.launched` in `site.json` is `false`, so every page carries `noindex` and `robots.txt` blocks crawlers.

</details>
