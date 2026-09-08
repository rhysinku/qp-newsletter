import { SelectControl } from "@wordpress/components";

const BLOCK_POSITION_CHOICES = [
  { value: "mmd-block-position--standard", label: "Standard" },
  // { value: "mmd-block-position--top", label: "Before main content" },
  { value: "mmd-block-position--bottom", label: "Above the footer" },
];

export default function InspectorControl(props) {
  const { setAttributes } = props;
  const { blockPosition } = props.attributes;

  return (
    <SelectControl
      value={blockPosition}
      options={BLOCK_POSITION_CHOICES}
      onChange={newVal => setAttributes({ blockPosition: newVal })}
      __next40pxDefaultSize
      __nextHasNoMarginBottom
    />
  );
}
