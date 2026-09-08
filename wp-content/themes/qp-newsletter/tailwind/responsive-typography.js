const plugin = require("tailwindcss/plugin");
const { pxToRem } = require("./utils");
const { getWebsiteConfig } = require("./get-website-config");

const { typography } = getWebsiteConfig();

const defaults = {
  lineHeight: "1.2",
  fontWeight: "400",
  // margin: `${pxToRem(40)} 0 0.3em`,
};

const responsiveTypography = plugin(function ({ addUtilities, theme }) {
  let utilities = {};

  for (const [key, value] of Object.entries(typography)) {
    // Mobile styles
    const mobileStyles = {
      fontSize: pxToRem(value.mobile.fontSize),
      lineHeight: value.mobile.lineHeight ?? defaults.lineHeight,
      fontWeight: value.mobile.fontWeight ?? defaults.fontWeight,
      // margin: value.mobile.margin ?? defaults.margin,
    };

    // Desktop styles (if applicable)
    const desktopStyles =
      value.desktop && Object.keys(value.desktop).length > 0
        ? {
            [`@media (min-width: ${theme("screens.lg")})`]: {
              fontSize: value.desktop.fontSize
                ? pxToRem(value.desktop.fontSize)
                : null,
              lineHeight: value.desktop.lineHeight ?? null,
              fontWeight: value.desktop.fontWeight ?? null,
              // margin: value.desktop.margin ?? null,
            },
          }
        : {};

    // Generate the class
    if (key.startsWith("body")) {
      utilities[`.text-${key}`] = {
        ...mobileStyles,
        ...desktopStyles,
      };
    } else {
      const modifiedKey = key.replace("h", "");
      utilities[`.text-heading-${modifiedKey}`] = {
        ...mobileStyles,
        ...desktopStyles,
      };
    }
  }

  addUtilities(utilities);
});

module.exports = responsiveTypography;
