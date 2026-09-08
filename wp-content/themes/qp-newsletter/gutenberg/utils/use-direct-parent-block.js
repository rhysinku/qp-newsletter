import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Returns the direct parent block of the current block.
 */
export const useDirectParentBlock = clientId => {
  return useSelect(
    select => {
      const { getBlock, getBlockRootClientId } = select(blockEditorStore);

      const parentClientId = getBlockRootClientId(clientId);

      return parentClientId ? getBlock(parentClientId) : null;
    },
    [clientId]
  );
};
