import { Image, Video, VimeoEmbed, YouTubeEmbed } from "../";

export default function addAttributes(attrObject) {
  Image.addAttributes(attrObject);
  Video.addAttributes(attrObject);
  YouTubeEmbed.addAttributes(attrObject);
  VimeoEmbed.addAttributes(attrObject);

  attrObject.add({
    mediaType: {
      enum: ["image", "video-local", "video-youtube", "video-vimeo"],
      default: "image",
    },
  });
}
