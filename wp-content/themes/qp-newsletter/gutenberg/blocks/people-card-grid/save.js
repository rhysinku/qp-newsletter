import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

const getGridClass = cols => {
  switch (Number(cols)) {
    case 3:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    case 4:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
    case 2:
    default:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6";
  }
};

export const Save = props => {
  const { columns = 2 } = props.attributes;

  const blockProps = useBlockProps.save({
    className: twMerge("mmd-people-card-grid w-full", getGridClass(columns)),
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
