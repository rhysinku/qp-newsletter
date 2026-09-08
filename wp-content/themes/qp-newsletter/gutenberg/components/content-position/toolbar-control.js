import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { pullLeft, pullRight } from "@wordpress/icons";
import { BlockControls } from "@wordpress/block-editor";
import get from "./get";

export default function ToolbarControl(props) {
  const { setAttributes } = props;
  const { contentPosition } = get(props);

  return (
    <BlockControls group="block">
      <ToolbarGroup>
        <ToolbarButton
          icon={pullLeft}
          title="Show media on left side"
          isActive={contentPosition === "mod--variant--media-left"}
          onClick={() => setAttributes({ contentPosition: "mod--variant--media-left" })}
        />
        <ToolbarButton
          icon={pullRight}
          title="Show media on right side"
          isActive={contentPosition === "mod--variant--media-right"}
          onClick={() => setAttributes({ contentPosition: "mod--variant--media-right" })}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}
