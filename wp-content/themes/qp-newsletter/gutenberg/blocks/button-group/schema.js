import {
  AttributeObject,
  HorizontalAlignment,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);
  HorizontalAlignment.addAttributes(attrObject);

  attrObject.add({
    className: {
      type: "string",
      default: "",
    },
    hasInnerBlocks: {
      type: "boolean",
      default: false,
    },
    innerBlocksTemplate: {
      type: "array",
      default: [
        ["mmd/button", {}],
      ],
    },
  });

  return attrObject.getMergedAttributes();
};

