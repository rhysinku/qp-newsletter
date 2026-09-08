/**
 * Get vertical content position
 * NOTE:
 *  Currently, this is setup to work with a flex parent with column direction
 */
export const getContentPositionVerticalClassName = position => {
  return {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end"
  }[position] ?? null;
}