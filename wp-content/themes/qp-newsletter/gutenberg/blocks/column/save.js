import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export const Save = props => {
  const blockProps = useBlockProps.save({
    className: "mmd-col mmd-content",
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
