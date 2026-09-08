<?php

/**
 * @file
 * Single post template.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  // Exit if accessed directly.
  exit;
}

get_header();
?>

    <main id="main">
        <?php while (have_posts()):
          the_post();
          $post_type = get_post_type();

          if (file_exists(MMD_THEME_DIR . "/templates/displays/single--{$post_type}.php")) {
            get_template_part("templates/displays/single--{$post_type}");
          }
          else {
            get_template_part('templates/displays/single');
          }
        endwhile;
        ?>
    </main>

<?php
get_footer();
