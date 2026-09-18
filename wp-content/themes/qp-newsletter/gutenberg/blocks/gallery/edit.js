import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { Preview } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";
import Inspector from "./inspector";

export const Edit = props => {
  const { clientId, setAttributes, attributes } = props;
  const { bleedRight } = attributes;
  const { preview } = Preview.get(props);

  // Get number of inner blocks
  const innerBlocksCount = useSelect(
    select => {
      const { getBlock } = select("core/block-editor");
      const block = getBlock(clientId);
      return block?.innerBlocks?.length || 0;
    },
    [clientId]
  );

  // Store in attributes if needed
  useEffect(() => {
    setAttributes({
      childCount: innerBlocksCount,
    });
  }, [innerBlocksCount]);

  const blockProps = useBlockProps({
    className: twMerge(
      "mmd-spacing mmd-spacing-md mmd-padding-y mmd-row mmd-row-md lg:cols-3",
      bleedRight && "mod--display--bleed-right"
    ),
  });

  return (
    <>
      <Preview.Content {...props} />

      {!preview && (
        <>
          <Inspector {...props} />

          <div {...blockProps}>
            <InnerBlocks
              template={[["mmd/gallery-child"]]}
              allowedBlocks={["mmd/gallery-child"]}
              orientation="horizontal"
            />
          </div>
        </>
      )}
    </>
  );
};
