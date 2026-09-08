<?php

/**
 * Enqueue custom assets
 *
 * @package QP NewsLetter
 */


/**
 * Helper function: Custom script-enqueue function to add filemtime to the version
 */
function mmd_enqueue_script($handle, $src = '', $deps = [], $args = []) {
  if (is_bool($args)) {
    $args = ['in_footer' => $args];
  } elseif (!is_array($args)) {
    $args = [];
  }

  // Handle older style format passing [TRUE]
  if (isset($args[0]) && is_bool($args[0])) {
    $args['in_footer'] = $args[0];
    unset($args[0]);
  }

  if (!isset($args['in_footer'])) {
    $args['in_footer'] = true;
  }

  wp_register_script($handle, MMD_THEME_URI . ltrim($src, '/'), $deps, filemtime(MMD_THEME_DIR . ltrim($src, '/')), $args);
  wp_enqueue_script($handle);
}


/**
 * Helper function: Custom style-enqueue function to add filemtime to the version
 */
function mmd_enqueue_style($handle, $src = '', $deps = [], $media = 'all') {
  wp_register_style($handle, MMD_THEME_URI . ltrim($src, '/'), $deps, filemtime(MMD_THEME_DIR . ltrim($src, '/')), $media);
  wp_enqueue_style($handle);
}


/** Theme assets */
function mmd_enqueue_libraries() {
  // dequeue wp block assets
  wp_dequeue_style('wp-block-library'); // Frontend styles
  wp_dequeue_style('wp-block-library-theme'); // Gutenberg theme styles
  wp_dequeue_style('wp-block-table'); // Core table block styles
  wp_dequeue_style('global-styles'); // theme.json global styles
  wp_dequeue_style('formidable');
  // main style
  mmd_enqueue_style(
    'main-style',
    'gutenberg/build/css/style.min.css'
  );

  // main script
  mmd_enqueue_script(
    'main-js',
    'assets/js/main.min.js'
  );

  wp_localize_script('main-js', 'MMD_GLOBALS', [
    'MMD_ASSETS_VERSION' => MMD_ASSETS_VERSION,
  ]);

  // Conditionally load per-block front-end libraries here (e.g. a carousel/zoom library
  // gated by has_block()), and any per-post-type stylesheets, as blocks are added.
}

add_action('wp_enqueue_scripts', 'mmd_enqueue_libraries', 100);


/**
 * WooCommerce Blocks enqueues 'wc-blocks-style' unconditionally on every
 * front-end page (via a wp_head hook), even though this theme doesn't use
 * WooCommerce blocks or block-based notice templates. Strip it on pages
 * that aren't WooCommerce pages so it only loads where it's actually needed.
 */
function mmd_is_woocommerce_page() {
  if (!function_exists('is_woocommerce')) {
    return false;
  }

  return is_woocommerce() || is_cart() || is_checkout() || is_account_page();
}

function mmd_dequeue_wc_blocks_style($tag, $handle) {
  if ('wc-blocks-style' === $handle && !is_admin() && !mmd_is_woocommerce_page()) {
    return '';
  }

  return $tag;
}

add_filter('style_loader_tag', 'mmd_dequeue_wc_blocks_style', 10, 2);


/** loading style to editor */
function mmd_add_editor_styles() {
  remove_editor_styles();
  add_theme_support('editor-styles');
  add_editor_style([
    'gutenberg/build/css/style-editor.min.css',
  ]);
  wp_enqueue_style('dashicons');
}

add_action('admin_init', 'mmd_add_editor_styles');


/** Editor styles */
function mmd_custom_block_assets() {
  if (function_exists('get_current_screen')) {
    $screen = get_current_screen();
    if ($screen && $screen->is_block_editor) {
      wp_enqueue_style(
        'mmd-custom-admin-styles',
        MMD_THEME_URI . 'gutenberg/build/css/style-editor.min.css',
        [],
        MMD_ASSETS_VERSION
      );
      wp_enqueue_style('dashicons');
    }
  }
}

add_action('enqueue_block_assets', 'mmd_custom_block_assets', 100);


/** Remove block directory */
function mmd_remove_block_directory() {
  wp_add_inline_script(
    'wp-block-editor',
    "wp.domReady( () => wp.plugins.unregisterPlugin( 'block-directory' ) )"
  );
}

add_action('admin_enqueue_scripts', 'mmd_remove_block_directory');

/**
 * Remove additional stuff rendered by WP since v6
 * https://github.com/WordPress/gutenberg/issues/36834
 */
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');