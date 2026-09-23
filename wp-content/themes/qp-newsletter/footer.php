<?php

/**
 * Footer template — highly polished, responsive, and accessible footer.
 *
 * @package QP NewsLetter
 */

$logo_image          = get_field('header_logo', 'option');
$partners            = get_field('footer_partners', 'option');
$acknowledgement     = get_field('footer_acknowledgement', 'option');
$cite_website        = get_field('footer_cite_website', 'option');
$privacy_links       = get_field('footer_privacy_policy_links', 'option');
?>

<footer role="contentinfo" class="mmd-site-footer bg-neutral-light-grey text-neutral-grey-700 pt-16 pb-12 mt-auto border-t border-neutral-grey-200">
  <div class="container mx-auto px-6 max-w-[1200px]">
    
    <!-- Top Row: Logo, Quick Links, Partners -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-neutral-grey-200/60">
      
      <!-- Col 1: Logo -->
      <div class="lg:col-span-5 flex flex-col items-start">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="mmd-logo max-w-[280px] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="<?php echo esc_attr(sprintf(__('%s — home', 'qp-newsletter'), get_bloginfo('name'))); ?>">
          <?php if (!empty($logo_image) && is_array($logo_image)) : ?>
            <img src="<?php echo esc_url($logo_image['url']); ?>" alt="<?php echo esc_attr($logo_image['alt'] ? $logo_image['alt'] : get_bloginfo('name')); ?>" class="h-16 w-auto object-contain">
          <?php else : ?>
            <span class="font-primary font-bold text-primary-navy-900 text-xl leading-tight tracking-tight"><?php bloginfo('name'); ?></span>
          <?php endif; ?>
        </a>
      </div>

      <!-- Col 2: Quick Links -->
      <div class="lg:col-span-4 flex flex-col items-start">
        <h3 class="text-xs uppercase tracking-wider text-primary-navy-900 font-extrabold mb-4 font-primary">
          <?php esc_html_e('Quick Links', 'qp-newsletter'); ?>
        </h3>
        <nav aria-label="<?php esc_attr_e('Footer Navigation', 'qp-newsletter'); ?>" class="w-full">
          <?php
          wp_nav_menu([
            'theme_location' => 'footer-menu',
            'container'      => false,
            'menu_class'     => 'grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-neutral-grey-700 mmd-footer-nav-menu',
            'fallback_cb'    => false,
            'depth'          => 1,
          ]);
          ?>
        </nav>
      </div>

      <!-- Col 3: Partners -->
      <div class="lg:col-span-3 flex flex-col items-start">
        <h3 class="text-xs uppercase tracking-wider text-primary-navy-900 font-extrabold mb-4 font-primary">
          <?php esc_html_e('Our Partners', 'qp-newsletter'); ?>
        </h3>
        <?php if (!empty($partners) && is_array($partners)) : ?>
          <div class="grid grid-cols-2 gap-x-6 gap-y-4 w-full mmd-footer-partners-grid">
            <?php foreach ($partners as $partner) : ?>
              <?php 
              $logo = $partner['partner_logo'] ?? null;
              $link = $partner['partner_link'] ?? '';
              if (!empty($logo) && is_array($logo)) :
                // Render with mmd_render_image_by_ris
                $image_html = mmd_render_image_by_ris($logo['id'], 'original', ['max-h-12', 'w-auto', 'object-contain', 'opacity-90', 'hover:opacity-100', 'transition-opacity']);
                if (!empty($link)) : ?>
                  <a href="<?php echo esc_url($link); ?>" target="_blank" rel="noopener noreferrer" class="flex items-center justify-start focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4" aria-label="<?php echo esc_attr(sprintf(__('%s website (opens in a new tab)', 'qp-newsletter'), $logo['title'] ?: 'Partner')); ?>">
                    <?php echo $image_html; ?>
                  </a>
                <?php else : ?>
                  <div class="flex items-center justify-start">
                    <?php echo $image_html; ?>
                  </div>
                <?php endif; ?>
              <?php endif; ?>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>

    </div>

    <!-- Middle Row: Citation and Acknowledgement -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 py-12 border-b border-neutral-grey-200/60">
      
      <!-- Col 1: Cite This Website -->
      <div class="lg:col-span-5 flex flex-col items-start text-sm leading-relaxed text-neutral-grey-700 font-normal">
        <h3 class="text-xs uppercase tracking-wider text-primary-navy-900 font-extrabold mb-3 font-primary">
          <?php esc_html_e('Cite This Website', 'qp-newsletter'); ?>
        </h3>
        <?php if (!empty($cite_website)) : ?>
          <div class="prose prose-sm max-w-none text-neutral-grey-700 font-normal mmd-footer-wysiwyg">
            <?php echo wp_kses_post($cite_website); ?>
          </div>
        <?php endif; ?>
      </div>

      <!-- Col 2: Acknowledgement of Country -->
      <div class="lg:col-span-7 flex flex-col items-start text-sm leading-relaxed text-neutral-grey-700 font-normal">
        <h3 class="text-xs uppercase tracking-wider text-primary-navy-900 font-extrabold mb-3 font-primary">
          <?php esc_html_e('Acknowledgement of Country', 'qp-newsletter'); ?>
        </h3>
        <?php if (!empty($acknowledgement)) : ?>
          <div class="prose prose-sm max-w-none text-neutral-grey-700 font-normal mmd-footer-wysiwyg">
            <?php echo wp_kses_post($acknowledgement); ?>
          </div>
        <?php endif; ?>
      </div>

    </div>

    <!-- Bottom Row: Copyright, Legal, Credit -->
    <div class="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs text-neutral-grey-500 font-normal">
      
      <!-- Legal Links & Copyright on Left -->
      <div class="flex flex-col gap-3">
        <?php if (!empty($privacy_links)) : ?>
          <div class="mmd-site-footer__privacy flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-grey-700 transition-colors">
            <?php echo wp_kses_post($privacy_links); ?>
          </div>
        <?php endif; ?>
        
        <div class="mmd-site-footer__copyright">
          &copy; <?php echo esc_html(date('Y')); ?> <?php echo esc_html(COMPANY_NAME); ?>
        </div>
      </div>

      <!-- Creator Credits on Right -->
      <div class="lg:text-right text-neutral-grey-500 flex items-center gap-1">
        <span><?php esc_html_e('Website by', 'qp-newsletter'); ?></span>
        <a href="https://marameodesign.com" target="_blank" rel="noopener noreferrer" class="font-bold hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
          <?php esc_html_e('Marameo Design', 'qp-newsletter'); ?>
        </a>
      </div>

    </div>

  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
