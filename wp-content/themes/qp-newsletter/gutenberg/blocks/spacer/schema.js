import {
  AttributeObject,
  Spacing,
  BackgroundColor,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  attrObject.add({
    displayType: {
      type: 'string',
      default: 'space',
    },
  });

  Spacing.addAttributes(attrObject);
  Preview.addAttributes(attrObject);

  return attrObject.getMergedAttributes();
};
