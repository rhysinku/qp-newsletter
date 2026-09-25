import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, Button as WpButton } from "@wordpress/components";
import {
  Heading,
  Image,
  Button,
} from "@marameodesign/components";

export default function Inspector(props) {
  const {
    attributes,
    setAttributes,
    parentClientId,
    parentColumns,
    selectParentGrid,
  } = props;
  const { hideImage } = attributes;

  return (
    <InspectorControls>
      {parentClientId && (
        <PanelBody title="Grid Parent" initialOpen={true}>
          <p className="text-xs text-neutral-600 mb-2">
            This card is inside a <strong>People Card Grid</strong> ({parentColumns} columns).
          </p>
          <WpButton
            variant="secondary"
            isSmall
            className="w-full justify-center"
            onClick={selectParentGrid}
          >
            Select Grid to change columns &rarr;
          </WpButton>
        </PanelBody>
      )}

      <PanelBody title="Card Display" initialOpen={true}>
        <ToggleControl
          label="Hide Avatar Image"
          help={
            hideImage
              ? "Avatar image is hidden (text-only variant)."
              : "Avatar image is displayed."
          }
          checked={hideImage}
          onChange={val => setAttributes({ hideImage: val })}
        />
      </PanelBody>

      <PanelBody title="Heading Settings" initialOpen={false}>
        <Heading.InspectorControl
          {...props}
          customOptions={{
            enableHeadingLevel: true,
            allowPostTitle: false,
            allowPreHeading: false,
            variants: false,
          }}
        />
      </PanelBody>

      {!hideImage && (
        <PanelBody title="Avatar Image" initialOpen={false}>
          <Image.InspectorControl {...props} />
        </PanelBody>
      )}

      <PanelBody title="Profile Link" initialOpen={false}>
        <Button.InspectorControl
          {...props}
          customOptions={[
            { label: "Arrow Link", value: "mod--variant--arrow" },
            { label: "Primary Button", value: "mod--variant--primary" },
            { label: "Secondary Button", value: "mod--variant--secondary" },
          ]}
        />
      </PanelBody>
    </InspectorControls>
  );
}
