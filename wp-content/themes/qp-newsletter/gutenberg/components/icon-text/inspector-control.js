import { SelectControl } from "@wordpress/components";

import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

const ICON_OPTIONS = [
  { label: "None", value: "" },
  { label: "Arrow Swap", value: "ArrowSwap" },
  { label: "Secure Window", value: "Icon-secure-window" },
  { label: "Cross", value: "Icon-cross" },
  { label: "Window", value: "Icon-window" },
  { label: "Eye Pattern", value: "Icon-eye-pattern" },
  { label: "Pencil Pattern", value: "Icon-pencil-pattern" },
  { label: "Card Document", value: "Card-document" },
  { label: "Two Arrow", value: "TwoArrow" },
  { label: "Card Credit", value: "Card-credit" },
];

export default function InspectorControl(props) {
  const { setAttributes, suffix = "" } = props;
  const { itIcon } = get(props, suffix);

  return (
    <SelectControl
      label="Icon"
      value={itIcon}
      options={ICON_OPTIONS}
      onChange={newVal =>
        setSuffixedAttributes(setAttributes, { itIcon: newVal }, suffix)
      }
      __next40pxDefaultSize
      __nextHasNoMarginBottom
    />
  );
}
