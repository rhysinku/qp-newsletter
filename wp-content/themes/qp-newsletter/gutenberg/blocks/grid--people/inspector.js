import { PanelBody, ToggleControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { PostPicker } from "@marameodesign/components";

import { GridColumns, DisplayMode } from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody title="Layout Settings">
        <GridColumns.InspectorControl
          {...props}
          choices={["3 Columns", "4 Columns"]}
          enableCenterGridItems={true}
          __hasSpacingBottom
        />
      </PanelBody>

      <PanelBody title="Item Settings">
        <DisplayMode.InspectorControl
          {...props}
          choices={[
            { label: "Stacked", value: "stacked" },
            { label: "Inline", value: "inline" },
          ]}
          __hasSpacingBottom
        />
        
        <div className="mmd-editor-label">Show Popup on Click</div>
        <ToggleControl
          label="Show Popup on Click"
          checked={props.attributes.showPopup}
          onChange={(value) => props.setAttributes({ showPopup: value })}
        />

        <div className="mmd-editor-label">Select People</div>
        <PostPicker.InspectorControl
          {...props}
          contentTypeChoices={[
            "expert-profile",
          ]}
          maxContentItems={20}
        />
      </PanelBody>
    </InspectorControls>
  );
}
