<?php
/**
 * Render callback for mmd/hero block
 * Handles server-side dynamic replacements for breadcrumbs and Back to Parent link.
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

// Replace Back to Parent placeholder
$back_placeholder = '<div class="back-to-parent-placeholder"></div>';
if (str_contains($content, $back_placeholder)) {
  $current_id = get_the_ID();
  $parent_id  = $current_id ? wp_get_post_parent_id($current_id) : 0;
  $parent_url = '';
  $back_label = '';

  if ($parent_id) {
    $parent_title = get_the_title($parent_id);
    $parent_url   = get_permalink($parent_id);
    $back_label   = sprintf(esc_html__('Back to %s', 'qp-newsletter'), esc_html($parent_title));
  } else {
    $post_type = $current_id ? get_post_type($current_id) : '';
    $archive_url = $post_type ? get_post_type_archive_link($post_type) : '';
    if ($archive_url) {
      $cpt_obj = get_post_type_object($post_type);
      $back_label = sprintf(esc_html__('Back to %s', 'qp-newsletter'), esc_html($cpt_obj->labels->name ?? 'Overview'));
      $parent_url = $archive_url;
    } else {
      $parent_url = home_url('/');
      $back_label = esc_html__('Back to Home', 'qp-newsletter');
    }
  }

  $back_html = '';
  if ($parent_url) {
    $back_html = sprintf(
      '<a href="%s" class="mmd-hero__back-link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-4"><span class="dashicons dashicons-arrow-left-alt2" aria-hidden="true"></span> %s</a>',
      esc_url($parent_url),
      $back_label
    );
  }

  $content = str_replace($back_placeholder, $back_html, $content);
}

echo $content;
