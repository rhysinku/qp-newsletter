<?php

/**
 * @file
 * Single Event Page Template.
 *
 * Handles display for individual 'event' custom post type items.
 * Supports In-Person and Online (Virtual) events with speakers and schedule.
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

// Event Start & End Date / Time.
$start_date_raw = $fields['start_date'] ?? get_post_meta($post_id, 'start_date', true);
$end_date_raw = $fields['end_date'] ?? get_post_meta($post_id, 'end_date', true);

$start_ts = !empty($start_date_raw) ? strtotime($start_date_raw) : 0;
$end_ts = !empty($end_date_raw) ? strtotime($end_date_raw) : 0;

$start_date_display = $start_ts ? date_i18n('F j, Y', $start_ts) : get_the_date('F j, Y');
$start_time_display = $start_ts ? date_i18n('g:i a', $start_ts) : '';
$start_iso = $start_ts ? date('c', $start_ts) : get_the_date('c');

$end_date_display = $end_ts ? date_i18n('F j, Y', $end_ts) : '';
$end_time_display = $end_ts ? date_i18n('g:i a', $end_ts) : '';
$end_iso = $end_ts ? date('c', $end_ts) : '';

// Date and Time Range String.
$datetime_range_text = $start_date_display;
if ($start_time_display) {
  if ($end_ts && date('Y-m-d', $start_ts) === date('Y-m-d', $end_ts)) {
    // Same day event.
    $datetime_range_text .= ' · ' . $start_time_display . ' – ' . $end_time_display;
  } elseif ($end_ts) {
    // Multi-day event.
    $datetime_range_text .= ' ' . $start_time_display . ' – ' . $end_date_display . ' ' . $end_time_display;
  } else {
    $datetime_range_text .= ' · ' . $start_time_display;
  }
}

// Event Status: Upcoming vs Past.
$current_time = current_time('timestamp');
$is_past = false;
if ($end_ts) {
  $is_past = ($end_ts < $current_time);
} elseif ($start_ts) {
  $is_past = ($start_ts < $current_time);
}

// Location Format.
$location_format = $fields['location_format'] ?? get_post_meta($post_id, 'location_format', true) ?: 'online';
$is_in_person = ($location_format === 'in_person');
$format_label = $is_in_person ? 'In-Person' : 'Online (Virtual)';
$format_badge_class = $is_in_person
  ? 'bg-primary-blue-50 text-primary border border-primary/20'
  : 'bg-system-green-50 text-system-green-700 border border-system-green-700/20';

// Entry Cost.
$entry_cost = $fields['entry_cost'] ?? get_post_meta($post_id, 'entry_cost', true);

// Physical Venue.
$physical_venue = $fields['physical_venue'] ?? get_post_meta($post_id, 'physical_venue', true);

// Virtual Meeting URL.
$virtual_meeting = $fields['virtual_meeting'] ?? get_post_meta($post_id, 'virtual_meeting', true);

// Registration URL (Primary CTA).
$registration_url = $fields['registration_url'] ?? get_post_meta($post_id, 'registration_url', true);

// Determine Primary Action Link & Label.
$primary_cta_url = !empty($registration_url) ? $registration_url : (!empty($virtual_meeting) ? $virtual_meeting : '');
$primary_cta_label = !empty($registration_url) ? 'Register for Event' : (!empty($virtual_meeting) ? 'Join Meeting' : '');

// Technology Tags ('tech_tag').
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

// Speakers Repeater.
$speakers = $fields['speakers'] ?? get_post_meta($post_id, 'speakers', true);
if (!is_array($speakers)) {
  $speakers = [];
}
?>

<article class="mmd-single-event">
  <!-- Hero Banner Area -->
  <section class="mmd-single-event__hero bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60">
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
              <a href="<?php echo esc_url(home_url('/events/')); ?>" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Events</a>
            </li>
            <li aria-hidden="true" class="text-neutral-grey-300">/</li>
            <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
              <?php echo esc_html($title); ?>
            </li>
          </ol>
        </nav>
      <?php endif; ?>

      <!-- Badges Row: Format, Cost, Status -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <!-- Format Badge -->
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider <?php echo esc_attr($format_badge_class); ?>">
          <?php echo esc_html($format_label); ?>
        </span>

        <!-- Entry Cost Badge -->
        <?php if (!empty($entry_cost)) : ?>
          <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-brass-300/20 text-primary-navy-900 border border-primary-brass-400/40">
            Cost: <?php echo esc_html($entry_cost); ?>
          </span>
        <?php endif; ?>

        <!-- Event Status Badge -->
        <?php if ($is_past) : ?>
          <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-grey-200 text-neutral-grey-700 border border-neutral-grey-300">
            Past Event
          </span>
        <?php else : ?>
          <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-system-green-50 text-system-green-700 border border-system-green-700/20">
            Upcoming
          </span>
        <?php endif; ?>
      </div>

      <!-- Post Title -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary">
        <?php echo esc_html($title); ?>
      </h1>

      <!-- Meta Bar & Action Row: Date, Location, Register CTA -->
      <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-grey-200/60 text-sm text-neutral-grey-700">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <!-- Event Date & Time -->
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
              <use href="<?php echo esc_url(mmd_sprite('calendar')); ?>"></use>
            </svg>
            <time datetime="<?php echo esc_attr($start_iso); ?>">
              <?php echo esc_html($datetime_range_text); ?>
            </time>
          </div>

          <!-- Location Summary -->
          <div class="flex items-center gap-2">
            <?php if ($is_in_person && !empty($physical_venue)) : ?>
              <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="truncate max-w-[280px] sm:max-w-[360px]"><?php echo esc_html(strtok($physical_venue, "\n")); ?></span>
            <?php else : ?>
              <svg class="w-4 h-4 text-neutral-grey-500 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Online Webinar / Virtual</span>
            <?php endif; ?>
          </div>
        </div>

        <!-- Primary CTA Action Button -->
        <?php if (!empty($primary_cta_url)) : ?>
          <div>
            <a href="<?php echo esc_url($primary_cta_url); ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 w-full sm:w-auto justify-center">
              <span><?php echo esc_html($primary_cta_label); ?></span>
              <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
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
          <?php echo mmd_render_image_by_ris($thumbnail_id, 'event-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true); ?>
        </div>
      <?php endif; ?>

    </div>
  </section>

  <!-- Main Content & Sidebar Section -->
  <section class="mmd-single-event__body py-12 lg:py-16">
    <div class="container mx-auto px-6 max-w-[1200px]">
      <div class="mmd-content-grid">

        <!-- Main Article Content Column -->
        <div class="mmd-content-grid__main min-w-0">
          <div class="mmd-content mmd-toc-content mod--theme--light">
            <?php the_content(); ?>
          </div>

          <!-- Featured Speakers Section -->
          <?php if (!empty($speakers)) : ?>
            <section class="mmd-event-speakers mt-12 pt-8 border-t border-neutral-grey-200/60" aria-labelledby="event-speakers-heading">
              <h2 id="event-speakers-heading" class="text-2xl font-extrabold text-primary-navy-900 mb-6 font-primary">
                Featured Speakers
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <?php foreach ($speakers as $speaker) :
                  $sp_name = $speaker['name'] ?? '';
                  $sp_title = $speaker['title'] ?? '';
                  $sp_url = $speaker['url'] ?? '';
                  $sp_avatar_id = $speaker['avatar'] ?? null;
                  if (empty($sp_name)) {
                    continue;
                  }
                ?>
                  <div class="mmd-speaker-card bg-white rounded-2xl border border-neutral-grey-200/80 p-5 shadow-sm flex items-start gap-4 hover:border-neutral-grey-300 transition-colors">
                    <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-neutral-grey-100 border border-neutral-grey-200">
                      <?php if (!empty($sp_avatar_id) && is_numeric($sp_avatar_id)) : ?>
                        <?php echo wp_get_attachment_image(
                          (int) $sp_avatar_id,
                          'thumbnail',
                          false,
                          ['class' => 'w-full h-full object-cover', 'alt' => esc_attr($sp_name)]
                        ); ?>
                      <?php else : ?>
                        <div class="w-full h-full flex items-center justify-center text-primary font-bold text-lg bg-primary-blue-50" aria-hidden="true">
                          <?php echo esc_html(mb_strtoupper(mb_substr($sp_name, 0, 1))); ?>
                        </div>
                      <?php endif; ?>
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="text-base font-bold text-primary-navy-900 font-primary leading-snug">
                        <?php echo esc_html($sp_name); ?>
                      </h3>
                      <?php if (!empty($sp_title)) : ?>
                        <p class="text-xs text-neutral-grey-600 mt-1 line-clamp-2">
                          <?php echo esc_html($sp_title); ?>
                        </p>
                      <?php endif; ?>
                      <?php if (!empty($sp_url)) : ?>
                        <a href="<?php echo esc_url($sp_url); ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-navy-900 mt-2 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                          <span>View Profile</span>
                          <svg class="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                          <span class="sr-only"> for <?php echo esc_html($sp_name); ?> (opens in a new tab)</span>
                        </a>
                      <?php endif; ?>
                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
            </section>
          <?php endif; ?>
        </div>

        <!-- Sticky Sidebar Column -->
        <aside class="mmd-content-grid__sidebar min-w-0" aria-label="Event navigation and details">
          <div class="lg:sticky lg:top-28 flex flex-col gap-6">

            <!-- Event Quick Info Card -->
            <div class="mmd-event-meta-card bg-white rounded-2xl border border-neutral-grey-200/80 p-6 shadow-sm flex flex-col gap-4">
              <h3 class="text-base font-bold text-primary-navy-900 pb-3 border-b border-neutral-grey-200/60 font-primary">
                Event Details
              </h3>

              <dl class="space-y-3.5 text-xs">
                <!-- Date -->
                <div class="flex items-start justify-between gap-3">
                  <dt class="text-neutral-grey-500 font-medium">Date:</dt>
                  <dd class="text-neutral-grey-900 font-bold m-0 text-right">
                    <?php echo esc_html($start_date_display); ?>
                    <?php if ($end_ts && date('Y-m-d', $start_ts) !== date('Y-m-d', $end_ts)) : ?>
                      <br><span class="text-neutral-grey-500 font-normal">to</span> <?php echo esc_html($end_date_display); ?>
                    <?php endif; ?>
                  </dd>
                </div>

                <!-- Time -->
                <?php if ($start_time_display) : ?>
                  <div class="flex items-start justify-between gap-3">
                    <dt class="text-neutral-grey-500 font-medium">Time:</dt>
                    <dd class="text-neutral-grey-900 font-bold m-0 text-right">
                      <?php echo esc_html($start_time_display); ?>
                      <?php if ($end_time_display) : ?>
                        – <?php echo esc_html($end_time_display); ?>
                      <?php endif; ?>
                    </dd>
                  </div>
                <?php endif; ?>

                <!-- Format -->
                <div class="flex items-center justify-between gap-3">
                  <dt class="text-neutral-grey-500 font-medium">Format:</dt>
                  <dd class="m-0 text-right">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider <?php echo esc_attr($format_badge_class); ?>">
                      <?php echo esc_html($format_label); ?>
                    </span>
                  </dd>
                </div>

                <!-- Location / Venue -->
                <div class="flex items-start justify-between gap-3">
                  <dt class="text-neutral-grey-500 font-medium">Location:</dt>
                  <dd class="text-neutral-grey-900 font-semibold m-0 text-right leading-relaxed">
                    <?php if ($is_in_person && !empty($physical_venue)) : ?>
                      <?php echo nl2br(esc_html($physical_venue)); ?>
                    <?php elseif (!$is_in_person) : ?>
                      <span>Online Event</span>
                      <?php if (!empty($virtual_meeting)) : ?>
                        <br>
                        <a href="<?php echo esc_url($virtual_meeting); ?>" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline text-[11px] font-medium break-all">
                          Meeting Link
                          <span class="sr-only"> (opens in a new tab)</span>
                        </a>
                      <?php endif; ?>
                    <?php else : ?>
                      <span class="text-neutral-grey-500">TBA</span>
                    <?php endif; ?>
                  </dd>
                </div>

                <!-- Cost -->
                <?php if (!empty($entry_cost)) : ?>
                  <div class="flex items-center justify-between gap-3">
                    <dt class="text-neutral-grey-500 font-medium">Admission:</dt>
                    <dd class="text-neutral-grey-900 font-bold m-0 text-right">
                      <?php echo esc_html($entry_cost); ?>
                    </dd>
                  </div>
                <?php endif; ?>
              </dl>

              <!-- Secondary Action Button in Sidebar -->
              <?php if (!empty($primary_cta_url)) : ?>
                <div class="pt-3 border-t border-neutral-grey-200/60">
                  <a href="<?php echo esc_url($primary_cta_url); ?>" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                    <span><?php echo esc_html($primary_cta_label); ?></span>
                    <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    <span class="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              <?php endif; ?>
            </div>

            <!-- Table of Contents Widget -->
            <?php get_template_part('templates/partials/aside-toc'); ?>

            <!-- Social Share Widget -->
            <?php get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title, 'block_title' => 'Share This Event']); ?>
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
