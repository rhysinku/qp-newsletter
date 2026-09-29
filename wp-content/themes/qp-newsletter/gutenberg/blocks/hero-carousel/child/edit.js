import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { Heading, Image, Preview } from "@marameodesign/components";
import Inspector from "./inspector";
import "./editor.scss";

const ALLOWED_BLOCKS = [
  "core/paragraph",
  "core/list",
  "mmd/button-group",
];

const TEMPLATE = [
  ["core/paragraph", { placeholder: "Add slide description text..." }],
  ["mmd/button-group", {}],
];

export const Edit = props => {
  const { attributes, setAttributes, clientId } = props;
  const { isFirstSlide, showBreadcrumbs = true } = attributes;
  const { preview } = Preview.get(props);
  const { imageUri, useFeaturedImage, imageRis } = Image.get(props);

  Image.useImageAttributesSync({
    imageUri,
    useFeaturedImage,
    imageRis,
    setAttributes,
  });

  const isFirst = useSelect(
    select => {
      const { getBlockIndex } = select("core/block-editor");
      return getBlockIndex(clientId) === 0;
    },
    [clientId]
  );

  useEffect(() => {
    if (isFirstSlide !== isFirst) {
      setAttributes({ isFirstSlide: isFirst });
    }
  }, [isFirst, isFirstSlide, setAttributes]);

  if (preview) {
    return <Preview.Content {...props} />;
  }

  const blockProps = useBlockProps({
    className: "mmd-hero-carousel-slide-editor relative min-h-[32rem] lg:min-h-[38rem] flex items-center overflow-hidden rounded-2xl mb-8 border border-neutral-grey-300 w-full",
  });

  return (
    <li {...blockProps}>
      <Inspector {...props} />

      {/* Slide Background Image in Editor Canvas */}
      <div className="mmd-hero-carousel-slide__bg absolute inset-0 size-full -z-10 bg-neutral-grey-200 overflow-hidden">
        <Image.Edit
          {...props}
          wrapperClassName="size-full overflow-hidden"
          ratioWrapperClassName="size-full"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Container wrapper so the card aligns with the site container */}
      <div className="container mx-auto px-4 lg:px-8 w-full h-full flex items-center relative z-10 py-10 lg:py-16">
        <div className="mmd-hero-carousel-slide__card relative z-10 w-full max-w-[38rem] bg-white text-primary-navy-900 p-6 md:p-10 shadow-2xl rounded-2xl lg:rounded-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-full text-xs font-semibold bg-primary-blue-50 text-primary">
            <span className="dashicons dashicons-slides"></span>
            Slide {isFirst ? "1 (H1)" : "Item (H2)"}
          </div>

          {showBreadcrumbs && (
            <div className="mmd-breadcrumbs text-xs font-semibold text-neutral-grey-500 mb-3 flex items-center gap-1">
              <span className="dashicons dashicons-admin-home text-xs"></span>
              <span>Home</span> &gt; <span>Grand-Parent</span> &gt; <span>Parent</span>
            </div>
          )}

          <Heading.Edit
            {...props}
            tagName={isFirst ? "h1" : "h2"}
            className="text-heading-1 font-bold tracking-tight text-primary-navy-900"
            preHeadingClassName="mmd-hero__pre-heading"
            placeholder="Enter slide heading..."
            preHeadingPlaceholder="Enter pre-title..."
          />

          <div className="mmd-hero-carousel-slide__content mt-4 text-neutral-grey-700">
            <InnerBlocks
              allowedBlocks={ALLOWED_BLOCKS}
              template={TEMPLATE}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
