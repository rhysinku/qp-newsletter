import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import "./style.scss";

export const Save = props => {
  const { anchor, innerBlocksData } = props.attributes;

  const blockProps = useBlockProps.save({
    id: anchor,
    className:
      "mmd-tabs mmd-spacing mmd-spacing-md mmd-margin-y bg-system-white mod--theme--light",
  });

  return (
    <section {...blockProps}>
      {innerBlocksData.length > 0 && (
        <div
          className="flex justify-start items-stretch gap-2 mb-4 lg:mb-8 overflow-x-scroll lg:overflow-x-auto [scrollbar-width:none]"
          role="tablist"
        >
          {innerBlocksData.map((block, index) => {
            const { anchor, tabLabel } = block;
            return (
              <button
                id={`tab-button-${anchor}`}
                type={"button"}
                className={
                  "mmd-tabs__tab font-bold inline-block cursor-pointer min-w-[9rem] p-3 lg:py-5 lg:px-4 rounded-3px text-sm lg:text-base bg-neutral-light-grey text-primary-navy-900 aria-[selected=true]:bg-primary-navy-900 aria-[selected=true]:text-system-white hover:bg-primary-navy-900 hover:text-system-white focus:bg-primary-navy-900 focus:text-system-white"
                }
                role={"tab"}
                aria-selected={index === 0}
                aria-controls={anchor}
                dangerouslySetInnerHTML={{ __html: tabLabel }}
              />
            );
          })}
        </div>
      )}

      <InnerBlocks.Content />
    </section>
  );
};
