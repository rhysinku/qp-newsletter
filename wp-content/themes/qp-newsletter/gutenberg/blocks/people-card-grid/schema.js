import { AttributeObject, GridColumns, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  // Preview component for block inserter
  Preview.addAttributes(attrObject);

  // Layout Grid Columns component (default: lg:cols-2)
  GridColumns.addAttributes(attrObject);
  attrObject.updateDefaultValue("columns", "lg:cols-2");

  return attrObject.getMergedAttributes();
};
