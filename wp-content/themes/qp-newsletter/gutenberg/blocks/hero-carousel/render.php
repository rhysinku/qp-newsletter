<?php
/**
 * Render callback for mmd/hero-carousel block
 * Replaces breadcrumbs placeholder dynamically.
 */

$breadcrumbs_placeholder = '<div class="breadcrumbs-placeholder"></div>';
if (str_contains($content, $breadcrumbs_placeholder)) {
  $breadcrumbs_html = function_exists('seopress_display_breadcrumbs') ? do_shortcode('[seopress_breadcrumbs]') : '';
  $content = str_replace(
    $breadcrumbs_placeholder,
    $breadcrumbs_html,
    $content
  );
}

echo $content;
