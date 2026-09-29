import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { GridColumns } from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody title="Layout" initialOpen={true}>
        <GridColumns.InspectorControl
          {...props}
          choices={["2 Columns", "3 Columns", "4 Columns"]}
        />
      </PanelBody>
    </InspectorControls>
  );
}
