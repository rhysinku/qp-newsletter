import { AttributeObject, Image, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Image.addAttributes(attrObject);
  Preview.addAttributes(attrObject);

  attrObject.updateDefaultValue("imageRis", "base-image");

  attrObject.add({
    isContainedHeight: {
      type: "boolean",
      default: false,
    }
  });

  return attrObject.getMergedAttributes();
};
