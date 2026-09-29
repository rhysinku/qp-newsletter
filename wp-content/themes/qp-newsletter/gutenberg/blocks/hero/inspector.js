import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { Heading, Image, BackgroundColor } from "@marameodesign/components";

export default function Inspector(props) {
  const { setAttributes, attributes } = props;
  const {
    heroType = "featured",
    showBackToParent = false,
    showBreadcrumbs = false,
    showBgDecor = false,
  } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Hero Type & Layout" initialOpen={true}>
        <SelectControl
          label="Hero Type"
          help="Select whether this is a Featured Hero or Simple Hero."
          value={heroType}
          options={[
            { label: "Featured Hero", value: "featured" },
            { label: "Simple Hero", value: "simple" },
          ]}
          onChange={val => setAttributes({ heroType: val })}
        />
      </PanelBody>

      <PanelBody title="Background" initialOpen={true}>
        <BackgroundColor.InspectorControl {...props} __hasSpacingBottom />
      </PanelBody>

      {heroType === "featured" && (
        <PanelBody title="Featured Hero Settings" initialOpen={true}>
          <Heading.InspectorControl
            {...props}
            customOptions={{
              allowPreHeading: true,
              allowPostTitle: true,
            }}
          />

          <Image.InspectorControl
            {...props}
            customOptions={{
              allowCaption: false,
              allowFit: true,
            }}
          />
        </PanelBody>
      )}

      {heroType === "simple" && (
        <PanelBody title="Simple Hero Settings" initialOpen={true}>
          <Heading.InspectorControl
            {...props}
            customOptions={{
              allowPreHeading: false,
              allowPostTitle: true,
            }}
          />

          <ToggleControl
            label="Show 'Back to Parent' button"
            help="Renders a return link to the parent page or hub."
            checked={showBackToParent}
            onChange={value => setAttributes({ showBackToParent: value })}
          />
        </PanelBody>
      )}

      <PanelBody title="Display Options" initialOpen={false}>
        <ToggleControl
          label="Show Background Decoration"
          help="Displays subtle background graphic accents."
          checked={showBgDecor}
          onChange={value => setAttributes({ showBgDecor: value })}
        />

        <ToggleControl
          label="Show Breadcrumbs"
          checked={showBreadcrumbs}
          onChange={value => setAttributes({ showBreadcrumbs: value })}
        />
      </PanelBody>
    </InspectorControls>
  );
}
