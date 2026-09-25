<?php

/**
 * Responsive image style (RIS) configuration for People Card blocks.
 */

add_filter('mmd_alter_image_size_sets_list', function ($sets) {
  $sets['1:1'] = '120x120|240x240|360x360';
  return $sets;
});

add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
  $ris['people-avatar'] = [
    'sizes' => '120px',
    'whratio' => '1:1',
  ];
  return $ris;
});
