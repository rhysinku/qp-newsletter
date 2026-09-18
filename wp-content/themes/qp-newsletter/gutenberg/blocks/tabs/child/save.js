import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export const Save = props => {
  const { anchor, isFirst } = props.attributes;
  const blockProps = useBlockProps.save({
    id: anchor,
    className: "mmd-tabs__panel mmd-content",
    role: "tabpanel",
    tabIndex: "0",
    ariaLabelledBy: `tab-button-${anchor}`,
    ...(!isFirst ? { hidden: "hidden" } : {}),
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
