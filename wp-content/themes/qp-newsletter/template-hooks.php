<?php
/**
 * Preprocess templates
 *
 * Each `mmd_preprocess__{template}` filter prepares the data a template partial renders, keeping
 * ACF calls out of the template files. The filters below are generic examples — adjust the field
 * maps to this project's ACF option groups.
 *
 * @package QP NewsLetter
 */

/**
 * Filters 'header'
 */
add_filter('mmd_preprocess__header', function ($data) {
  $group_fields = [
    'cta' => ['button_text', 'button_url'],
  ];

  $fields = mmd_map_acf_data($group_fields);

  // CTA button
  if (isset($fields['cta']) && !empty($fields['cta']['button_text']) && !empty($fields['cta']['button_url'])) {
    $data['cta']  = $fields['cta'];
  }

  return $data;
});

/**
 * Filters 'footer'
 */
add_filter('mmd_preprocess__footer', function ($data) {
  $group_fields = [
    'copy' => ['address'],
  ];

  $fields = mmd_map_acf_data($group_fields);

  // Copy
  $data['address'] = $fields['copy']['address'] ?? '';

  return $data;
});

/**
 * Filters default single template
 */
add_filter('mmd_preprocess__single', function ($data) {
  $id = get_the_ID();
  $data['post_title_id'] = "post-title-{$id}";

  return $data;
});

