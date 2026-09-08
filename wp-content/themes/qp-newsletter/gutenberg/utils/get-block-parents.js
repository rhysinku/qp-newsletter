import { getGutenbergConfig } from "./get-website-config";

export function getBlockParents(parentNames = []) {
  const blocks = getGutenbergConfig('blocks') ?? {};
  const blockNames = Object.keys(blocks);

  const parentBlocks = blockNames.filter(blockName => {
    return parentNames.some(parentName => blockName.startsWith(parentName));
  });

  return Array.from(parentBlocks).map((block) => {
    return `mmd/${block}`;
  });
}