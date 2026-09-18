import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { Image } from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody>
        <Image.InspectorControl
          {...props}
          customOptions={{
            allowDescription: true,
            allowFeaturedImage: true,
            allowFit: true,
          }}
        />
      </PanelBody>
    </InspectorControls>
  );
}
