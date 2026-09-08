const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

// Load the website config
const configPath = path.resolve(__dirname, `website-config.json`);
if (!fs.existsSync(configPath)) {
  console.error(`❌ Config file not found at path: ${configPath}`);
  process.exit(1);
}

const websiteConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

module.exports = {
  ...defaultConfig,
  resolve: {
    alias: {
      "@marameodesign/utils": path.resolve(__dirname, "gutenberg/utils"),
      "@marameodesign/components": path.resolve(
        __dirname,
        "gutenberg/components"
      ),
    },
    extensions: [".js", ".json"],
  },
  plugins: [
    ...defaultConfig.plugins,
    new webpack.DefinePlugin({
      WEBSITE_CONFIG: JSON.stringify(websiteConfig),
    }),
  ],
};
