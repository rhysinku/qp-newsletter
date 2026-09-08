export default function addAttributes(attrObject) {
  attrObject.add({
    videoId: {
      type: "number",
    },
    videoUri: {
      type: "string",
      default: "",
    },
    videoWidth: {
      type: "number",
    },
    videoHeight: {
      type: "number",
    },
    videoMime: {
      type: "string",
      default: "video/mp4",
    },
  });
}
