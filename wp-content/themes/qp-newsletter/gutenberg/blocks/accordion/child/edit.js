import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import { useHasSelectedInnerBlock } from "@10up/block-components";

import { defaultAllowedBlocks, getSpriteUri } from "@marameodesign/utils";
import { Text } from "@marameodesign/components";

import "./editor.scss";

export const Edit = (props) => {
  const { attributes, setAttributes, clientId, isSelected } = props;
  const { anchor } = attributes;
  const [active, setActive] = useState(false);

  const hasSelectedInnerBlock = useHasSelectedInnerBlock();
  const allowedInnerBlocks = defaultAllowedBlocks(props.name, [
    "accordion",
  ]);


  /**
   * Construct ids
   */
  const blockId = `accordion-${clientId.substr(0, 8)}`;
  const contentId = `${blockId}-content`;

  /**
   * block wrapper attributes
   */
  const blockProps = useBlockProps({
    id: blockId,
    className: "mmd-accordion-item border-b"
  });

  /**
   * manage state
   */
  useEffect(() => {
    // prevent duplicate block ids
    if (blockId !== anchor) {
      setAttributes({ anchor: blockId });
    }

    // handle accordion state
    if (isSelected || hasSelectedInnerBlock) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [clientId, isSelected, hasSelectedInnerBlock]);

  return (
    <div {...blockProps}>      
      <h3 className="py-5">
        <button
          type="button"
          className="accordion-button text-left pr-8 cursor-pointer relative block w-full "          
          aria-expanded="false"
          aria-controls={contentId}
        >
          <Text.Edit
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
              <use href={getSpriteUri(active ? 'Minus' : 'Plus')} className="text-inherit" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          height: active ? "auto" : "0",
        }}
      >
        <div className="mmd-content pb-6">
          <InnerBlocks
            template={[["core/paragraph", {}]]}
            allowedBlocks={allowedInnerBlocks}
          />
        </div>
      </div>
    </div>
  );
}
