import { RichText } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import get from "./get";

export default function Content(props) {
  const {
    className = "",
    wrapperClassName = "",
    ratioWrapperClassName = "",
    captionClassName = "",
    descriptionClassName = "",
    decorSVG = <></>,
    isContainedHeight = false,
    suffix = "",
  } = props;
  const {
    imageId,
    imageUri,
    imageAlt,
    imageWidth,
    imageHeight,
    imageSizes,
    imageSrcSet,
    imageIsResponsive,
    imageCaption,
    imageLoading,
    imageDescription,
  } = get(props, suffix);

  /**
   * Return nothing if no image URI
   */
  if (!imageUri) {
    return null;
  }

  return (
    <figure className={wrapperClassName}>
      <div
        className={twMerge(
          ratioWrapperClassName,
          isContainedHeight && "ratio-none"
        )}
      >
        <img
          src={imageUri}
          alt={imageAlt || ""}
          className={twMerge(
            className,
            (!imageIsResponsive || isContainedHeight) && "object-contain"
          )}
          width={imageWidth || null}
          height={imageHeight || null}
          loading={imageLoading}
          decoding="async"
          srcSet={imageSrcSet || null}
          sizes={imageSizes || null}
          data-image-id={imageId}
          {...(isContainedHeight && { style: { maxHeight: "34.188rem" } })}
        />
      </div>
      {imageDescription && (
        <RichText.Content
          tagName="p"
          className={twMerge(
            "mmd-figure-description relative isolate p-4 text-base md:text-lg leading-6",
            descriptionClassName
          )}
          value={imageDescription}
        />
      )}
      {imageCaption && (
        <RichText.Content
          tagName="figcaption"
          value={imageCaption}
          className={`mmd-figcaption ${captionClassName}`}
        />
      )}
      {decorSVG}
    </figure>
  );
}
