import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { Heading, Image } from "@marameodesign/components";

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { showBreadcrumbs = true } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Slide Background Image" initialOpen={true}>
        <Image.InspectorControl
          {...props}
          customOptions={{
            allowCaption: false,
            allowFit: false,
          }}
        />
      </PanelBody>

      <PanelBody title="Slide Heading & Typography" initialOpen={true}>
        <Heading.InspectorControl
          {...props}
          customHeadingLevelOptions={[1, 2]}
          customOptions={{
            allowPreHeading: true,
            allowPostTitle: false,
          }}
        />
      </PanelBody>

      <PanelBody title="Slide Options" initialOpen={false}>
        <ToggleControl
          label="Show Breadcrumbs"
          help="Displays breadcrumb pathway at the top of the content card."
          checked={showBreadcrumbs}
          onChange={val => setAttributes({ showBreadcrumbs: val })}
        />
      </PanelBody>
    </InspectorControls>
  );
}
