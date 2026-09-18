import { useBlockProps } from "@wordpress/block-editor";
import { Spacing, BackgroundColor } from "@marameodesign/components";

import "./style.scss";

export const Save = props => {
  const spacingClassName = Spacing.getClassName(props);
  const displayType = props.attributes.displayType || 'space';

  const classes = [
    "mmd-spacer",
    spacingClassName,
    displayType === "line" ? "mmd-spacer--line" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const blockProps = useBlockProps.save({
    className: classes,
    "aria-hidden": true,
  });

  if (displayType === "line") {
    return (
      <div {...blockProps}>
        <hr className="mmd-spacer__line" />
      </div>
    );
  }

  return <div {...blockProps} />;
};
