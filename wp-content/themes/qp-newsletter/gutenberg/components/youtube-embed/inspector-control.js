import { TextControl } from "@wordpress/components";

export default function InspectorControl(props) {
  const { attributes, setAttributes } = props;
  const { youtubeUrl } = attributes;

  return (
    <TextControl
      __nextHasNoMarginBottom
      label="YouTube URL"
      value={youtubeUrl}
      onChange={newVal => setAttributes({ youtubeUrl: newVal })}
    />
  );
}
