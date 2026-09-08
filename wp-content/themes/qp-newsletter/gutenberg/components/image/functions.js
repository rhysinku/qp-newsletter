import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

// Check if image mime type is not responsive
export const checkImageIsResponsive = mimeType => {
  return !["image/gif", "image/svg"].includes(mimeType);
};

export const handleImageSelection = (props, image) => {
  const { suffix, setAttributes } = props;

  if (!image || typeof image !== "object") {
    return;
  }

  const {
    imageRis,
    imageIsResponsive,
    imageFit,
  } = get(props, suffix);

  const isResponsive = imageIsResponsive && imageFit !== "contain";
  const isResponsiveAvailable = checkImageIsResponsive(
    image.mime || image.mime_type
  );
  const ris = image.ris || {};
  const selectedRis = imageRis || "";

  const hasMediaDetails =
    image.media_details && typeof image.media_details === "object";

  const responsiveData =
    isResponsive && isResponsiveAvailable
      ? {
        imageWidth: hasMediaDetails ? image.media_details.width : image.width,
        imageHeight: hasMediaDetails
          ? image.media_details.height
          : image.height,
        imageSrcSet: ris[selectedRis]?.srcset || null,
        imageSizes: ris[selectedRis]?.sizes || null,
      }
      : {
        imageSrcSet: null,
        imageSizes: null,
      };

  const commonData = {
    imageId: image.id,
    imageAlt: image.alt || image.alt_text || "",
    imageMimeType: image.mime || image.mime_type || "",
    imageFit,
    ...responsiveData,
  };

  // Handle normal WP image response
  if ("url" in image) {
    setSuffixedAttributes(setAttributes, {
      ...commonData,
      imageUri: image.url,
    }, suffix);
    return;
  }

  // Handle REST API fallback or custom structure
  if ("source_url" in image) {
    setSuffixedAttributes(setAttributes, {
      ...commonData,
      imageUri: image.source_url,
    }, suffix);
  }
};

export const handleImageRemoval = (setAttributes, suffix = "") => {
  setSuffixedAttributes(
    setAttributes,
    {
      imageId: null,
      imageUri: null,
      imageSrcSet: null,
      imageSizes: null,
      imageMimeType: null,
      imageWidth: null,
      imageHeight: null,
    },
    suffix
  );
};
