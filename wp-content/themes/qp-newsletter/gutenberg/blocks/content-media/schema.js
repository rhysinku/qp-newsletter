import { AttributeObject, Media, Heading, Preview, GridColumns, BackgroundColor, ContentPosition } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  // Add Media component attributes
  Media.addAttributes(attrObject);
  
  // Add Heading component attributes
  Heading.addAttributes(attrObject);

  // Add Preview component attributes
  Preview.addAttributes(attrObject);

  GridColumns.addAttributes(attrObject);
  BackgroundColor.addAttributes(attrObject);
  ContentPosition.addAttributes(attrObject);

  attrObject.updateDefaultValue("headingLevel", 2);
  attrObject.updateDefaultValue("imageRis", "content_media_medium");
  attrObject.updateDefaultValue("columns", "lg:cols-2");
  attrObject.updateDefaultValue("bgColor", "bg-system-white");

  return attrObject.getMergedAttributes();
};
