export default function addAttributes(attrObject) {
  attrObject.add({
    columns: {
      type: "string",
      default: "lg:cols-2",
    },
    centerGridItems: {
      type: "boolean",
      default: false
    },
  });
}
