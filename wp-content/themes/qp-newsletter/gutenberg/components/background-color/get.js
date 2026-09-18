export default function get(props, suffix = "") {
  return {
    bgColor: props.attributes[`bgColor${suffix}`],
    blockTheme: props.attributes[`blockTheme${suffix}`],
  };
}
