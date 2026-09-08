import { TextControl } from "@wordpress/components";

export default function InspectorControl(props) {
  const { attributes, setAttributes } = props;
  const { vimeoUrl } = attributes;

  return (
    <TextControl
      __nextHasNoMarginBottom
      label="Vimeo URL"
      value={vimeoUrl}
      onChange={newVal => setAttributes({ vimeoUrl: newVal })}
    />
  );
}
