<?php

/**
 * 404 template — generic skeleton.
 *
 * @package QP NewsLetter
 */

defined('ABSPATH') || exit;

status_header(404);

get_header(); ?>

<main id="main" class="mmd-404">
  <div class="container py-16 text-center">
    <h1><?php esc_html_e('Page not found', 'qp-newsletter'); ?></h1>
    <p><?php esc_html_e("The page you're looking for may have moved or no longer exists.", 'qp-newsletter'); ?></p>
    <?php get_search_form(); ?>
    <p><a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Back to home', 'qp-newsletter'); ?></a></p>
  </div>
</main>

<?php
get_footer();
