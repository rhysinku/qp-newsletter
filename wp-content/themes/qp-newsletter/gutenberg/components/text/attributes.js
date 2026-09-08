export default function addAttributes(attrObject, suffix = "") {
  attrObject.add({
    [`text${suffix}`]: {
      type: "string",
      default: "",
    },
    [`usePostExcerpt${suffix}`]: {
      type: "boolean",
      default: false,
    },
  });
}
