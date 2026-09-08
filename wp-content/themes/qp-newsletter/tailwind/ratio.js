const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents, matchUtilities }) => {
  addComponents({
    ".is-ratio-image": {
      display: "block",
      overflow: "hidden",
      width: "100%",
      position: "relative",
      marginBottom: "0",
      "&:not(.ratio-none) :is(img, video, iframe)": {
        position: "absolute",
        inset: "0",
      },
      ":is(img, video, iframe)": {
        width: "100%",
        height: "100%",
        objectPosition: "center",
      },
      ":is(.object-contain)": {
        objectFit: "contain",
      },
      ":not(.object-contain)": {
        objectFit: "cover",
      },
    },
  });

  matchUtilities(
    {
      ratio: value => ({
        paddingTop: value,
      }),
    },
    {
      values: {
        none: "unset",
        "1-1": "100%",
        "2-1": "50%",
        "3-2": "67%",
        "4-3": "75%",
        "3-4": "133.333333%",
        140: "140%",
      },
    }
  );
});
