import { PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

import {
  GridColumns,
} from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody title="Grid Settings">
        <GridColumns.InspectorControl {...props}
        choices={["3 Columns", "4 Columns", "5 Columns", "6 Columns"]}
        enableCenterGridItems={true}
        __hasSpacingBottom />
      </PanelBody>
    </InspectorControls>
  );
}
