import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import { Edit } from "./edit";

registerBlockType(metadata.name, {
  ...metadata,
  attributes: { ...metadata.attributes },
  edit: Edit,
}); 