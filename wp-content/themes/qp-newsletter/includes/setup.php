<?php

// theme setup
function mmd_theme_setup() {
  add_theme_support('responsive-embeds');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', [
    'search-form',
    'comment-form',
    'comment-list',
    'gallery',
    'caption',
    'style',
    'script',
  ]);
  add_theme_support('title-tag');
  remove_theme_support('core-block-patterns');
}

add_action('after_setup_theme', 'mmd_theme_setup');

// remove meta generator tag in the head
remove_action('wp_head', 'wp_generator');

/**
 * Hide the native Gutenberg taxonomy panel for taxonomies that are assigned via
 * ACF fields instead (so the controls stay together at the bottom of the page).
 *
 * Taxonomies WITHOUT an ACF replacement (e.g. news_category) must keep their
 * native panel, otherwise there is no way to assign terms in the editor.
 *
 * @param WP_REST_Response $response The taxonomy REST response.
 * @param WP_Taxonomy      $taxonomy The taxonomy object.
 * @param WP_REST_Request  $request  The REST request.
 *
 * @return WP_REST_Response
 */
function mmd_hide_taxonomy_in_gutenberg($response, $taxonomy, $request) {
  $context = !empty($request['context']) ? $request['context'] : 'view';

  // Taxonomies that keep their native Gutenberg panel (no ACF replacement).
  // Add this project's non-ACF taxonomies via the filter, e.g. ['category'].
  $keep_native_panel = apply_filters('mmd_taxonomies_keep_native_panel', []);

  if ($context === 'edit' && !in_array($taxonomy->name, $keep_native_panel, TRUE)) {
    $data = $response->get_data();
    $data['visibility']['show_ui'] = false;
    $response->set_data($data);
  }

  return $response;
}

add_filter('rest_prepare_taxonomy', 'mmd_hide_taxonomy_in_gutenberg', 10, 3);

/**
 * Suppress PHP notices and warnings in AJAX requests to prevent JSON corruption in development.
 */
add_action('init', function () {
  if (wp_doing_ajax()) {
    @ini_set('display_errors', 0);
  }
});

