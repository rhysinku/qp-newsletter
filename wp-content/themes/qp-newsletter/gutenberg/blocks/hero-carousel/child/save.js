import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Heading, Image } from "@marameodesign/components";

export const Save = props => {
  const { attributes } = props;
  const { isFirstSlide, headingLevel, showBreadcrumbs = true } = attributes;
  const effectiveLevel = headingLevel || (isFirstSlide ? 1 : 2);

  const blockProps = useBlockProps.save({
    className: "splide__slide mmd-hero-carousel-slide relative min-h-[32rem] lg:min-h-[40rem] flex items-center overflow-hidden list-none",
  });

  return (
    <li {...blockProps}>
      {/* Background Image covering the slide */}
      <div className="mmd-hero-carousel-slide__bg absolute inset-0 size-full -z-10 overflow-hidden">
        <Image.Content
          {...props}
          wrapperClassName="size-full overflow-hidden"
          ratioWrapperClassName="size-full"
          className="size-full object-cover"
          fetchPriority={isFirstSlide ? "high" : undefined}
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* Foreground Angled Content Card inside aligned container */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-10 lg:py-16 flex items-center">
        <div className="mmd-hero-carousel-slide__card relative z-10 w-full max-w-[38rem] bg-white text-primary-navy-900 p-6 md:p-10 shadow-2xl">
          {showBreadcrumbs && <div className="breadcrumbs-placeholder" />}
          <Heading.Content
            {...props}
            tagName={`h${effectiveLevel}`}
            className="text-heading-1 font-bold tracking-tight text-primary-navy-900"
            preHeadingClassName="mmd-hero__pre-heading"
          />
          <div className="mmd-hero-carousel-slide__content mt-4 text-neutral-grey-700">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </li>
  );
};
