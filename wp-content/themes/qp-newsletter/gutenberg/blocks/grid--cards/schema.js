import {
  AttributeObject,
  GridColumns,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);
  GridColumns.addAttributes(attrObject);

  attrObject.updateDefaultValue('columns', 'lg:cols-4');

  return attrObject.getMergedAttributes();
};
