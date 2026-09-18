<?php

add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
  $ris['base-image'] = [
    'sizes' => '100vw',
    'whratio' => '3:2',
  ];

  return $ris;
});
