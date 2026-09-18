import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";
import { HorizontalAlignment } from "@marameodesign/components";

export const Save = (props) => {
  const { className, hasInnerBlocks } = props.attributes;

  const blockProps = useBlockProps.save({
    className: twMerge(
      "mmd-button-group",
      className,
      HorizontalAlignment.className(props),
    ),
  });

  return (
    <>
      {hasInnerBlocks && (
        <div {...blockProps}>
          <InnerBlocks.Content />
        </div>
      )}
    </>
  );
}
