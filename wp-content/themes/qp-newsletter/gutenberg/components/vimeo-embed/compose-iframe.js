import { twMerge } from "tailwind-merge";

/**
 * Extract the video id in a vimeo url
 */
const extractVimeoId = url => {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    // Match standard Vimeo URL: https://vimeo.com/VIDEO_ID
    if (parsedUrl.hostname === "vimeo.com") {
      const pathParts = parsedUrl.pathname.split("/");
      const id = pathParts.pop() || pathParts.pop(); // Handle trailing slash
      return /^\d+$/.test(id) ? id : false;
    }

    // Match player URL: https://player.vimeo.com/video/VIDEO_ID
    if (
      parsedUrl.hostname === "player.vimeo.com" &&
      parsedUrl.pathname.startsWith("/video/")
    ) {
      const id = parsedUrl.pathname.split("/video/")[1].split("/")[0];
      return /^\d+$/.test(id) ? id : false;
    }

    console.error("[ERROR] Compose Vimeo iframe");
    return false;
  } catch (error) {
    console.error("[ERROR] Compose Vimeo iframe", error);
    return false;
  }
};

export const composeVimeoIframe = (url, attributes = {}) => {
  // Extract the video ID
  const videoId = extractVimeoId(url);
  if (!videoId) {
    return "";
  }

  // Iframe attributes
  const {
    autoplay = 0,
    loop = 0,
    muted = 1,
    title = 0,
    byline = 0,
    portrait = 0,
    width = 1000,
    height = 750,
    className,
  } = attributes;

  // Classname
  const componentClassName = twMerge(
    "block size-full absolute inset-0 object-cover object-center",
    className
  );

  // Return iframe as HTML string
  return `
    <iframe
      src="https://player.vimeo.com/video/${videoId}?autoplay=${autoplay}&loop=${loop}&muted=${muted}&title=${title}&byline=${byline}&portrait=${portrait}"
      class="${componentClassName}"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      width="${width}"
      height="${height}"
    ></iframe>
  `.trim();
};
