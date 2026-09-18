import { useBlockProps } from "@wordpress/block-editor";
import { Media } from "@marameodesign/components";

export default function save(props) {
  const blockProps = useBlockProps.save({
    className: "mmd-video mmd-spacing mmd-spacing-md mmd-margin-y",
  });

  return (
    <div {...blockProps}>
      <Media.Content {...props} />
    </div>
  );
}
