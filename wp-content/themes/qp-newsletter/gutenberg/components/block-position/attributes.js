export default function addAttributes(attrObject) {
  attrObject.add({
    blockPosition: {
      type: "string",
      default: "standard",
    },
  });
}
