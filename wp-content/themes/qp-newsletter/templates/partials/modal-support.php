<?php
/**
 * Partial: Support Us Modal Dialog
 *
 * An accessible (WCAG 2.2 AA) modal offering two primary pathways:
 * 1. Buy Us a Coffee (direct financial contribution)
 * 2. Submit Content (authoring guides, tutorials, open-source resources)
 * Plus corporate sponsorship contact footnote.
 *
 * @package QP NewsLetter
 */

$heading     = get_field('support_modal_heading', 'option');
if (empty($heading)) {
  $heading = __('Support QP Newsletter', 'qp-newsletter');
}

$description = get_field('support_modal_description', 'option');
if (empty($description)) {
  $description = __('We are an independent technical community. Choose how you would like to help us produce deep-dive engineering tutorials and open-access resources.', 'qp-newsletter');
}

$coffee_url  = get_field('support_coffee_url', 'option');
if (empty($coffee_url)) {
  $coffee_url = 'https://buymeacoffee.com/qpnewsletter';
}

$submit_url  = get_field('support_submit_url', 'option');
if (empty($submit_url)) {
  $submit_url = home_url('/submit-content/');
}

$sponsor_url = home_url('/contact-us/?ref=sponsor');
?>

<div id="mmd-support-modal" class="mmd-modal hidden" role="dialog" aria-modal="true" aria-labelledby="mmd-support-modal-title" aria-describedby="mmd-support-modal-desc" aria-hidden="true">
  
  <!-- Backdrop Overlay -->
  <div class="mmd-modal__backdrop"></div>

  <!-- Modal Dialog Container -->
  <div class="mmd-modal__dialog">
    
    <!-- Close Button -->
    <button type="button" class="mmd-modal__close" aria-label="<?php esc_attr_e('Close support dialog', 'qp-newsletter'); ?>">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Header Section -->
    <div class="text-left pr-8">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-primary-blue-50 text-primary mb-3">
        <span class="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></span>
        <?php esc_html_e('Community Support', 'qp-newsletter'); ?>
      </span>
      <h2 id="mmd-support-modal-title" class="text-2xl sm:text-3xl font-primary font-extrabold text-neutral-grey-900 tracking-tight leading-tight">
        <?php echo esc_html($heading); ?>
      </h2>
      <p id="mmd-support-modal-desc" class="mt-2 text-sm sm:text-base text-neutral-grey-700 leading-relaxed">
        <?php echo esc_html($description); ?>
      </p>
    </div>

    <!-- Options Grid (2 Pathways) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
      
      <!-- Card 1: Buy Us a Coffee -->
      <div class="mmd-modal-card mmd-modal-card--coffee">
        <div>
          <!-- Icon -->
          <div class="mmd-modal-card__icon mmd-modal-card__icon--coffee" aria-hidden="true">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"></path>
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-neutral-grey-900">
            <?php esc_html_e('Buy Us a Coffee', 'qp-newsletter'); ?>
          </h3>
          <p class="mt-2 text-xs sm:text-sm text-neutral-grey-700 leading-normal">
            <?php esc_html_e('Fuel late-night technical breakdowns, server hosting, and benchmark labs with a one-time or monthly donation.', 'qp-newsletter'); ?>
          </p>

          <!-- Highlights -->
          <ul class="mt-4 space-y-1.5 text-xs text-neutral-grey-700">
            <li class="flex items-center gap-2">
              <span class="text-primary-brass-400 font-bold" aria-hidden="true">&#10003;</span>
              <span><?php esc_html_e('Keeps content 100% free & open', 'qp-newsletter'); ?></span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-brass-400 font-bold" aria-hidden="true">&#10003;</span>
              <span><?php esc_html_e('One-click donation (starts at $5)', 'qp-newsletter'); ?></span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-brass-400 font-bold" aria-hidden="true">&#10003;</span>
              <span><?php esc_html_e('Supporter shoutout in newsletter', 'qp-newsletter'); ?></span>
            </li>
          </ul>
        </div>

        <div class="mt-6 pt-4 border-t border-neutral-grey-200">
          <a href="<?php echo esc_url($coffee_url); ?>" target="_blank" rel="noopener noreferrer" class="mmd-modal-btn mmd-modal-btn--coffee">
            <span><?php esc_html_e('Buy a Coffee ($5)', 'qp-newsletter'); ?></span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span class="sr-only"><?php esc_html_e('(opens in a new tab)', 'qp-newsletter'); ?></span>
          </a>
        </div>
      </div>

      <!-- Card 2: Submit Content -->
      <div class="mmd-modal-card mmd-modal-card--content">
        <div>
          <!-- Icon -->
          <div class="mmd-modal-card__icon mmd-modal-card__icon--content" aria-hidden="true">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>

          <h3 class="text-lg font-bold text-neutral-grey-900">
            <?php esc_html_e('Submit Content', 'qp-newsletter'); ?>
          </h3>
          <p class="mt-2 text-xs sm:text-sm text-neutral-grey-700 leading-normal">
            <?php esc_html_e('Write a technical tutorial, share an open-source library, or submit a system design teardown to our readership.', 'qp-newsletter'); ?>
          </p>

          <!-- Highlights -->
          <ul class="mt-4 space-y-1.5 text-xs text-neutral-grey-700">
            <li class="flex items-center gap-2">
              <span class="text-primary font-bold" aria-hidden="true">&#10003;</span>
              <span><?php esc_html_e('Reach 5,000+ engineers & leads', 'qp-newsletter'); ?></span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary font-bold" aria-hidden="true">&#10003;</span>
              <span><?php esc_html_e('Author profile & backlink attribution', 'qp-newsletter'); ?></span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary font-bold" aria-hidden="true">&#10003;</span>
              <span><?php esc_html_e('Peer-reviewed technical editing', 'qp-newsletter'); ?></span>
            </li>
          </ul>
        </div>

        <div class="mt-6 pt-4 border-t border-neutral-grey-200">
          <a href="<?php echo esc_url($submit_url); ?>" class="mmd-modal-btn mmd-modal-btn--content">
            <span><?php esc_html_e('Submit Article or Resource', 'qp-newsletter'); ?></span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>

    </div>

    <!-- Footnote: Sponsorships & Advertising -->
    <div class="mt-6 sm:mt-8 pt-5 border-t border-neutral-grey-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-grey-500">
      <div class="flex items-center gap-2">
        <span class="inline-block w-2 h-2 rounded-full bg-system-success" aria-hidden="true"></span>
        <span><?php esc_html_e('Looking to sponsor an upcoming issue or feature your developer tool?', 'qp-newsletter'); ?></span>
      </div>
      <a href="<?php echo esc_url($sponsor_url); ?>" class="font-bold text-primary hover:text-primary-navy-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
        <?php esc_html_e('Partner with us &rarr;', 'qp-newsletter'); ?>
      </a>
    </div>

  </div>
</div>
