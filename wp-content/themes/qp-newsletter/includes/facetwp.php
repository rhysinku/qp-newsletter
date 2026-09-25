<?php

/**
 * @file
 * FacetWP configuration and facet registrations.
 *
 * All facets are code-registered for portability and version control.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

// 0. Enable FacetWP's built-in accessibility features.
add_filter('facetwp_load_a11y', '__return_true');

// 1. Code-register all platform facets.
add_filter('facetwp_facets', function (array $facets): array {
  // Required defaults array for pager facets to prevent PHP 8 undefined key warnings.
  $pager_defaults = [
    'inner_size'          => 2,
    'dots_label'          => '…',
    'prev_label'          => '← Prev',
    'next_label'          => 'Next →',
    'count_text_singular' => 'Showing 1 result',
    'count_text_plural'   => 'Showing [upper] of [total] results',
    'count_text_none'     => 'No results found',
    'load_more_text'      => 'Load more',
  ];

  // 1.1 Keyword Search Facet.
  $facets[] = [
    'name'          => 'search',
    'label'         => 'Search',
    'type'          => 'search',
    'placeholder'   => 'Search by keyword...',
    'auto_refresh'  => 'yes',
    // Explicit '' (WP Default) matches FacetWP's own default; omitting the key
    // triggers an undefined array key warning in facetwp-relevanssi's search_facet().
    'search_engine' => '',
  ];

  // 1.2 Technology Tag Facet (Cross-cutting taxonomy).
  $facets[] = [
    'name'            => 'tax_tech_tag',
    'label'           => 'Technology',
    'type'            => 'checkboxes',
    'source'          => 'tax/tech_tag',
    'orderby'         => 'count',
    'count'           => 50,
    'ghosts'          => 'yes',
    'preserve_ghosts' => 'yes',
    'operator'        => 'and',
  ];

  // 1.3 News Category Facet.
  $facets[] = [
    'name'            => 'tax_news_category',
    'label'           => 'News Category',
    'type'            => 'checkboxes',
    'source'          => 'tax/news_category',
    'orderby'         => 'display_value',
    'ghosts'          => 'yes',
    'preserve_ghosts' => 'yes',
    'operator'        => 'or',
  ];

  // 1.4 Resource Category Facet.
  $facets[] = [
    'name'            => 'tax_resource_category',
    'label'           => 'Resource Category',
    'type'            => 'checkboxes',
    'source'          => 'tax/resource_category',
    'orderby'         => 'display_value',
    'ghosts'          => 'yes',
    'preserve_ghosts' => 'yes',
    'operator'        => 'or',
  ];

  // 1.5 Event Category Facet.
  $facets[] = [
    'name'            => 'tax_event_category',
    'label'           => 'Event Category',
    'type'            => 'checkboxes',
    'source'          => 'tax/event_category',
    'orderby'         => 'display_value',
    'ghosts'          => 'yes',
    'preserve_ghosts' => 'yes',
    'operator'        => 'or',
  ];

  // 1.6 Newsletter Category Facet.
  $facets[] = [
    'name'            => 'tax_newsletter_category',
    'label'           => 'Newsletter Category',
    'type'            => 'checkboxes',
    'source'          => 'tax/newsletter_category',
    'orderby'         => 'display_value',
    'ghosts'          => 'yes',
    'preserve_ghosts' => 'yes',
    'operator'        => 'or',
  ];

  // 1.7 Content Type Facet (for multi-CPT hubs).
  $facets[] = [
    'name'            => 'content_type',
    'label'           => 'Content Type',
    'type'            => 'checkboxes',
    'source'          => 'post_type',
    'orderby'         => 'display_value',
    'ghosts'          => 'no',
    'operator'        => 'or',
  ];

  // 1.8 Sort Facet.
  $facets[] = [
    'name'          => 'results_sort',
    'label'         => 'Sort',
    'type'          => 'sort',
    'default_label' => 'Newest first',
    'sort_options'  => [
      [
        'name'    => 'date_desc',
        'label'   => 'Newest first',
        'orderby' => [['key' => 'post_date', 'order' => 'DESC']],
      ],
      [
        'name'    => 'date_asc',
        'label'   => 'Oldest first',
        'orderby' => [['key' => 'post_date', 'order' => 'ASC']],
      ],
      [
        'name'    => 'title_asc',
        'label'   => 'Title (A–Z)',
        'orderby' => [['key' => 'post_title', 'order' => 'ASC']],
      ],
      [
        'name'    => 'title_desc',
        'label'   => 'Title (Z–A)',
        'orderby' => [['key' => 'post_title', 'order' => 'DESC']],
      ],
    ],
  ];

  // 1.9 Results Pager (Pagination).
  $facets[] = array_merge($pager_defaults, [
    'name'       => 'results_pager',
    'label'      => 'Results Pager',
    'type'       => 'pager',
    'pager_type' => 'numbers',
  ]);

  // 1.10 Results Count.
  $facets[] = array_merge($pager_defaults, [
    'name'       => 'results_count',
    'label'      => 'Results Count',
    'type'       => 'pager',
    'pager_type' => 'counts',
  ]);

  return $facets;
}, 10, 1);

// 2. Hide raw FacetWP result count badges.
add_action('wp_head', function (): void {
  ?>
  <style>
    .facetwp-counter { display: none !important; }
  </style>
  <?php
}, 100);

// 3. Selection pills accessibility and count stripping.
add_action('facetwp_scripts', function (): void {
  ?>
  <script>
    (function($) {
      function enhanceFacetwpAccessibility() {
        // Enhance active selection pills with button role, tabindex and keyboard listener
        $('.facetwp-selections .facetwp-selection-value').each(function() {
          var $el = $(this);
          if ($el.attr('tabindex') === '0') return;

          $el.attr('tabindex', '0');
          $el.attr('role', 'button');

          var label = $el.siblings('.facetwp-selection-label').text().replace(':', '').trim();
          var val   = $el.text().trim();
          $el.attr('aria-label', 'Remove ' + (label ? label + ' ' : '') + val + ' filter');

          $el.on('keydown.a11y', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              $el.trigger('click');
            }
          });
        });

        // Strip raw counts from select options if present
        $('.facetwp-facet select option').each(function() {
          this.text = this.text.replace(/\s*\(\d+\)\s*$/, '');
        });
      }

      $(document).on('facetwp-loaded', enhanceFacetwpAccessibility);
      $(function() {
        enhanceFacetwpAccessibility();
      });
    })(jQuery);
  </script>
  <?php
}, 100);
