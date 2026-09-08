/**
 * This custom hook ensures that attribute changes of the Image component will refresh the image and update the
 * rendered image in real-time
 */

import { useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

import { setSuffixedAttributes } from "@marameodesign/utils";
import { checkImageIsResponsive } from "./functions";

export function useImageAttributesSync({
  imageUri,
  placeholder = "800x600",
  useFeaturedImage,
  imageRis,
  setAttributes,
  suffix = "",
}) {
  const [placeholderDimensions, setPlaceholderDimensions] = useState({});

  // Get featured image from post if enabled
  const featuredImage = useSelect(
    select => {
      if (!useFeaturedImage) return null;
      const id = select("core/editor").getEditedPostAttribute("featured_media");
      return id ? select("core").getMedia(id) : null;
    },
    [useFeaturedImage]
  );

  // Parse placeholder
  useEffect(() => {
    if (!imageUri && placeholder) {
      const [width, height] = placeholder.split("x").map(Number);
      setPlaceholderDimensions({
        width: width || null,
        height: height || null,
      });
    }
  }, [imageUri, placeholder]);

  // Sync featured image into attributes
  useEffect(() => {
    if (!useFeaturedImage || !featuredImage) {
      return;
    }

    setSuffixedAttributes(setAttributes, {
      imageId: featuredImage?.id,
      imageUri: featuredImage?.source_url,
      imageAlt: featuredImage?.alt_text,
      imageWidth: featuredImage?.width,
      imageHeight: featuredImage?.height,
      imageSrcSet: !checkImageIsResponsive(featuredImage?.mime_type)
        ? null
        : featuredImage?.ris[imageRis]?.srcset ?? null,
      imageSizes: !checkImageIsResponsive(featuredImage?.mime_type)
        ? null
        : featuredImage?.ris[imageRis]?.sizes ?? null,
    }, suffix);
  }, [featuredImage, useFeaturedImage, imageRis, setAttributes]);

  return {
    placeholderDimensions,
    featuredImage,
  };
}
