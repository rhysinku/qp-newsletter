import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { minifyId } from "@marameodesign/utils";

export const Edit = props => {
  const { attributes, setAttributes, clientId, context } = props;
  const { anchor } = attributes;
  const activeTab = context["mmd/tabsActiveTab"];
  const parentAnchor = context["mmd/tabsAnchor"];
  const [isActive, setIsActive] = useState(false);

  const index = useSelect(
    select => select("core/block-editor").getBlockIndex(clientId),
    [clientId]
  );

  useEffect(() => {
    if (!anchor) {
      const minifiedId = minifyId(clientId);
      setAttributes({ anchor: `tab-panel-${parentAnchor}-${minifiedId}` });
    }

    setAttributes({ isFirst: index === 0 });
  }, [anchor, clientId, index]);

  useEffect(() => {
    setIsActive(index === activeTab);
  }, [activeTab]);

  const blockProps = useBlockProps({
    id: anchor,
    className: "mmd-tabs__panel mmd-content",
    role: "tabpanel",
    tabIndex: "0",
    ariaLabelledBy: `tab-button-${anchor}`,
    style: {
      display: isActive ? "block" : "none",
    },
  });

  return (
    <div {...blockProps}>
      <InnerBlocks
        renderAppender={() => {
          return (
            <>
              <h6 style={{ marginBottom: "1rem" }}>
                Add Tab Item Content
              </h6>
              <InnerBlocks.ButtonBlockAppender />
            </>
          );
        }}
      />
    </div>
  );
};
