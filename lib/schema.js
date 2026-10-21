// Builds the JSON-LD structured data for a page: the doctor, the hospital, and,
// depending on the page, breadcrumbs, common questions or a blog article.

export function schemaGraph(ctx, site, specialties = []) {
  const doctorId = `${site.url}/#doctor`;
  const hospitalId = `${site.url}/#hospital`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: "Survey No. 36/5, Outer Ring Road, Doddanekkundi, K.R. Puram",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560037",
    addressCountry: "IN",
  };

  const graph = [
    {
      "@type": "IndividualPhysician",
      "@id": doctorId,
      name: site.name,
      url: `${site.url}/`,
      image: `${site.url}/assets/img/og-default.jpg`,
      description: `${site.title} in Bengaluru. ${site.degrees}.`,
      telephone: site.phone,
      email: site.email,
      medicalSpecialty: ["Oncologic", "Surgical"],
      knowsAbout: specialties.map((s) => s.data.title),
      address,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "15:00",
        },
      ],
      practicesAt: { "@id": hospitalId },
      hospitalAffiliation: { "@id": hospitalId },
      sameAs: Object.values(site.social || {}).filter(Boolean),
    },
    {
      "@type": "Hospital",
      "@id": hospitalId,
      name: site.hospital,
      address,
    },
  ];

  if (ctx.parent) {
    const crumbs = [{ name: "Home", url: "/" }];
    if (ctx.parent.url !== "/") crumbs.push({ name: ctx.parent.title, url: ctx.parent.url });
    crumbs.push({ name: ctx.breadcrumbTitle || ctx.title, url: ctx.url });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${site.url}${c.url}`,
      })),
    });
  }

  if (Array.isArray(ctx.faqs) && ctx.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: ctx.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (ctx.isPost) {
    const date = new Date(ctx.date).toISOString().slice(0, 10);
    graph.push({
      "@type": "BlogPosting",
      headline: ctx.title,
      description: ctx.summary,
      datePublished: date,
      dateModified: date,
      image: ctx.image,
      url: `${site.url}${ctx.url}`,
      author: { "@id": doctorId },
      publisher: { "@id": doctorId },
      inLanguage: "en-IN",
    });
  }

  // "<" is escaped so the data can never close the surrounding <script> tag
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
