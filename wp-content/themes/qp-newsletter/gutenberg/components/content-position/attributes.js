export default function addAttributes(attrObject) {
  attrObject.add({
    contentPosition: {
      type: "string",
      default: "mod--variant--media-left",
    },
  });
}
