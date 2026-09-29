import {
  AttributeObject,
  Heading,
  Image,
  Preview,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();
  Preview.addAttributes(attrObject);
  Heading.addAttributes(attrObject);
  Image.addAttributes(attrObject);

  attrObject.updateDefaultValue("headingLevel", 2);
  attrObject.updateDefaultValue("enablePreHeading", true);
  attrObject.updateDefaultValue("imageRis", "hero");
  attrObject.updateDefaultValue("useFeaturedImage", false);

  attrObject.add({
    isFirstSlide: {
      type: "boolean",
      default: false,
    },
    showBreadcrumbs: {
      type: "boolean",
      default: true,
    },
  });

  return attrObject.getMergedAttributes();
};
