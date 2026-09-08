import { RichText } from "@wordpress/block-editor";

import { getSpriteUri, setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";
import { twMerge } from "tailwind-merge";

export default function Edit(props) {
  const {
    setAttributes,
    className = "",
    iconWrapperClassName = "",
    tagName = "p",
    placeholder = "Enter your text here...",
    suffix = ""
  } = props;
  const { itText, itIcon } = get(props, suffix);

  return (
    <>
      {itIcon ? (
        <>
          {renderIcon(props)}
          
          <RichText
            tagName={tagName}
            className={className} 
            value={itText}
            onChange={newValue =>
              setSuffixedAttributes(setAttributes, { itText: newValue }, suffix)
            }
            placeholder={placeholder}
          />
        </>
      ) : (
        <RichText
          tagName={tagName}
          className={className} 
          value={itText}
          onChange={newValue =>
            setSuffixedAttributes(setAttributes, { itText: newValue }, suffix)
          }
          placeholder={placeholder}
        />
      )}
    </>
  );
}


const renderIcon = (props) => {
  const { iconClassName = "", iconWrapperClassName = "", suffix = "" } = props;
  const { itText, itIcon } = get(props, suffix);
  
  if (!itIcon) return null;
  
  return (
    <div className={iconWrapperClassName}>
      <svg className={twMerge("icon size-4", iconClassName)}>
        <use href={getSpriteUri(itIcon)}></use>
      </svg>
    </div>
  );
};
