import { InspectorControls } from "@wordpress/block-editor";
import { Media } from "@marameodesign/components";
import { PanelBody } from "@wordpress/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody>
        <Media.InspectorControl
          {...props}
          mediaOptions={{ image: false }}
          optionTitle="Video Type"
        />
      </PanelBody>
    </InspectorControls>
  );
}
