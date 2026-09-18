import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

export default function Inspector(props) {

  const { attributes, setAttributes } = props;
  const { closeInactiveItems } = attributes;
  return (
    <InspectorControls>
      <PanelBody>
        <ToggleControl
          __nextHasNoMarginBottom
          label="Close inactive items"
          help="Enabling this will ensure that only the active items is expanded."
          checked={closeInactiveItems}
          onChange={() =>
            setAttributes({ closeInactiveItems: !closeInactiveItems })
          }
        />
      </PanelBody>
    </InspectorControls>
  );
}
