import {
  AttributeObject,
  Heading,
  Preview,
  Image,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);
  Heading.addAttributes(attrObject);
  Image.addAttributes(attrObject);
  attrObject.updateDefaultValue("imageRis", "hero");

  // Add custom attributes for hero-featured
  attrObject.add({
    showImageAsBackground: {
      type: "boolean",
      default: false,
    },
    showBreadcrumbs: {
      type: "boolean",
      default: true,
    },
    showBgDecor: {
      type: "boolean",
      default: false,
    },
    showImageBgDecor: {
      type: "boolean",
      default: true,
    },
  });

  attrObject.updateDefaultValue("headingLevel", 1);
  attrObject.updateDefaultValue("usePostTitle", true);
  attrObject.updateDefaultValue("useFeaturedImage", true);

  return attrObject.getMergedAttributes();
};
