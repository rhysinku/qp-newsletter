import path from "path";
import fs from "fs";

let cachedConfig;

export const getWebsiteConfig = () => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = path.join(
    __dirname,
    `../website-config.json`
  );
  try {
    const rawConfig = fs.readFileSync(configPath, "utf8");
    cachedConfig = JSON.parse(rawConfig);
    return cachedConfig;
  } catch (err) {
    console.error(
      `❌ Failed to load config`,
      err.message
    );
    process.exit(1);
  }
};