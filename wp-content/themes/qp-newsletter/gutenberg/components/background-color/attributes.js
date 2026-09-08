export default function addAttributes(attrObject, suffix = "") {
  attrObject.add({
    [`bgColor${suffix}`]: {
      type: "string",
      default: "bg-system-white",
    },
    [`blockTheme${suffix}`]: {
      enum: ["mod--theme--light", "mod--theme--dark", "mod--theme--inherit"],
      default: "mod--theme--light",
    },
  });
}
