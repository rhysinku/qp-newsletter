<?php

/**
 * @file
 * Universal Related Posts partial.
 *
 * Automatically queries and renders related items for any post type
 * (News, Resources, Events, Newsletters, etc.) based on shared taxonomy terms
 * with fallback to recent posts.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

$current_post_id = $args['post_id'] ?? get_the_ID();
$post_type = $args['post_type'] ?? get_post_type($current_post_id);

if (empty($current_post_id) || empty($post_type)) {
  return;
}

$pt_obj = get_post_type_object($post_type);
$type_label = $pt_obj ? $pt_obj->labels->name : 'Posts';
$heading = $args['title'] ?? sprintf('Related %s', $type_label);

$posts_limit = (int) ($args['posts_per_page'] ?? 3);

// 1. Determine relevant taxonomy terms on the current post
$tax_queries = [];

// Shared tech tags
$tech_tags = wp_get_post_terms($current_post_id, 'tech_tag', ['fields' => 'ids']);
if (!empty($tech_tags) && !is_wp_error($tech_tags)) {
  $tax_queries[] = [
    'taxonomy' => 'tech_tag',
    'field' => 'term_id',
    'terms' => $tech_tags,
  ];
}

// Post-type specific category
$cat_taxonomy = '';
switch ($post_type) {
  case 'news':
    $cat_taxonomy = 'news_category';
    break;
  case 'resource':
    $cat_taxonomy = 'resource_category';
    break;
  case 'event':
    $cat_taxonomy = 'event_category';
    break;
  case 'newsletter':
    $cat_taxonomy = 'newsletter_category';
    break;
  case 'blog':
  case 'post':
    $cat_taxonomy = 'category';
    break;
}

if (!empty($cat_taxonomy) && taxonomy_exists($cat_taxonomy)) {
  $cat_terms = wp_get_post_terms($current_post_id, $cat_taxonomy, ['fields' => 'ids']);
  if (!empty($cat_terms) && !is_wp_error($cat_terms)) {
    $tax_queries[] = [
      'taxonomy' => $cat_taxonomy,
      'field' => 'term_id',
      'terms' => $cat_terms,
    ];
  }
}

$related_ids = [];

// 2. First query: Relevance by taxonomy matching
if (!empty($tax_queries)) {
  $tax_query = count($tax_queries) > 1 ? array_merge(['relation' => 'OR'], $tax_queries) : $tax_queries;

  $relevant_query = new WP_Query([
    'post_type' => $post_type,
    'post_status' => 'publish',
    'post__not_in' => [$current_post_id],
    'posts_per_page' => $posts_limit,
    'ignore_sticky_posts' => true,
    'tax_query' => $tax_query,
    'fields' => 'ids',
    'orderby' => 'date',
    'order' => 'DESC',
  ]);

  if (!empty($relevant_query->posts)) {
    $related_ids = array_map('intval', $relevant_query->posts);
  }
}

// 3. Fallback query: Backfill with recent posts if fewer than limit found
if (count($related_ids) < $posts_limit) {
  $needed = $posts_limit - count($related_ids);
  $exclude = array_merge([$current_post_id], $related_ids);

  $fallback_query = new WP_Query([
    'post_type' => $post_type,
    'post_status' => 'publish',
    'post__not_in' => $exclude,
    'posts_per_page' => $needed,
    'ignore_sticky_posts' => true,
    'fields' => 'ids',
    'orderby' => 'date',
    'order' => 'DESC',
  ]);

  if (!empty($fallback_query->posts)) {
    $related_ids = array_merge($related_ids, array_map('intval', $fallback_query->posts));
  }
}

// Zero-result guard: omit entire section if no related posts exist
if (empty($related_ids)) {
  return;
}
?>

<section class="mmd-related-posts bg-neutral-light-grey py-12 lg:py-16 border-t border-neutral-grey-200">
  <div class="container mx-auto px-6 max-w-[1200px]">
    <div class="flex items-center justify-between mb-8 lg:mb-10">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-navy-900 tracking-tight font-primary m-0">
        <?php echo esc_html($heading); ?>
      </h2>
    </div>

    <!-- Related Cards Grid (1-col mobile, 2-col tablet, 3-col desktop) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <?php foreach ($related_ids as $item_id) : ?>
        <div class="flex">
          <?php echo mmd_render_content_by_display($item_id, 'related'); ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
