import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";
import {
  GridColumns,
} from "@marameodesign/components";

export const Save = (props) => {
  const { columns, centerGridItems } = GridColumns.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge(
      `mmd-spacing mmd-spacing-md mmd-padding-y mmd-row mmd-row-md`,
      columns,
      centerGridItems && 'center-grid-items',
    ),
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
