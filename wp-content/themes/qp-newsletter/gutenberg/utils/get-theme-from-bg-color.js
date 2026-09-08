import { getGutenbergConfig } from "./get-website-config";

/**
 * Get the block theme (light or dark) based on a background color value
 */
export function getThemeFromBgColor(bgColorValue) {
  if (bgColorValue === "bg-parent") {
    return "mod--theme--parent";
  }

  const bgColors = getGutenbergConfig('bgColor') ?? {};

  for (const [key, config] of Object.entries(bgColors)) {
    if (config?.value === bgColorValue) {
      const theme = config?.theme ?? "light";
      return `mod--theme--${theme}`;
    }
  }

  return "mod--theme--light";
}