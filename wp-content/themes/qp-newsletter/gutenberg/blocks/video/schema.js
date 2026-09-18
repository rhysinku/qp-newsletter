import { AttributeObject, Media, Preview } from "@marameodesign/components";

const schema = () => {
  const attrObject = new AttributeObject();

  Preview.addAttributes(attrObject);
  Media.addAttributes(attrObject);

  attrObject.updateDefaultValue("mediaType", "video-local");

  // attrObject.add({});

  return attrObject.getMergedAttributes();
};

export default schema;
