import { BlockControls, JustifyContentControl } from "@wordpress/block-editor";

export default function BlockControl(props) {
  const { attributes, setAttributes } = props;
  const { horizontalAlignment } = attributes;

  return (
    <BlockControls group="block">
      <JustifyContentControl
        value={horizontalAlignment}
        onChange={newVal => setAttributes({ horizontalAlignment: newVal })}
      />
    </BlockControls>
  );
}
