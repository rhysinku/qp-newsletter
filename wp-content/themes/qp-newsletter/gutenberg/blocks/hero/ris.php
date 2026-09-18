<?php

add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
  $ris['hero'] = [
    'sizes' => '100vw',
    'whratio' => '27:10',
  ];

  return $ris;
});
