/**
 * Get a Gutenberg config item from the injected WEBSITE_CONFIG
 */
export function getGutenbergConfig(configName) {
  return getConfig('gutenberg')[configName] ?? {};
}

export function getConfig(configName) {
  return WEBSITE_CONFIG[configName] ?? null;
}