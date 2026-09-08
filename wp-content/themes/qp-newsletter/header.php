<?php

/**
 * Header template — generic skeleton. Replace the logo + build out the primary nav per project.
 *
 * @package QP NewsLetter
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="mmd-skip-link sr-only focus:not-sr-only" href="#main"><?php esc_html_e('Skip to content', 'qp-newsletter'); ?></a>

<header class="mmd-site-header">
  <div class="container flex items-center justify-between gap-6 py-4">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="mmd-logo" aria-label="<?php echo esc_attr(sprintf(__('%s — home', 'qp-newsletter'), get_bloginfo('name'))); ?>">
      <?php // Replace with the project logo, e.g. mmd_image('logo.svg'). ?>
      <?php bloginfo('name'); ?>
    </a>

    <nav class="mmd-primary-nav" aria-label="<?php esc_attr_e('Primary', 'qp-newsletter'); ?>">
      <?php
      wp_nav_menu([
        'theme_location' => 'header-menu',
        'container'      => false,
        'menu_class'     => 'mmd-menu',
        'fallback_cb'    => false,
        'depth'          => 2,
      ]);
      ?>
    </nav>
  </div>
</header>
