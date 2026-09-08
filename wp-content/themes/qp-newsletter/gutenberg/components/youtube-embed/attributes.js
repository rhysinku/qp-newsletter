export default function addAttributes(attrObject) {
  attrObject.add({
    youtubeUrl: {
      type: "string",
      default: "",
    },
    youtubeThumbnail: {
      type: "string",
      default: "",
    },
  });
}
