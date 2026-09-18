import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import { Heading, Image } from "@marameodesign/components";

export default function Inspector(props) {
  const { imageId } = Image.get(props);
  const {
    showImageAsBackground,
    showBreadcrumbs,
    showBgDecor,
    showImageBgDecor,
  } = props.attributes;
  const { setAttributes } = props;

  return (
    <InspectorControls>
      <PanelBody title="Block Settings">
        <Heading.InspectorControl {...props} />

        <Image.InspectorControl
          {...props}
          customOptions={{
            allowCaption: true,
            allowFit: true,
          }}
        />

        {imageId && (
          <ToggleControl
            label="Show Image as Background"
            checked={showImageAsBackground}
            onChange={value => setAttributes({ showImageAsBackground: value })}
          />
        )}

        {(!imageId || showImageAsBackground) && (
          <ToggleControl
            label="Show Background Decor"
            checked={showBgDecor}
            onChange={value => setAttributes({ showBgDecor: value })}
          />
        )}

        {showImageAsBackground && imageId && (
          <ToggleControl
            label="Show Image Decor"
            checked={showImageBgDecor}
            onChange={value => setAttributes({ showImageBgDecor: value })}
          />
        )}

        <ToggleControl
          label="Show Breadcrumbs"
          checked={showBreadcrumbs}
          onChange={value => setAttributes({ showBreadcrumbs: value })}
        />
      </PanelBody>
    </InspectorControls>
  );
}
