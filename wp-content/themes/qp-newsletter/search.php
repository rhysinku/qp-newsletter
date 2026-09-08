<?php

/**
 * Search results template — generic skeleton.
 *
 * @package QP NewsLetter
 */

defined('ABSPATH') || exit;

get_header(); ?>

<main id="main" class="mmd-search">
  <div class="container py-12">
    <h1>
      <?php printf(esc_html__('Search results for: %s', 'qp-newsletter'), '<span>' . esc_html(get_search_query()) . '</span>'); ?>
    </h1>

    <?php if (have_posts()) : ?>
      <ul class="mmd-search-results">
        <?php while (have_posts()) : the_post(); ?>
          <li>
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            <?php the_excerpt(); ?>
          </li>
        <?php endwhile; ?>
      </ul>

      <nav aria-label="<?php esc_attr_e('Search results pages', 'qp-newsletter'); ?>" class="mmd-pagination">
        <?php the_posts_pagination(); ?>
      </nav>
    <?php else : ?>
      <p><?php esc_html_e('No results found. Try a different search.', 'qp-newsletter'); ?></p>
      <?php get_search_form(); ?>
    <?php endif; ?>
  </div>
</main>

<?php
get_footer();
