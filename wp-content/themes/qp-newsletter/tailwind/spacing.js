const plugin = require("tailwindcss/plugin");
const { pxToRem } = require("./utils");
const { getWebsiteConfig } = require("./get-website-config");

const { spacing, gutenberg } = getWebsiteConfig();

module.exports = plugin(function ({ matchUtilities, theme, addUtilities }) {
  // Base utilities
  const baseUtilities = createBaseUtilities();

  // Ensure base utilities are always included
  matchUtilities(
    {
      "mmd-padding-y": () => baseUtilities[".mmd-padding-y"],
      "mmd-margin-y": () => baseUtilities[".mmd-margin-y"],
    },
    { values: { DEFAULT: true } }
  );

  // Generate dynamic spacing utilities
  matchUtilities(
    {
      "mmd-spacing": value => generateSpacingStyles(value, theme),
    },
    { values: spacing }
  );

  // Add inner content and spacing prevention utilities
  addUtilities({
    ...generateInnerContentSpacing(),
    ...generatePreventDoubleSpacing(),
  });
});

/**
 * Create base spacing utilities
 */
function createBaseUtilities() {
  return {
    ".mmd-spacing": {
      "--mmd-block-spacing": pxToRem(20),
    },
    ".mmd-padding-y": {
      paddingTop: "var(--mmd-block-spacing)",
      paddingBottom: "var(--mmd-block-spacing)",
    },
    ".mmd-margin-y": {
      marginTop: "var(--mmd-block-spacing)",
      marginBottom: "var(--mmd-block-spacing)",
    },
  };
}

/**
 * Generate responsive spacing styles
 */
function generateSpacingStyles(value, theme) {
  return {
    "--mmd-block-spacing": pxToRem(value.mobile),
    ...(value.desktop && {
      [`@media (min-width: ${theme("screens.lg")})`]: {
        "--mmd-block-spacing": pxToRem(value.desktop),
      },
    }),
  };
}

/**
 * Generate inner content spacing
 */
function generateInnerContentSpacing() {
  return {
    ".mmd-content > :is(.mmd-spacing, p, ul, ol, blockquote, iframe, address)":
      {
        "--mmd-block-spacing": 0,
        "--mmd-bottom-spacing": pxToRem(25),
        marginTop: 0,
        marginBottom: "var(--mmd-bottom-spacing)",
        "&.wp-block-mmd-section--1col": {
          paddingBlock: "1.5rem",
        },
      },
    ".mmd-content > :is(h1,h2,h3,h4,h5,h6,p,ul,ol,blockquote,address):has(+ .mmd-spacing-md)":
      {
        "--mmd-bottom-spacing": pxToRem(40),
        marginBottom: "var(--mmd-bottom-spacing)",
      },
    ".mmd-content > :first-child": {
      marginTop: "0 !important",
    },
    ".mmd-content > :last-child": {
      marginBottom: "0 !important",
    },
    ".mmd-content > :is(ul, ol) > :not(:last-child, .m-0, .mb-0)": {
      marginBottom: pxToRem(14),
    },
    ".mmd-content > :is(h1,h2,h3,h4,h5,h6)": {
      // marginTop: pxToRem(40),
      // marginBottom: pxToRem(16),
      /**
       * NOTE:
       *  Restructured the CSS rules for this selector as below
       *  To avoid specificity issues with headings with "mt-0" and "mb-0" classes
       */
      "&:not(:first-child):not(.mt-0)": {
        marginTop: pxToRem(40),
      },
      "&:not(:last-child):not(.mb-0)": {
        marginBottom: pxToRem(16),
      },
    },
    ".mmd-content > .mmd-heading:not(+ p)": {
      marginBottom: pxToRem(32),
    },
    ".mmd-content > :has(+ .mmd-button-group)": {
      marginBottom: "0 !important",
    },
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
        `:not(.mmd-content) > .mmd-spacing.${className}:not(.splide__slide, .mmd-hero-home, .mmd-hero.mod--variant--large) + .mmd-spacing.${className}:not(.mmd-margin-y, .splide__slide)`
      ] = {
        paddingTop: "0",
      };
      return rules;
    },
    {}
  );
}
