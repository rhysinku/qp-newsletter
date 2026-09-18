import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import { Text } from "@marameodesign/components";
import { getSpriteUri } from "@marameodesign/utils";

import "./style.scss";

export const Save = (props) => {
  const { anchor } = props.attributes;

  /**
   * block wrapper attributes
   */
  const blockProps = useBlockProps.save({
    id: anchor,
    className: "mmd-accordion-item border-b"
  });

  return (
    <div {...blockProps}>
      <h3 className="py-5">
        <button
          type="button"
          className="accordion-button text-left pr-8 cursor-pointer relative block w-full "          
          aria-expanded="false"
          aria-controls={`${anchor}-content`}
        >
          <Text.Content
            {...props}
            tagName="span"
            className="text-xl font-bold block m-0 text-inherit"
          />
          <span
            aria-hidden="true"
            role="presentation"
            className="size-[18px] pointer-events-none absolute top-[5px] right-0 flex justify-center items-center"
          >
            <svg
              className="accordion-arrow transition-all duration-200 text-inherit"
              aria-hidden="true"
              role="presentation"
              width={40}
              height={40}
            >
              <use href={getSpriteUri('Plus')} className="text-inherit" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={`${anchor}-content`}
        className="max-h-0 overflow-hidden transition-all duration-400 ease-in-out"
      >
        <div className="mmd-content pb-6">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}
