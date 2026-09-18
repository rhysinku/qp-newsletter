import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import {
  BackgroundColor,
  GridColumns,
  NoToc,
} from "@marameodesign/components";

export const Save = (props) => {
  const { wrapperClassName, containerClassName } = props.attributes;
  const { bgColor, blockTheme } = BackgroundColor.get(props);
  const { columns } = GridColumns.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge(
      `mmd-spacing mmd-spacing-md mmd-padding-y ${bgColor} ${blockTheme}`,
      NoToc.className(props),
      ...wrapperClassName
    ),
  });

  return (
    <section {...blockProps}>
      <div
        className={twMerge(
          "container mmd-content",
          ...containerClassName
        )}
      >
        {columns == "lg:cols-1" && (
          <InnerBlocks.Content />
        )}
        {columns != "lg:cols-1" && (
          <div className={`mmd-row mmd-row-lg ${columns}`}>
            <InnerBlocks.Content />
          </div>
        )}
      </div>
    </section>
  );
}
