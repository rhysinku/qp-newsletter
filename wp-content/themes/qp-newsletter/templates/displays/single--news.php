<?php

/**
 * @file
 * Single News Page Template.
 *
 * Handles display for individual 'news' custom post type items.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

$post_id = get_the_ID();
$fields = function_exists('get_fields') ? (get_fields($post_id) ?: []) : [];

// Core post data.
$title = get_the_title();
$permalink = get_permalink();
$thumbnail_id = (int) get_post_thumbnail_id($post_id);

// Primary category term ('news_category-term').
$category_term = null;
$category_id = $fields['news_category-term'] ?? get_post_meta($post_id, 'news_category-term', true);
if (!empty($category_id)) {
  if (is_numeric($category_id)) {
    $term = get_term((int) $category_id, 'news_category');
    if ($term && !is_wp_error($term)) {
      $category_term = $term;
    }
  } elseif (is_object($category_id) && isset($category_id->name)) {
    $category_term = $category_id;
  }
}
if (!$category_term) {
  $terms = get_the_terms($post_id, 'news_category');
  if (!empty($terms) && !is_wp_error($terms)) {
    $category_term = $terms[0];
  }
}

// Technology tag terms ('tech_tag-terms').
$tech_tags = [];
$tag_ids = $fields['tech_tag-terms'] ?? get_post_meta($post_id, 'tech_tag-terms', true);
if (!empty($tag_ids)) {
  if (is_array($tag_ids)) {
    foreach ($tag_ids as $tid) {
      if (is_numeric($tid)) {
        $t = get_term((int) $tid, 'tech_tag');
        if ($t && !is_wp_error($t)) {
          $tech_tags[] = $t;
        }
      } elseif (is_object($tid) && isset($tid->name)) {
        $tech_tags[] = $tid;
      }
    }
  } elseif (is_numeric($tag_ids)) {
    $t = get_term((int) $tag_ids, 'tech_tag');
    if ($t && !is_wp_error($t)) {
      $tech_tags[] = $t;
    }
  }
}
if (empty($tech_tags)) {
  $terms = get_the_terms($post_id, 'tech_tag');
  if (!empty($terms) && !is_wp_error($terms)) {
    $tech_tags = $terms;
  }
}

// Estimated reading time ('estimate_reading').
$reading_time = $fields['estimate_reading'] ?? get_post_meta($post_id, 'estimate_reading', true);

// Associated source URL ('associated_url').
$associated_url = $fields['associated_url'] ?? get_post_meta($post_id, 'associated_url', true);

// Sponsor content handling ('sponsor_content', 'sponsor_name', 'sponsor_link').
$is_sponsored = !empty($fields['sponsor_content']) || (get_post_meta($post_id, 'sponsor_content', true) === '1');
$sponsor_name = $fields['sponsor_name'] ?? get_post_meta($post_id, 'sponsor_name', true);
$sponsor_link = $fields['sponsor_link'] ?? get_post_meta($post_id, 'sponsor_link', true);
?>

<article class="mmd-single-news">
  <!-- Hero Banner Area -->
  <section class="mmd-single-news__hero bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60">
    <div class="container mx-auto px-6 max-w-[1200px]">
      
      <!-- Breadcrumbs -->
      <?php if (shortcode_exists('seopress_breadcrumbs')) : ?>
        <div class="mmd-breadcrumbs mb-6">
          <?php echo do_shortcode('[seopress_breadcrumbs]'); ?>
        </div>
      <?php else : ?>
        <nav aria-label="Breadcrumb" class="mmd-breadcrumbs text-xs font-semibold text-neutral-grey-500 mb-6">
          <ol class="flex items-center flex-wrap gap-2 list-none p-0 m-0">
            <li>
              <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Home</a>
            </li>
            <li aria-hidden="true" class="text-neutral-grey-300">/</li>
            <li>
              <a href="<?php echo esc_url(home_url('/news/')); ?>" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">News</a>
            </li>
            <li aria-hidden="true" class="text-neutral-grey-300">/</li>
            <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
              <?php echo esc_html($title); ?>
            </li>
          </ol>
        </nav>
      <?php endif; ?>

      <!-- Badges Row: Primary Category & Sponsor -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <?php if (!empty($category_term)) : ?>
          <?php $cat_link = get_term_link($category_term); ?>
          <?php if (!is_wp_error($cat_link)) : ?>
            <a href="<?php echo esc_url($cat_link); ?>" class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-blue-50 text-primary border border-primary/20 hover:bg-primary-blue-200 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <?php echo esc_html($category_term->name); ?>
            </a>
          <?php else : ?>
            <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-blue-50 text-primary border border-primary/20">
              <?php echo esc_html($category_term->name); ?>
            </span>
          <?php endif; ?>
        <?php endif; ?>

        <?php if ($is_sponsored && !empty($sponsor_name)) : ?>
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-brass-300/20 text-primary-navy-900 border border-primary-brass-400/40">
            <span>Sponsored by</span>
            <?php if (!empty($sponsor_link)) : ?>
              <a href="<?php echo esc_url($sponsor_link); ?>" target="_blank" rel="noopener noreferrer" class="underline hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                <?php echo esc_html($sponsor_name); ?>
                <span class="sr-only"> (opens in a new tab)</span>
              </a>
            <?php else : ?>
              <span><?php echo esc_html($sponsor_name); ?></span>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      </div>

      <!-- Post Title -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary">
        <?php echo esc_html($title); ?>
      </h1>

      <!-- Meta Bar: Date, Reading Time, Source Button -->
      <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-grey-200/60 text-sm text-neutral-grey-700">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <!-- Published Date -->
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
              <use href="<?php echo esc_url(mmd_sprite('calendar')); ?>"></use>
            </svg>
            <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
              <?php echo esc_html(get_the_date('F j, Y')); ?>
            </time>
          </div>

          <!-- Estimated Reading Time -->
          <?php if (!empty($reading_time)) : ?>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <use href="<?php echo esc_url(mmd_sprite('clock')); ?>"></use>
              </svg>
              <span><?php echo esc_html($reading_time); ?> mins read</span>
            </div>
          <?php endif; ?>
        </div>

        <!-- Associated External URL / Source Button -->
        <?php if (!empty($associated_url)) : ?>
          <div>
            <a href="<?php echo esc_url($associated_url); ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <span>Source / Reference</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span class="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        <?php endif; ?>
      </div>

      <!-- Technology Tags Badges -->
      <?php if (!empty($tech_tags)) : ?>
        <div class="flex flex-wrap items-center gap-2 pt-4">
          <span class="text-xs uppercase tracking-wider font-extrabold text-primary-navy-900 mr-1">Tags:</span>
          <?php foreach ($tech_tags as $tag) : ?>
            <?php $tag_link = get_term_link($tag); ?>
            <?php if (!is_wp_error($tag_link)) : ?>
              <a href="<?php echo esc_url($tag_link); ?>" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-neutral-grey-700 border border-neutral-grey-200 hover:border-primary hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                #<?php echo esc_html($tag->name); ?>
              </a>
            <?php else : ?>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-neutral-grey-700 border border-neutral-grey-200">
                #<?php echo esc_html($tag->name); ?>
              </span>
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <!-- Featured Image -->
      <?php if (!empty($thumbnail_id)) : ?>
        <div class="mt-8 overflow-hidden rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100">
          <?php echo mmd_render_image_by_ris($thumbnail_id, 'news-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true); ?>
        </div>
      <?php endif; ?>

    </div>
  </section>

  <!-- Main Content & Sidebar Section -->
  <section class="mmd-single-news__body py-12 lg:py-16">
    <div class="container mx-auto px-6 max-w-[1200px]">
      <div class="mmd-content-grid">
        
        <!-- Main Article Content Column -->
        <div class="mmd-content-grid__main mmd-content mmd-toc-content mod--theme--light min-w-0">
          <?php the_content(); ?>
        </div>

        <!-- Sticky Sidebar Column -->
        <aside class="mmd-content-grid__sidebar min-w-0" aria-label="Article navigation and tools">
          <div class="lg:sticky lg:top-28 flex flex-col gap-6">
            <?php get_template_part('templates/partials/aside-toc'); ?>
            <?php get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title]); ?>
          </div>
        </aside>

      </div>
    </div>
  </section>
</article>
