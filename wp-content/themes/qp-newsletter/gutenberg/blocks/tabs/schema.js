import { AttributeObject, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);

  attrObject.add({
    anchor: {
      type: "string"
    },
    innerBlocksData: {
      type: "array",
      default: [],
    },
    activeTab: {
      type: "number",
      default: 0,
    },
  });

  return attrObject.getMergedAttributes();
};
