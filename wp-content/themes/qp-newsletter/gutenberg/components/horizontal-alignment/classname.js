import { getJustifyContentClassName } from "@marameodesign/utils";

export default function className(props) {
  return getJustifyContentClassName(props.attributes.horizontalAlignment);
};
