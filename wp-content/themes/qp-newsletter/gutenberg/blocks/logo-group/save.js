import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";
import { GridColumns } from "@marameodesign/components";

export default function save(props) {
  const { columns } = GridColumns.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge(
      "mmd-logo-group mmd-spacing mmd-spacing-md mmd-padding-y mmd-row items-center cols-1 sm:cols-2 md:cols-3",
      columns
    ),
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
