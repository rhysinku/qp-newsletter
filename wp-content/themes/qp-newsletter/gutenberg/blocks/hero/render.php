<?php
/**
 * Replace placeholders with actual content for the block
 */

$breadcrumbs_placeholder = '<div class="breadcrumbs-placeholder"></div>';
if (str_contains($content, $breadcrumbs_placeholder)) {
  $content = str_replace(
    $breadcrumbs_placeholder,
    do_shortcode('[seopress_breadcrumbs]'),
    $content
  );
}

echo $content;
