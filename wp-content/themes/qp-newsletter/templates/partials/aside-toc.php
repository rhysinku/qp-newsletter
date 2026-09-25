<?php

/**
 * @file
 * Table of Contents sidebar partial.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}
?>

<div class="mmd-aside-item mmd-toc-wrapper bg-white rounded-2xl p-6 border border-neutral-grey-150/60 shadow-sm transition-all">
  <div class="flex items-center justify-between mb-4">
    <button type="button" class="mmd-toc-button flex items-center justify-between w-full text-left font-bold text-sm tracking-wider uppercase text-primary-navy-900 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-expanded="true" aria-controls="mmd-toc-nav" aria-label="Toggle table of contents">
      <span>Article Contents</span>
      <svg class="w-4 h-4 text-primary transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  </div>
  <nav id="mmd-toc-nav" class="mmd-toc-nav" aria-label="Table of contents">
    <ul id="mmd-toc-list" class="flex flex-col gap-2.5 text-sm list-none p-0 m-0">
      <!-- Injected dynamically via client-side TOC listener -->
    </ul>
  </nav>
</div>
