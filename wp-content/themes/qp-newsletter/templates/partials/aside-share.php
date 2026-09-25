<?php

/**
 * @file
 * Share buttons sidebar partial.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

$url = $args['url'] ?? get_permalink();
$title = $args['title'] ?? get_the_title();
$block_title = $args['block_title'] ?? 'Share This News';

$encoded_url = rawurlencode($url);
$encoded_title = rawurlencode($title);

$twitter_url = "https://twitter.com/intent/tweet?url={$encoded_url}&text={$encoded_title}";
$linkedin_url = "https://www.linkedin.com/sharing/share-offsite/?url={$encoded_url}";
$facebook_url = "https://www.facebook.com/sharer/sharer.php?u={$encoded_url}";
?>

<div class="mmd-aside-item mmd-share-wrapper bg-white rounded-2xl p-6 border border-neutral-grey-150/60 shadow-sm mt-6">
  <h3 class="text-xs uppercase tracking-wider text-primary-navy-900 font-extrabold mb-4 font-primary">
    <?php echo esc_html($block_title); ?>
  </h3>
  <div class="flex items-center gap-3">
    <!-- Twitter / X -->
    <a href="<?php echo esc_url($twitter_url); ?>" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-neutral-light-grey hover:bg-primary-blue-200 text-neutral-grey-700 hover:text-primary flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Share on X (opens in a new tab)">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <use href="<?php echo esc_url(mmd_sprite('x-twitter')); ?>"></use>
      </svg>
      <span class="sr-only">(opens in a new tab)</span>
    </a>

    <!-- LinkedIn -->
    <a href="<?php echo esc_url($linkedin_url); ?>" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-neutral-light-grey hover:bg-primary-blue-200 text-neutral-grey-700 hover:text-primary flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Share on LinkedIn (opens in a new tab)">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <use href="<?php echo esc_url(mmd_sprite('linkedin')); ?>"></use>
      </svg>
      <span class="sr-only">(opens in a new tab)</span>
    </a>

    <!-- Facebook -->
    <a href="<?php echo esc_url($facebook_url); ?>" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-neutral-light-grey hover:bg-primary-blue-200 text-neutral-grey-700 hover:text-primary flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Share on Facebook (opens in a new tab)">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <use href="<?php echo esc_url(mmd_sprite('facebook')); ?>"></use>
      </svg>
      <span class="sr-only">(opens in a new tab)</span>
    </a>

    <!-- Copy Link Button -->
    <div class="relative">
      <button type="button" class="mmd-copy-link-btn w-10 h-10 rounded-full bg-neutral-light-grey hover:bg-primary-blue-200 text-neutral-grey-700 hover:text-primary flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" data-url="<?php echo esc_url($url); ?>" aria-label="Copy link to clipboard">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <use href="<?php echo esc_url(mmd_sprite('link')); ?>"></use>
        </svg>
      </button>
      <span class="mmd-copy-tooltip pointer-events-none hidden absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-grey-900 text-white text-xs font-semibold rounded shadow-md whitespace-nowrap" role="status" aria-live="polite">Copied!</span>
    </div>
  </div>
</div>
