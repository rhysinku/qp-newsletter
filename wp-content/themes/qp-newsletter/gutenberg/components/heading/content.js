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
  const {
    heading,
    headingLevel,
    preHeading,
    enablePreHeading,
    headingAlignment,
    variant,
  } = get(props, suffix);

  // Construct final tag name for the heading
  let finalTagName = tagName ?? `h${headingLevel}`;
  if (variant === "featured") {
    finalTagName = "p";
  }

  const hasPreHeading = enablePreHeading && preHeading;

  if (!heading && !hasPreHeading) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "flex flex-col",
        headingAlignment === "center"
          ? "w-full text-center justify-center items-center"
          : "flex-1 w-full lg:w-auto text-left justify-start items-start"
      )}
    >
      {hasPreHeading && (
        <RichText.Content
          tagName="span"
          className={twMerge(
            "mmd-subheading mmd-preheading mb-2 block",
            preHeadingClassName
          )}
          value={preHeading}
        />
      )}

      {heading && (
        <RichText.Content
          tagName={finalTagName}
          className={twMerge(
            className,
            headingAlignment === "center" ? "text-center" : "text-left",
            variant && `mod--variant--${variant}`
          )}
          value={heading}
        />
      )}
    </div>
  );
}
