<?php
/**
 * Enforce the light/dark theme modifier class on blocks from their background colour.
 *
 * How theming works (the canonical mechanism — see assets/css/components/text.css):
 *   `.mod--theme--light` / `.mod--theme--dark` define `--mmd-theme-heading`,
 *   `--mmd-theme-subheading` and `--mmd-theme-text`. Global rules colour every heading
 *   (`:where(h1..h6)`), body and `.mmd-subheading` from those tokens. So a block's text
 *   flips automatically as long as the correct `mod--theme--*` class is on its wrapper.
 *
 * In the editor, picking a background colour pairs `bgColor` with the right `blockTheme`
 * via `getThemeFromBgColor()` (reads `website-config.json` → `gutenberg.bgColor`). But if a
 * block is created/imported with `bgColor` set WITHOUT the matching `blockTheme` (e.g. via
 * a script or a programmatic insert), the theme falls back to light and text stays dark on
 * dark backgrounds.
 *
 * This render filter derives the correct `mod--theme--*` class from the block's bg-colour
 * class at render time, using the SAME `gutenberg.bgColor` map as the source of truth — so
 * the result is always correct regardless of how the block was authored, and no re-save is
 * needed for existing content.
 *
 * @package QP NewsLetter
 */

defined('ABSPATH') || exit;

/**
 * Build a map of background-colour class => `mod--theme--{light|dark}`.
 *
 * @return array<string, string>
 */
function mmd_bgcolor_theme_map() {
  static $map = null;
  if ($map !== null) {
    return $map;
  }

  $map = [];
  $path = get_stylesheet_directory() . '/website-config.json';
  if (is_readable($path)) {
    $config = json_decode(file_get_contents($path), true);
    $bg_colors = $config['gutenberg']['bgColor'] ?? [];
    foreach ($bg_colors as $entry) {
      if (!empty($entry['value']) && !empty($entry['theme'])) {
        $map[$entry['value']] = 'mod--theme--' . $entry['theme'];
      }
    }
  }

  return $map;
}

/**
 * Ensure an mmd block carries the theme class implied by its background colour.
 *
 * @param string $block_content The block HTML.
 * @param array  $block         The parsed block.
 * @return string
 */
function mmd_enforce_block_theme_class($block_content, $block) {
  if ($block_content === '' || strncmp($block['blockName'] ?? '', 'mmd/', 4) !== 0) {
    return $block_content;
  }

  $map = mmd_bgcolor_theme_map();
  if (!$map) {
    return $block_content;
  }

  $tags = new WP_HTML_Tag_Processor($block_content);
  if (!$tags->next_tag()) {
    return $block_content;
  }

  $class = (string) $tags->get_attribute('class');
  if ($class === '') {
    return $block_content;
  }

  foreach ($map as $bg_class => $theme_class) {
    // Whole-token match so `bg-primary-blue-50` never matches `bg-primary-blue-800`.
    if (preg_match('/(?:^|\s)' . preg_quote($bg_class, '/') . '(?:\s|$)/', $class)) {
      $tags->remove_class('mod--theme--light');
      $tags->remove_class('mod--theme--dark');
      $tags->add_class($theme_class);
      return $tags->get_updated_html();
    }
  }

  return $block_content;
}
add_filter('render_block', 'mmd_enforce_block_theme_class', 20, 2);
