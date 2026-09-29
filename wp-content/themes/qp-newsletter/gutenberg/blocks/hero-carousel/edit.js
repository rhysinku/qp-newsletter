import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BackgroundColor, Preview } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";
import Inspector from "./inspector";
import "./editor.scss";

const ALLOWED_SLIDES = ["mmd/hero-carousel-slide"];
const DEFAULT_SLIDES = [
  ["mmd/hero-carousel-slide", {}],
  ["mmd/hero-carousel-slide", {}],
];

export const Edit = props => {
  const { preview } = Preview.get(props);
  const { bgColor, blockTheme } = BackgroundColor.get(props);

  if (preview) {
    return <Preview.Content {...props} />;
  }

  const blockProps = useBlockProps({
    className: twMerge(
      "mmd-hero-carousel relative overflow-hidden isolate py-8 w-full",
      bgColor,
      blockTheme
    ),
  });

  return (
    <header {...blockProps}>
      <Inspector {...props} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-6">
        <div className="p-3.5 bg-primary-blue-50/90 border border-primary-blue-200 rounded-xl flex items-center justify-between shadow-xs">
          <span className="flex items-center gap-2 text-xs font-bold text-primary">
            <span className="dashicons dashicons-images-alt2"></span>
            Home Hero Carousel — Slides use full-width background images & angled content cards
          </span>
          <span className="text-xs text-neutral-grey-600 font-medium">
            Add / reorder slides below
          </span>
        </div>
      </div>

      <div className="mmd-hero-carousel__slides-editor w-full">
        <InnerBlocks
          allowedBlocks={ALLOWED_SLIDES}
          template={DEFAULT_SLIDES}
        />
      </div>
    </header>
  );
};
