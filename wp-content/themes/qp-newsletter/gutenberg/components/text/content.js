import { RichText } from "@wordpress/block-editor";

import get from "./get";

export default function Content(props) {
  const { className = "", tagName = "p", suffix = "" } = props;
  const { text } = get(props, suffix);

  return (
    <>
      {text && (
        <RichText.Content
          tagName={tagName}
          className={className}
          value={text}
        />
      )}
    </>
  );
}
