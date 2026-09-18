import { AttributeObject, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);

  attrObject.add({
    childCount: {
      type: "number",
      default: 0,
    },
    bleedRight: {
      type: "boolean",
      default: false,
    }
  });

  return attrObject.getMergedAttributes();
};


