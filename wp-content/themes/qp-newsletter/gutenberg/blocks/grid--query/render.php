<?php

$is_gutenberg = is_gutenberg_edit_mode();

// Available variables: $attributes, $content, $block
$post_types = $attributes['contentTypes'] ?? ['article'];
$resource_type_terms = $attributes['resourceTypeTerms'] ?? [];
$article_types = $attributes['articleTypeTerms'] ?? [];
$category_terms = $attributes['categoryTerms'] ?? [];
$region_terms = $attributes['regionTerms'] ?? [];
$theme_terms = $attributes['themeTerms'] ?? [];
$country_terms = $attributes['countryTerms'] ?? [];
$post_count = $attributes['numPostsToShow'] ?? 6;
$one_post_per_ct = $attributes['onePostPerCT'] ?? false;
$columns = $attributes['columns'] ?? 'lg:cols-3';
$respect_listing_exclusions = $attributes['respectListingExclusions'] ?? false;

// Query posts based on the attributes
$args = array(
  'post_type' => $post_types,
  'posts_per_page' => intval($post_count),
  'post_status' => 'publish',
  'orderby' => 'date',
  'order' => 'DESC',
  'meta_query' => [],
  'tax_query' => [],
);

// If respect listing exclusions is enabled, exclude posts marked as excluded.
if ($respect_listing_exclusions) {
  $args['meta_query'][] = [
    'relation' => 'OR',
    [
      'key' => 'exclude_from_listings',
      'value' => '1',
      'compare' => '!='
    ],
    [
      'key' => 'exclude_from_listings',
      'compare' => 'NOT EXISTS'
    ]
  ];
}

// // filter by isFeaturedOnly
// if ($is_featured_only) {
//   $args['meta_query'][] = array(
//     'key' => 'is_featured',
//     'value' => '1',
//     'compare' => '='
//   );
// }


// Apply taxonomy filters
mmd_block_apply_tax_filters($args, [
  'category'      => $category_terms,
  'article-type'  => $article_types,
  'region'        => $region_terms,
  'mmc-theme'     => $theme_terms,
  'event-type'    => $event_type_terms ?? [],
  'event-format'  => $event_format_terms ?? [],
  'news-type'     => $news_type_terms ?? [],
  'resource-type' => $resource_type_terms,
]);

// If onePostPerCT is enabled, query each content type separately
if ($one_post_per_ct && !empty($post_types) && is_array($post_types)) {
  $all_posts = [];
  
  foreach ($post_types as $post_type) {
    // Create a separate query args for each post type
    $single_type_args = $args;
    $single_type_args['post_type'] = $post_type;
    $single_type_args['posts_per_page'] = 1; // Get only one post per content type

    // if the post type is event or media-press, sort by date-index meta
    if ($post_type == 'event' || $post_type == 'media-press') {
      $single_type_args['orderby'] = 'meta_value';
      $single_type_args['meta_key'] = 'date-index';
      $single_type_args['order'] = 'ASC';
    }
    else {
      $single_type_args['orderby'] = 'date';
      $single_type_args['order'] = 'DESC';
    }
    
    $single_query = new WP_Query($single_type_args);
    
    if ($single_query->have_posts()) {
      while ($single_query->have_posts()) {
        $single_query->the_post();
        $all_posts[] = get_the_ID();
      }
    }
    wp_reset_postdata();
  }
  
  // Create a new query with the collected post IDs
  if (!empty($all_posts)) {
    $query = new WP_Query(array(
      'post__in' => $all_posts,
      'post_type' => 'any',
      'orderby' => 'post__in', // Maintain the order we collected them
      'posts_per_page' => count($all_posts),
    ));
  } else {
    // No posts found, create empty query
    $query = new WP_Query(array('post__in' => array(0))); // Empty query
  }
} else {
  // Normal query behavior
  $query = new WP_Query($args);
}
?>

<div class="mmd-row mmd-row-static <?php echo esc_attr($columns); ?>">
  <?php while ($query->have_posts()) : $query->the_post(); ?>
    <div class="mmd-col">
      <?php
      $ris = get_ris_by_columns($columns);
      echo mmd_block_render_card(get_the_ID(), 'standard', $ris, '<p>No content available for this post.</p>');
      ?>
    </div>
  <?php endwhile; ?>
</div>
