import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, SVG, Image, BackgroundColor } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";

export const HeroFeatured = props => null;

const ALLOWED_CONTENT_BLOCKS = [
  "core/paragraph",
  "core/list",
  "mmd/button-group",
];

const CONTENT_TEMPLATE = [
  ["core/paragraph", { placeholder: "Add hero description text..." }],
  ["mmd/button-group", {}],
];

HeroFeatured.Edit = props => {
  const { showBreadcrumbs, showBgDecor } = props.attributes;
  const { imageFit } = Image.get(props);
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps({
    className: twMerge(
      "mmd-hero lg:min-h-[28rem] lg:flex flex-col justify-center items-stretch py-10 lg:py-16 relative overflow-hidden isolate mod--variant--featured",
      bgColor,
      blockTheme
    ),
  });

  return (
    <header {...blockProps}>
      {showBreadcrumbs && (
        <div className="mmd-breadcrumbs text-xs font-bold mb-4 container">
          [Breadcrumbs placeholder]
        </div>
      )}
      <div className="container relative z-10">
        <div className="mmd-content lg:max-w-1/2 py-6 lg:py-0 relative isolate">
          <Heading.Edit
            {...props}
            tagName="h1"
            className="text-heading-1 font-bold tracking-tight"
            preHeadingClassName="mmd-hero__pre-heading"
            placeholder="Enter hero title..."
            preHeadingPlaceholder="Enter pre-title..."
          />
          <div className="mmd-hero__content mt-4">
            <InnerBlocks
              allowedBlocks={ALLOWED_CONTENT_BLOCKS}
              template={CONTENT_TEMPLATE}
            />
          </div>
        </div>
      </div>

      <Image.Edit
        {...props}
        wrapperClassName="relative order-first lg:order-last lg:absolute lg:right-0 lg:top-0 lg:h-full lg:max-w-[calc(50%_-_1rem)] lg:w-1/2"
        captionClassName="mmd-figcaption mod--variant--floating lg:pr-2 lg:pl-10"
        ratioWrapperClassName="is-ratio-image ratio-3-2 lg:ratio-none lg:absolute lg:inset-0 rounded-2xl overflow-hidden"
        className={
          imageFit === "contain"
            ? "lg:object-right lg:!ml-auto lg:!w-auto"
            : "w-full h-full object-cover"
        }
      />

      {showBgDecor && (
        <div className="mmd-hero__background -z-10 pointer-events-none" aria-hidden="true">
          <SVG.Content
            className="absolute top-1/2 left-1/2 -z-10 size-[200%] -translate-2/4 pointer-events-none opacity-40"
            width="3500"
            height="2182"
            sprite="MMC-Decor"
          />
        </div>
      )}
    </header>
  );
};

HeroFeatured.Save = props => {
  const { showBreadcrumbs, showBgDecor } = props.attributes;
  const { imageFit } = Image.get(props);
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge(
      "mmd-hero lg:min-h-[28rem] lg:flex flex-col justify-center items-stretch py-10 lg:py-16 relative overflow-hidden isolate mod--variant--featured",
      bgColor,
      blockTheme
    ),
  });

  return (
    <header {...blockProps}>
      {showBreadcrumbs && <div className="breadcrumbs-placeholder" />}
      <div className="container relative z-10">
        <div className="mmd-content lg:max-w-1/2 py-6 lg:py-0 relative isolate">
          <Heading.Content
            {...props}
            tagName="h1"
            className="text-heading-1 font-bold tracking-tight"
            preHeadingClassName="mmd-hero__pre-heading"
          />
          <div className="mmd-hero__content mt-4">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>

      <Image.Content
        {...props}
        wrapperClassName="relative order-first lg:order-last lg:absolute lg:right-0 lg:top-0 lg:h-full lg:max-w-[calc(50%_-_1rem)] lg:w-1/2"
        captionClassName="mmd-figcaption mod--variant--floating lg:pr-2 lg:pl-10"
        ratioWrapperClassName="is-ratio-image ratio-3-2 lg:ratio-none lg:absolute lg:inset-0 rounded-2xl overflow-hidden"
        className={
          imageFit === "contain"
            ? "lg:object-right lg:!ml-auto lg:!w-auto"
            : "w-full h-full object-cover"
        }
      />

      {showBgDecor && (
        <div className="mmd-hero__background -z-10 pointer-events-none" aria-hidden="true">
          <SVG.Content
            className="absolute top-1/2 left-1/2 -z-10 size-[200%] -translate-2/4 pointer-events-none opacity-40"
            width="3500"
            height="2182"
            sprite="MMC-Decor"
          />
        </div>
      )}
    </header>
  );
};
