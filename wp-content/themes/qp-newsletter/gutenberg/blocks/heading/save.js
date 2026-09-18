import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { Heading, NoToc } from "@marameodesign/components";

import "./style.scss";

export const Save = props => {
  const { showButton } = props.attributes;
  const { heading } = Heading.get(props);

  const blockProps = useBlockProps.save({
    className:
      `mmd-heading flex flex-col lg:flex-row lg:items-center lg:justify-between flex-wrap gap-4 ${NoToc.className(props)}`,
  });

  return (
    <>
      {heading ? (
        <div {...blockProps}>
          <Heading.Content {...props} />
          {showButton && <InnerBlocks.Content />}
        </div>
      ) : null}
    </>
  );
};
