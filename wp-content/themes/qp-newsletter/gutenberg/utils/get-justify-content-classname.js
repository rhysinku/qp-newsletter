export const getJustifyContentClassName = alignment => {
  return {
    left: "lg:justify-start",
    right: "lg:justify-end",
    center: "lg:justify-center",
    "space-between": "lg:justify-between",
  }[alignment] ?? "";
}