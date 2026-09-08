import { ToggleControl } from "@wordpress/components";

import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

const defaultOptions = {
  postExcerpt: true,
};

export default function InspectorControl(props) {
  const { setAttributes, customOptions = {}, suffix = "" } = props;
  const { usePostExcerpt } = get(props, suffix);

  const options = {
    ...defaultOptions,
    ...customOptions,
  };

  return (
    <>
    {
      options.postExcerpt && (
        <ToggleControl
          __nextHasNoMarginBottom
          label="Use the curent post's excerpt"
          checked={usePostExcerpt}
          onChange={() =>
            setSuffixedAttributes(setAttributes, {
              usePostExcerpt: !usePostExcerpt,
            },
            suffix)
          }
        />
      )
    }
    </>
  );
}
