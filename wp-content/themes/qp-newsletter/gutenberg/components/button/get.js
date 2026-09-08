export default function get(props, suffix = "", attributeName = "") {
  // Add defensive check for props and props.attributes
  if (!props || !props.attributes) {
    return {
      buttonText: "",
      buttonUrl: "",
      buttonOpenInNewTab: false,
      buttonType: "mod--variant--primary",
      buttonTarget: "_self",
      buttonRelation: "noopener",
      buttonIsValid: false,
    };
  }
  
  if (attributeName) {
    return props.attributes[`${attributeName}${suffix}`];
  } else {
    return {
      buttonText: props.attributes[`buttonText${suffix}`] === undefined ? "" : props.attributes[`buttonText${suffix}`],
      buttonUrl: props.attributes[`buttonUrl${suffix}`] === undefined ? "" : props.attributes[`buttonUrl${suffix}`],
      buttonOpenInNewTab: props.attributes[`buttonOpenInNewTab${suffix}`] === undefined ? false : props.attributes[`buttonOpenInNewTab${suffix}`],
      buttonType: props.attributes[`buttonType${suffix}`] === undefined ? "mod--variant--primary" : props.attributes[`buttonType${suffix}`],
      buttonTarget: props.attributes[`buttonOpenInNewTab${suffix}`] === undefined ? "_self" : props.attributes[`buttonOpenInNewTab${suffix}`] ? "_blank" : "_self",
      buttonRelation: props.attributes[`buttonOpenInNewTab${suffix}`] === undefined ? "noopener" : props.attributes[`buttonOpenInNewTab${suffix}`]
        ? "noopener noreferrer"
        : "noopener",
      buttonIsValid: Boolean(
        props.attributes[`buttonText${suffix}`] &&
          props.attributes[`buttonUrl${suffix}`]
      ),
    };
  }
}
