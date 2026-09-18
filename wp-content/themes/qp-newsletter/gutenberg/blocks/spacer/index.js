import { registerBlockType } from "@wordpress/blocks";

import metadata from './block.json';
import { schema } from './schema';
import { Edit } from './edit';
import { Save } from './save';

registerBlockType(metadata.name, {
  ...metadata,
  attributes: schema(),
  edit: Edit,
  save: Save,
});
