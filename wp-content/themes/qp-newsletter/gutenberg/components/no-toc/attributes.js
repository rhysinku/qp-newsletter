export default function addAttributes(attrObject) {
  attrObject.add({
    excludeFromToc: {
      type: "boolean",
      default: false,
    },
  });
}
