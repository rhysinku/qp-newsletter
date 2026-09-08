export default function addAttributes(attrObject) {
  attrObject.add({
    contentAlignment: {
      type: "string",
      default: "mod--content-align--left",
    },
  });
}
