<?php
/**
 * Headless API Extensions (Tasks F4 & F5)
 *
 * Exposes optimized JSON payloads for custom post types, resolves taxonomies into
 * rich objects to prevent N+1 queries, and embeds responsive image structures (RIS)
 * directly into post queries.
 *
 * @package QP NewsLetter
 */

defined('ABSPATH') || exit;

/**
 * Register custom headless REST API fields.
 *
 * @return void
 */
function qp_register_headless_rest_fields(): void {
  $public_post_types = ['post', 'page', 'blog', 'news', 'event', 'resource', 'newsletter'];

  // 1. Featured Image RIS Resolver (Task F5)
  foreach ($public_post_types as $post_type) {
    register_rest_field(
      $post_type,
      'featured_image_ris',
      [
        'get_callback' => 'qp_rest_get_featured_image_ris',
        'update_callback' => NULL,
        'schema' => NULL,
      ]
    );
  }

  // 2. Resolved Technology Tags (Task F4)
  register_rest_field(
    ['blog', 'news', 'event'],
    'tech_tags_resolved',
    [
      'get_callback' => function($post) {
        return qp_rest_resolve_taxonomy_terms($post['id'], 'tech_tag');
      },
      'update_callback' => NULL,
      'schema' => NULL,
    ]
  );

  // 3. Resolved Blog Categories
  register_rest_field(
    'blog',
    'blog_categories_resolved',
    [
      'get_callback' => function($post) {
        return qp_rest_resolve_taxonomy_terms($post['id'], 'blog_category');
      },
      'update_callback' => NULL,
      'schema' => NULL,
    ]
  );

  // 4. Resolved News Categories
  register_rest_field(
    'news',
    'news_categories_resolved',
    [
      'get_callback' => function($post) {
        return qp_rest_resolve_taxonomy_terms($post['id'], 'news_category');
      },
      'update_callback' => NULL,
      'schema' => NULL,
    ]
  );

  // 5. Resolved Newsletter Categories
  register_rest_field(
    'newsletter',
    'newsletter_categories_resolved',
    [
      'get_callback' => function($post) {
        return qp_rest_resolve_taxonomy_terms($post['id'], 'newsletter_category');
      },
      'update_callback' => NULL,
      'schema' => NULL,
    ]
  );
}
add_action('rest_api_init', 'qp_register_headless_rest_fields');

/**
 * Getter callback for the 'featured_image_ris' REST field.
 *
 * @param array $post
 *   The REST API post array.
 *
 * @return array|null
 *   The formatted responsive image structure, or null if no image is set.
 */
function qp_rest_get_featured_image_ris(array $post): ?array {
  $featured_media_id = !empty($post['featured_media']) ? intval($post['featured_media']) : 0;

  if (!$featured_media_id) {
    // Fallback: check if the custom ACF post type has an image field we can use
    return NULL;
  }

  // Retrieve responsive image style data for 'default' style
  $image_data = mmd_get_image_data_by_ris($featured_media_id, 'default');

  if (empty($image_data['url'])) {
    return NULL;
  }

  $width = !empty($image_data['width']) ? intval($image_data['width']) : 0;
  $height = !empty($image_data['height']) ? intval($image_data['height']) : 0;
  $aspect_ratio = ($width && $height) ? round($width / $height, 2) : 0;

  return [
    'id' => $featured_media_id,
    'url' => esc_url_raw($image_data['url']),
    'srcset' => esc_attr($image_data['srcset']),
    'sizes' => esc_attr($image_data['sizes']),
    'width' => $width,
    'height' => $height,
    'aspect_ratio' => (string) $aspect_ratio,
  ];
}

/**
 * Resolves taxonomy term IDs into rich objects containing slug, name, and id.
 *
 * @param int $post_id
 *   The post ID.
 * @param string $taxonomy
 *   The taxonomy slug.
 *
 * @return array
 *   An array of term objects.
 */
function qp_rest_resolve_taxonomy_terms(int $post_id, string $taxonomy): array {
  $terms = get_the_terms($post_id, $taxonomy);

  if (is_wp_error($terms) || empty($terms)) {
    return [];
  }

  $resolved_terms = [];
  foreach ($terms as $term) {
    $resolved_terms[] = [
      'id' => $term->term_id,
      'name' => esc_html($term->name),
      'slug' => esc_attr($term->slug),
    ];
  }

  return $resolved_terms;
}
