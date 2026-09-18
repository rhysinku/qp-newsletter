import { AttributeObject, Button, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);
  Button.addAttributes(attrObject);

  return attrObject.getMergedAttributes();
};

