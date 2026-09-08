export default function addAttributes(attrObject, suffix = "") {
  attrObject.add({
    [`icon${suffix}`]: {
      type: "string",
      default: "",
    },
    [`iconAlt${suffix}`]: {
      type: "string",
      default: "",
    },
  });
}
