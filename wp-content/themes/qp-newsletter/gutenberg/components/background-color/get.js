import { getThemeFromBgColor } from "@marameodesign/utils";

export default function get(props, suffix = "") {
  const bgColor = props.attributes[`bgColor${suffix}`];
  const savedTheme = props.attributes[`blockTheme${suffix}`];

  // Derive the theme from the background colour (single source of truth) so it can never
  // go stale or be missing — this is what makes the light/dark text flip work in the editor
  // and at save time, regardless of how the block was authored. The bg-parent case keeps the
  // saved value (set to mod--theme--inherit by useAutoAdjustedBlockTheme).
  const blockTheme =
    bgColor && bgColor !== "bg-parent" ? getThemeFromBgColor(bgColor) : savedTheme;

  return { bgColor, blockTheme };
}
