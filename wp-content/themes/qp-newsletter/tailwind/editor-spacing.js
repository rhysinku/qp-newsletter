/**
 * NOTE:
 *  This is a version of the spacing tailwind plugin that is designed to work in the editor,
 *  As the gutenberg editor seems to wrap each blocks into new divs.
 */
const plugin = require("tailwindcss/plugin");
const { pxToRem } = require("./utils");
const { getWebsiteConfig } = require("./get-website-config");

const { gutenberg } = getWebsiteConfig();

module.exports = plugin(function ({ addUtilities }) {
  addUtilities(generatePreventDoubleSpacing());
  addUtilities(generateInnerContentSpacing());
});

/**
 * Generate inner content spacing
 */
function generateInnerContentSpacing() {
  return {
    ".mmd-content > div > div > div > *": {
      "--mmd-block-spacing": 0,
      "--mmd-bottom-spacing": pxToRem(25),
      marginTop: 0,
      marginBottom: "var(--mmd-bottom-spacing)",
    },
    ".mmd-content > div > div > div > :first-child": {
      marginTop: "0 !important",
    },
    ".mmd-content > div > div > div > :last-child": {
      marginBottom: 0,
    },
    ".mmd-content .is-ssr.mmd-spacing:not(.mmd-margin-y)": {
      paddingBlock: 0,
    }
  };
}

/**
 * Generate rules to prevent double-spacing
 */
function generatePreventDoubleSpacing() {
  if (!gutenberg?.bgColor) {
    console.error(
      "[Error] Tailwind Plugin: Missing config.gutenberg.bgColor in config.json"
    );
    return {};
  }

  return Object.values(gutenberg.bgColor).reduce(
    (rules, { value: className }) => {
      rules[
        `.wp-block:has(> .mmd-spacing.${className}) + .wp-block > .mmd-spacing.${className}:not(.mmd-margin-y)`
      ] = {
        paddingTop: "calc(var(--mmd-block-spacing) / 2)",
      };
      return rules;
    },
    {}
  );
}
