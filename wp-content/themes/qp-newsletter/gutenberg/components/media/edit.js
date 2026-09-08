import { Image, Video, VimeoEmbed, YouTubeEmbed } from "../";

export default function Edit(props) {
  const {
    attributes,
    className,
    wrapperClassName,
    ratioWrapperClassName,
    captionClassName,
    placeholder = "800x600",
    allowCaption = true,
    allowDescription = true,
  } = props;

  const { mediaType } = attributes;

  // Return the correct Edit component
  switch (mediaType) {
    case "image":
      return (
        <Image.Edit
          {...props}
          className={className}
          wrapperClassName={wrapperClassName}
          ratioWrapperClassName={ratioWrapperClassName}
          captionClassName={captionClassName}
          placeholder={placeholder}
          allowCaption={allowCaption}
          allowDescription={allowDescription}
        />
      );
    case "video-local":
      return (
        <Video.Edit
          {...props}
          className={className}
          wrapperClassName={wrapperClassName}
        />
      );
    case "video-youtube":
      return <YouTubeEmbed.Edit {...props} wrapperClassName={wrapperClassName} />;
    case "video-vimeo":
      return <VimeoEmbed.Edit {...props} wrapperClassName={wrapperClassName} />;
    default:
      return null;
  }
}
