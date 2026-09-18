import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import {
  BackgroundColor,
  GridColumns,
  Media,
  Heading,
  ContentPosition
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
  const { columns } = GridColumns.get(props);

  return (
    <>
      <Heading.ToolbarControl {...props} />

      <InspectorControls>
        <PanelBody>
          <BackgroundColor.InspectorControl
            {...props}
            allowedColors={ALLOWED_BG_COLORS}
          />
        </PanelBody>

        <PanelBody title="Columns Layout">
          <GridColumns.InspectorControl
            {...props}
            choices={["1 Column", "2 Columns", "30-70 Columns", "70-30 Columns"]}
          />
        </PanelBody>

        <PanelBody title="Heading">
          <Heading.InspectorControl
            {...props}
            customOptions={{
              enableHeadingLevel: true,
              enableHeadingIcon: false,
              allowPostTitle: false,
              allowPreHeading: true,
            }}
            customHeadingLevelChoices={[
              { label: "Heading 2", value: 2 },
              { label: "Heading 3", value: 3 },
            ]}
          />
        </PanelBody>

        <PanelBody title="Media Settings">
          <Media.InspectorControl
            {...props}
            customOptions={{
              allowFit: true,
              useFeaturedImage: false,              
            }}
          />
        </PanelBody>

        {columns !== "lg:cols-1" && <ContentPosition.ToolbarControl {...props} />}
      </InspectorControls>
    </>
  );
}
