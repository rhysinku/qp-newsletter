<?php

/**
 * @file
 * Single Resource Page Template.
 *
 * Handles display for individual 'resource' custom post type items.
 * Supports Internal Content, Downloadable Files, and External Resources.
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
$post_date = get_the_date('F j, Y');
$post_date_iso = get_the_date('c');

// ACF Resource Custom Fields.
$resources_type = $fields['resources_type'] ?? get_post_meta($post_id, 'resources_type', true) ?: 'internal';
$skill_level = $fields['skill_level'] ?? get_post_meta($post_id, 'skill_level', true) ?: 'all';
$author = $fields['author'] ?? get_post_meta($post_id, 'author', true);
if (empty($author)) {
  $author = get_the_author();
}

// External URL handling.
$external_url = $fields['external_url'] ?? get_post_meta($post_id, 'external_url', true);
$ext_domain = '';
if (!empty($external_url)) {
  $parsed_url = parse_url($external_url);
  $ext_domain = $parsed_url['host'] ?? '';
}

// Downloadable File handling.
$file_id = $fields['downloadable_file'] ?? get_post_meta($post_id, 'downloadable_file', true);
$file_url = '';
$file_size = '';
$file_ext = 'FILE';
if (!empty($file_id) && is_numeric($file_id)) {
  $file_url = wp_get_attachment_url((int) $file_id);
  $file_path = get_attached_file((int) $file_id);
  if ($file_path && file_exists($file_path)) {
    $file_size = size_format(filesize($file_path));
  }
  if (!empty($file_url)) {
    $ext = pathinfo($file_url, PATHINFO_EXTENSION);
    if (!empty($ext)) {
      $file_ext = strtoupper($ext);
    }
  }
}

// Technology tag terms ('tech_tag').
$tech_tags = [];
$terms = get_the_terms($post_id, 'tech_tag');
if (!empty($terms) && !is_wp_error($terms)) {
  $tech_tags = $terms;
}

// Label formatting.
$type_labels = [
  'internal'          => 'Internal Guide',
  'external_link'     => 'External Resource',
  'downloadable_file' => 'Downloadable File',
];
$type_display = $type_labels[$resources_type] ?? 'Resource';

$skill_labels = [
  'all'          => 'All Level',
  'beginner'     => 'Beginner',
  'intermediate' => 'Intermediate',
  'advance'      => 'Advance',
];
$skill_display = $skill_labels[$skill_level] ?? 'All Level';

// Badge styling per skill level.
$skill_badge_classes = [
  'beginner'     => 'bg-system-green-50 text-system-green-700 border-system-green-700/20',
  'intermediate' => 'bg-primary-brass-300/20 text-primary-navy-900 border-primary-brass-400/40',
  'advance'      => 'bg-primary-blue-50 text-primary border-primary/20',
  'all'          => 'bg-neutral-grey-100 text-neutral-grey-700 border-neutral-grey-200',
];
$skill_badge_class = $skill_badge_classes[$skill_level] ?? $skill_badge_classes['all'];
?>

<article class="mmd-single-resource">
  <!-- Hero Banner Area -->
  <section class="mmd-single-resource__hero bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60">
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
              <a href="<?php echo esc_url(home_url('/resources/')); ?>" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Resources</a>
            </li>
            <li aria-hidden="true" class="text-neutral-grey-300">/</li>
            <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
              <?php echo esc_html($title); ?>
            </li>
          </ol>
        </nav>
      <?php endif; ?>

      <!-- Badges Row: Skill Level & Resource Type -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <!-- Skill Level Badge -->
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border <?php echo esc_attr($skill_badge_class); ?>">
          <?php echo esc_html($skill_display); ?>
        </span>

        <!-- Resource Type Badge -->
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-primary-navy-900 border border-neutral-grey-200 shadow-xs">
          <?php echo esc_html($type_display); ?>
        </span>
      </div>

      <!-- Resource Title -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary">
        <?php echo esc_html($title); ?>
      </h1>

      <!-- Meta Bar & Primary Action CTA Row -->
      <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-grey-200/60 text-sm text-neutral-grey-700">
        <!-- Author Attribution and Date -->
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <!-- Author -->
          <?php if (!empty($author)) : ?>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <use href="<?php echo esc_url(mmd_sprite('user')); ?>"></use>
              </svg>
              <span>By <strong class="text-neutral-grey-900 font-semibold"><?php echo esc_html($author); ?></strong></span>
            </div>
          <?php endif; ?>

          <!-- Published Date -->
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
              <use href="<?php echo esc_url(mmd_sprite('calendar')); ?>"></use>
            </svg>
            <time datetime="<?php echo esc_attr($post_date_iso); ?>">
              <?php echo esc_html($post_date); ?>
            </time>
          </div>
        </div>

        <!-- Primary Action CTA Button based on Resource Type -->
        <div>
          <?php if ($resources_type === 'downloadable_file' && !empty($file_url)) : ?>
            <a href="<?php echo esc_url($file_url); ?>" download class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Download <?php echo esc_html($file_ext); ?><?php echo !empty($file_size) ? ' (' . esc_html($file_size) . ')' : ''; ?></span>
            </a>
          <?php elseif ($resources_type === 'external_link' && !empty($external_url)) : ?>
            <a href="<?php echo esc_url($external_url); ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <span>Access External Resource</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span class="sr-only"> (opens in a new tab)</span>
            </a>
          <?php else : ?>
            <a href="#resource-content" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-navy-900 hover:bg-primary text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <span>Read Full Guide</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          <?php endif; ?>
        </div>
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

      <!-- Featured Cover Image -->
      <?php if (!empty($thumbnail_id)) : ?>
        <div class="mt-8 overflow-hidden rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100">
          <?php echo mmd_render_image_by_ris($thumbnail_id, 'resource-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true); ?>
        </div>
      <?php endif; ?>

    </div>
  </section>

  <!-- Main Content & Sidebar Section -->
  <section class="mmd-single-resource__body py-12 lg:py-16">
    <div class="container mx-auto px-6 max-w-[1200px]">
      <div class="mmd-content-grid">

        <!-- Main Content Column -->
        <div id="resource-content" class="mmd-content-grid__main mmd-content mmd-toc-content mod--theme--light min-w-0">
          <?php the_content(); ?>
        </div>

        <!-- Sticky Sidebar Column -->
        <aside class="mmd-content-grid__sidebar min-w-0" aria-label="Resource navigation and tools">
          <div class="lg:sticky lg:top-28 flex flex-col gap-6">

            <!-- Resource Quick Info Card -->
            <div class="mmd-resource-meta-card bg-white rounded-2xl border border-neutral-grey-200/80 p-6 shadow-sm">
              <h3 class="text-base font-bold text-primary-navy-900 mb-4 pb-3 border-b border-neutral-grey-200/60 font-primary">
                Resource Details
              </h3>

              <dl class="space-y-3 text-xs">
                <!-- Type -->
                <div class="flex items-center justify-between gap-2">
                  <dt class="text-neutral-grey-500 font-medium">Type:</dt>
                  <dd class="text-neutral-grey-900 font-bold m-0"><?php echo esc_html($type_display); ?></dd>
                </div>

                <!-- Skill Level -->
                <div class="flex items-center justify-between gap-2">
                  <dt class="text-neutral-grey-500 font-medium">Skill Level:</dt>
                  <dd class="m-0">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border <?php echo esc_attr($skill_badge_class); ?>">
                      <?php echo esc_html($skill_display); ?>
                    </span>
                  </dd>
                </div>

                <!-- Author -->
                <?php if (!empty($author)) : ?>
                  <div class="flex items-center justify-between gap-2">
                    <dt class="text-neutral-grey-500 font-medium">Curator:</dt>
                    <dd class="text-neutral-grey-900 font-semibold m-0 truncate max-w-[160px]" title="<?php echo esc_attr($author); ?>">
                      <?php echo esc_html($author); ?>
                    </dd>
                  </div>
                <?php endif; ?>

                <!-- File Format / Size (if Downloadable) -->
                <?php if ($resources_type === 'downloadable_file' && !empty($file_url)) : ?>
                  <div class="flex items-center justify-between gap-2">
                    <dt class="text-neutral-grey-500 font-medium">Format:</dt>
                    <dd class="text-neutral-grey-900 font-semibold m-0">
                      <?php echo esc_html($file_ext); ?><?php echo !empty($file_size) ? ' (' . esc_html($file_size) . ')' : ''; ?>
                    </dd>
                  </div>
                <?php endif; ?>

                <!-- External Source Domain (if External Link) -->
                <?php if ($resources_type === 'external_link' && !empty($ext_domain)) : ?>
                  <div class="flex items-center justify-between gap-2">
                    <dt class="text-neutral-grey-500 font-medium">Host:</dt>
                    <dd class="text-neutral-grey-900 font-semibold m-0 truncate max-w-[160px]" title="<?php echo esc_attr($ext_domain); ?>">
                      <?php echo esc_html($ext_domain); ?>
                    </dd>
                  </div>
                <?php endif; ?>
              </dl>

              <!-- Secondary Action CTA Button inside Sidebar -->
              <div class="mt-5 pt-4 border-t border-neutral-grey-200/60">
                <?php if ($resources_type === 'downloadable_file' && !empty($file_url)) : ?>
                  <a href="<?php echo esc_url($file_url); ?>" download class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    <span>Download File</span>
                  </a>
                <?php elseif ($resources_type === 'external_link' && !empty($external_url)) : ?>
                  <a href="<?php echo esc_url($external_url); ?>" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                    <span>Visit Resource</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    <span class="sr-only"> (opens in a new tab)</span>
                  </a>
                <?php endif; ?>
              </div>
            </div>

            <!-- Table of Contents -->
            <?php get_template_part('templates/partials/aside-toc'); ?>

            <!-- Social Share Buttons -->
            <?php get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title]); ?>

          </div>
        </aside>

      </div>
    </div>
  </section>
</article>

<?php
// Universal Related Posts Section (queries & renders Related Resources)
get_template_part('templates/partials/related-posts');
?>
