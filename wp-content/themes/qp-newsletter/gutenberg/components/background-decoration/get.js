export function get(props) {
  return {
    backgroundDecoration: props.attributes.backgroundDecoration,
  };
}


export function getClassName(props) {
  const { backgroundDecoration } = props.attributes;
  return backgroundDecoration && backgroundDecoration !== "none"
    ? "relative isolate"
    : "";
}
