// Works out what kind of video a pasted link is, so the editor only ever needs the link.
// Returns { platform, id, vertical, embedUrl, thumbnail, url } or null if the link isn't recognised.

const YOUTUBE_PATTERNS = [
  /youtu\.be\/([\w-]{11})/,
  /youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/,
  /youtube\.com\/(?:embed|live|v)\/([\w-]{11})/,
];
const YOUTUBE_SHORTS = /youtube\.com\/shorts\/([\w-]{11})/;
const INSTAGRAM = /instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/;

export function videoInfo(rawUrl) {
  const url = String(rawUrl || "").trim();
  if (!url) return null;

  const shorts = url.match(YOUTUBE_SHORTS);
  if (shorts) return youtube(shorts[1], url, true);

  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return youtube(match[1], url, false);
  }

  const insta = url.match(INSTAGRAM);
  if (insta) {
    const kind = insta[1] === "reels" ? "reel" : insta[1];
    return {
      platform: "instagram",
      id: insta[2],
      vertical: kind !== "p",
      embedUrl: `https://www.instagram.com/${kind}/${insta[2]}/embed/`,
      thumbnail: "",
      url,
    };
  }

  return null;
}

function youtube(id, url, vertical) {
  return {
    platform: "youtube",
    id,
    vertical,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    url,
  };
}
