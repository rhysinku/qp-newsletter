import { AttributeObject, Image } from "@marameodesign/components";

const schema = name => {
  const attrObject = new AttributeObject();

  Image.addAttributes(attrObject);

  attrObject.updateDefaultValue("imageIsResponsive", false);

  attrObject.add({
    logoLink: {
      type: "string",
      default: "",
    },
    openInNewTab: {
      type: "boolean",
      default: false,
    },
  });

  return attrObject.getMergedAttributes();
};

export default schema;
