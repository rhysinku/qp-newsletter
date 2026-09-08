<?php
/**
 * Register custom block categories
 *
 * @package QP NewsLetter
 */

$company_name = COMPANY_NAME;
$custom_categories = [
  [
    'slug' => 'mmd-hero-blocks',
    'title' => "{$company_name} - Hero Blocks",
    'icon' => 'welcome-view-site',
  ],
  [
    'slug' => 'mmd-section-blocks',
    'title' => "{$company_name} - Section Blocks",
    'icon' => 'editor-table',
  ],
  [
    'slug' => 'mmd-standalone-blocks',
    'title' => "{$company_name} - Standalone Blocks",
    'icon' => 'block-default',
  ],
  [
    'slug' => 'mmd-generic-blocks',
    'title' => "{$company_name} - Generic Blocks",
    'icon' => 'admin-plugins',
  ],
  [
    'slug' => 'mmd-grid-blocks',
    'title' => "{$company_name} - Grid Blocks",
    'icon' => 'grid-view',
  ],
  [
    'slug' => 'mmd-card-blocks',
    'title' => "{$company_name} - Card Blocks for Grids",
    'icon' => 'embed-generic',
  ],
];

$mmd_blocks = \MMD\Blocks\CustomGutenbergBlocks::get_instance();
foreach ($custom_categories as $custom_category) {
  $mmd_blocks->add_block_category(
    $custom_category['slug'],
    $custom_category['title'],
    $custom_category['icon'],
  );
}
