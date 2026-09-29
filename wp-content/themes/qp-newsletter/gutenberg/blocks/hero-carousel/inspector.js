import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { BackgroundColor } from "@marameodesign/components";

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody title="Background" initialOpen={true}>
        <BackgroundColor.InspectorControl {...props} __hasSpacingBottom />
      </PanelBody>

      <PanelBody title="Carousel Information" initialOpen={true}>
        <p className="components-base-control__help">
          Use the canvas below to add, edit, and organize individual carousel slides.
          Each slide includes its own background image, title, pre-title, and buttons.
        </p>
      </PanelBody>
    </InspectorControls>
  );
}
