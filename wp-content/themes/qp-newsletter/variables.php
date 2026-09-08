<?php
/**
 * Variables
 *
 * @package QP NewsLetter
 */

defined('COMPANY_NAME') || define('COMPANY_NAME', 'QP Community');
define('MMD_ASSETS_VERSION', defined('IS_DEV_ENV') && IS_DEV_ENV ? time() : '1.0.0');
define('MMD_BLOCKS_BUILD_DIR', get_stylesheet_directory() . '/gutenberg/build/blocks/');
define('MMD_BLOCKS_BUILD_URI', get_stylesheet_directory_uri() . '/gutenberg/build/blocks/');
define('MMD_BLOCKS_SRC_DIR', get_stylesheet_directory() . '/gutenberg/blocks/');
define('MMD_BLOCKS_SRC_URI', get_stylesheet_directory_uri() . '/gutenberg/blocks/');
define('MMD_THEME_URI', trailingslashit(get_stylesheet_directory_uri()));
define('MMD_THEME_DIR', trailingslashit(get_stylesheet_directory()));

if (file_exists(MMD_THEME_DIR . 'variables.local.php')) {
  require_once MMD_THEME_DIR . 'variables.local.php';
}

if (!defined('MAIN_MENU_ID')) {
  $locations = get_nav_menu_locations();
  $menu_id = $locations['header-menu'] ?? null;
  if ($menu_id) {
    define('MAIN_MENU_ID', $menu_id);
  }
}

