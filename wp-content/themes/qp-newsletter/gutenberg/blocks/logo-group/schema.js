import {
  AttributeObject,
  BlockHeader,
  DisplayMode,
  GridColumns,
  IsInnerBlock,
  Preview,
} from "@marameodesign/components";

const schema = () => {
  const attrObject = new AttributeObject();

  IsInnerBlock.addAttributes(attrObject);
  GridColumns.addAttributes(attrObject);
  Preview.addAttributes(attrObject);
  DisplayMode.addAttributes(attrObject);

  attrObject.updateDefaultValue("columns", "lg:cols-5");

  // attrObject.add({});

  return attrObject.getMergedAttributes();
};

export default schema;
