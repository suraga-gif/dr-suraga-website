// Scheduled publishing for blog posts and Instagram carousels.
// A post goes live at 7:00 am India time (01:30 UTC) on its publish date, at the first
// website build after that moment. A GitHub Action triggers that build every morning
// when a post is due (see .github/workflows/daily-publish.yml).

const PUBLISH_HOUR_UTC = 1;
const PUBLISH_MINUTE_UTC = 30;

// When a post with this date becomes visible
export function publishTime(date) {
  const d = new Date(date);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), PUBLISH_HOUR_UTC, PUBLISH_MINUTE_UTC);
}

export function isScheduled(data) {
  return !data.draft && publishTime(data.page.date) > Date.now();
}

export function isPublished(data) {
  return !data.draft && publishTime(data.page.date) <= Date.now();
}
