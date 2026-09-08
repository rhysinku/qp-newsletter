<?php

/**
 * Handles custom block assets
 *
 * @package QP NewsLetter
 */

const BLOCKS_WITH_VIDEOS = [
  'content-media',
  'video'
];

/**
 * Block editor assets.
 *
 * Ships the generic editor-side behaviour: unregister core blocks not on the allowlist
 * (see gutenberg/js/remove-core-blocks.js — edit the allowlist there). Add project editor
 * scripts (role gating, section renaming, core-block restyles) here as you build them.
 */
function mmd_block_editor_assets() {
  mmd_enqueue_script(
    'remove-core-blocks',
    'gutenberg/js/remove-core-blocks.js',
    ['wp-blocks', 'wp-dom-ready']
  );
}

add_action('enqueue_block_editor_assets', 'mmd_block_editor_assets');

/**
 * Front-end block assets.
 *
 * Conditionally enqueue per-block front-end scripts/styles here (gate with post_has_block()
 * / post_has_video_type() below), e.g. a lazy-load handler for a video block.
 */
function mmd_block_assets() {
}

add_action('wp_enqueue_scripts', 'mmd_block_assets', 100);

/**
 * Generic check for a specific media type in a post's video blocks.
 */
function post_has_video_type($media_type) {
  $post = get_post();

  if (!$post) {
    return false;
  }

  $blocks = parse_blocks($post->post_content);

  return check_blocks_for_media_type($blocks, $media_type);
}

/**
 * Check if a post contains a specific block.
 */
function post_has_block($block_name) {
  $post = get_post();

  if (!$post) {
    return false;
  }

  $blocks = parse_blocks($post->post_content);

  return check_blocks_for_block_name($blocks, $block_name);
}

/**
 * Recursively checks blocks for a specific media type.
 */
function check_blocks_for_media_type($blocks, $media_type) {
  foreach ($blocks as $block) {
    if (isset($block['blockName']) && !empty($block['blockName'])) {
      $block_has_video = false;
      $block_clean_name = str_replace('mmd/', '', $block['blockName']);

      foreach (BLOCKS_WITH_VIDEOS as $block_with_video_name) {
        if (!empty($block_clean_name) && !empty($block_with_video_name) && str_starts_with($block_clean_name, $block_with_video_name)) {
          $block_has_video = true;
          break;
        }
      }

      $attribute_to_check = $block['attrs']['mediaType'] ?? $block['attrs']['videoType'] ?? null;

      if ($block_has_video && $attribute_to_check && $attribute_to_check === $media_type) {
        return true;
      }
    }

    // Check inner blocks recursively
    if (!empty($block['innerBlocks'])) {
      if (check_blocks_for_media_type($block['innerBlocks'], $media_type)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Recursively checks blocks for a specific block name.
 */
function check_blocks_for_block_name($blocks, $block_name) {
  foreach ($blocks as $block) {
    if (isset($block['blockName']) && $block['blockName'] === $block_name) {
      return true;
    }

    // Check inner blocks recursively
    if (!empty($block['innerBlocks'])) {
      if (check_blocks_for_block_name($block['innerBlocks'], $block_name)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Dequeue assets of MMD blocks that are not present in the current post
 */
add_action('wp_enqueue_scripts', function () {
  global $post;

  // Bail early if no post or post content
  if (!isset($post) || !isset($post->post_content)) {
    return;
  }

  // Get all registered blocks
  $all_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

  foreach ($all_blocks as $block_name => $block_type) {
    // Only target blocks starting with "mmd/"
    if (!str_starts_with($block_name, 'mmd/')) {
      continue;
    }

    // If block is not present on the page
    if (!has_block($block_name, $post)) {
      // Dequeue style
      if (isset($block_type->style)) {
        wp_dequeue_style($block_type->style);
      }

      // Dequeue viewScript
      if (isset($block_type->view_script)) {
        wp_dequeue_script($block_type->view_script);
      }
    }
  }
}, 20);
