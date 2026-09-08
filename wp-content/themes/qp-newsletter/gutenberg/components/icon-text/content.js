import { RichText } from "@wordpress/block-editor";
import { getSpriteUri } from "@marameodesign/utils";

import get from "./get";
import { twMerge } from "tailwind-merge";

export default function Content(props) {
  const { className = "", iconWrapperClassName = "", tagName = "p", suffix = "" } = props;
  const { itText, itIcon } = get(props, suffix);

  return (
    <>
      {itText && (
        <>
          {itIcon ? (
            <>
              {renderIcon(props)}
              
              <RichText.Content
                tagName={tagName}
                className={className}
                value={itText}
              />
            </>
          ) : (
            <RichText.Content
              tagName={tagName}
              className={className}
              value={itText}
            />
          )}
        </>
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