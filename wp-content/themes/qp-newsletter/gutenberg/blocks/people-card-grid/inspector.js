import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { columns = 2 } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Grid Columns" initialOpen={true}>
        <RangeControl
          label="Desktop Columns"
          help="Choose how many columns this grid displays (min: 2, max: 4, default: 2)."
          value={columns}
          onChange={val => setAttributes({ columns: val })}
          min={2}
          max={4}
          step={1}
        />
      </PanelBody>
    </InspectorControls>
  );
}
