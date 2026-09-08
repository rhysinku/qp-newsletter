const getYoutubeVideoId = url => {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    // Handle standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.host.includes("youtube.com")) {
      const urlParams = new URLSearchParams(parsedUrl.search);
      return urlParams.get("v") || false;
    }

    // Handle shortened URL: https://youtu.be/VIDEO_ID
    if (parsedUrl.host.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1); // Remove the leading slash
    }

    // Handle embed URL: https://www.youtube.com/embed/VIDEO_ID
    if (
      parsedUrl.host.includes("youtube.com") &&
      parsedUrl.pathname.includes("/embed/")
    ) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    return false;
  } catch (error) {
    return false; // If the URL is invalid, return false
  }
};

const constructYoutubeIframe = (videoId, editor) => {
  const autoplay = editor ? "" : "?autoplay=1";
  return `<iframe
          loading="lazy"
          class="absolute inset-0 size-full object-cover object-center"
          width="600"
          height="402"
          src="https://www.youtube.com/embed/${videoId}${autoplay}"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture${
            editor ? "" : "; autoplay"
          }"
          allowfullscreen
          ></iframe>`;
};

export const convertYoutubeUrlToIframe = (url, editor = false) => {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return "";
  }

  return constructYoutubeIframe(videoId, editor);
};

export const getYoutubeThumbnail = async (videoId, quality = "high") => {
  // Check the tgi_custom.youtube_thumbnail_proxy route for the controller of this proxy
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/wp-json/marameodesign/youtube/proxy/thumbnail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        videoId: videoId,
        quality: quality,
      }),
    }
  );

  const json = await response.json();
  if (!json.success) {
    console.error(
      json?.message ??
        `[ERROR] Compose Iframe: error with composing the iframe element of the provided YouTube URL with video id ${videoId}`
    );
    return "";
  }

  return json.thumbnail_url;
};

export const getYoutubeVideoThumbnail = async (url, quality) => {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) {
    return "";
  }
  return await getYoutubeThumbnail(videoId, quality);
};
