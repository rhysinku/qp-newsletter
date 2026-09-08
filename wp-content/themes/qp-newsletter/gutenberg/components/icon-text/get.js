export default function get(props, suffix = "", attributeName = "") {
  if (attributeName) {
    return props.attributes[attributeName + suffix];
  } else {
    return {
      itText: props.attributes[`itText${suffix}`],
      itIcon: props.attributes[`itIcon${suffix}`],
    };
  }
}
