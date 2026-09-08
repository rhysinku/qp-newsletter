/**
 * Return the URI of a sprite svg
 */
export const getSpriteUri = (id, version = '12') => {
  return `${window.location.protocol}//${window.location.hostname}/wp-content/themes/qp-newsletter/assets/sprites/sprite.svg?${version}#${id}`;
};