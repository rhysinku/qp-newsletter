import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import edit from "./edit";
import save from "./save";
import schema from "./schema";

// Child block
import "./child";

registerBlockType(metadata.name, {
  ...metadata,
  attributes: {
    ...schema(),
  },
  edit,
  save,
});
