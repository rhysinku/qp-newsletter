import { SelectControl, ToggleControl } from "@wordpress/components";
import { URLInput } from '@wordpress/block-editor';
import _ from 'lodash';
import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

export default function InspectorControl(props) {
  const { setAttributes, customOptions = [], suffix = "", label = "", hideUrlInput = false } = props;
  const { buttonText, buttonUrl, buttonOpenInNewTab, buttonType } = get(props, suffix);

  
  const isCustomOptionsEmpty = !customOptions || 
  (Array.isArray(customOptions) && customOptions.length === 0) ||
  (typeof customOptions === 'object' && Object.keys(customOptions).length === 0);


  const options = !_.isEmpty(customOptions) ? customOptions : [
    { label: "Primary", value: "mod--variant--primary" },
    { label: "Secondary", value: "mod--variant--secondary" },
    { label: "Arrow", value: "mod--variant--arrow" },
  ];

  return (
   <>
    {label && <p className="mb-2">{label}</p>}

    <SelectControl
      label="Button Type"
      value={buttonType}
      options={options}
      onChange={newValue => setSuffixedAttributes(setAttributes, { buttonType: newValue }, suffix)}
      __next40pxDefaultSize
    />

    { buttonType == "mod--variant--arrow-only" && !hideUrlInput && <>
      <URLInput
				value={ buttonUrl }
				onChange={ ( url, post ) => setSuffixedAttributes(setAttributes, { buttonUrl: url }, suffix) }
			/>
      <ToggleControl
        label="Open link in new tab"
        checked={buttonOpenInNewTab}
        onChange={() =>
          setSuffixedAttributes(setAttributes, {
            buttonOpenInNewTab: !buttonOpenInNewTab,
          },
          suffix)
        }
      />
    </>
    }
   </>
  );
}
