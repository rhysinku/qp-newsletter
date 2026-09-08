export const handleVideoSelection = (setAttributes, video, attributes) => {
  const { id, width, height, url, thumb, mime } = video;

  setAttributes({
    videoId: id,
    videoWidth: width,
    videoHeight: height,
    videoThumbnail: thumb,
    videoUri: url,
    videoMime: mime,
  });
};

export const handleVideoRemoval = setAttributes => {
  setAttributes({
    videoId: null,
    videoUri: null,
    videoWidth: null,
    videoHeight: null,
    videoMime: null,
  });
};
