<?php

/**
 * Page template
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}
get_header();

// WooCommerce shortcode pages (cart, checkout, account) output plain markup with
// no block container, so they need wrapping in the theme container. Gutenberg pages
// must stay full-width so their section backgrounds bleed edge-to-edge.
$mmd_is_wc_shortcode_page = function_exists('is_cart')
  && (is_cart() || is_checkout() || is_account_page());
$mmd_page_main_class = $mmd_is_wc_shortcode_page ? 'container mmd-wc-page' : '';
?>

<?php while (have_posts()) : the_post(); ?>
  <main id="main" <?php post_class($mmd_page_main_class); ?>>
    <?php
    the_content();
    wp_link_pages([
      'before' => '<div class="page-links">' . 'Pages:',
      'after' => '</div>',
    ]);
    ?>
  </main>
<?php endwhile; ?>

<?php
get_footer();