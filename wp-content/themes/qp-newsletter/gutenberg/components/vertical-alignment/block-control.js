import {
  BlockControls,
  BlockVerticalAlignmentControl,
} from "@wordpress/block-editor";
import { ToolbarGroup } from "@wordpress/components";

export default function BlockControl(props) {
  const { attributes, setAttributes } = props;
  const { verticalAlignment } = attributes;

  return (
    <BlockControls group="block">
      <ToolbarGroup>
        <BlockVerticalAlignmentControl
          value={verticalAlignment}
          onChange={newVal => setAttributes({ verticalAlignment: newVal })}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}
