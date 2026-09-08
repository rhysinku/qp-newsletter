export default function get(props, suffix = "", attributeName = "") {
  if (attributeName) {
    return props.attributes[attributeName + suffix];
  } else {
    return {
      imageId: props.attributes[`imageId${suffix}`],
      imageUri: props.attributes[`imageUri${suffix}`],
      imageAlt: props.attributes[`imageAlt${suffix}`],
      imageWidth: props.attributes[`imageWidth${suffix}`],
      imageHeight: props.attributes[`imageHeight${suffix}`],
      useFeaturedImage: props.attributes[`useFeaturedImage${suffix}`],
      imageRis: props.attributes[`imageRis${suffix}`],
      imageSrcSet: props.attributes[`imageSrcSet${suffix}`],
      imageSizes: props.attributes[`imageSizes${suffix}`],
      imageMimeType: props.attributes[`imageMimeType${suffix}`],
      imageIsResponsive: props.attributes[`imageIsResponsive${suffix}`],
      imageCaption: props.attributes[`imageCaption${suffix}`],
      imageFit: props.attributes[`imageFit${suffix}`],
      imageLoading: props.attributes[`imageLoading${suffix}`],
      imageDescription: props.attributes[`imageDescription${suffix}`],
      containedHeight: props.attributes[`containedHeight${suffix}`],
    };
  }
}
