import { ToolbarGroup } from "@wordpress/components";
import { AlignmentControl } from "@wordpress/block-editor";
import { ALIGNMENT_TO_CLASS, CLASS_TO_ALIGNMENT } from "./constants";
import get from "./get";

export default function ToolbarControl(props) {
  const { setAttributes } = props;
  const { contentAlignment } = get(props);

  return (
    <ToolbarGroup>
      <AlignmentControl
        value={CLASS_TO_ALIGNMENT[contentAlignment]}
        onChange={newVal => {
          setAttributes({
            contentAlignment: ALIGNMENT_TO_CLASS[newVal],
          });
        }}
      />
    </ToolbarGroup>
  );
}
