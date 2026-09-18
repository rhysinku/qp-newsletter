import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { twMerge } from "tailwind-merge";
import { Preview, HorizontalAlignment } from "@marameodesign/components";

import "./editor.scss";

export const Edit = (props) => {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const { className, hasInnerBlocks, innerBlocksTemplate } = attributes;

  const { preview } = Preview.get(props);

  const blockProps = useBlockProps({
    className: twMerge(
      "mmd-button-group",
      className,
      HorizontalAlignment.className(props),
    ),
  });

  // Check if block has content
  const hasRealInnerBlocks = useSelect(
    select => {
      const { getBlock } = select("core/block-editor");
      const block = getBlock(clientId);

      return !!block?.innerBlocks?.some(
        ({ attributes }) =>
          attributes?.buttonText?.trim() &&
          (attributes?.buttonUrl?.trim() || attributes?.enableNewsletterType)
      );
    },
    [clientId]
  );

  useEffect(() => {
    if (hasRealInnerBlocks !== hasInnerBlocks) {
      setAttributes({ hasInnerBlocks: hasRealInnerBlocks });
    }
  }, [hasRealInnerBlocks]);


  return (
    <>
      <Preview.Content {...props} />

      {!preview && (
        <>
          <HorizontalAlignment.BlockControl {...props} />

          <div {...blockProps}>
            <InnerBlocks
              allowedBlocks={["mmd/button"]}
              template={innerBlocksTemplate}
              {...(isSelected && {
                renderAppender: InnerBlocks.ButtonBlockAppender,
              })}
              orientation="horizontal"
            />
          </div>
        </>
      )}
    </>
  );
}
