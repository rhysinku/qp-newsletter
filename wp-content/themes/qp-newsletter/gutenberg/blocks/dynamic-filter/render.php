<?php

/**
 * @file
 * Server-Side Render template for Dynamic Filter Block (mmd/dynamic-filter).
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

$is_editor = (function_exists('mmd_is_gutenberg_edit_mode') && mmd_is_gutenberg_edit_mode()) || is_admin();

// 1. Extract block attributes.
$content_types = !empty($attributes['contentTypes']) && is_array($attributes['contentTypes'])
  ? $attributes['contentTypes']
  : ['news'];

$posts_per_page = isset($attributes['postsPerPage']) ? (int) $attributes['postsPerPage'] : 9;
$columns = $attributes['columns'] ?? 'xl:cols-2';
$show_search = $attributes['showSearch'] ?? true;
$show_sort = $attributes['showSort'] ?? true;
$sidebar_title = !empty($attributes['sidebarTitle']) ? $attributes['sidebarTitle'] : 'Filters';
$show_tech_tags = $attributes['showTechTags'] ?? true;
$show_categories = $attributes['showCategories'] ?? true;
$show_content_types = $attributes['showContentTypes'] ?? false;

// Determine grid column class (defaults to 2 columns for comfortable card breathing room).
$grid_cols_class = ($columns === 'xl:cols-3') ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2';

// 2. Build list of active facet groups for the sidebar.
$sidebar_facets = [];

if ($show_tech_tags) {
  $sidebar_facets[] = [
    'name'  => 'tax_tech_tag',
    'label' => 'Technology',
  ];
}

if ($show_categories) {
  if (in_array('news', $content_types, true)) {
    $sidebar_facets[] = [
      'name'  => 'tax_news_category',
      'label' => 'News Category',
    ];
  }
  if (in_array('resource', $content_types, true)) {
    $sidebar_facets[] = [
      'name'  => 'tax_resource_category',
      'label' => 'Resource Category',
    ];
  }
  if (in_array('event', $content_types, true)) {
    $sidebar_facets[] = [
      'name'  => 'tax_event_category',
      'label' => 'Event Category',
    ];
  }
  if (in_array('newsletter', $content_types, true)) {
    $sidebar_facets[] = [
      'name'  => 'tax_newsletter_category',
      'label' => 'Newsletter Category',
    ];
  }
}

if ($show_content_types || count($content_types) > 1) {
  $sidebar_facets[] = [
    'name'  => 'content_type',
    'label' => 'Content Type',
  ];
}

// 3. Execute WP_Query.
$paged = get_query_var('paged') ? (int) get_query_var('paged') : 1;
if (get_query_var('page')) {
  $paged = (int) get_query_var('page');
}

$query_args = [
  'post_type'      => $content_types,
  'posts_per_page' => $posts_per_page,
  'post_status'    => 'publish',
  'paged'          => $paged,
  'facetwp'        => true,
];

$query = new WP_Query($query_args);

// 4. Section block & standalone background resolution.
$is_inside_section = !empty($block->context['bgColor'])
  || !empty($attributes['isInnerBlock'])
  || !empty($block->context['blockTheme']);

$bg_color = !empty($attributes['bgColor']) ? $attributes['bgColor'] : 'bg-neutral-light-grey';
$block_theme = !empty($attributes['blockTheme']) ? $attributes['blockTheme'] : 'mod--theme--light';
?>

<?php if ($is_inside_section) : ?>
<div class="mmd-dynamic-filter mmd-dynamic-filter--inner w-full">
  <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
<?php else : ?>
<section class="mmd-dynamic-filter py-10 lg:py-16 <?php echo esc_attr($bg_color . ' ' . $block_theme); ?>">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
<?php endif; ?>

      <!-- ========================================================= -->
      <!-- SIDEBAR / MOBILE DRAWER COLUMN                           -->
      <!-- ========================================================= -->
      <div id="mmd-filter-drawer"
           class="hidden fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-72 xl:w-80 flex-shrink-0"
           role="dialog"
           aria-modal="true"
           aria-label="Filter results">

        <!-- Backdrop Overlay (Mobile only) -->
        <div class="mmd-drawer-backdrop fixed inset-0 bg-neutral-navy-900/60 backdrop-blur-xs transition-opacity lg:hidden" aria-hidden="true"></div>

        <!-- Drawer Surface / Desktop Card Container -->
        <aside class="mmd-drawer-panel fixed inset-y-0 right-0 z-10 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 lg:static lg:w-full lg:rounded-2xl lg:border lg:border-neutral-grey-200/80 lg:p-6 lg:shadow-xs lg:transform-none lg:h-auto lg:overflow-visible">

          <!-- Mobile Drawer Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-grey-200 lg:hidden">
            <h2 class="text-base font-bold text-primary-navy-900 font-primary">Filters</h2>
            <button type="button"
                    id="mmd-mobile-filter-close"
                    class="p-2 text-neutral-grey-500 hover:text-primary-navy-900 focus-visible:outline-2 focus-visible:outline-primary rounded-lg transition-colors"
                    aria-label="Close filters">
              <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <use href="<?php echo esc_url(mmd_sprite('x')); ?>"></use>
              </svg>
            </button>
          </div>

          <!-- Desktop Sidebar Header -->
          <div class="hidden lg:flex items-center justify-between pb-4 border-b border-neutral-grey-200/80 mb-2">
            <h2 class="text-lg font-extrabold text-primary-navy-900 font-primary">
              <?php echo esc_html($sidebar_title); ?>
            </h2>
            <button type="button"
                    class="facetwp-clear-all-btn text-xs font-bold text-primary hover:text-primary-navy-900 uppercase tracking-wider transition-colors"
                    onclick="if (typeof FWP !== 'undefined') { FWP.reset(); }">
              Clear all
            </button>
          </div>

          <!-- Facet Accordion Groups -->
          <div class="flex-1 overflow-y-auto px-6 py-4 lg:p-0 lg:overflow-visible divide-y divide-neutral-grey-150/60">
            <?php foreach ($sidebar_facets as $facet) : ?>
              <div class="mmd-facet-group is-open py-4 first:pt-0 last:pb-0" data-facet-name="<?php echo esc_attr($facet['name']); ?>">
                <button type="button"
                        class="mmd-facet-toggle flex items-center justify-between w-full py-1 text-left font-bold text-primary-navy-900 group focus-visible:outline-2 focus-visible:outline-primary rounded-lg transition-colors"
                        aria-expanded="true"
                        aria-controls="facet-content-<?php echo esc_attr($facet['name']); ?>">
                  <span class="text-sm font-bold text-primary-navy-900 font-primary">
                    <?php echo esc_html($facet['label']); ?>
                  </span>
                  <span class="mmd-facet-chevron transform transition-transform duration-200 group-[.is-open]:rotate-180" aria-hidden="true">
                    <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
                      <use href="<?php echo esc_url(mmd_sprite('chevron-down')); ?>"></use>
                    </svg>
                  </span>
                </button>

                <div class="mmd-facet-content mt-3" id="facet-content-<?php echo esc_attr($facet['name']); ?>">
                  <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
                    <?php echo facetwp_display('facet', $facet['name']); ?>
                  <?php else : ?>
                    <!-- Clean editor mock for canvas preview -->
                    <div class="space-y-2 py-1 text-xs text-neutral-grey-500">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" disabled class="rounded border-neutral-grey-300">
                        <span>Sample Term A</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" disabled class="rounded border-neutral-grey-300">
                        <span>Sample Term B</span>
                      </label>
                    </div>
                  <?php endif; ?>
                </div>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Mobile Drawer Sticky Footer -->
          <div class="p-4 border-t border-neutral-grey-200 bg-white flex items-center gap-3 lg:hidden mt-auto">
            <button type="button"
                    class="flex-1 py-2.5 px-4 rounded-xl border border-neutral-grey-200 text-xs font-bold text-neutral-grey-700 text-center hover:bg-neutral-grey-50"
                    onclick="if (typeof FWP !== 'undefined') { FWP.reset(); }">
              Clear all
            </button>
            <button type="button"
                    id="mmd-mobile-filter-apply"
                    class="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold text-center shadow-xs hover:bg-primary-navy-900 transition-colors">
              Show Results
            </button>
          </div>

        </aside>
      </div>

      <!-- ========================================================= -->
      <!-- MAIN LISTING & CONTROLS COLUMN                            -->
      <!-- ========================================================= -->
      <main class="mmd-filter-main flex-1 min-w-0 w-full">

        <?php if ($show_search) : ?>
          <!-- Keyword Search Bar -->
          <div class="mmd-filter-search mb-6">
            <div class="relative rounded-2xl bg-white border border-neutral-grey-200 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
                <?php echo facetwp_display('facet', 'search'); ?>
              <?php else : ?>
                <div class="flex items-center px-4 py-3 gap-3">
                  <svg class="mmd-search-icon w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="<?php echo esc_url(mmd_sprite('search')); ?>"></use>
                  </svg>
                  <input type="text" disabled placeholder="Search by keyword..." class="mmd-search-input w-full bg-transparent border-none text-sm outline-none">
                </div>
              <?php endif; ?>
            </div>
          </div>
        <?php endif; ?>

        <!-- Controls Meta Bar: Mobile Filter Button, Count, and Sort -->
        <div class="mmd-filter-meta-bar py-3 mb-4 border-b border-neutral-grey-200/60">
          <div class="flex items-center justify-between gap-3">
            <!-- Left: Mobile Filter button (< lg) | Desktop Results Count (>= lg) -->
            <div class="flex items-center gap-3">
              <button type="button"
                      id="mmd-mobile-filter-open"
                      aria-expanded="false"
                      aria-controls="mmd-filter-drawer"
                      class="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-grey-200 bg-white text-xs font-bold text-primary-navy-900 shadow-xs hover:bg-neutral-grey-50 focus-visible:outline-2 focus-visible:outline-primary transition-colors">
                <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="<?php echo esc_url(mmd_sprite('sliders-horizontal')); ?>"></use>
                </svg>
                <span>Filters</span>
              </button>

              <div class="hidden lg:block mmd-results-count text-xs sm:text-sm font-medium">
                <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
                  <?php echo facetwp_display('facet', 'results_count'); ?>
                <?php else : ?>
                  <span>Showing <?php echo esc_html($query->found_posts); ?> results</span>
                <?php endif; ?>
              </div>
            </div>

            <?php if ($show_sort) : ?>
              <!-- Right: Sort Dropdown -->
              <div class="mmd-filter-sort flex items-center">
                <label for="facetwp-sort-select" class="sr-only">Sort results</label>
                <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
                  <?php echo facetwp_display('facet', 'results_sort'); ?>
                <?php else : ?>
                  <select disabled class="text-xs font-semibold text-primary-navy-900 bg-white border border-neutral-grey-200 rounded-xl px-3.5 py-2">
                    <option>Newest first</option>
                    <option>Oldest first</option>
                    <option>Title (A–Z)</option>
                  </select>
                <?php endif; ?>
              </div>
            <?php endif; ?>
          </div>

          <!-- Mobile Results Count (< lg) -->
          <div class="lg:hidden pt-2.5 text-xs font-medium mmd-results-count">
            <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
              <?php echo facetwp_display('facet', 'results_count'); ?>
            <?php else : ?>
              <span>Showing <?php echo esc_html($query->found_posts); ?> results</span>
            <?php endif; ?>
          </div>
        </div>

        <!-- Active Selections Pills -->
        <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
          <div class="mmd-filter-selections mb-6 empty:hidden">
            <?php echo facetwp_display('selections'); ?>
          </div>
        <?php endif; ?>

        <!-- ======================================================= -->
        <!-- POST CARD GRID (FacetWP Template Target)                 -->
        <!-- ======================================================= -->
        <div class="facetwp-template mmd-card-grid grid grid-cols-1 <?php echo esc_attr($grid_cols_class); ?> gap-6 lg:gap-8">
          <?php if ($query->have_posts()) : ?>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
              <div class="mmd-card-item h-full flex flex-col">
                <?php echo mmd_render_content_by_display(get_the_ID(), 'related'); ?>
              </div>
            <?php endwhile; ?>
            <?php wp_reset_postdata(); ?>
          <?php else : ?>
            <!-- Empty State -->
            <div class="col-span-full py-16 px-6 text-center bg-white rounded-2xl border border-dashed border-neutral-grey-300">
              <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-blue-50 text-primary flex items-center justify-center">
                <svg class="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="<?php echo esc_url(mmd_sprite('search')); ?>"></use>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-primary-navy-900 font-primary mb-2">No matching results found</h3>
              <p class="text-sm text-neutral-grey-600 max-w-md mx-auto mb-6">We couldn't find any content matching your current filter selections. Try adjusting or clearing your filters.</p>
              <button type="button"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-navy-900 transition-colors"
                      onclick="if (typeof FWP !== 'undefined') { FWP.reset(); }">
                Reset All Filters
              </button>
            </div>
          <?php endif; ?>
        </div>

        <!-- Pagination Section -->
        <?php if (!$is_editor && function_exists('facetwp_display')) : ?>
          <div class="mmd-filter-pagination mt-12 flex justify-center">
            <?php echo facetwp_display('facet', 'results_pager'); ?>
          </div>
        <?php endif; ?>

      </main>
    </div>
<?php if ($is_inside_section) : ?>
  </div>
<?php else : ?>
  </div>
</section>
<?php endif; ?>

