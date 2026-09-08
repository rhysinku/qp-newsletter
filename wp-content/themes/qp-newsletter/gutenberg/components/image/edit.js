import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { MediaUpload, RichText } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import { handleImageSelection } from "./functions";
import { useImageAttributesSync } from "./use-image-attributes-sync";
import get from "./get";
import { setSuffixedAttributes } from "@marameodesign/utils";

export default function Edit(props) {
  const {
    setAttributes,
    placeholder = "800x600",
    className = "",
    descriptionClassName = "",
    isClickable = true,
    suffix = "",
  } = props;
  const {
    imageId,
    imageUri,
    useFeaturedImage,
    imageIsResponsive,
    imageRis,
    imageFit,
  } = get(props, suffix);

  /**
   * Handle image data refresh
   */
  const { image, isResolving } = useSelect(
    select => {
      const core = select("core");
      const imageData = imageId ? core.getMedia(imageId) : null;
      const resolving = imageId
        ? core.isResolving("getMedia", [imageId])
        : false;
      return {
        image: imageData,
        isResolving: resolving,
      };
    },
    [imageId]
  );

  useEffect(() => {
    if (image && !isResolving) {
      handleImageSelection(props, image);
    }
  }, [image, isResolving, imageIsResponsive, imageRis, imageFit]);

  /**
   * Handle useFeaturedImage
   */
  const { placeholderDimensions } = useImageAttributesSync({
    imageUri,
    useFeaturedImage,
    imageRis,
    setAttributes,
    placeholder,
  });

  /**
   * Classes
   */
  const imageClassName = twMerge(
    imageIsResponsive &&
      "absolute inset-0 size-full object-cover object-center",
    !useFeaturedImage ? "mmd-image-component" : "",
    className
  );

  return (
    <MediaUpload
      onSelect={image => handleImageSelection(props, image)}
      allowedTypes={["image"]}
      value={imageId}
      render={({ open }) => (
        <ImageElement
          {...props}
          className={imageClassName}
          open={isClickable ? open : null}
          descriptionClassName={descriptionClassName}
          placeholder={placeholder}
        />
      )}
    />
  );
}

/**
 * Image element
 */
const ImageElement = props => {
  const {
    className,
    wrapperClassName,
    ratioWrapperClassName,
    captionClassName,
    descriptionClassName,
    placeholderDimensions,
    placeholder,
    open,
    decorSVG,
    allowCaption = true,
    allowDescription = false,
    setAttributes,
    isContainedHeight: isContainedHeightProp = false,
    suffix = "",
  } = props;

  const {
    imageUri,
    imageId,
    imageAlt,
    imageWidth,
    imageHeight,
    imageSrcSet,
    imageSizes,
    useFeaturedImage,
    imageIsResponsive,
    imageCaption,
    imageDescription,
    containedHeight,
  } = get(props, suffix);

  // The static prop (if a block passes one) OR the per-block toggle attribute.
  const isContainedHeight = isContainedHeightProp || !!containedHeight;

  const hasImage = !!imageUri;
  const imgProps = {
    className: twMerge(
      className,
      (!imageIsResponsive || isContainedHeight) && "object-contain"
    ),
    src: hasImage
      ? imageUri
      : `https://placehold.co/${placeholder}/2b2c2e/adadad`,
    alt: hasImage ? imageAlt : "Placeholder",
    width: hasImage ? imageWidth || null : placeholderDimensions?.width || null,
    height: hasImage
      ? imageHeight || null
      : placeholderDimensions?.height || null,
    loading: "lazy",
    decoding: "async",
    onClick: !useFeaturedImage ? open : null,
    ...(hasImage && imageIsResponsive
      ? {
          srcSet: imageSrcSet || null,
          sizes: imageSizes || null,
        }
      : {}),
    ...(hasImage ? { id: imageId } : {}),
    style: {
      pointerEvents: "auto",
      maxHeight: isContainedHeight ? "34.188rem" : null,
    },
  };

  const ImgElement = <img {...imgProps} />;

  return (
    <figure className={wrapperClassName}>
      <div
        className={twMerge(
          ratioWrapperClassName,
          isContainedHeight && "ratio-none"
        )}
        style={{
          pointerEvents: "none",
        }}
      >
        {ImgElement}
      </div>
      {allowDescription && (
        <RichText
          tagName="p"
          className={twMerge(
            "mmd-figure-description relative isolate p-4 text-base md:text-lg leading-6",
            descriptionClassName
          )}
          value={imageDescription}
          onChange={val =>
            setSuffixedAttributes(
              setAttributes,
              { imageDescription: val },
              suffix
            )
          }
          placeholder="Description"
          style={{
            marginBlock: "0 .75rem",
          }}
        />
      )}
      {allowCaption && (
        <RichText
          tagName="figcaption"
          value={imageCaption}
          className={`mmd-figcaption ${captionClassName}`}
          onChange={val =>
            setSuffixedAttributes(setAttributes, { imageCaption: val }, suffix)
          }
          placeholder="Caption"
        />
      )}
      {decorSVG}
    </figure>
  );
};
