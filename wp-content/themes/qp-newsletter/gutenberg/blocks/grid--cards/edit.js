import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import {
  GridColumns,
  Preview,
} from "@marameodesign/components";

import Inspector from "./inspector";

export const Edit = (props) => {
  const { columns, centerGridItems } = GridColumns.get(props);
  const { preview } = Preview.get(props);

  const blockProps = useBlockProps({
    className: twMerge(
      `mmd-spacing mmd-spacing-md mmd-padding-y mmd-row mmd-row-md`,
      columns,
      centerGridItems && 'center-grid-items',
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
              template={[
                ["mmd/people-card-item", {}],
                ["mmd/people-card-item", {}],
              ]}
              allowedBlocks={["mmd/people-card-item"]}
              orientation="horizontal"
            />
          </div>
        </>
      )}
    </>
  );
}