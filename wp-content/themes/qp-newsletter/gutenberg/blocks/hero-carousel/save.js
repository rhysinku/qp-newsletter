import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BackgroundColor } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";
import "./style.scss";

export const Save = props => {
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  const blockProps = useBlockProps.save({
    className: twMerge(
      "mmd-hero-carousel splide relative overflow-hidden isolate w-full",
      bgColor,
      blockTheme
    ),
  });

  return (
    <header {...blockProps} aria-label="Hero Carousel" data-splide='{"type":"loop","arrows":false,"pagination":false,"speed":600}'>
      <div className="splide__track size-full">
        <ul className="splide__list">
          <InnerBlocks.Content />
        </ul>
      </div>
    </header>
  );
};
