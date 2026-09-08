export const getVerticalAlignmentClassname = (alignment, direction = "row") => {
  const isRow = direction === "row";

  return {
    top: isRow ? "lg:items-start" : "lg:justify-start",
    center: isRow ? "lg:items-center" : "lg:justify-center",
    bottom: isRow ? "lg:items-end" : "lg:justify-end",
  }[alignment] ?? "";
}