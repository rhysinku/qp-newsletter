import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ButtonGroup, Button } from "@wordpress/components";
import { BackgroundColor, Spacing } from "@marameodesign/components";

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const displayType = attributes.displayType || 'space';

  return (
    <InspectorControls>
      <PanelBody>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: "11px",
            }}
          >
            DISPLAY TYPE
          </label>
          <ButtonGroup>
            <Button
              variant={displayType === "space" ? "primary" : "secondary"}
              onClick={() => setAttributes({ displayType: "space" })}
            >
              Space
            </Button>
            <Button
              variant={displayType === "line" ? "primary" : "secondary"}
              onClick={() => setAttributes({ displayType: "line" })}
            >
              Line
            </Button>
          </ButtonGroup>
        </div>
        <Spacing.InspectorControl {...props} />
      </PanelBody>
    </InspectorControls>
  );
}
