import { getVerticalAlignmentClassname } from "@marameodesign/utils";

export default function get(props, direction = "row") {
  return {
    verticalAlignment: props.attributes.verticalAlignment,
    verticalAlignmentClassName: getVerticalAlignmentClassname(props.attributes.verticalAlignment, direction),
  };
};
