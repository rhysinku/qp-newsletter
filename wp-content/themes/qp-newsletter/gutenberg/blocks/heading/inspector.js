import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { Heading } from "@marameodesign/components";

const Inspector = props => {
  const { showButton } = props.attributes;
  const { setAttributes } = props;

  return (
    <>
      <Heading.ToolbarControl {...props} />

      <InspectorControls>
        <PanelBody title="Heading Settings" initialOpen={true}>
          <Heading.InspectorControl
            {...props}
            customOptions={{
              allowPostTitle: false,
              variants: true,
            }}
          />

          <ToggleControl
            label="Show Button"
            checked={showButton}
            onChange={value => setAttributes({ showButton: value })}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
};

export default Inspector;
