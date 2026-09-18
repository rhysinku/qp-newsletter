import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, SVG, Image } from "@marameodesign/components";

export const HeroFeatured = props => null;

HeroFeatured.Edit = props => {
  const { showBreadcrumbs } = props.attributes;
  const { imageFit } = Image.get(props);

  const blockProps = useBlockProps({
    className: `mmd-hero lg:min-h-[25rem] lg:flex flex-col justify-center items-stretch mmd-spacing mmd-spacing-md lg:mmd-padding-y relative overflow-hidden isolate bg-primary-faint-blue mod--theme--light mod--variant--featured`,
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
      {showBreadcrumbs && (
        <div className="mmd-breadcrumbs text-xs font-bold">
          [Breadcrumbs placeholder]
        </div>
      )}
      <div className="container relative z-10">
        <div className="mmd-content lg:max-w-1/2 py-10 lg:py-0 relative isolate">
          <Heading.Edit {...props} className="text-heading-1" />
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
        </div>
      </div>

      <Image.Edit
        {...props}
        wrapperClassName="relative order-first lg:order-last lg:absolute lg:right-0 lg:top-0 lg:h-full lg:max-w-[calc(53%_-_3rem)] lg:w-1/2"
        captionClassName="mmd-figcaption mod--variant--floating lg:pr-2 lg:pl-20"
        ratioWrapperClassName="is-ratio-image ratio-3-2 lg:ratio-none lg:absolute lg:inset-0"
        className={
          imageFit === "contain"
            ? "lg:object-right lg:!ml-auto lg:!w-auto"
            : null
        }
      />

      <div
        className="mmd-hero__background bg-primary-faint-blue mod--theme--light"
        aria-hidden="true"
      >
        <SVG.Content
          className="absolute top-1/2 left-1/2 -z-10 size-[200%] -translate-2/4 pointer-events-none"
          width="3500"
          height="2182"
          sprite="MMC-Decor"
        />
      </div>
    </header>
  );
};

HeroFeatured.Save = props => {
  const { showBreadcrumbs } = props.attributes;
  const { imageFit } = Image.get(props);

  const blockProps = useBlockProps.save({
    className: `mmd-hero lg:min-h-[25rem] lg:flex flex-col justify-center items-stretch mmd-spacing mmd-spacing-md lg:mmd-padding-y relative overflow-hidden isolate bg-primary-faint-blue mod--theme--light mod--variant--featured`,
  });

  return (
    <header {...blockProps}>
      {showBreadcrumbs && <div className="breadcrumbs-placeholder" />}
      <div className="container relative z-10">
        <div className="mmd-content lg:max-w-1/2 py-10 lg:py-0 relative isolate">
          <Heading.Content {...props} className="text-heading-1" />
          <InnerBlocks.Content />
        </div>
      </div>

      <Image.Content
        {...props}
        wrapperClassName="relative order-first lg:order-last lg:absolute lg:right-0 lg:top-0 lg:h-full lg:max-w-[calc(53%_-_3rem)] lg:w-1/2"
        captionClassName="mmd-figcaption mod--variant--floating lg:pr-2 lg:pl-20"
        ratioWrapperClassName="is-ratio-image ratio-3-2 lg:ratio-none lg:absolute lg:inset-0"
        className={
          imageFit === "contain"
            ? "lg:object-right lg:!ml-auto lg:!w-auto"
            : null
        }
      />

      <div
        className="mmd-hero__background bg-primary-faint-blue mod--theme--light"
        aria-hidden="true"
      >
        <SVG.Content
          className="absolute top-1/2 left-1/2 -z-10 size-[200%] -translate-2/4 pointer-events-none"
          width="3500"
          height="2182"
          sprite="MMC-Decor"
        />
      </div>
    </header>
  );
};
