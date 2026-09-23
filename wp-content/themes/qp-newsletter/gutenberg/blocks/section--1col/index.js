import registerSectionBlock from "../section--core/register-section-block";
import metadata from "./block.json";
import CustomInspector from "./custom-inspector";

const defaultValues = {
  innerBlocksTemplate: [["core/paragraph", {}]],
  innerBlocksAllowedBlocks: null,
  columns: "lg:cols-1",
};

registerSectionBlock(
  metadata,
  defaultValues,
  {
    contentWidth: {
      type: "string",
      default: "normal",
    },
  },
  CustomInspector
);
