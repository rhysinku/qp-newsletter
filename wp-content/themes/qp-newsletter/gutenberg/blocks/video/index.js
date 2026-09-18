import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import schema from "./schema";
import edit from "./edit";
import save from "./save";

registerBlockType(metadata.name, {
  ...metadata,
  attributes: {
    ...schema(),
  },
  edit,
  save,
});
