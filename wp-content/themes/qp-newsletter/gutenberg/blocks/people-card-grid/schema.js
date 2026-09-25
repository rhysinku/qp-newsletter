import { AttributeObject, Preview } from "@marameodesign/components";

export const schema = () => {
  const attrObject = new AttributeObject();

  // Preview component for block inserter
  Preview.addAttributes(attrObject);

  // Column setting: min 2, max 4, default 2
  attrObject.add({
    columns: {
      type: "number",
      default: 2,
    },
  });

  return attrObject.getMergedAttributes();
};
