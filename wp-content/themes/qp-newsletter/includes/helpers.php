<?php

/**
 * @file
 * Helper functions for the theme.
 *
 * @package QP NewsLetter
 */

/**
 * Helper function for extracting data for custom post types.
 *
 * @param array $data
 *   Reference to the data array to populate.
 * @param array $field_names
 *   Names of the fields to extract.
 * @param int $pid
 *   Optional post ID.
 *
 * @return void
 */
function mmd_get_acf_fields_data(array &$data, array $field_names, int $pid = 0): void {
  foreach ($field_names as $fn) {
    $data[$fn] = !empty($pid) ? get_field($fn, $pid) : get_field($fn);
  }
}

/**
 * Get image with specific size.
 *
 * @param string $field_name
 *   ACF image field name.
 * @param string $size_name
 *   Image size slug.
 * @param string $class
 *   CSS class to apply.
 * @param mixed $post
 *   Post object or ID.
 *
 * @return string
 *   The image HTML.
 */
function mmd_get_image_with_size(string $field_name, string $size_name, string $class = '', $post = NULL): string {
  $image_id = (empty($post)) ? get_field($field_name) : get_field($field_name, $post);
  return !empty($image_id) ? wp_get_attachment_image($image_id, $size_name, FALSE, ['class' => $class]) : '';
}

/**
 * Get theme image URI.
 *
 * @param string $image_filename
 *   The image filename.
 *
 * @return string
 *   The full image URI.
 */
function mmd_image(string $image_filename): string {
  return MMD_THEME_URI . 'assets/images/' . $image_filename;
}

/**
 * Get theme SVG sprite URI.
 *
 * @param string $sprite_id
 *   The sprite symbol ID.
 *
 * @return string
 *   The full sprite symbol URI.
 */
function mmd_sprite(string $sprite_id): string {
  return MMD_THEME_URI . 'assets/sprites/sprite.svg?' . MMD_ASSETS_VERSION . '#' . $sprite_id;
}

/**
 * Map ACF groups and fields to array.
 *
 * @param array $field_groups
 *   Mapping of group keys to lists of fields.
 * @param mixed $post_id
 *   Post ID or 'option'.
 *
 * @return array
 *   The mapped ACF data.
 */
function mmd_map_acf_data(array $field_groups, $post_id = 'option'): array {
  $final_fields_array = [];
  foreach ($field_groups as $group_key => $fields) {
    $group_data = get_field($group_key, $post_id);
    if ($group_data && is_array($group_data)) {
      foreach ($fields as $field) {
        $final_fields_array[$group_key][$field] = $group_data[$field] ?? '';
      }
    }
    else {
      // Initialize with empty values if group_data is null or not an array.
      foreach ($fields as $field) {
        $final_fields_array[$group_key][$field] = '';
      }
    }
  }

  return $final_fields_array;
}

/**
 * Render template display part and return as string.
 *
 * @param int $post_id
 *   The post ID.
 * @param string $display
 *   The display mode name.
 * @param array $options
 *   Optional template options.
 *
 * @return string
 *   The rendered HTML content.
 */
function mmd_render_content_by_display(int $post_id, string $display = 'standard', array $options = []): string {
  ob_start();
  $post_type = get_post_type($post_id);
  if (empty($post_type)) {
    return '';
  }

  $args = [
    'ID' => $post_id,
    'options' => $options,
  ];
  $result = get_template_part("templates/displays/post--{$display}--{$post_type}", NULL, $args);
  if ($result === FALSE) {
    $result = get_template_part("templates/displays/post--{$display}", NULL, $args);
  }

  return (string) ob_get_clean();
}

/**
 * Get RIS size name matching the columns class.
 *
 * @param string $columns
 *   Columns layout class.
 *
 * @return string
 *   The RIS size name.
 */
function mmd_get_ris_by_columns(string $columns): string {
  switch ($columns) {
    case 'lg:cols-1':
      return 'card_standard_1_col';

    case 'lg:cols-2':
      return 'card_standard_2_cols';

    case 'lg:cols-4':
      return 'card_standard_4_cols';

    default:
      // Default to 3 columns (also handles 'lg:cols-3' case)
      return 'card_standard_3_cols';
  }
}

/**
 * Get term name by term ID.
 *
 * @param int $tid
 *   The term ID.
 *
 * @return string
 *   The term name.
 */
function mmd_get_term_name_by_tid(int $tid): string {
  $term = get_term($tid);
  return $term ? $term->name : '';
}

/**
 * Get term names by term IDs separated by commas.
 *
 * @param array|int $tids
 *   The term ID or array of IDs.
 * @param string $output_format
 *   Format: 'string', 'link_string', or 'array'.
 *
 * @return string|array
 *   The term names formatted.
 */
function mmd_get_term_names_by_tids($tids, string $output_format = 'string') {
  $term_names = [];
  $term_links = [];

  if (is_numeric($tids)) {
    $tids = [$tids];
  }

  if (is_array($tids)) {
    foreach ($tids as $tid) {
      $term = get_term($tid);
      if ($term && !is_wp_error($term)) {
        $term_names[] = $term->name;
        $term_link = get_term_link($term);
        if (!is_wp_error($term_link)) {
          $term_links[] = '<a href="' . esc_url($term_link) . '">' . $term->name . '</a>';
        }
      }
    }
  }

  if ($output_format == 'string') {
    return implode(', ', $term_names);
  }
  elseif ($output_format == 'link_string') {
    return implode(', ', $term_links);
  }
  else {
    return $term_names;
  }
}

/**
 * Get post titles by post IDs.
 *
 * @param array $pids
 *   Array of post IDs.
 * @param string $output_format
 *   Format: 'string' or 'array'.
 *
 * @return string|array
 *   The titles formatted.
 */
function mmd_get_post_titles_by_pids(array $pids, string $output_format = 'string') {
  $post_titles = [];
  foreach ($pids as $pid) {
    $post = get_post($pid);
    if ($post) {
      $post_titles[] = $post->post_title;
    }
  }

  if ($output_format == 'string') {
    return implode(', ', $post_titles);
  }
  else {
    return $post_titles;
  }
}

/**
 * Find the "Regions on the move" item in the hierarchy.
 *
 * @param mixed $content_table
 *   The hierarchy array.
 *
 * @return array|null
 *   The regions item or null if not found.
 */
function mmd_find_regions_item($content_table): ?array {
  if (!$content_table || !is_array($content_table)) {
    return NULL;
  }

  foreach ($content_table as $item) {
    if (isset($item['l1-title']) && strtolower($item['l1-title']) === 'regions on the move') {
      return $item;
    }
  }

  return NULL;
}

/**
 * Trim text to maximum length without cutting words.
 *
 * @param string|null $text
 *   The text to trim.
 * @param int $max_length
 *   Maximum length in characters.
 *
 * @return string
 *   The trimmed text.
 */
function mmd_trim_text(?string $text, int $max_length): string {
  if (empty($text)) {
    return '';
  }

  if (strlen($text) > $max_length) {
    // Truncate to $max_length chars but do not cut in the middle of a word.
    $text_cut = substr($text, 0, $max_length);
    if (substr($text, $max_length, 1) != ' ' && strpos($text, ' ', $max_length) !== FALSE) {
      $last_space = strrpos($text_cut, ' ');
      if ($last_space !== FALSE) {
        $text_cut = substr($text_cut, 0, $last_space);
      }
    }
    $text = rtrim($text_cut) . '...';
  }
  return $text;
}
