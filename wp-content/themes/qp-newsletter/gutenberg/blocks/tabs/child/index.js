import { registerBlockType } from "@wordpress/blocks";

import { Edit } from "./edit";
import { Save } from "./save";
import metadata from "./block.json";
import { schema } from "./schema";

registerBlockType(metadata.name, {
  ...metadata,
  attributes: {
    ...schema(),
  },
  edit: Edit,
  save: Save,
});
