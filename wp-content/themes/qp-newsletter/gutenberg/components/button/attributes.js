export default function addAttributes(attrObject, suffix = '') {
  attrObject.add({
    [`buttonText${suffix}`]: {
      type: "string",
      default: "",
    },
    [`buttonUrl${suffix}`]: {
      type: "string",
      default: "",
    },
    [`buttonOpenInNewTab${suffix}`]: {
      type: "boolean",
      default: false,
    },
    [`buttonType${suffix}`]: {
      enum: ["mod--variant--primary", "mod--variant--secondary", "mod--variant--arrow"],
      default: "mod--variant--primary",
    },
  });
}
