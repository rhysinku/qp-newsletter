import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import { schema } from "./schema";
import { Edit } from "./edit";
import { Save } from "./save";
import transforms from "./transforms";

import "./style.scss";

// Merge metadata with our custom attributes
const blockSettings = {
  ...metadata,
  edit: Edit,
  save: Save,
  attributes: schema(),
  transforms,
};

registerBlockType(metadata.name, blockSettings);
