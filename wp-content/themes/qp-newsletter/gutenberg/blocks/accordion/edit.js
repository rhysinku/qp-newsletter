import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useHasSelectedInnerBlock } from "@10up/block-components";

import { Preview } from "@marameodesign/components";
import Inspector from "./inspector";

import "./editor.scss";

export const Edit = (props) => {
  const { isSelected } = props;
  const hasSelectedInnerBlock = useHasSelectedInnerBlock();

  const { preview } = Preview.get(props);

  const blockProps = useBlockProps({
    className: "mmd-accordion w-full mmd-spacing mmd-spacing-md mmd-padding-y",
  });

  return (
    <>
      <Preview.Content {...props} />

      {!preview && (
        <>
          <Inspector {...props} />
          <div {...blockProps}>
            <InnerBlocks
              template={[["mmd/accordion-child", {}]]}
              allowedBlocks={["mmd/accordion-child"]}
              renderAppender={
                (isSelected || hasSelectedInnerBlock) &&
                InnerBlocks.ButtonBlockAppender
              }
            />
          </div>
        </>
      )}
    </>
  );
}
