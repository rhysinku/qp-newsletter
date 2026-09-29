import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, SVG, BackgroundColor } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";

export const HeroSimple = props => null;

const ALLOWED_CONTENT_BLOCKS = [
  "core/paragraph",
  "core/list",
  "mmd/button-group",
];

const CONTENT_TEMPLATE = [
  ["core/paragraph", { placeholder: "Add hero description text..." }],
  ["mmd/button-group", {}],
];

HeroSimple.Edit = props => {
  const { showBreadcrumbs, showBgDecor, showBackToParent } = props.attributes;
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps({
    className: twMerge(
      "mmd-hero py-10 lg:py-16 relative overflow-hidden isolate mod--variant--simple",
      bgColor,
      blockTheme
    ),
  });

  return (
    <header {...blockProps}>
      <div className="container relative z-10">
        <div className="mmd-content max-w-[64rem]">
          {showBackToParent && (
            <div className="mmd-hero__back-link inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-4 select-none">
              <span className="dashicons dashicons-arrow-left-alt2"></span>
              Back to Parent
            </div>
          )}
          {showBreadcrumbs && (
            <div className="mmd-breadcrumbs text-xs font-bold mb-4">
              [Breadcrumbs placeholder]
            </div>
          )}
          <Heading.Edit
            {...props}
            tagName="h1"
            className="text-heading-1 font-bold tracking-tight"
            placeholder="Enter hero title..."
          />
          <div className="mmd-hero__content mt-4">
            <InnerBlocks
              allowedBlocks={ALLOWED_CONTENT_BLOCKS}
              template={CONTENT_TEMPLATE}
            />
          </div>
        </div>
      </div>

      {showBgDecor && (
        <div className="mmd-hero__background -z-10 pointer-events-none" aria-hidden="true">
          <SVG.Content
            className="absolute top-1/2 left-1/2 -z-10 size-[200%] -translate-2/4 pointer-events-none opacity-40"
            width="3500"
            height="2182"
            sprite="MMC-Decor2"
          />
        </div>
      )}
    </header>
  );
};

HeroSimple.Save = props => {
  const { showBreadcrumbs, showBgDecor, showBackToParent } = props.attributes;
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge(
      "mmd-hero py-10 lg:py-16 relative overflow-hidden isolate mod--variant--simple",
      bgColor,
      blockTheme
    ),
  });

  return (
    <header {...blockProps}>
      <div className="container relative z-10">
        <div className="mmd-content max-w-[64rem]">
          {showBackToParent && <div className="back-to-parent-placeholder" />}
          {showBreadcrumbs && <div className="breadcrumbs-placeholder" />}
          <Heading.Content
            {...props}
            tagName="h1"
            className="text-heading-1 font-bold tracking-tight"
          />
          <div className="mmd-hero__content mt-4">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>

      {showBgDecor && (
        <div className="mmd-hero__background -z-10 pointer-events-none" aria-hidden="true">
          <SVG.Content
            className="absolute top-1/2 left-1/2 -z-10 size-[200%] -translate-2/4 pointer-events-none opacity-40"
            width="3500"
            height="2182"
            sprite="MMC-Decor2"
          />
        </div>
      )}
    </header>
  );
};
