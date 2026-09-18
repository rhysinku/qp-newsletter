export function get(props) {
  return {
    spacingAmount: props.attributes.spacingAmount,
  };
}

// TODO: make compatible with config
export function getClassName(props) {
  const { spacingAmount } = props.attributes;

  const classes = {
    large: "mmd-spacing-lg",
    normal: "mmd-spacing-md",
    small: "mmd-spacing-sm",
    "extra-large": "mmd-spacing-xl",
  };

  const className = classes[spacingAmount] ?? null;
  if (!className) {
    console.error("Spacing Component: Could not generate spacing class");
    return;
  }

  return className;
}
