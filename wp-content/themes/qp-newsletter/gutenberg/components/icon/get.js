export default function get(props, suffix = "", attributeName = "") {
  if (attributeName) {
    return props.attributes[attributeName + suffix];
  } else {
    return {
      icon: props.attributes[`icon${suffix}`],
      iconAlt: props.attributes[`iconAlt${suffix}`],
    };
  }
}
