import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, SVG } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";

export const HeroSimple = props => null;

HeroSimple.Edit = props => {
  const { showBreadcrumbs, showBgDecor } = props.attributes;
  const blockProps = useBlockProps({
    className: twMerge(
      `mmd-hero mmd-spacing mmd-spacing-md mmd-padding-y lg:pt-[1.625rem] bg-system-white mod--theme--light mod--variant--simple`,
      showBgDecor && "relative isolate overflow-hidden"
    ),
  });

  const ALLOWED_BLOCKS = [
    "core/paragraph",
    "core/list",
    "mmd/button-group",
    "mmd/highlight",
  ];
  const TEMPLATE = [
    ["core/paragraph", { placeholder: "Add text here..." }],
    ["mmd/button-group"],
  ];

  return (
    <header {...blockProps}>
      <div className="container">
        <div className="mmd-content max-w-[64.188rem]">
          {showBreadcrumbs && (
            <div className="mmd-breadcrumbs text-xs font-bold">
              [Breadcrumbs placeholder]
            </div>
          )}
          <Heading.Edit {...props} className="text-heading-1" />
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
        </div>
      </div>
      {showBgDecor && (
        <SVG.Content
          className="simple-hero-decor absolute top-1/2 left-1/2 size-auto -translate-2/4 pointer-events-none text-primary"
          width="1750"
          height="912"
          sprite="MMC-Decor2"
        />
      )}
    </header>
  );
};


HeroSimple.Save = props => {
  const { showBreadcrumbs, showBgDecor } = props.attributes;
  const blockProps = useBlockProps.save({
    className: twMerge(
      `mmd-hero mmd-spacing mmd-spacing-md mmd-padding-y lg:pt-[1.625rem] bg-system-white mod--theme--light mod--variant--simple`,
      showBgDecor && "relative isolate overflow-hidden"
    ),
  });

  return (
    <header {...blockProps}>
      <div className="container">
        <div className="mmd-content max-w-[64.188rem]">
          {showBreadcrumbs && <div className="breadcrumbs-placeholder" />}
          <Heading.Content {...props} className="text-heading-1" />
          <InnerBlocks.Content />
        </div>
      </div>
      {showBgDecor && (
        <SVG.Content
          className="absolute top-1/2 left-1/2 size-auto -translate-2/4 pointer-events-none text-primary"
          width="1750"
          height="912"
          sprite="MMC-Decor2"
        />
      )}
    </header>
  );
};
