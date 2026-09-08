import { select } from "@wordpress/data";

export const hasInnerBlocks = clientId => {
  const block = select("core/block-editor").getBlock(clientId);
  return !!(block && block.innerBlocks.length > 0);
};
