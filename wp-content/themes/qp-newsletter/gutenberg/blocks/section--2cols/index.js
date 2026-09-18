import registerSectionBlock from "../section--core/register-section-block";
import metadata from "./block.json";
import CustomInspector from "./custom-inspector";

import "./style.scss";

const defaultValues = {
  innerBlocksTemplate: [["mmd/column", {}], ["mmd/column", {}]],
  innerBlocksAllowedBlocks: ["mmd/column"],
  columns: "lg:cols-2",
  customOptions: {
    enableGridColumns: true,
    enableCenterGridItems: false,
    gridColumnsChoices: ["2 Columns", "30-70 Columns", "70-30 Columns"],
  },
  wrapperClassName: ["mmd-row-lg"],
};

registerSectionBlock(
  metadata,
  defaultValues,
  {
    enableStickySidebar: {
      type: 'boolean',
      default: false
    }
  },
  CustomInspector
);
