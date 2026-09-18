import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, SVG, Image } from "@marameodesign/components";

export const HeroLarge = props => null;

HeroLarge.Edit = props => {
  const { showBreadcrumbs, showBgDecor, showImageBgDecor } = props.attributes;
  const blockProps = useBlockProps({
    className: `mmd-hero mmd-spacing mmd-spacing-md grid grid-cols-1 items-center lg:mmd-padding-y lg:min-h-[34.375rem] relative overflow-hidden isolate bg-system-white mod--theme--light mod--variant--large`,
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

  const decor = (
    <SVG.Content
      className="absolute top-1/2 left-1/2 size-[200%] -translate-2/4 pointer-events-none text-system-white"
      width="3500"
      height="2182"
      sprite="MMC-Decor"
    />
  );

  return (
    <header {...blockProps}>
      <div className="container h-full flex items-center">
        <div className="mmd-content justify-center items-stretch lg:bg-system-white relative isolate w-full lg:max-w-[37.125rem] py-10 lg:py-9 lg:pr-0 lg:pl-8">
          {showBreadcrumbs && (
            <div className="mmd-breadcrumbs text-xs font-bold">
              [Breadcrumbs placeholder]
            </div>
          )}
          <Heading.Edit {...props} className="text-heading-1" />
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
          {showBgDecor && (
            <SVG.Content
              className="simple-hero-decor absolute top-1/2 left-1/2 size-auto -translate-2/4 pointer-events-none text-primary"
              width="1750"
              height="912"
              sprite="MMC-Decor2"
            />
          )}
        </div>
      </div>

      <Image.Edit
        {...props}
        wrapperClassName="relative order-first lg:order-last -z-10 lg:absolute lg:inset-0"
        captionClassName="mmd-figcaption mod--variant--floating lg:pr-2 lg:pl-20"
        ratioWrapperClassName="is-ratio-image ratio-3-2 lg:ratio-none lg:absolute lg:inset-0"
        decorSVG={showImageBgDecor ? decor : null}
      />
    </header>
  );
};

HeroLarge.Save = props => {
  const { showBreadcrumbs, showBgDecor, showImageBgDecor } = props.attributes;
  const blockProps = useBlockProps.save({
    className: `mmd-hero mmd-spacing mmd-spacing-md grid grid-cols-1 items-center lg:mmd-padding-y lg:min-h-[34.375rem] relative overflow-hidden isolate bg-system-white mod--theme--light mod--variant--large`,
  });

  const decor = (
    <SVG.Content
      className="absolute top-1/2 left-1/2 size-[200%] -translate-2/4 pointer-events-none text-system-white"
      width="3500"
      height="2182"
      sprite="MMC-Decor"
    />
  );

  return (
    <header {...blockProps}>
      <div className="container h-full flex items-center">
        <div className="mmd-content justify-center items-stretch lg:bg-system-white relative isolate w-full lg:max-w-[37.125rem] py-10 lg:py-9 lg:pr-0 lg:pl-8">
          {showBreadcrumbs && <div className="breadcrumbs-placeholder" />}
          <Heading.Content {...props} className="text-heading-1" />
          <InnerBlocks.Content />
          {showBgDecor && (
            <SVG.Content
              className="simple-hero-decor absolute top-1/2 left-1/2 size-auto -translate-2/4 pointer-events-none text-primary"
              width="1750"
              height="912"
              sprite="MMC-Decor2"
            />
          )}
        </div>
      </div>

      <Image.Content
        {...props}
        wrapperClassName="relative order-first lg:order-last -z-10 lg:absolute lg:inset-0"
        captionClassName="mmd-figcaption mod--variant--floating lg:pr-2 lg:pl-20"
        ratioWrapperClassName="is-ratio-image ratio-3-2 lg:ratio-none lg:absolute lg:inset-0"
        decorSVG={showImageBgDecor ? decor : null}
      />
    </header>
  );
};
