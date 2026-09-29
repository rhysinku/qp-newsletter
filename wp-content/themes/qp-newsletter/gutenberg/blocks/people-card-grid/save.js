import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { GridColumns } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";

const getGridClass = cols => {
  switch (cols) {
    case "lg:cols-3":
    case 3:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    case "lg:cols-4":
    case 4:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
    case "lg:cols-2":
    case 2:
    default:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6";
  }
};

export const Save = props => {
  const { columns = "lg:cols-2" } = GridColumns.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge("mmd-people-card-grid w-full", getGridClass(columns)),
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
