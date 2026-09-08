import { IconPicker } from "@marameodesign/components";
import ICON_OPTIONS from "./icons.json";

export default function InspectorControl(props) {
  const { suffix = "" } = props;

  return (
    <IconPicker
      {...props}
      options={ICON_OPTIONS}
      targetAttribute="icon"
      suffix={suffix}
      __hasSpacingBottom
    />
  );
}
