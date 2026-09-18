import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export const Save = (props) => {
  const { closeInactiveItems } = props.attributes;

  const blockProps = useBlockProps.save({
    className: "mmd-accordion w-full mmd-spacing mmd-spacing-md mmd-padding-y",
    ...(closeInactiveItems ? { "data-close-inactive-items": "1" } : {}),
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
