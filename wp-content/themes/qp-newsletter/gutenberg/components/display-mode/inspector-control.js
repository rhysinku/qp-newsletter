import { SelectControl } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import _ from 'lodash';

import get from "./get";

export function InspectorControl(props) {
  const { setAttributes, choices = [] } = props;
  const { displayMode } = get(props);

  const defaultChoices = [
    { label: "Standard", value: "standard" },
    { label: "Featured", value: "featured" },
    { label: "Title-Only", value: "title-only" },
  ];

  const displayModeChoices = _.isEmpty(choices) ? defaultChoices : choices;

  return (
    <SelectControl
      label="Display mode"
      value={displayMode}
      options={displayModeChoices}
      onChange={newVal => setAttributes({ displayMode: newVal })}
      __next40pxDefaultSize
      __nextHasNoMarginBottom
    />
  );
}


export function watchParentAttributes(props) {
  const { attributes, setAttributes, context } = props;

  const parentDisplayMode = context["mmd/displayMode"];
  useEffect(() => {
    if (parentDisplayMode !== undefined && parentDisplayMode !== attributes.displayMode) {
      setAttributes({ displayMode: parentDisplayMode });
    }
  }, [
    parentDisplayMode,
    attributes,
    setAttributes,
  ]);
}
