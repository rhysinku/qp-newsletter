export default function addAttributes(attrObject) {
  attrObject.add({
    isVisible: {
      type: "boolean",
      default: true,
    },
  });
}
