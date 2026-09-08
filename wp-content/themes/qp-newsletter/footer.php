<?php

/**
 * Footer template — generic skeleton. Build out per project (socials, columns, legal).
 *
 * @package QP NewsLetter
 */

?>
<footer class="mmd-site-footer">
  <div class="container flex flex-col gap-6 py-10">
    <nav aria-label="<?php esc_attr_e('Footer', 'qp-newsletter'); ?>">
      <?php
      wp_nav_menu([
        'theme_location' => 'footer-menu',
        'container'      => false,
        'menu_class'     => 'mmd-footer-menu',
        'fallback_cb'    => false,
        'depth'          => 1,
      ]);
      ?>
    </nav>

    <p class="mmd-copyright">
      &copy; <?php echo esc_html(date('Y')); ?> <?php echo esc_html(COMPANY_NAME); ?>. <?php esc_html_e('All rights reserved.', 'qp-newsletter'); ?>
    </p>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
