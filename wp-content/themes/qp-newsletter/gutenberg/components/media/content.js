import { YouTubeEmbed, Image, Video, VimeoEmbed } from "../";

export default function Content(props) {
  const {
    attributes,
    className,
    wrapperClassName,
    ratioWrapperClassName,
    captionClassName,
  } = props;
  const { mediaType } = attributes;

  // Return the correct component
  switch (mediaType) {
    case "image":
      return (
        <Image.Content
          {...props}
          className={className}
          captionClassName={captionClassName}
          wrapperClassName={wrapperClassName}
          ratioWrapperClassName={ratioWrapperClassName}
        />
      );
    case "video-local":
      return (
        <Video.Content
          {...props}
          className={className}
          wrapperClassName={wrapperClassName}
        />
      );
    case "video-youtube":
      return (
        <YouTubeEmbed.Content {...props} wrapperClassName={wrapperClassName} />
      );
    case "video-vimeo":
      return (
        <VimeoEmbed.Content {...props} wrapperClassName={wrapperClassName} />
      );
    default:
      return null;
  }
}
