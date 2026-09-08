import { RichText } from "@wordpress/block-editor";
import { select } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { useHasSelectedInnerBlock } from "@10up/block-components";
import { twMerge } from "tailwind-merge";

import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

export default function Edit(props) {
  const {
    setAttributes,
    isSelected,
    className = "",
    allowedFormats = [],
    hideWhenInactive = false,
    placeholder = "Enter your text here...",
    preHeadingClassName = "",
    preHeadingPlaceholder = "Pre-heading text (optional)",
    allowedHeadingLevels = [1, 2, 3, 4, 5, 6],
    /**
     * NOTE:
     *  Added support for custom tagName to prevent loss of existing content
     *  While improving blocks for SEO
     */
    tagName = null,
    suffix = "",
  } = props;

  const {
    heading,
    headingLevel,
    usePostTitle,
    enablePreHeading,
    preHeading,
    headingAlignment,
    variant,
  } = get(props, suffix);

  const hasSelectedInnerBlock = useHasSelectedInnerBlock();
  const isActive = isSelected || hasSelectedInnerBlock;

  const postTitle = select("core/editor").getEditedPostAttribute("title");

  useEffect(() => {
    let headingProps = {};

    // Update heading value to post title if enabled
    if (usePostTitle && postTitle !== heading) {
      headingProps.heading = postTitle;
    }

    // Update heading level
    // And ensure it is allowed
    if (
      !allowedHeadingLevels.includes(headingLevel) &&
      allowedHeadingLevels[0]
    ) {
      headingProps.headingLevel = allowedHeadingLevels[0];
    }

    if (Object.keys(headingProps).length > 0) {
      setSuffixedAttributes(setAttributes, headingProps, suffix);
    }
  }, [usePostTitle, postTitle, headingLevel]);

  // Construct final tag name for the heading
  let finalTagName = tagName ?? `h${headingLevel}`;
  if (variant === "featured") {
    finalTagName = "p";
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
      {enablePreHeading && (preHeading || isSelected) && (
        <RichText
          tagName="span"
          className={twMerge(
            "mmd-subheading mmd-preheading mb-2 block",
            preHeadingClassName
          )}
          value={preHeading}
          allowedFormats={[]}
          onChange={value =>
            setSuffixedAttributes(setAttributes, { preHeading: value }, suffix)
          }
          placeholder={preHeadingPlaceholder}
        />
      )}

      {!usePostTitle ? (
        <RichText
          style={{
            display: hideWhenInactive && !heading && !isActive ? "none" : null,
          }}
          tagName={finalTagName}
          className={twMerge(
            className,
            headingAlignment === "center" ? "text-center" : "text-left",
            variant && `mod--variant--${variant}`
          )}
          value={heading}
          allowedFormats={allowedFormats}
          onChange={value =>
            setSuffixedAttributes(setAttributes, { heading: value }, suffix)
          }
          placeholder={placeholder}
        />
      ) : (
        <RichText.Content
          style={{
            display: hideWhenInactive && !heading && !isActive ? "none" : null,
          }}
          tagName={finalTagName}
          className={twMerge(
            className,
            headingAlignment === "center" ? "text-center" : "text-left",
            variant && `mod--variant--${variant}`
          )}
          value={heading}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
