import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import {
  BackgroundColor,
  GridColumns,
  Preview,
  NoToc,
} from "@marameodesign/components";

import Inspector from "./inspector";

export const Edit = (props, CustomInspector = null) => {
  const {
    wrapperClassName,
    containerClassName,
    innerBlocksTemplate,
    innerBlocksAllowedBlocks,
    lockTemplate,
  } = props.attributes;

  const { columns } = GridColumns.get(props);
  const { preview } = Preview.get(props);
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  BackgroundColor.useAutoAdjustedBlockTheme(props);

  const blockProps = useBlockProps({
    className: twMerge(
      `mmd-spacing mmd-spacing-md mmd-padding-y ${bgColor} ${blockTheme}`,
      NoToc.className(props),
      ...wrapperClassName
    ),
  });

  return (
    <>
      <Preview.Content {...props} />

      {!preview && (
        <>
          <Inspector {...props} />
          <NoToc.BlockControl {...props} />

          {CustomInspector && <CustomInspector {...props} />}

          <section {...blockProps}>
            <div
              className={twMerge(
                "container mmd-content",
                ...containerClassName
              )}
            >
              {columns === "lg:cols-1" ? (
                <InnerBlocks
                  template={innerBlocksTemplate}
                  allowedBlocks={innerBlocksAllowedBlocks}
                  orientation="vertical"
                  templateLock={lockTemplate}
                />
              ) : (
                <div className={`mmd-row mmd-row-lg ${columns}`}>
                  <InnerBlocks
                    template={innerBlocksTemplate}
                    allowedBlocks={innerBlocksAllowedBlocks}
                    orientation="horizontal"
                    templateLock={lockTemplate}
                  />
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};
