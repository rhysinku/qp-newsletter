import { SelectControl } from "@wordpress/components";
import _ from 'lodash';

import { get } from "./get";

export default function InspectorControl(props) {
  const { setAttributes, customChoices = [] } = props;
  const { backgroundDecoration } = get(props);

  const defaultChoices = [
    { value: "none", label: "None" },
    { value: "ribbon-top-right", label: "Ribbon Top-Right" },
    { value: "ribbon-right", label: "Ribbon Right" },
    // { value: "ribbon-top-hero", label: "Ribbon Top" },
  ];

  const choices = _.isEmpty(customChoices) ? defaultChoices : customChoices;

  return (
    <SelectControl
      label="Background decoration"
      value={backgroundDecoration}
      options={choices}
      onChange={newVal => setAttributes({ backgroundDecoration: newVal })}
      __next40pxDefaultSize
      __nextHasNoMarginBottom
    />
  );
}
