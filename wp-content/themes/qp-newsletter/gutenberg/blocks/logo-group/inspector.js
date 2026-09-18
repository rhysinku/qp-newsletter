import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

import { GridColumns } from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody>
        <GridColumns.InspectorControl
          {...props}
          choices={["4 Columns", "5 Columns", "6 Columns"]}
        />
      </PanelBody>
    </InspectorControls>
  );
}
