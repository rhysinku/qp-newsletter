import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { Heading, Preview, NoToc } from "@marameodesign/components";
import Inspector from "./inspector";

import "./editor.scss";

export const Edit = props => {
  const { attributes } = props;
  const { showButton } = attributes;
  const { preview } = Preview.get(props);

  const blockProps = useBlockProps({
    className:
      `mmd-heading flex flex-col lg:flex-row lg:items-center lg:justify-between flex-wrap gap-4 ${NoToc.className(props)}`,
  });

  return (
    <>
      <Preview.Content {...props} />
      {!preview && (
        <>
          <Inspector {...props} />
          <NoToc.BlockControl {...props} />
          <div {...blockProps}>
            <Heading.Edit {...props} />

            {showButton && (
              <div style={{ flexGrow: "1" }}>
                <InnerBlocks
                  template={[
                    ["mmd/button-group", { horizontalAlignment: "right" }, [
                      ["mmd/button", { buttonType: "mod--variant--arrow" }]
                    ],],
                  ]}
                  allowedBlocks={["mmd/button"]}
                  renderAppender={InnerBlocks.ButtonBlockAppender}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
