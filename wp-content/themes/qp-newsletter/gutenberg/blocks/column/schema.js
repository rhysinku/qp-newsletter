import {
  AttributeObject,
  BackgroundColor,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);
  BackgroundColor.addAttributes(attrObject);

  attrObject.add({
    renderAppender: {
      type: "boolean",
      default: true,
    },
    template: {
      type: "array",
      default: [["core/paragraph", {}]],
    },
  });

  return attrObject.getMergedAttributes();
};
