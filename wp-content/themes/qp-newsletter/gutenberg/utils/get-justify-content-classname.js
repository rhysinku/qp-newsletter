export const getJustifyContentClassName = alignment => {
  return {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
    "space-between": "justify-between",
  }[alignment] ?? "";
}
