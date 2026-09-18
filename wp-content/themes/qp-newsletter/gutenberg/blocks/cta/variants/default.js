import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import {
  Image,
  Heading,
  BackgroundColor,
  GridColumns,
  NoToc,
} from "@marameodesign/components";
import {
  isInPostWithSidebar,
  setSuffixedAttributes,
} from "@marameodesign/utils";
import { usePost } from "@10up/block-components";

const ALLOWED_BLOCKS = [
  "core/paragraph",
  "core/list",
  "mmd/button-group",
  "mmd/highlight",
  "formidable/simple-form",
];
const TEMPLATE = [
  ["core/paragraph", { placeholder: "Add text here..." }],
  ["mmd/button-group"],
];

export const CtaDefault = props => null;

CtaDefault.Edit = props => {
  const { attributes, setAttributes } = props;
  const { currentPostType } = attributes;
  const { bgColor, blockTheme } = BackgroundColor.get(props);
  const { columns } = GridColumns.get(props);
  const { headingLevel } = Heading.get(props);

  /**
   * Handle case when this block is located in post types with a sidebar
   */
  const { postType } = usePost();
  const _isInPostWithSidebar = isInPostWithSidebar(postType);

  if (postType !== currentPostType) {
    const updates = { currentPostType: postType };

    if (_isInPostWithSidebar) {
      updates.headingLevel = 3;
    }

    setSuffixedAttributes(setAttributes, updates);
  } else {
    setSuffixedAttributes(setAttributes, {
      headingLevel: _isInPostWithSidebar ? 3 : 2,
    });
  }

  const blockProps = useBlockProps({
    className: `mmd-cta mmd-spacing mmd-spacing-md mmd-margin-y overflow-hidden rounded-3px mod--variant--default ${bgColor} ${blockTheme} ${NoToc.className(
      props
    )}`,
    ...(_isInPostWithSidebar && { "data-is-in-post-with-sidebar": "1" }),
  });

  return (
    <section {...blockProps}>
      <div
        className={`mmd-row mmd-row-xl lg:items-center lg:cols-60-40 mmd-row-static gap-y-6 ${columns}`}
      >
        <div className="mmd-col mmd-content flex flex-col justify-center items-stretch">
          <div className="flex flex-col justify-start items-stretch not-last:mb-2">
            <Heading.Edit {...props} preHeadingClassName="mmd-subheading" />
          </div>

          <div className="mmd-content">
            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
          </div>
        </div>

        <div className="mmd-col">
          <div className="mmd-cta__image">
            <Image.Edit
              {...props}
              wrapperClassName="rounded-3px overflow-hidden"
              ratioWrapperClassName="is-ratio-image ratio-3-2"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

CtaDefault.Save = props => {
  const { bgColor, blockTheme } = BackgroundColor.get(props);
  const { columns } = GridColumns.get(props);

  const blockProps = useBlockProps.save({
    className: `mmd-cta mmd-spacing mmd-spacing-md mmd-margin-y overflow-hidden rounded-3px mod--variant--default ${bgColor} ${blockTheme} ${NoToc.className(
      props
    )}`,
  });

  return (
    <section {...blockProps}>
      <div
        className={`mmd-row mmd-row-xl lg:items-center lg:cols-60-40 mmd-row-static gap-y-6 ${columns}`}
      >
        <div className="mmd-col mmd-content flex flex-col justify-center items-stretch">
          <div className="flex flex-col justify-start items-stretch not-last:mb-2">
            <Heading.Content {...props} preHeadingClassName="mmd-subheading" />
          </div>

          <div className="mmd-content">
            <InnerBlocks.Content />
          </div>
        </div>

        <div className="mmd-col">
          <div className="mmd-cta__image">
            <Image.Content
              {...props}
              wrapperClassName="rounded-3px overflow-hidden"
              ratioWrapperClassName="is-ratio-image ratio-3-2"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
