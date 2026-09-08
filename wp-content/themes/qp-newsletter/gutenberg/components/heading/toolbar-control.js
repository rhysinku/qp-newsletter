import { BlockControls, AlignmentControl } from "@wordpress/block-editor";
import { ToolbarGroup, DropdownMenu } from "@wordpress/components";
import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

const DEFAULT_HEADING_LEVEL_OPTIONS = [
  { label: "H1", value: 1 },
  { label: "H2", value: 2 },
  { label: "H3", value: 3 },
  { label: "H4", value: 4 },
  { label: "H5", value: 5 },
  { label: "H6", value: 6 },
];

export default function ToolbarControl(props) {
  const { setAttributes, suffix = "", customHeadingLevelOptions = [], customHeadingLevelChoices = [] } = props;
  const { headingLevel, variant, headingAlignment } = get(props, suffix);

  // Use either customHeadingLevelOptions or customHeadingLevelChoices (for backward compatibility)
  const customOptions = customHeadingLevelOptions.length > 0 ? customHeadingLevelOptions : customHeadingLevelChoices;

  const headingLevelOptions = customOptions.length > 0
    ? customOptions
    : DEFAULT_HEADING_LEVEL_OPTIONS;

  // Get the current heading level text
  const currentHeadingText = headingLevelOptions.find(option => option.value === headingLevel)?.label || `H${headingLevel}`;

  return (
    <>
      <BlockControls>
        {variant === 'default' && (
          <ToolbarGroup>
            <DropdownMenu
              key={`heading-level-${headingLevel}`} // Force re-render when headingLevel changes
              text={currentHeadingText} // Display current heading level as text
              label="Change level"
              controls={headingLevelOptions.map(option => ({
                title: option.label,
                onClick: () => {
                  setSuffixedAttributes(setAttributes, { headingLevel: option.value }, suffix);
                },
                isActive: headingLevel === option.value,
              }))}
            />
          </ToolbarGroup>
        )}
        <ToolbarGroup>
          <AlignmentControl
            value={headingAlignment || "left"}
            onChange={newVal => {
              setSuffixedAttributes(
                setAttributes,
                { headingAlignment: newVal || "left" },
                suffix
              );
            }}
            alignmentControls={[
              {
                icon: "editor-alignleft",
                title: "Align text left",
                align: "left",
              },
              {
                icon: "editor-aligncenter",
                title: "Align text center",
                align: "center",
              },
            ]}
          />
        </ToolbarGroup>
      </BlockControls>
    </>
  );
}