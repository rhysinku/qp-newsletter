import { AttributeObject, Text } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Text.addAttributes(attrObject);

  attrObject.add({
    anchor: {
      type: "string",
      default: "",
    },
  });

  return attrObject.getMergedAttributes();
};
