import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { BackgroundColor, Preview } from "@marameodesign/components";

export const Edit = props => {
  const { attributes } = props;
  const { renderAppender, template } = attributes;
  const { preview } = Preview.get(props);

  BackgroundColor.useAutoAdjustedBlockTheme(props);

  const blockProps = useBlockProps({
    className: "mmd-col mmd-content",
  });

  return (
    <>
      {preview && <Preview.Content {...props} />}
      {!preview && (
        <div {...blockProps}>
          <InnerBlocks
            template={template}
            renderAppender={
              renderAppender ? InnerBlocks.DefaultBlockAppender : false
            }
          />
        </div>
      )}
    </>
  );
};
