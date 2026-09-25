import {
  AttributeObject,
  Heading,
  Image,
  Text,
  Button,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  // Preview component for block inserter
  Preview.addAttributes(attrObject);

  // Person Name (Heading, default H3)
  Heading.addAttributes(attrObject);
  attrObject.updateDefaultValue("headingLevel", 3);
  attrObject.updateDefaultValue("heading", "");

  // Avatar Image (RIS preset: people-avatar)
  Image.addAttributes(attrObject);
  attrObject.updateDefaultValue("imageRis", "people-avatar");

  // Role / Position
  Text.addAttributes(attrObject, "Role");
  attrObject.updateDefaultValue("textRole", "");

  // Organization / Affiliation
  Text.addAttributes(attrObject, "Org");
  attrObject.updateDefaultValue("textOrg", "");

  // CTA Button / Profile Link
  Button.addAttributes(attrObject);
  attrObject.updateDefaultValue("buttonText", "View Profile");
  attrObject.updateDefaultValue("buttonType", "mod--variant--arrow");

  // Custom attributes
  attrObject.add({
    hideImage: {
      type: "boolean",
      default: false,
    },
  });

  return attrObject.getMergedAttributes();
};
