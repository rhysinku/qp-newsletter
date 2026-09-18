import { PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

import { BackgroundColor, GridColumns } from "@marameodesign/components";

export default function Inspector(props) {
  const {
    bgChoices,
    customOptions: { enableGridColumns, gridColumnsChoices },
  } = props.attributes;

  return (
    <InspectorControls>
      {enableGridColumns && (
        <PanelBody title="Columns Distribution">
          <GridColumns.InspectorControl
            {...props}
            choices={gridColumnsChoices}
            __hasSpacingBottom
          />
        </PanelBody>
      )}

      <PanelBody title="Background">
        <BackgroundColor.InspectorControl
          {...props}
          allowedColors={bgChoices}
          __hasSpacingBottom
        />
      </PanelBody>
    </InspectorControls>
  );
}
