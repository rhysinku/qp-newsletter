<?php

defined('ABSPATH') || exit;

$includes_dir = __DIR__;
$files = glob($includes_dir . '/*.php');
foreach ($files as $file) {
  if (basename($file) !== basename(__FILE__)) {
    require_once $file;
  }
}
