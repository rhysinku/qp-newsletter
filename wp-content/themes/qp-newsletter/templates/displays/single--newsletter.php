<?php

/**
 * @file
 * Single Newsletter Page Template.
 *
 * Handles display for individual 'newsletter' custom post type items.
 * Renders hero with category badge, dispatch date, and PDF download CTA,
 * two-column content grid with sticky sidebar (issue meta, TOC, share),
 * and universal related newsletters section.
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

// Primary newsletter category term ('newsletter_category-term').
$category_term = null;
$category_id = $fields['newsletter_category-term'] ?? get_post_meta($post_id, 'newsletter_category-term', true);
if (!empty($category_id)) {
  if (is_numeric($category_id)) {
    $term = get_term((int) $category_id, 'newsletter_category');
    if ($term && !is_wp_error($term)) {
      $category_term = $term;
    }
  } elseif (is_object($category_id) && isset($category_id->name)) {
    $category_term = $category_id;
  }
}
if (!$category_term) {
  $terms = get_the_terms($post_id, 'newsletter_category');
  if (!empty($terms) && !is_wp_error($terms)) {
    $category_term = $terms[0];
  }
}

// Dispatched / Send Date ('send_date').
$send_date_raw = $fields['send_date'] ?? get_post_meta($post_id, 'send_date', true);
$send_date_formatted = '';
$send_date_iso = '';
if (!empty($send_date_raw)) {
  $timestamp = strtotime($send_date_raw);
  if ($timestamp) {
    $send_date_formatted = date_i18n(get_option('date_format', 'F j, Y'), $timestamp);
    $send_date_iso = date('c', $timestamp);
  }
}
if (empty($send_date_formatted)) {
  $send_date_formatted = get_the_date('F j, Y');
  $send_date_iso = get_the_date('c');
}

// PDF Download ('pdf_download').
$pdf_id = $fields['pdf_download'] ?? get_post_meta($post_id, 'pdf_download', true);
$pdf_url = '';
$pdf_size = '';
if (!empty($pdf_id) && is_numeric($pdf_id)) {
  $pdf_url = wp_get_attachment_url((int) $pdf_id);
  $pdf_path = get_attached_file((int) $pdf_id);
  if ($pdf_path && file_exists($pdf_path)) {
    $pdf_size = size_format(filesize($pdf_path));
  }
}
?>

<article class="mmd-single-newsletter">
  <!-- Hero Banner Area -->
  <section class="mmd-single-newsletter__hero bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60">
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
              <a href="<?php echo esc_url(home_url('/newsletters/')); ?>" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Newsletters</a>
            </li>
            <li aria-hidden="true" class="text-neutral-grey-300">/</li>
            <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
              <?php echo esc_html($title); ?>
            </li>
          </ol>
        </nav>
      <?php endif; ?>

      <!-- Badges Row: Primary Category & Issue Indicator -->
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

        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-grey-100 text-neutral-grey-700 border border-neutral-grey-200">
          Newsletter Issue
        </span>
      </div>

      <!-- Post Title -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary">
        <?php echo esc_html($title); ?>
      </h1>

      <!-- Meta Bar: Dispatched Date & PDF Download CTA Button -->
      <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-grey-200/60 text-sm text-neutral-grey-700">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
            <use href="<?php echo esc_url(mmd_sprite('calendar')); ?>"></use>
          </svg>
          <span class="font-medium text-neutral-grey-600">Dispatched:</span>
          <time datetime="<?php echo esc_attr($send_date_iso); ?>" class="font-semibold text-neutral-grey-900">
            <?php echo esc_html($send_date_formatted); ?>
          </time>
        </div>

        <!-- PDF Download Primary CTA Button -->
        <?php if (!empty($pdf_url)) : ?>
          <div>
            <a href="<?php echo esc_url($pdf_url); ?>" download target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Download Issue<?php echo !empty($pdf_size) ? ' (PDF · ' . esc_html($pdf_size) . ')' : ' (PDF)'; ?></span>
              <span class="sr-only"> (opens download in a new tab<?php echo !empty($pdf_size) ? ', ' . esc_html($pdf_size) : ''; ?>)</span>
            </a>
          </div>
        <?php endif; ?>
      </div>

      <!-- Featured Cover Image -->
      <?php if (!empty($thumbnail_id)) : ?>
        <div class="mt-8 overflow-hidden rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100">
          <?php echo mmd_render_image_by_ris($thumbnail_id, 'news-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true); ?>
        </div>
      <?php endif; ?>

    </div>
  </section>

  <!-- Main Content & Sidebar Section -->
  <section class="mmd-single-newsletter__body py-12 lg:py-16">
    <div class="container mx-auto px-6 max-w-[1200px]">
      <div class="mmd-content-grid">

        <!-- Main Article Content Column -->
        <div class="mmd-content-grid__main mmd-content mmd-toc-content mod--theme--light min-w-0">
          <?php the_content(); ?>
        </div>

        <!-- Sticky Sidebar Column -->
        <aside class="mmd-content-grid__sidebar min-w-0" aria-label="Newsletter navigation and tools">
          <div class="lg:sticky lg:top-28 flex flex-col gap-6">

            <!-- Newsletter Quick Info Card -->
            <div class="mmd-newsletter-meta-card bg-white rounded-2xl border border-neutral-grey-150/60 p-6 shadow-sm flex flex-col gap-4">
              <h3 class="text-base font-bold text-primary-navy-900 pb-3 border-b border-neutral-grey-200/60 font-primary">
                Issue Details
              </h3>
              <div class="flex flex-col gap-3">
                <?php if (!empty($category_term)) : ?>
                  <div>
                    <span class="text-xs uppercase tracking-wider text-neutral-grey-500 font-semibold block mb-0.5">
                      Category
                    </span>
                    <span class="text-sm font-bold text-primary-navy-900">
                      <?php echo esc_html($category_term->name); ?>
                    </span>
                  </div>
                <?php endif; ?>

                <div>
                  <span class="text-xs uppercase tracking-wider text-neutral-grey-500 font-semibold block mb-0.5">
                    Dispatched
                  </span>
                  <time datetime="<?php echo esc_attr($send_date_iso); ?>" class="text-sm font-semibold text-neutral-grey-800">
                    <?php echo esc_html($send_date_formatted); ?>
                  </time>
                </div>

                <?php if (!empty($pdf_url)) : ?>
                  <div>
                    <span class="text-xs uppercase tracking-wider text-neutral-grey-500 font-semibold block mb-0.5">
                      Format
                    </span>
                    <span class="text-sm font-semibold text-neutral-grey-800">
                      PDF Document<?php echo !empty($pdf_size) ? ' (' . esc_html($pdf_size) . ')' : ''; ?>
                    </span>
                  </div>

                  <a href="<?php echo esc_url($pdf_url); ?>" download target="_blank" rel="noopener noreferrer" class="mt-2 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-primary-blue-50 text-primary hover:bg-primary hover:text-white border border-primary/20 text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                    <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    <span>Download Issue</span>
                    <span class="sr-only"> (opens download in a new tab<?php echo !empty($pdf_size) ? ', ' . esc_html($pdf_size) : ''; ?>)</span>
                  </a>
                <?php endif; ?>
              </div>
            </div>

            <!-- Table of Contents Partial -->
            <?php get_template_part('templates/partials/aside-toc'); ?>

            <!-- Social Share Partial -->
            <?php get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title]); ?>

          </div>
        </aside>

      </div>
    </div>
  </section>
</article>

<?php
// Universal Related Posts Section
get_template_part('templates/partials/related-posts');
?>
