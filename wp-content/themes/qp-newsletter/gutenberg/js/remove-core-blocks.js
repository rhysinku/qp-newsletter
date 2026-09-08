/**
 * Remove unusable core blocks.
 *
 * Keeps every custom `mmd/` block plus an explicit allowlist of core/third-party
 * blocks we actually use; unregisters everything else from the editor inserter.
 *
 * Allowlist ported from the Marameo Design (mmc) theme — keep in sync.
 */
wp.domReady(() => {
  const { unregisterBlockType, getBlockTypes } = wp.blocks;

  const whiteList = [
    'core/paragraph',
    // 'core/heading',
    'core/html',
    'core/freeform',
    'core/list',
    'core/table',
    'core/list-item',
    'core/missing',
    'formidable/simple-form',
    'core/pattern',
    'core/block',
    'core/shortcode',
  ];

  getBlockTypes().forEach((blockType) => {
    if (
      !blockType.name.startsWith('mmd/') &&
      !whiteList.includes(blockType.name)
    ) {
      unregisterBlockType(blockType.name);
    }
  });
});
