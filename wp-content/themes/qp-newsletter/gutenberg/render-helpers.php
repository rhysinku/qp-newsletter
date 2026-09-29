<?php

/**
 * Shared PHP rendering helpers for Gutenberg blocks.
 *
 * Provides reusable utilities for server-side rendered blocks
 * (render.php files) to eliminate duplication and ensure consistent rendering.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Check if posts are required and render placeholder in Gutenberg editor if empty.
 *
 * @param array $posts
 *   Array of selected posts.
 * @param string $message
 *   Custom empty message.
 *
 * @return bool
 *   TRUE if execution should stop (empty posts), FALSE to proceed.
 */
function mmd_block_require_posts(array $posts, string $message = 'No content selected. Choose items in the block settings.'): bool {
  if (!empty($posts)) {
    return false;
  }

  $is_editor = (function_exists('mmd_is_gutenberg_edit_mode') && mmd_is_gutenberg_edit_mode()) || is_admin();
  if ($is_editor) {
    echo '<div class="py-6 px-4 text-center border border-dashed border-neutral-grey-300 rounded-lg text-neutral-grey-500 font-medium my-4">';
    echo '<p class="m-0 text-sm">' . esc_html($message) . '</p>';
    echo '</div>';
  }

  return true;
}

/**
 * Render an array of post items as columns in a grid.
 *
 * @param array $posts
 *   Array of post IDs or arrays with 'id' key.
 * @param string $cards_display_mode
 *   Display template mode name.
 *
 * @return string
 *   Rendered columns HTML.
 */
function mmd_block_render_post_columns(array $posts, string $cards_display_mode = 'standard'): string {
  if (empty($posts)) {
    return '';
  }

  ob_start();
  foreach ($posts as $item) {
    $post_id = is_array($item) ? ($item['id'] ?? 0) : (int) $item;
    if (empty($post_id)) {
      continue;
    }
    ?>
    <div class="mmd-col">
      <?php echo mmd_render_content_by_display($post_id, $cards_display_mode); ?>
    </div>
    <?php
  }

  return (string) ob_get_clean();
}

/**
 * Extract term IDs from ContentPicker attribute data.
 *
 * @param mixed $terms
 *   Array of term objects/arrays or IDs.
 *
 * @return array
 *   Clean array of integer term IDs.
 */
function mmd_extract_term_ids($terms): array {
  if (empty($terms) || !is_array($terms)) {
    return [];
  }

  $ids = [];
  foreach ($terms as $term) {
    if (is_array($term) && !empty($term['id'])) {
      $ids[] = (int) $term['id'];
    } elseif (is_numeric($term)) {
      $ids[] = (int) $term;
    }
  }

  return array_values(array_filter($ids));
}

/**
 * Apply taxonomy filters to WP_Query args from Gutenberg block attributes.
 *
 * @param array &$args
 *   Reference to WP_Query args array.
 * @param array $taxonomies_map
 *   Associative array mapping taxonomy name => term data.
 */
function mmd_block_apply_tax_filters(array &$args, array $taxonomies_map): void {
  if (!isset($args['tax_query']) || !is_array($args['tax_query'])) {
    $args['tax_query'] = [];
  }

  foreach ($taxonomies_map as $taxonomy => $terms) {
    $term_ids = mmd_extract_term_ids($terms);
    if (!empty($term_ids)) {
      $args['tax_query'][] = [
        'taxonomy' => $taxonomy,
        'field'    => 'term_id',
        'terms'    => $term_ids,
        'operator' => 'IN',
      ];
    }
  }

  if (count($args['tax_query']) > 1 && !isset($args['tax_query']['relation'])) {
    $args['tax_query']['relation'] = 'AND';
  }
}

/**
 * Render a post card for Gutenberg SSR blocks.
 *
 * @param int $post_id
 *   Post ID to render.
 * @param string $display
 *   Display template name (defaults to 'standard').
 * @param string $ris
 *   Optional RIS preset name.
 * @param string $fallback
 *   Fallback HTML if rendering is empty.
 *
 * @return string
 *   Rendered card HTML.
 */
function mmd_block_render_card(int $post_id, string $display = 'standard', string $ris = '', string $fallback = ''): string {
  $output = mmd_render_content_by_display($post_id, $display, ['ris' => $ris]);
  if (empty($output)) {
    return $fallback;
  }
  return $output;
}

// Fallbacks for legacy boilerplate blocks that call functions without mmd_ prefix.
if (!function_exists('is_gutenberg_edit_mode')) {
  function is_gutenberg_edit_mode(): bool {
    return function_exists('mmd_is_gutenberg_edit_mode') ? mmd_is_gutenberg_edit_mode() : (\defined('\REST_REQUEST') && TRUE === \REST_REQUEST);
  }
}

if (!function_exists('render_content_by_display')) {
  function render_content_by_display(int $post_id, string $display = 'standard', array $options = []): string {
    return function_exists('mmd_render_content_by_display') ? mmd_render_content_by_display($post_id, $display, $options) : '';
  }
}

if (!function_exists('get_ris_by_columns')) {
  function get_ris_by_columns(string $columns): string {
    return function_exists('mmd_get_ris_by_columns') ? mmd_get_ris_by_columns($columns) : 'card_standard_3_cols';
  }
}
