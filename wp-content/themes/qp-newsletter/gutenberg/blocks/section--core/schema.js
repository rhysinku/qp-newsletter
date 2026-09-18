import {
  AttributeObject,
  BackgroundColor,
  BackgroundDecoration,
  GridColumns,
  Preview,
  ContentPosition,
  NoToc,
} from "@marameodesign/components";

export const schema = (defaultValues = {}, customAttributes = {}) => {
  const attrObject = new AttributeObject();

  // component attributes
  Preview.addAttributes(attrObject);
  BackgroundColor.addAttributes(attrObject);
  BackgroundDecoration.addAttributes(attrObject);
  GridColumns.addAttributes(attrObject);
  ContentPosition.addAttributes(attrObject);
  NoToc.addAttributes(attrObject);
  

  // internal attributes
  attrObject.add({
    wrapperClassName: {
      type: "array",
      default: [],
    },
    containerClassName: {
      type: "array",
      default: [],
    },

    blockPosition: {
      type: "string",
      default: "mmd-block-position--standard",
    },

    bgChoices: {
      type: "array",
      default: [],
    },

    // inner blocks
    innerBlocksTemplate: {
      type: "array",
      default: [["core/paragraph", {}]],
    },
    innerBlocksAllowedBlocks: {
      type: "array",
      default: ["core/paragraph"],
    },

    lockTemplate: {
      type: "boolean",
      default: false,
    },

    customOptions: {
      type: "array",
      default: [
        {
          enableGridColumns: false,
          gridColumnsChoices: {
            type: "array",
            default: ["1 Column", "2 Columns", "3 Columns", "4 Columns"],
          },
        },
      ],
    },
  });

  if (customAttributes) {
    Object.entries(customAttributes).forEach(([key, value]) => {
      attrObject.add({ [key]: value });
    });
  }

  if (defaultValues) {
    // update default values
    Object.entries(defaultValues).forEach(([key, value]) => {
      attrObject.updateDefaultValue(key, value);
    });
  }


  return attrObject.getMergedAttributes();
};

