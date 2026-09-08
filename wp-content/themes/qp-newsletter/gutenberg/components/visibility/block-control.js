import { BlockControls } from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";

export default function BlockControl(props) {
  const { isVisible } = props.attributes;

  const handleToggleVisibility = () => {
    props.setAttributes({ isVisible: !isVisible });
  };

  return (
    <BlockControls group="block">
      <ToolbarGroup>
        <ToolbarButton
          icon={isVisible ? "visibility" : "hidden"}
          label={isVisible ? "Hide block" : "Show block"}
          onClick={handleToggleVisibility}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}
