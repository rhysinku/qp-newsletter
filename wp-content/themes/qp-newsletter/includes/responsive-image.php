<?php

/**
 * @file
 * Responsive image style (RIS) helper functions.
 *
 * Support for pixel ratio and responsive image styles (RIS).
 *
 * @package QP NewsLetter
 */

define('PIXEL_RATIO_SUPPORT', 1);

/**
 * Add custom image sizes.
 *
 * @return void
 */
function mmd_register_image_sizes(): void {
  $sets = mmd_get_image_size_sets();

  if (!empty($sets)) {
    foreach ($sets as $ris_sizes) {
      // Extract $sizes (widthxheight) from $ris_sizes.
      $image_sizes = explode('|', $ris_sizes);
      // Add image size for each size from $sizes.
      foreach ($image_sizes as $image_size) {
        $widthxheight = explode('x', $image_size);
        // Use $image_size (widthxheight) as machine_name for image size.
        if (!empty($widthxheight[1])) {
          add_image_size($image_size, $widthxheight[0], $widthxheight[1], TRUE);
        }
        else {
          add_image_size($image_size, $widthxheight[0]);
        }
      }
    }
  }
}

// Priority 20 so this runs AFTER CustomGutenbergBlocks::register_blocks (init,
// priority 10) has loaded every block's ris.php. Those files register additional
// image size sets (e.g. the hero block's 5:2) via mmd_alter_image_size_sets_list;
// registering image sizes any earlier misses them, so their crops never generate.
add_action('init', 'mmd_register_image_sizes', 20);
add_action('after_setup_theme', 'mmd_register_image_sizes');

/**
 * Add custom image sizes to the list of image sizes.
 *
 * @param array $sizes
 *   List of sizes.
 *
 * @return array
 *   Updated list of sizes.
 */
function mmd_register_image_size_names_choose(array $sizes): array {
  $list_sizes = $sizes;

  $sets = mmd_get_image_size_sets();
  if (!empty($sets)) {
    foreach ($sets as $ris_whratio => $ris_sizes) {
      // Extract $sizes (widthxheight) from $ris_sizes.
      $image_sizes = explode('|', $ris_sizes);
      // Add image size for each size from $sizes.
      foreach ($image_sizes as $image_size) {
        $list_sizes = array_merge($list_sizes, [$image_size => $image_size]);
      }
    }
  }

  return $list_sizes;
}

add_filter('image_size_names_choose', 'mmd_register_image_size_names_choose');

/**
 * Retrieve all image size sets.
 *
 * Sourced from the custom hook mmd_alter_image_size_sets_list.
 *
 * @return array
 *   List of image size sets.
 */
function mmd_get_image_size_sets(): array {
  $sets = [];

  // Defaults.
  // Original ratios.
  $sets['original'] = '100x|400x';

  $sets = apply_filters('mmd_alter_image_size_sets_list', $sets);

  // Add pixel ratio support.
  if (PIXEL_RATIO_SUPPORT !== 1) {
    // Loop through all $sets, add pixel ratio sizes to $sets.
    foreach ($sets as $whratio => $sizes) {
      // Extract $sizes (widthxheight) from $sizes.
      $image_sizes = explode('|', $sizes);
      // Add pixel ratio sizes to $sets.
      foreach ($image_sizes as $image_size) {
        $widthxheight = explode('x', $image_size);
        $pixel_ratio_width = $widthxheight[0] * PIXEL_RATIO_SUPPORT;
        $pixel_ratio_height = $widthxheight[1] * PIXEL_RATIO_SUPPORT;
        $sets[$whratio] .= "|{$pixel_ratio_width}x{$pixel_ratio_height}";
      }
    }
  }

  return $sets;
}

/**
 * Retrieve responsive image styles from custom filter hook.
 *
 * @param string $ris_id
 *   Optional specific responsive image style ID.
 *
 * @return array
 *   List of responsive image styles, or a single style.
 */
function mmd_get_responsive_image_styles(string $ris_id = '') {
  $ris = [];

  $ris = apply_filters('mmd_alter_responsive_image_styles_list', $ris);

  // Fill in srcset for each ris.
  $sets = mmd_get_image_size_sets();
  if (!empty($sets)) {
    foreach ($ris as $name => $r) {
      if (!isset($r['whratio']) && defined('WP_DEBUG') && WP_DEBUG) {
        error_log("NOT SET WHRATIO for responsive image style: $name");
      }
      $ris[$name]['srcset'] = $sets[$r['whratio']];
    }
  }

  if (!empty($ris_id) && isset($ris[$ris_id])) {
    // Return specific responsive image style if requested.
    return $ris[$ris_id];
  }

  return $ris;
}

/**
 * Renders a responsive <img> for an attachment.
 *
 * @param int $attachment_id
 *   The attachment ID to render.
 * @param string $ris_id
 *   The responsive image style preset key. Defaults to 'default'.
 * @param array $classes
 *   CSS classes applied to the <img> element.
 * @param string|null $alt_override
 *   Alt text to use instead of the attachment's stored alt text.
 * @param bool $wrap_figure
 *   When TRUE, wraps the <img> in a <figure> element.
 * @param string $figure_class
 *   Extra CSS classes for the wrapping <figure>.
 * @param bool $eager
 *   Set TRUE to enable eager loading / fetchpriority="high" for LCP.
 *
 * @return string
 *   The image HTML, or an empty string when the image data is missing.
 */
function mmd_render_image_by_ris(int $attachment_id, string $ris_id = 'default', array $classes = [], ?string $alt_override = NULL, bool $wrap_figure = FALSE, string $figure_class = '', bool $eager = FALSE): string {
  $image_data = mmd_get_image_data_by_ris($attachment_id, $ris_id);

  if (!$image_data || !isset($image_data['url'], $image_data['width'], $image_data['height'])) {
    // Gracefully handle missing image data (no empty <figure> emitted).
    return '';
  }

  $alt = ($alt_override !== NULL) ? $alt_override : ($image_data['alt'] ?? '');

  $attributes = [
    'class' => implode(' ', $classes),
    'src' => $image_data['url'],
    'width' => $image_data['width'],
    'height' => $image_data['height'],
    'alt' => esc_attr($alt),
    'data-image-id' => $attachment_id,
  ];

  if ($eager) {
    $attributes['loading'] = 'eager';
    $attributes['fetchpriority'] = 'high';
  }
  else {
    $attributes['decoding'] = 'async';
    $attributes['loading'] = 'lazy';
  }

  if (!empty($image_data['mime']) && $image_data['mime'] !== 'image/gif') {
    $attributes['srcset'] = $image_data['srcset'] ?? '';
    $attributes['sizes'] = $image_data['sizes'] ?? '';
  }

  $html_attributes = '';
  foreach ($attributes as $key => $value) {
    $html_attributes .= sprintf(' %s="%s"', esc_attr($key), esc_attr($value));
  }

  $img = sprintf('<img%s />', $html_attributes);

  if (!$wrap_figure) {
    return $img;
  }

  $figure_class = trim($figure_class);
  if ($figure_class !== '') {
    return sprintf('<figure class="%s">%s</figure>', esc_attr($figure_class), $img);
  }

  return sprintf('<figure>%s</figure>', $img);
}

/**
 * Helper function for getting responsive image data by RIS.
 *
 * @param int $attachment_id
 *   The ID of the attachment.
 * @param string|array $ris
 *   The responsive image style ID or array of styles.
 *
 * @return array
 *   The image details (url, alt, width, height, etc).
 */
function mmd_get_image_data_by_ris(int $attachment_id, $ris): array {
  $image_mime = get_post_mime_type($attachment_id);

  $original_ris = $ris;
  if (is_string($ris)) {
    $ris = mmd_get_responsive_image_styles($ris);
  }

  if (empty($ris['srcset']) && defined('WP_DEBUG') && WP_DEBUG) {
    error_log("NO SRCSET FOR RIS: " . print_r($original_ris, TRUE));
  }

  // Get image sizes from $ris['srcset'].
  $image_sizes = !empty($ris['srcset']) ? explode('|', $ris['srcset']) : [];

  $srcset_parts = [];
  $first = '';

  foreach ($image_sizes as $image_size) {
    $image_size_url = wp_get_attachment_image_src($attachment_id, $image_size);

    if ($image_size_url && isset($image_size_url[0], $image_size_url[1])) {
      $url = $image_size_url[0];
      $width = $image_size_url[1];

      // Avoid duplicates in srcset.
      if (!in_array("$url {$width}w", $srcset_parts, TRUE)) {
        $srcset_parts[] = "$url {$width}w";
      }

      // Capture the first valid image URL.
      if (empty($first)) {
        $first = $url;
      }
    }
  }

  $srcset = implode(', ', $srcset_parts);

  // Get image alt text.
  $image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

  // Get image metadata.
  $image_metadata = wp_get_attachment_metadata($attachment_id);
  $image_width = $image_metadata['width'] ?? NULL;
  $image_height = $image_metadata['height'] ?? NULL;

  return [
    'url' => $first,
    'alt' => $image_alt,
    'width' => $image_width,
    'height' => $image_height,
    'srcset' => $srcset,
    'sizes' => $ris['sizes'] ?? '',
    'mime' => $image_mime,
  ];
}

/**
 * Helper function for getting responsive image data for all styles.
 *
 * @param int $attachment_id
 *   The attachment ID.
 *
 * @return array
 *   List of responsive image data for all styles.
 */
function mmd_get_ris_for_media(int $attachment_id): array {
  $ris = mmd_get_responsive_image_styles();
  if (!empty($ris)) {
    foreach ($ris as $name => $r) {
      $image_data = mmd_get_image_data_by_ris($attachment_id, $r);
      $ris[$name]['sizes'] = $r['sizes'];
      $ris[$name]['srcset'] = $image_data['srcset'];
    }
  }
  return $ris;
}

/**
 * Implements wp_prepare_attachment_for_js filter.
 *
 * Adds custom image sizes to attachment metadata as srcsets.
 *
 * @param array $response
 *   The attachment JS response.
 * @param \WP_Post $attachment
 *   The attachment post object.
 * @param array $meta
 *   The attachment metadata.
 *
 * @return array
 *   The updated response.
 */
function mmd_alter_attachment_metadata_for_js(array $response, \WP_Post $attachment, array $meta): array {
  $response['ris'] = mmd_get_ris_for_media($attachment->ID);
  return $response;
}

add_filter('wp_prepare_attachment_for_js', 'mmd_alter_attachment_metadata_for_js', 100, 3);

/**
 * Get RIS data for REST API media response.
 *
 * @param array $attachment
 *   The attachment resource data.
 *
 * @return array
 *   Responsive image data.
 */
function mmd_media_get_ris(array $attachment): array {
  return mmd_get_ris_for_media($attachment['id']);
}

/**
 * Register REST API field for RIS data.
 *
 * @return void
 */
function mmd_add_ris_data(): void {
  register_rest_field(
    'attachment',
    'ris',
    [
      'get_callback' => 'mmd_media_get_ris',
      'update_callback' => NULL,
      'schema' => NULL,
      'show_in_rest' => TRUE,
    ]
  );
}

add_action('rest_api_init', 'mmd_add_ris_data');

add_action('wp_ajax_mmd_get_ris', 'mmd_get_ris');

/**
 * Print list of RIS via an AJAX action.
 *
 * Access via /wp-admin/admin-ajax.php?action=mmd_get_ris.
 *
 * @return void
 */
function mmd_get_ris(): void {
  $ris = mmd_get_responsive_image_styles();
  echo "<pre>";
  print_r($ris);
  exit;
}

add_action('wp_ajax_mmd_get_whratio_srcsets', 'mmd_get_whratio_srcsets');

/**
 * Print list of whratio & sizes via an AJAX action.
 *
 * Access via /wp-admin/admin-ajax.php?action=mmd_get_whratio_srcsets.
 *
 * @return void
 */
function mmd_get_whratio_srcsets(): void {
  $ris = mmd_get_responsive_image_styles();
  $srcsets_by_whratio = [];
  foreach ($ris as $name => $r) {
    if (!empty($r['whratio'])) {
      $srcsets_by_whratio[$r['whratio']] = $r['srcset'];
    }
  }
  echo "<pre>";
  print_r($srcsets_by_whratio);
  exit;
}
