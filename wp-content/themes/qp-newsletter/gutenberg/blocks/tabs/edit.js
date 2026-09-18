import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import { useHasSelectedInnerBlock } from "@10up/block-components";
import { useEffect } from "@wordpress/element";
import { createBlock } from "@wordpress/blocks";

import { Preview } from "@marameodesign/components";

import "./editor.scss";
import { minifyId } from "@marameodesign/utils";

const innerBlocksDataEqual = (a, b) => {
  if (!a || !b || a.length !== b.length) return false;
  return a.every((item, i) => item.anchor === b[i].anchor && item.tabLabel === b[i].tabLabel);
};

export const Edit = props => {
  const { isSelected, clientId, attributes, setAttributes } = props;
  const { anchor, innerBlocksData, activeTab } = attributes;
  const { updateBlockAttributes } = useDispatch("core/block-editor");
  const { preview } = Preview.get(props);
  const blockProps = useBlockProps({
    id: anchor,
    className:
      "mmd-tabs mmd-spacing mmd-spacing-md mmd-margin-y bg-system-white mod--theme--light",
  });

  useEffect(() => {
    if (!anchor && clientId) {
      setAttributes({ anchor: `mmd-tabs--${minifyId(clientId)}` });
    }
  }, [anchor, clientId]);

  const hasSelectedInnerBlocks = useHasSelectedInnerBlock();

  const { insertBlock } = useDispatch("core/block-editor");

  // Get this block's innerblocks
  const innerBlocks = useSelect(select => {
    return select("core/block-editor").getBlocks(clientId);
  });
  // Get the order of the innerblocks
  const innerBlocksOrder = useSelect(select => {
    return select("core/block-editor").getBlockOrder(clientId);
  });

  // Update innerblocks data when tab label changes
  const updateInnerBlockAttribute = (value, blockClientId, attribute) => {
    const newAttributes = { [attribute]: value };
    updateBlockAttributes(blockClientId, newAttributes);

    // Synchronize innerBlocksData at the same time
    const updatedInnerBlocksData = innerBlocks.map(block => {
      if (block.clientId === blockClientId) {
        // If this is the block we're updating, use the new value for the attribute
        return {
          anchor: block.attributes.anchor,
          tabLabel: value,
        };
      }
      // For other blocks, return the attributes as they are
      return {
        anchor: block.attributes.anchor,
        tabLabel: block.attributes.tabLabel,
      };
    });

    // Check if there is a meaningful change before setting attributes
    if (!innerBlocksDataEqual(updatedInnerBlocksData, innerBlocksData)) {
      setAttributes({ innerBlocksData: updatedInnerBlocksData });
    }
  };

  // Effect to update innerBlocksData when the innerblocks order or anchor attributes changes
  useEffect(() => {
    if (innerBlocks.length > 0) {
      const updatedInnerBlocksData = innerBlocks.map(block => {
        const { anchor, tabLabel } = block.attributes;
        return { anchor, tabLabel };
      });

      // Only update if there's a difference in data
      if (!innerBlocksDataEqual(updatedInnerBlocksData, innerBlocksData)) {
        setAttributes({ innerBlocksData: updatedInnerBlocksData });
      }
    }
  }, [innerBlocksOrder]);

  const setCurrentActiveTabHandler = index => {
    setAttributes({ activeTab: index });
  };

  return (
    <>
      {preview && <Preview.Content {...props} blockDir={"tabs"} />}
      {!preview && (
        <>
          <section {...blockProps}>
            {innerBlocks.length > 0 && (
              <div
                className="flex justify-start items-stretch gap-2 mb-4 lg:mb-8 overflow-x-scroll lg:overflow-x-auto [scrollbar-width:none]"
                role="tablist"
              >
                {innerBlocks.map((block, index) => {
                  const { attributes, clientId } = block;
                  const { anchor, tabLabel } = attributes;
                  return (
                    <button
                      key={index}
                      id={`tab-button-${anchor}`}
                      type={"button"}
                      className={
                        "mmd-tabs__tab font-bold inline-block cursor-pointer min-w-[9rem] p-3 lg:py-5 lg:px-4" +
                        " rounded-3px text-sm lg:text-base bg-neutral-light-grey text-primary-navy-900 aria-[selected=true]:bg-primary-navy-900 aria-[selected=true]:text-system-white hover:bg-primary-navy-900 hover:text-system-white focus:bg-primary-navy-900 focus:text-system-white"
                      }
                      role={"tab"}
                      aria-selected={activeTab === index}
                      aria-controls={anchor}
                      onClick={() => setCurrentActiveTabHandler(index)}
                    >
                      <RichText
                        tagName={"span"}
                        value={tabLabel}
                        allowedFormats={[]}
                        onChange={newVal =>
                          updateInnerBlockAttribute(
                            newVal,
                            clientId,
                            "tabLabel"
                          )
                        }
                        placeholder={"Tab label"}
                      />
                    </button>
                  );
                })}

                {(isSelected || hasSelectedInnerBlocks) && (
                  <button
                    type="button"
                    className="mmd-custom-block-inserter"
                    onClick={() => {
                      const newBlock = createBlock("mmd/tab-child");

                      insertBlock(newBlock, undefined, clientId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      style={{
                        marginRight: ".5rem",
                      }}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    Insert tab item
                  </button>
                )}
              </div>
            )}

            <InnerBlocks
              template={[["mmd/tab-child"]]}
              allowedBlocks={["mmd/tab-child"]}
              renderAppender={false}
            />
          </section>
        </>
      )}
    </>
  );
};
