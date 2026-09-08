export default function addAttributes(attrObject, suffix = "") {
  attrObject.add({
    [`heading${suffix}`]: {
      type: "string",
      default: "",
    },
    [`headingLevel${suffix}`]: {
      type: "number",
      default: 2,
    },
    [`preHeading${suffix}`]: {
      type: "string",
      default: "",
    },
    [`enablePreHeading${suffix}`]: {
      type: "boolean",
      default: false,
    },
    [`preHeadingTextColor${suffix}`]: {
      type: "object",
      default: {
        lightTheme: "text-neutral",
        darkTheme: "text-white"
      },
    },
    [`headingAlignment${suffix}`]: {
      type: "string",
      default: "left",
    },
    [`usePostTitle${suffix}`]: {
      type: "boolean",
      default: false,
    },
    [`variant${suffix}`]: {
      type: "string",
      default: "default",
    },
  });
}
