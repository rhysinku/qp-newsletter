export default function addAttributes(attrObject) {
  attrObject.add({
    isInnerBlock: {
      type: "boolean",
      default: false,
    },
  });
}
