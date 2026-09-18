import {
  AttributeObject,
  Heading,
  Preview,
  Button,
  NoToc,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  // Add Heading component attributes
  Heading.addAttributes(attrObject);

  // Add Button component attributes
  Button.addAttributes(attrObject);

  // Add Preview component attributes
  Preview.addAttributes(attrObject);
  NoToc.addAttributes(attrObject);

  // Set default values
  attrObject.updateDefaultValue("headingLevel", 2);
  attrObject.updateDefaultValue("buttonType", "mod--variant--arrow");

  attrObject.add({
    showButton: {
      type: "boolean",
      default: false,
    }
  });

  return attrObject.getMergedAttributes();
};
