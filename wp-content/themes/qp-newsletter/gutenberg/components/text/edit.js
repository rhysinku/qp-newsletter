import { RichText } from "@wordpress/block-editor";
import { useHasSelectedInnerBlock } from "@10up/block-components";
import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { setSuffixedAttributes } from "@marameodesign/utils";
import get from "./get";

export default function Edit(props) {
  const {
    setAttributes,
    isSelected,
    className = "",
    tagName = "p",
    placeholder = "Enter your text here...",
    hideWhenInactive = false,
    suffix = ""
  } = props;
  const { text, usePostExcerpt } = get(props, suffix);

  const hasSelectedInnerBlock = useHasSelectedInnerBlock();
  const isActive = isSelected || hasSelectedInnerBlock;

  const postExcerpt = useSelect(
    select => select("core/editor").getEditedPostAttribute("excerpt"),
    []
  );

  useEffect(() => {
    if (usePostExcerpt && postExcerpt !== text) {
      setSuffixedAttributes(setAttributes, { text: postExcerpt }, suffix);
    }
  }, [usePostExcerpt, postExcerpt]);

  return (
    <>
      {usePostExcerpt ? (
        <RichText.Content
          tagName={tagName}
          className={className}
          value={text.length > 0 ? text : "No excerpt yet"}
        />
      ) : (
        <RichText
          tagName={tagName}
          className={className}
          value={text}
          onChange={newValue =>
            setSuffixedAttributes(setAttributes, { text: newValue }, suffix)
          }
          placeholder={placeholder}
          style={{
            display: hideWhenInactive && !text && !isActive ? "none" : null,
          }}
        />
      )}
    </>
  );
}
