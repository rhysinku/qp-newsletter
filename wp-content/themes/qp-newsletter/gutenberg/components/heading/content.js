import { RichText } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import get from "./get";

export default function Content(props) {
  const {
    className = "",
    preHeadingClassName = "",
    tagName = null,
    suffix = "",
  } = props;
  const { heading, headingLevel, preHeading, enablePreHeading, variant } = get(
    props,
    suffix
  );

  // Construct final tag name for the heading
  let finalTagName = tagName ?? `h${headingLevel}`;
  if (variant === "featured") {
    finalTagName = "p";
  }

  return (
    <>
      {enablePreHeading && preHeading && (
        <RichText.Content
          tagName="span"
          className={twMerge(
            "uppercase tracking-[1.4px] text-sm text-primary mb-2 font-bold block",
            preHeadingClassName
          )}
          value={preHeading}
        />
      )}

      {heading && (
        <RichText.Content
          tagName={finalTagName}
          className={twMerge(className, variant && `mod--variant--${variant}`)}
          value={heading}
        />
      )}
    </>
  );
}
