export default function get(props, suffix = "", attributeName = "") {
  if (attributeName) {
    return props.attributes[attributeName + suffix];
  } else {
    return {
      text: props.attributes[`text${suffix}`],
      usePostExcerpt: props.attributes[`usePostExcerpt${suffix}`],
    };
  }
}
