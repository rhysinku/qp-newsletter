import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

export const Save = props => {
  const { bleedRight, childCount } = props.attributes;

  if (childCount === 0) {
    return <></>;
  } else if (childCount < 3) {
    const blockProps = useBlockProps.save({
      className: twMerge(
        "mmd-gallery mmd-content mmd-spacing mmd-spacing-md mmd-padding-y",
        bleedRight && "mod--display--bleed-right",
        childCount === 2 && "mod--display--grid"
      ),
    });

    return (
      <section {...blockProps}>
        <InnerBlocks.Content />
      </section>
    );
  } else {
    const blockProps = useBlockProps.save({
      className: twMerge(
        "mmd-gallery mmd-content mmd-spacing mmd-spacing-md mmd-padding-y mod--display--carousel",
        bleedRight && "mod--display--bleed-right"
      ),
    });

    return (
      <section {...blockProps}>
        <div className="mmd-gallery__main splide">
          <div className="splide__track">
            <div className="splide__list">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </section>
    );
  }
};
