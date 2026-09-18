import { PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

import { Button } from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody>
        <Button.InspectorControl {...props} />
      </PanelBody>
    </InspectorControls>
  )
}