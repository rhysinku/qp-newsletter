import {
  AttributeObject,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);

  attrObject.add({
    closeInactiveItems: {
      type: "boolean",
      default: false,
    },
  });

  return attrObject.getMergedAttributes();
};

