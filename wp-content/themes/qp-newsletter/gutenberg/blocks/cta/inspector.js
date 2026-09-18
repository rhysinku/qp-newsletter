import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import {
  BackgroundColor,
  GridColumns,
  Image,
  Heading,
  ContentPosition,
} from "@marameodesign/components";

const ALLOWED_BG_COLORS = [
  { key: "bg-parent", label: "Inherit from parent" },
  // { key: "bg-primary-blue", label: "Blue" },
  // { key: "bg-primary-jet-blue", label: "Jet Blue" },
  // { key: "bg-primary-light-blue", label: "Light Blue" },
  { key: "bg-primary-faint-blue", label: "Faint Blue" },
  // { key: "bg-secondary-aths-special", label: "Aths Special" },
  // { key: "bg-accent-super-light-blue", label: "Super Light Blue" },
  { key: "bg-accent-soft-cream", label: "Soft Cream" },
  { key: "bg-neutral-light-grey", label: "Light Gray" },
  { key: "bg-system-white", label: "White" },
  // { key: "bg-secondary-dark-red", label: "Dark Red" },
];

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { variant } = attributes;

  return (
    <>
      <Heading.ToolbarControl {...props} />

      <InspectorControls>
        <PanelBody>
          <SelectControl
            label="Display Variant"
            value={variant}
            options={[
              { label: "Default", value: "mod--variant--default" },
              { label: "Simple", value: "mod--variant--simple" },
              { label: "Simple Centered", value: "mod--variant--simple-centered" },
            ]}
            onChange={newVariant => setAttributes({ variant: newVariant })}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />

          <BackgroundColor.InspectorControl
            {...props}
            allowedColors={ALLOWED_BG_COLORS}
          />

          {variant == "mod--variant--default" && (
            <GridColumns.InspectorControl
              {...props}
              choices={["70-30 Columns", "60-40 Columns"]}
            />
          )}
        </PanelBody>

        <PanelBody title="Heading">
          <Heading.InspectorControl
            {...props}
            customOptions={{
              enableHeadingLevel: true,
              allowPostTitle: false,
              allowPreHeading: true,
            }}
            customHeadingLevelChoices={[
              { label: "Heading 2", value: 2 },
              { label: "Heading 3", value: 3 },
            ]}
          />
        </PanelBody>

        {variant == "mod--variant--default" && <>
          <PanelBody title="Image Settings">
            <Image.InspectorControl {...props} />
          </PanelBody>
          <ContentPosition.ToolbarControl {...props} />
        </>}
      </InspectorControls>
    </>
  );
}
