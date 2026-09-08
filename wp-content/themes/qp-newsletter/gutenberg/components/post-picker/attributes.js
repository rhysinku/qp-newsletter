export default function addAttributes(attrObject) {
  attrObject.add({
    posts: {
      type: "array",
      default: [],
    }
  });
}
