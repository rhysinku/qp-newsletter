import { SelectControl, ToggleControl } from "@wordpress/components";
import _ from 'lodash';

import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

const defaultOptions = {
  allowPostTitle: true,
  enableHeadingLevel: false,
  variants: false,
};


export default function InspectorControl(props) {
  const { setAttributes, customOptions = {}, suffix = ""} = props;
  const { usePostTitle, enablePreHeading, variant } = get(props, suffix);

  const options = {
    ...defaultOptions,
    ...customOptions,
  };

  return (
    <>
      {options?.allowPostTitle && (
        <ToggleControl
          label="Use current post's title"
          checked={usePostTitle}
          onChange={() =>
            setSuffixedAttributes(
              setAttributes,
              {
                usePostTitle: !usePostTitle,
              },
              suffix
            )
          }
        />
      )}

      {options?.allowPreHeading && (
        <ToggleControl
          label="Enable Pre-heading"
          checked={enablePreHeading}
          onChange={enablePreHeading =>
            setAttributes({ enablePreHeading: enablePreHeading })
          }
        />
      )}

      {options?.variants && (
        <SelectControl
          label="Variant"
          value={variant}
          options={[
            { label: "Default", value: "default" },
            { label: "Featured Text", value: "featured" },
          ]}
          onChange={newVal =>
            setSuffixedAttributes(setAttributes, { variant: newVal }, suffix)
          }
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />
      )}
    </>
  );
}
