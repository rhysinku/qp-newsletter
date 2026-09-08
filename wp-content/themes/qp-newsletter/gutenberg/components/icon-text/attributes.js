export default function addAttributes(attrObject, suffix = "") {
  attrObject.add({
    [`itText${suffix}`]: { // itText for icon-text Text
      type: "string",
      default: "",
    },
    [`itIcon${suffix}`]: { // itIcon for icon-text Icon
      type: "string",
      default: "",
    },
  });
}
