export default function addAttributes(attrObject,suffix = "") {
  attrObject.add({
    [`imageId${suffix}`]: {
      type: "number",
    },
    [`imageUri${suffix}`]: {
      type: "string",
      default: "",
    },
    [`imageAlt${suffix}`]: {
      type: "string",
    },
    [`imageWidth${suffix}`]: {
      type: "number",
    },
    [`imageHeight${suffix}`]: {
      type: "number",
    },
    [`useFeaturedImage${suffix}`]: {
      type: "boolean",
      default: false,
    },
    [`imageRis${suffix}`]: {
      type: "string",
      default: "default",
    },
    [`imageSrcSet${suffix}`]: {
      type: "string",
    },
    [`imageSizes${suffix}`]: {
      type: "string",
    },
    [`imageMimeType${suffix}`]: {
      type: "string",
    },
    [`imageIsResponsive${suffix}`]: {
      type: "boolean",
      default: true,
    },
    [`imageCaption${suffix}`]: {
      type: "string",
      default: "",
    },
    [`imageFit${suffix}`]: {
      enum: ["cover", "contain"],
      default: "cover",
    },
    [`containedHeight${suffix}`]: {
      type: "boolean",
      default: false,
    },
    [`imageLoading${suffix}`]: {
      enum: ["eager", "lazy"],
      default: "lazy",
    },
    [`imageDescription${suffix}`]: {
      type: "string",
      default: "",
    },
  });
}
