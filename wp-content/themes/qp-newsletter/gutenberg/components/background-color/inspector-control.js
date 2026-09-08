import { twMerge } from "tailwind-merge";
import _ from "lodash";
import {
  getGutenbergConfig,
  getThemeFromBgColor,
  setSuffixedAttributes, useDirectParentBlock,
} from "@marameodesign/utils";
import get from "./get";

export function InspectorControl(props) {
  const {
    setAttributes,
    optionTitle = "Background color",
    suffix = "",
    allowedColors = [],
    __hasSpacingBottom = true,
  } = props;
  const { bgColor } = get(props, suffix);

  /**
   * option choices
   */
  let options;

  if (!_.isEmpty(allowedColors)) {
    // Use allowed colors if provided
    options = allowedColors.map(color => ({
      label: color.label,
      key: color.key,
    }));
  } else {
    // Use all available colors from config
    options = Object.entries(getGutenbergConfig("bgColor"))
      .map(([key, value]) => {
        if (value) {
          return {
            label: value.label,
            key: value.value,
          };
        }
      })
      .filter(item => item.key && item.key.length);
  }

  /**
   * Remove "bg-parent" option when not an inner block.
   * This bg color option does not look good on stand-alone blocks.
   */
  const parentBlock = useDirectParentBlock(props.clientId);
  if (!parentBlock && options.some(item => item.key === "bg-parent")) {
    options = options.filter(item => item.key !== "bg-parent");
    // Reset bg color and theme.
    // This is for cases where a block that is using "bg-parent" would be moved out of the parent and turned into a
    // stand-alone block.
    if (bgColor === "bg-parent") {
      setSuffixedAttributes(
        setAttributes,
        {
          bgColor: options[0].key,
          blockTheme: getThemeFromBgColor(options[0].key),
        },
        suffix
      )
    }
  }

  return (
    <>
      <h3>{optionTitle}</h3>
      <div className="mmd-inspector-button-group">
        {options.map(option => (
          <button
            key={option.key}
            onClick={() =>
              setSuffixedAttributes(
                setAttributes,
                {
                  bgColor: option.key,
                  blockTheme: getThemeFromBgColor(option.key),
                },
                suffix
              )
            }
            className={twMerge(
              "mmd-color-button",
              option.key,
              bgColor === option.key ? "mmd-color-selected" : ""
            )}
            title={option.label}
          />
        ))}
      </div>
      {__hasSpacingBottom && <br />}
    </>
  );
}
