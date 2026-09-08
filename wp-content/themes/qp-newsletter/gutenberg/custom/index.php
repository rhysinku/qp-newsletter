<?php

$dir = __DIR__;
$files = scandir($dir);
foreach ($files as $file) {
  /** require php files in $dir */
  if (!empty($file) && $file !== 'index.php' && strpos($file, '.php')) {
    require_once "{$dir}/{$file}";
  }

  /** require php files in inner directories of $dir */
  if (is_dir("{$dir}/{$file}") && !in_array($file, ['.', '..'])) {
    $inner_dir = "{$dir}/{$file}";
    foreach (scandir($inner_dir) as $inner_file) {
      if (strpos($inner_file, '.php')) require_once "{$inner_dir}/{$inner_file}";
    }
  }
}