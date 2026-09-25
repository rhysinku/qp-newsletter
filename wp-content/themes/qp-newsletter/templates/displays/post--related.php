<?php

/**
 * @file
 * Related post display template.
 *
 * Renders a post card inside related posts grids and recommendations.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

$post_id = $args['ID'] ?? 0;
if (empty($post_id)) {
  return;
}

$fields = function_exists('get_fields') ? (get_fields($post_id) ?: []) : [];

$title = get_the_title($post_id);
$url = get_the_permalink($post_id);
$post_type = get_post_type($post_id);
$thumbnail_id = (int) get_post_thumbnail_id($post_id);
$date = get_the_date('F j, Y', $post_id);
$date_iso = get_the_date('c', $post_id);

// Excerpt trimming
$excerpt = get_the_excerpt($post_id);
if (empty($excerpt)) {
  $post_obj = get_post($post_id);
  $excerpt = wp_strip_all_tags($post_obj->post_content ?? '');
}
if (!empty($excerpt)) {
  $excerpt = wp_trim_words($excerpt, 18, '...');
}

// Category / Term Badge resolution
$badge_text = '';
$badge_link = '';

switch ($post_type) {
  case 'news':
    $cat_id = $fields['news_category-term'] ?? get_post_meta($post_id, 'news_category-term', true);
    if (!empty($cat_id) && is_numeric($cat_id)) {
      $term = get_term((int) $cat_id, 'news_category');
      if ($term && !is_wp_error($term)) {
        $badge_text = $term->name;
      }
    }
    if (empty($badge_text)) {
      $terms = get_the_terms($post_id, 'news_category');
      if (!empty($terms) && !is_wp_error($terms)) {
        $badge_text = $terms[0]->name;
      }
    }
    break;

  case 'resource':
    $terms = get_the_terms($post_id, 'resource_category');
    if (!empty($terms) && !is_wp_error($terms)) {
      $badge_text = $terms[0]->name;
    }
    break;

  case 'event':
    $terms = get_the_terms($post_id, 'event_category');
    if (!empty($terms) && !is_wp_error($terms)) {
      $badge_text = $terms[0]->name;
    }
    break;

  case 'newsletter':
    $terms = get_the_terms($post_id, 'newsletter_category');
    if (!empty($terms) && !is_wp_error($terms)) {
      $badge_text = $terms[0]->name;
    }
    break;
}

// Fallback to tech_tag or post type label
if (empty($badge_text)) {
  $tech_tags = get_the_terms($post_id, 'tech_tag');
  if (!empty($tech_tags) && !is_wp_error($tech_tags)) {
    $badge_text = $tech_tags[0]->name;
  } else {
    $pt_obj = get_post_type_object($post_type);
    $badge_text = $pt_obj ? $pt_obj->labels->singular_name : 'Post';
  }
}

// Reading time
$reading_time = $fields['estimate_reading'] ?? get_post_meta($post_id, 'estimate_reading', true);
?>

<article class="mmd-card mmd-card--related relative isolate flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-neutral-grey-150/60 shadow-sm hover:shadow-md hover:border-neutral-grey-300 transition-all duration-200 group">
  <!-- Card Thumbnail -->
  <figure class="mmd-card__image relative aspect-video overflow-hidden bg-neutral-grey-100 m-0">
    <?php if (!empty($thumbnail_id)) : ?>
      <?php echo mmd_render_image_by_ris(
        $thumbnail_id,
        'card--related',
        ['w-full', 'h-full', 'object-cover', 'transition-transform', 'duration-300', 'group-hover:scale-105'],
        $title,
        wrap_figure: false
      ); ?>
    <?php else : ?>
      <!-- Subtle branded placeholder when no thumbnail is set -->
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-grey-100 to-neutral-grey-200 text-neutral-grey-500">
        <svg class="w-10 h-10 opacity-40 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
          <use href="<?php echo esc_url(mmd_sprite('file')); ?>"></use>
        </svg>
      </div>
    <?php endif; ?>
  </figure>

  <!-- Card Body -->
  <div class="mmd-card__content p-6 flex flex-col flex-1">
    <!-- Badge & Reading time row -->
    <div class="flex items-center justify-between gap-2 mb-2">
      <?php if (!empty($badge_text)) : ?>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-blue-50 text-primary border border-primary/20">
          <?php echo esc_html($badge_text); ?>
        </span>
      <?php endif; ?>

      <?php if (!empty($reading_time)) : ?>
        <span class="text-xs text-neutral-grey-500 flex items-center gap-1">
          <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
            <use href="<?php echo esc_url(mmd_sprite('clock')); ?>"></use>
          </svg>
          <?php echo esc_html($reading_time); ?>m read
        </span>
      <?php endif; ?>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-primary-navy-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 mt-2 mb-2 font-primary">
      <?php echo esc_html($title); ?>
    </h3>

    <!-- Excerpt -->
    <?php if (!empty($excerpt)) : ?>
      <p class="text-sm text-neutral-grey-700 line-clamp-2 mb-4 flex-1">
        <?php echo esc_html($excerpt); ?>
      </p>
    <?php endif; ?>

    <!-- Card Footer -->
    <div class="flex items-center justify-between text-xs text-neutral-grey-500 pt-3 border-t border-neutral-grey-150/60 mt-auto">
      <time datetime="<?php echo esc_attr($date_iso); ?>">
        <?php echo esc_html($date); ?>
      </time>
      <span class="inline-flex items-center gap-1 font-bold text-primary group-hover:text-primary-navy-900 transition-colors">
        <span>Read More</span>
        <svg class="w-3.5 h-3.5 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </span>
    </div>
  </div>

  <!-- Accessible Full-Card Overlay Link -->
  <a href="<?php echo esc_url($url); ?>" class="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-2xl" aria-label="<?php echo esc_attr(sprintf('Read %s', $title)); ?>">
    <span class="sr-only"><?php echo esc_html($title); ?></span>
  </a>
</article>
