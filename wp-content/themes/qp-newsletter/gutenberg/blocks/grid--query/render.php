<?php

$is_gutenberg = (function_exists('mmd_is_gutenberg_edit_mode') && mmd_is_gutenberg_edit_mode()) || is_admin();

// Available variables: $attributes, $content, $block
$content_types              = $attributes['contentTypes'] ?? ['news', 'blog', 'resource', 'event', 'newsletter'];
$post_count                 = $attributes['numPostsToShow'] ?? 6;
$one_post_per_ct            = !empty($attributes['onePostPerCT']);
$columns                    = $attributes['columns'] ?? 'lg:cols-3';
$news_category_terms        = $attributes['newsCategoryTerms'] ?? [];
$newsletter_category_terms  = $attributes['newsletterCategoryTerms'] ?? [];
$blog_category_terms        = $attributes['blogCategoryTerms'] ?? [];
$tech_tag_terms             = $attributes['techTagTerms'] ?? [];

// Fallback to all content types if empty
if (empty($content_types)) {
  $content_types = ['news', 'blog', 'resource', 'event', 'newsletter'];
}

// Build standard WP_Query arguments
$args = [
  'post_type'      => $content_types,
  'posts_per_page' => (int) $post_count,
  'post_status'    => 'publish',
  'orderby'        => 'date',
  'order'          => 'DESC',
];

// Apply taxonomy filters
mmd_block_apply_tax_filters($args, [
  'news_category'       => $news_category_terms,
  'newsletter_category' => $newsletter_category_terms,
  'blog_category'       => $blog_category_terms,
  'tech_tag'            => $tech_tag_terms,
]);

// If one post per content type is enabled, query each selected type separately
if ($one_post_per_ct && is_array($content_types)) {
  $all_posts = [];

  foreach ($content_types as $pt) {
    $single_args = $args;
    $single_args['post_type'] = $pt;
    $single_args['posts_per_page'] = 1;

    $single_query = new WP_Query($single_args);
    if ($single_query->have_posts()) {
      while ($single_query->have_posts()) {
        $single_query->the_post();
        $all_posts[] = get_the_ID();
      }
    }
    wp_reset_postdata();
  }

  if (!empty($all_posts)) {
    $query = new WP_Query([
      'post__in'       => $all_posts,
      'post_type'      => $content_types,
      'orderby'        => 'post__in',
      'posts_per_page' => count($all_posts),
    ]);
  } else {
    $query = new WP_Query(['post__in' => [0]]);
  }
} else {
  $query = new WP_Query($args);
}
?>

<?php if ($query->have_posts()) : ?>
  <div class="mmd-grid-query mmd-row mmd-row-static <?php echo esc_attr($columns); ?> gap-y-6">
    <?php while ($query->have_posts()) : $query->the_post(); ?>
      <div class="mmd-col">
        <?php echo mmd_render_content_by_display(get_the_ID(), 'standard'); ?>
      </div>
    <?php endwhile; wp_reset_postdata(); ?>
  </div>
<?php else : ?>
  <?php if ($is_gutenberg) : ?>
    <div class="py-6 px-4 text-center border border-dashed border-neutral-grey-300 rounded-lg text-neutral-grey-500 font-medium my-4">
      <p class="m-0 text-sm">No posts found matching the query criteria.</p>
    </div>
  <?php endif; ?>
<?php endif; ?>
