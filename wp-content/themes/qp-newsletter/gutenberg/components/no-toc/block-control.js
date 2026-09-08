import { BlockControls } from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";

export default function BlockControl(props) {
  const { excludeFromToc } = props.attributes;

  const handleToggleExcludeFromToc = () => {
    props.setAttributes({ excludeFromToc: !excludeFromToc });
  };

  return (
    <BlockControls group="block">
      <ToolbarGroup>
        <ToolbarButton
          icon={excludeFromToc ? "hidden" : "list-view"}
          label={excludeFromToc ? "Include in TOC" : "Exclude from TOC"}
          onClick={handleToggleExcludeFromToc}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}
