<?php
/**
 * Functions
 *
 * @package QP NewsLetter
 */

/** Included files */

use MMD\Blocks\CustomGutenbergBlocks;

require_once trailingslashit(get_stylesheet_directory()) . 'variables.php';
require_once trailingslashit(get_stylesheet_directory()) . 'includes/index.php';
require_once trailingslashit(get_stylesheet_directory()) . 'gutenberg/index.php';
require_once trailingslashit(get_stylesheet_directory()) . 'template-hooks.php';

// init custom blocks
CustomGutenbergBlocks::get_instance()->init();

/** Register menus */
/**
 * Register theme navigation menus.
 *
 * @return void
 */
function mmd_register_menus(): void {
  register_nav_menu('header-menu', __('Header Menu'));
  register_nav_menu('footer-menu', __('Footer Menu'));
}

/** add excerpt for page */
add_post_type_support('page', 'excerpt');

/** ensure revisions are enabled for all post types */
add_action('init', function () {
  foreach (get_post_types(['public' => true], 'names') as $post_type) {
    if (!post_type_supports($post_type, 'revisions')) {
      add_post_type_support($post_type, 'revisions');
    }
  }
}, 20);

/**
 * Remove default "Posts" from admin menu sidebar.
 *
 * @return void
 */
add_action('admin_menu', 'mmd_remove_default_post_type');
function mmd_remove_default_post_type(): void {
  remove_menu_page('edit.php');
}

/** remove comments feature */
add_action('admin_init', function () {
  global $pagenow;
  if ($pagenow === 'edit-comments.php' || $pagenow === 'options-discussion.php') {
    wp_redirect(admin_url());
    exit;
  }

  remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

  foreach (get_post_types() as $post_type) {
    if (post_type_supports($post_type, 'comments')) {
      remove_post_type_support($post_type, 'comments');
      remove_post_type_support($post_type, 'trackbacks');
    }
  }
});

/** close comments on the front-end  */
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

/** hide existing comments */
add_filter('comments_array', '__return_empty_array', 10, 2);

/** remove comments page and option page in menu */
add_action('admin_menu', function () {
  remove_menu_page('edit-comments.php');
  remove_submenu_page('options-general.php', 'options-discussion.php');
});

/** remove comments links from admin bar */
add_action('init', function () {
  if (is_admin_bar_showing()) {
    remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
  }
});

/** prevent reducing quality of jpeg images */
add_filter('jpeg_quality', function ($arg) {
  return 100;
});

/**
 * Image size sets + responsive image styles (RIS).
 *
 * Register the project's aspect-ratio size sets and named responsive-image styles here as part of
 * foundation ticket F5. Example (delete once you add your own):
 *
 *   add_filter('mmd_alter_image_size_sets_list', function ($sets) {
 *     $sets['3:2'] = '450x300|600x400|900x600|1200x800';
 *     return $sets;
 *   });
 *
 *   add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
 *     $ris['card'] = ['sizes' => '(min-width: 1024px) 421px, 100vw', 'whratio' => '3:2', 'srcset' => ''];
 *     return $ris;
 *   });
 */


/**
 * Modify core speculation rules API
 */
add_filter(
  'wp_speculation_rules_configuration',
  function ($config) {
    if (is_array($config)) {
      $config['mode'] = 'prefetch';
      $config['eagerness'] = 'moderate';
    }
    return $config;
  }
);