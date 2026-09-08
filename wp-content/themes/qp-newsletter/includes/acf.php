<?php
/**
 * Implements ACF Local JSON handling
 */

// Generic save points
function mmd_acf_json_save_point($path) {
  return get_stylesheet_directory() . '/acf-json';
}

add_filter('acf/settings/save_json', 'mmd_acf_json_save_point');

// ACF local json load points
function mmd_acf_json_load_point( $paths ) {

  // Add custom paths
  $paths = [get_stylesheet_directory() . '/acf-json'];

  return $paths;
}
add_filter( 'acf/settings/load_json', 'mmd_acf_json_load_point' );


/**
 * Get ACF fields for a specific post type and identify taxonomy-related fields
 */
function mmd_get_taxonomy_acf_fields($post_type) {
  $acf_fields = [];
  
  // Get all ACF field groups for this post type
  $field_groups = acf_get_field_groups(['post_type' => $post_type]);
  
  foreach ($field_groups as $field_group) {
    $fields = acf_get_fields($field_group);
    
    if ($fields) {
      foreach ($fields as $field) {
        // Check if field name ends with _term or _terms
        if (preg_match('/^(.+)_(term|terms)$/', $field['name'], $matches)) {
          $taxonomy_name = $matches[1];
          $acf_fields[$field['name']] = $taxonomy_name;
        }
      }
    }
  }
  
  return $acf_fields;
}

/**
 * Improved bidirectional taxonomy sync that works with any post type
 */
function mmd_bidirectional_taxonomy_sync($post_id) {
  // Get post type
  $post_type = get_post_type($post_id);
  
  if (!$post_type) {
    return;
  }
  
  // Prevent infinite loops
  remove_action('set_object_terms', 'mmd_sync_taxonomy_to_acf');
  remove_action('acf/save_post', 'mmd_bidirectional_taxonomy_sync');
  
  // Get ACF fields that are related to taxonomies for this post type
  $acf_taxonomies = mmd_get_taxonomy_acf_fields($post_type);
  
  // ACF to Taxonomy sync
  foreach ($acf_taxonomies as $acf_field => $taxonomy) {
    $terms = get_field($acf_field, $post_id);
    
    if ($terms) {
      // Handle both single terms and arrays of terms
      if (!is_array($terms)) {
        $terms = [$terms];
      }
      
      // Convert term objects to IDs if needed
      $term_ids = [];
      foreach ($terms as $term) {
        if (is_object($term) && isset($term->term_id)) {
          $term_ids[] = $term->term_id;
        } elseif (is_numeric($term)) {
          $term_ids[] = $term;
        } else {
          // If it's a string, try to get term by name
          $term_obj = get_term_by('name', $term, $taxonomy);
          if ($term_obj) {
            $term_ids[] = $term_obj->term_id;
          }
        }
      }
      
      if (!empty($term_ids)) {
        wp_set_post_terms($post_id, $term_ids, $taxonomy);
      }
    }
  }
  
  // Re-add hooks
  add_action('set_object_terms', 'mmd_sync_taxonomy_to_acf', 10, 6);
  add_action('acf/save_post', 'mmd_bidirectional_taxonomy_sync', 20);
}
add_action('acf/save_post', 'mmd_bidirectional_taxonomy_sync', 20);

/**
 * Sync taxonomy changes back to ACF fields
 */
function mmd_sync_taxonomy_to_acf($object_id, $terms, $tt_ids, $taxonomy, $append, $old_tt_ids) {
  // Recursion guard: update_field() below calls wp_set_object_terms(), which fires
  // set_object_terms again and re-enters this function. Without this guard the loop
  // exhausts memory.
  static $running = false;
  if ($running) {
    return;
  }
  $running = true;

  $post_type = get_post_type($object_id);

  if (!$post_type) {
    $running = false;
    return;
  }
  
  // Get ACF fields for this post type
  $acf_taxonomies = mmd_get_taxonomy_acf_fields($post_type);
  
  // Find the ACF field that corresponds to this taxonomy
  $acf_field = null;
  foreach ($acf_taxonomies as $field_name => $tax_name) {
    if ($tax_name === $taxonomy) {
      $acf_field = $field_name;
      break;
    }
  }
  
  if ($acf_field) {
    // Convert term objects to term IDs for ACF
    $term_ids = [];
    foreach ($terms as $term) {
      if (is_object($term) && isset($term->term_id)) {
        $term_ids[] = $term->term_id;
      } elseif (is_numeric($term)) {
        $term_ids[] = $term;
      }
    }

    // Update ACF field
    if (!empty($term_ids)) {
      update_field($acf_field, $term_ids, $object_id);
    } else {
      update_field($acf_field, null, $object_id);
    }
  }

  $running = false;
}
add_action('set_object_terms', 'mmd_sync_taxonomy_to_acf', 10, 6);

// Register Theme Settings options page.
// Hook into acf/init — calling acf_add_options_page() at include time runs before the
// `init` action and trips the WP 6.7 "_load_textdomain_just_in_time called incorrectly"
// notice for the acf textdomain.
function mmd_register_options_pages() {
  if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
      'page_title'    => 'Theme Settings',
      'menu_title'    => 'Theme Settings',
      'menu_slug'     => 'theme-settings',
      'capability'    => 'edit_posts',
      'redirect'      => false,
      'autoload'      => true,
    ]);
  }
}
add_action('acf/init', 'mmd_register_options_pages');