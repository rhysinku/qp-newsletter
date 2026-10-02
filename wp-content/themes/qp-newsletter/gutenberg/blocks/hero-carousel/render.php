<?php
/**
 * Render callback for mmd/hero-carousel block
 * Replaces breadcrumbs placeholder dynamically and optimizes the first slide for LCP.
 *
 * @package QP NewsLetter
 */

// Replace breadcrumbs placeholder
$breadcrumbs_placeholder = '<div class="breadcrumbs-placeholder"></div>';
if (str_contains($content, $breadcrumbs_placeholder)) {
  $breadcrumbs_html = function_exists('seopress_display_breadcrumbs') ? do_shortcode('[seopress_breadcrumbs]') : '';
  $content = str_replace(
    $breadcrumbs_placeholder,
    $breadcrumbs_html,
    $content
  );
}

// Optimize first slide image for LCP (fetchpriority="high", loading="eager", data-no-lazy="1")
$replaced = false;
$content = preg_replace_callback(
  '/<img\s([^>]+)>/i',
  function ($matches) use (&$replaced) {
    if ($replaced) {
      return $matches[0];
    }
    $replaced = true;
    $attrs = $matches[1];

    $attrs = preg_replace('/\sloading=["\'][^"\']*["\']/i', '', $attrs);
    $attrs = preg_replace('/\sfetchpriority=["\'][^"\']*["\']/i', '', $attrs);
    $attrs = preg_replace('/\sdata-no-lazy=["\'][^"\']*["\']/i', '', $attrs);
    $attrs = rtrim(trim($attrs), '/');

    return '<img ' . trim($attrs) . ' loading="eager" fetchpriority="high" data-no-lazy="1">';
  },
  $content
);

echo $content;
