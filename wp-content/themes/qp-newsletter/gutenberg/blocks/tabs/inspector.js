import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { BackgroundColor, BlockID } from "@marameodesign/components";

const ALLOWED_BG_COLORS = [
  // { key: "bg-primary-blue", label: "Blue" },
  { key: "bg-primary-jet-blue", label: "Jet Blue" },
  // { key: "bg-primary-light-blue", label: "Light Blue" },
  { key: "bg-primary-faint-blue", label: "Faint Blue" },
  // { key: "bg-secondary-aths-special", label: "Aths Special" },
  // { key: "bg-accent-super-light-blue", label: "Super Light Blue" },
  { key: "bg-accent-soft-cream", label: "Soft Cream" },
  // { key: "bg-neutral-light-grey", label: "Light Gray" },
  // { key: "bg-system-white", label: "White" },
  { key: "bg-secondary-dark-red", label: "Dark Red" },
];

export default function Inspector(props) {
  return (
    <InspectorControls>
      <PanelBody title="Block Settings" initialOpen={true}>
        <BlockID.InspectorControl {...props} />

        <BackgroundColor.InspectorControl
          {...props}
          allowedColors={ALLOWED_BG_COLORS}
        />
      </PanelBody>
    </InspectorControls>
  );
}
