import {
  ToolbarGroup, // Replaced deprecated ButtonGroup
  ToolbarButton, // Added for proper toolbar structure
  Dashicon,
  PanelRow,
} from "@wordpress/components";

import {
  Image,
  YouTubeEmbed,
  Video,
  VimeoEmbed,
} from "@marameodesign/components";
import { getSpriteUri } from "@marameodesign/utils";

const mediaOptionsDefault = {
  image: true,
  "video-local": true,
  "video-youtube": true,
  "video-vimeo": true,
};

export default function InspectorControl(props) {
  const { attributes, mediaOptions = {}, customOptions = {} } = props;
  const { mediaType } = attributes;

  /**
   * Finalize the enabled media type options
   * This gives the capability to limit which media types a block can support
   * As for example, there are blocks that don't work very well with Vimeo
   * and YouTube media types.
   */
  const finalMediaOptions = {
    ...mediaOptionsDefault,
    ...mediaOptions,
  };
  const mediaTypeOptions = [
    { key: "image", label: "Image", image: "format-image" },
    {
      key: "video-local",
      label: "Video (local)",
      image: "video-alt2",
    },
    {
      key: "video-youtube",
      label: "Video (YouTube)",
      image: "youtube",
    },
    { key: "video-vimeo", label: "Video (Vimeo)", image: "vimeo" },
  ].filter(option => {
    return finalMediaOptions[option.key] === true;
  });

  return (
    <>
      <PanelRow>
        <MediaTabs {...props} choices={mediaTypeOptions} />
      </PanelRow>
      <br />
      {mediaType === "image" && (
        <Image.InspectorControl {...props} customOptions={customOptions} />
      )}
      {mediaType === "video-local" && (
        <Video.InspectorControl {...props} customOptions={customOptions} />
      )}
      {mediaType === "video-youtube" && (
        <YouTubeEmbed.InspectorControl
          {...props}
          customOptions={customOptions}
        />
      )}
      {mediaType === "video-vimeo" && (
        <VimeoEmbed.InspectorControl {...props} customOptions={customOptions} />
      )}
    </>
  );
}

/**
 * Media Tabs sub-component
 */
const MediaTabs = props => {
  const { choices, mediaType, setAttributes } = props;

  return (
    <ToolbarGroup>
      {choices.map(option => (
        <ToolbarButton
          key={option.key}
          isPressed={mediaType === option.key} // Changed from isPrimary to isPressed
          onClick={() => setAttributes({ mediaType: option.key })}
          title={option.label}
          icon={
            option.key === "video-vimeo" ? (
              <svg width={16} height={16}>
                <use href={getSpriteUri("vimeo")}></use>
              </svg>
            ) : (
              <Dashicon icon={option.image} />
            )
          }
        />
      ))}
    </ToolbarGroup>
  );
};
