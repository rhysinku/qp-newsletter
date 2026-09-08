// Get config data from client's website config
import { getGutenbergConfig } from "./get-website-config";

const blocksConfig = getGutenbergConfig("blocks");

const matchesOrStartsWith = (names, str) => {
  if (!Array.isArray(names) || typeof str !== "string") {
    throw new Error("Invalid input: expected an array of names and a string");
  }

  return names.some(
    name =>
      typeof name === "string" &&
      name.length > 0 &&
      (str === `mmd/${name}` || str.startsWith(`mmd/${name}`))
  );
};

/**
 * Default allowed inner blocks
 */
export const defaultAllowedBlocks = (currentBlockName = "", exclude = []) => {
  const baseBlocks = [
    "mmd/heading",
    "mmd/heading-button",
    "core/paragraph",
    "core/list",
    "core/table",
    "mmd/button-group",
    "mmd/image",
    "mmd/video",
    "mmd/accordion",
    "mmd/cta",
    "mmd/quote",
    "mmd/separator",
  ];


  const allBlocks = [
    ...baseBlocks,
  ];

  return allBlocks.filter(
    block => block !== currentBlockName && !matchesOrStartsWith(exclude, block)
  );
};
