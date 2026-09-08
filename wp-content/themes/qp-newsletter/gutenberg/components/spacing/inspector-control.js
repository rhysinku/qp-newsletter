import { SelectControl } from "@wordpress/components";

export default function InspectorControl(props) {
  const { attributes, setAttributes } = props;
  const { spacingAmount } = attributes;

  return (
    <SelectControl
      label="Spacing"
      value={spacingAmount}
      options={[
        { label: "Extra Small", value: "extra-small" },
        { label: "Small", value: "small" },
        { label: "Normal", value: "normal" },
        { label: "Large", value: "large" },
        { label: "Extra Large", value: "extra-large" },
      ]}
      onChange={newValue => setAttributes({ spacingAmount: newValue })}
      __next40pxDefaultSize
      __nextHasNoMarginBottom
    />
  );
}
