<?php
/**
 * Header template — Floating pill-style layout with dynamic logo and CTA controls.
 *
 * @package QP NewsLetter
 */

$logo_image = get_field('header_logo', 'option');
$cta_label  = get_field('header_cta_label', 'option');
if (empty($cta_label)) {
  $cta_label = __('Support us', 'qp-newsletter');
}
$cta_link   = get_field('header_cta_link', 'option');
if (empty($cta_link)) {
  $cta_link = '#';
}
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

<header role="banner" class="mmd-site-header fixed top-4 left-0 w-full z-50 transition-transform duration-300">
  <div class="mmd-site-header__pill max-w-[1200px] w-[calc(100%-2rem)] mx-auto h-20 bg-white rounded-full shadow-lg flex items-center justify-between px-8 border border-neutral-grey-150/50">
    
    <!-- Logo -->
    <a href="<?php echo esc_url(home_url('/')); ?>" class="mmd-logo flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="<?php echo esc_attr(sprintf(__('%s — home', 'qp-newsletter'), get_bloginfo('name'))); ?>">
      <?php if (!empty($logo_image) && is_array($logo_image)) : ?>
        <img src="<?php echo esc_url($logo_image['url']); ?>" alt="<?php echo esc_attr($logo_image['alt'] ? $logo_image['alt'] : get_bloginfo('name')); ?>" class="h-10 w-auto object-contain">
      <?php else : ?>
        <span class="font-primary font-bold text-neutral-grey-900 text-lg leading-none tracking-tight"><?php bloginfo('name'); ?></span>
      <?php endif; ?>
    </a>

    <!-- Desktop Navigation -->
    <nav class="mmd-primary-nav hidden lg:block" aria-label="<?php esc_attr_e('Primary', 'qp-newsletter'); ?>">
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

    <!-- Header Actions (CTA + Hamburger) -->
    <div class="flex items-center gap-4">
      <a href="<?php echo esc_url($cta_link); ?>" class="mmd-header__cta hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-navy-900 text-white text-sm font-semibold rounded-full transition-all duration-200">
        <?php echo esc_html($cta_label); ?>
      </a>

      <button class="mmd-header__hamburger lg:hidden flex items-center justify-center p-2 text-neutral-grey-700 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-controls="mobile-navigation" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle navigation', 'qp-newsletter'); ?>">
        <svg class="icon-hamburger h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg class="icon-close h-6 w-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</header>

<div id="mobile-navigation" class="mmd-mobile-nav fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-neutral-grey-150/50 z-40 transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden pt-28 px-6 flex flex-col gap-6 shadow-2xl">
  <nav aria-label="<?php esc_attr_e('Mobile', 'qp-newsletter'); ?>">
    <?php
    wp_nav_menu([
      'theme_location' => 'header-menu',
      'container'      => false,
      'menu_class'     => 'mmd-mobile-menu',
      'fallback_cb'    => false,
      'depth'          => 2,
    ]);
    ?>
  </nav>

  <!-- Mobile CTA Button -->
  <a href="<?php echo esc_url($cta_link); ?>" class="mmd-mobile-nav__cta w-full flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-navy-900 text-white text-base font-semibold rounded-full transition-all duration-200 mt-2">
    <?php echo esc_html($cta_label); ?>
  </a>
</div>
