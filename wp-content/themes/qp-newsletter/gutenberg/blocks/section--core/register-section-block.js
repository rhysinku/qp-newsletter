import { registerBlockType } from "@wordpress/blocks";

import { schema } from "./schema";
import { Edit } from "./edit";
import { Save } from "./save";

export default function registerSectionBlock(metadata, defaultValues = {}, customAttributes = {}, CustomInspector = null) {
  const EditWithCustomInspector = (props) => {
    return Edit(props, CustomInspector);
  };

  registerBlockType(metadata.name, {
    ...metadata,
    attributes: schema(defaultValues, customAttributes),
    edit: EditWithCustomInspector,
    save: Save,
  });
}
