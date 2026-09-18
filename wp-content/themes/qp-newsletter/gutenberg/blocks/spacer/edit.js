import { useBlockProps } from "@wordpress/block-editor";
import { Preview, Spacing, BackgroundColor } from "@marameodesign/components";
import Inspector from "./inspector";

import "./editor.scss";

export const Edit = props => {
  const spacingClassName = Spacing.getClassName(props);
  const { preview } = Preview.get(props);
  const displayType = props.attributes.displayType || 'space';

  const classes = [
    "mmd-spacer",
    spacingClassName,
    displayType === "line" ? "mmd-spacer--line" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const blockProps = useBlockProps({
    className: classes,
    "aria-hidden": true,
  });

  return (
    <>
      {preview && <Preview.Content {...props} />}

      {!preview && (
        <>
          <Inspector {...props} />
          <div {...blockProps}>
            <div className="mmd-spacer-text">
              {displayType === "line" ? "Line" : "Spacer"}
            </div>
          </div>
        </>
      )}
    </>
  );
};
