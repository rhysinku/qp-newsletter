import {
  AttributeObject,
  BackgroundColor,
  GridColumns,
  Heading,
  Image,
  Preview,
  BlockPosition,
  ContentPosition,
  NoToc,
} from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);

  Heading.addAttributes(attrObject);
  Image.addAttributes(attrObject);

  GridColumns.addAttributes(attrObject);
  BackgroundColor.addAttributes(attrObject);
  BlockPosition.addAttributes(attrObject);
  ContentPosition.addAttributes(attrObject);
  NoToc.addAttributes(attrObject);

  attrObject.updateDefaultValue("imageRis", "cta");
  attrObject.updateDefaultValue("columns", "lg:cols-60-40");
  attrObject.updateDefaultValue("bgColor", "bg-system-white");
  attrObject.updateDefaultValue("enablePreHeading", true);
    

  // Add variant attribute - using the names from PHP templates
  attrObject.add({
    variant: {
      enum: ["mod--variant--default", "mod--variant--simple", "mod--variant--simple-centered"],
      default: "mod--variant--default",
    },
    currentPostType: {
      type: "string",
      default: "page"
    }
  });

  return attrObject.getMergedAttributes();
};

