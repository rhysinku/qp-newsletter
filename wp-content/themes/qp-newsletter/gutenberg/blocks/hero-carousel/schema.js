import {
  AttributeObject,
  BackgroundColor,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();
  Preview.addAttributes(attrObject);
  BackgroundColor.addAttributes(attrObject);
  attrObject.updateDefaultValue("bgColor", "bg-primary-navy-900");

  return attrObject.getMergedAttributes();
};
