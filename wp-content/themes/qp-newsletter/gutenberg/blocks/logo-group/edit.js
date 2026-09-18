import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useHasSelectedInnerBlock } from "@10up/block-components";
import { twMerge } from "tailwind-merge";
import {
  BackgroundColor,
  GridColumns,
  Preview,
} from "@marameodesign/components";
import Inspector from "./inspector";

export default function edit(props) {
  const { columns } = GridColumns.get(props);
  const { preview } = Preview.get(props);

  const hasSelectedInnerBlock = useHasSelectedInnerBlock();
  const isActive = props.isSelected || hasSelectedInnerBlock;

  const blockProps = useBlockProps({
    className: twMerge(
      "mmd-logo-group mmd-spacing mmd-spacing-md mmd-padding-y mmd-row items-center cols-1 sm:cols-2 md:cols-3",
      columns
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
              template={[["mmd/logo-group-child"]]}
              allowedBlocks={["mmd/logo-group-child"]}
              renderAppender={isActive && InnerBlocks.ButtonBlockAppender}
            />
          </div>
        </>
      )}
    </>
  );
}
