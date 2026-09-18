import { AttributeObject, Text, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  // Add preview component
  Preview.addAttributes(attrObject);

  // Add text component for quote content
  Text.addAttributes(attrObject);
  
  // Add text component with "author" suffix for author attribution
  Text.addAttributes(attrObject, "Author");
  
  return attrObject.getMergedAttributes();
};
