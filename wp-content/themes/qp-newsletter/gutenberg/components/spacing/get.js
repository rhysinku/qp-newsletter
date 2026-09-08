export function get(props) {
  return {
    spacingAmount: props.attributes.spacingAmount,
  };
}

export function getClassName(props) {
  const { spacingAmount } = props.attributes;

  const classes = {
    "extra-small": "mmd-spacing-xs",
    small: "mmd-spacing-sm",
    normal: "mmd-spacing-md",
    large: "mmd-spacing-lg",
    "extra-large": "mmd-spacing-xl",
  };

  const className = classes[spacingAmount] ?? null;
  if (!className) {
    console.error("Spacing Component: Could not generate spacing class");
    return;
  }

  return className;
}
