import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Returns the root parent block of the current block.
 */
export const useRootParentBlock = (clientId) => {
  return useSelect(
    (select) => {
      const { getBlock, getBlockParents } = select(blockEditorStore);

      let currentId = clientId;
      let parentIds = getBlockParents(currentId);

      while (parentIds.length > 0) {
        currentId = parentIds[parentIds.length - 1];
        parentIds = getBlockParents(currentId);
      }

      return getBlock(currentId);
    },
    [clientId]
  );
};
