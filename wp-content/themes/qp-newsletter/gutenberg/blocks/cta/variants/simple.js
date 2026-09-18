import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, BackgroundColor, NoToc } from "@marameodesign/components";

export const CtaSimple = props => null;

CtaSimple.Edit = props => {
  const { variant } = props.attributes;
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps({
    className: `mmd-cta mmd-content overflow-hidden rounded-3px mmd-spacing mmd-spacing-md mmd-margin-y ${variant} ${bgColor} ${blockTheme} ${NoToc.className(props)}`,
  });

  const ALLOWED_BLOCKS = [
    "core/paragraph",
    "core/list",
    "mmd/button-group",
    "mmd/highlight",
    "formidable/simple-form",
  ];
  const TEMPLATE = [
    ["core/paragraph", { placeholder: "Add text here..." }],
    ["mmd/button-group", { display: "no-spacing" }],
  ];

  return (
    <section {...blockProps}>
      <div className="mmd-cta__heading-wrapper flex flex-col justify-start items-stretch m-0">
        <Heading.Edit
          {...props}
          className="text-heading-3"
          preHeadingClassName="mmd-subheading"
        />
      </div>

      <div className="mmd-content">
        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
      </div>
    </section>
  );
};

CtaSimple.Save = props => {
  const { variant } = props.attributes;
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps.save({
    className: `mmd-cta mmd-content overflow-hidden rounded-3px mmd-spacing mmd-spacing-md mmd-margin-y ${variant} ${bgColor} ${blockTheme} ${NoToc.className(props)}`,
  });

  return (
    <section {...blockProps}>
      <div className="mmd-cta__heading-wrapper flex flex-col justify-start items-stretch m-0">
        <Heading.Content
          {...props}
          className="text-heading-3"
          preHeadingClassName="mmd-subheading"
        />
      </div>

      <div className="mmd-content">
        <InnerBlocks.Content />
      </div>
    </section>
  );
};
