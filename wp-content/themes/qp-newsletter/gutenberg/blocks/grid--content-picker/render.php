<?php

$is_gutenberg = is_gutenberg_edit_mode();

// Available variables: $attributes, $content, $block
$posts = $attributes['posts'] ?? [];
$columns = $attributes['columns'] ?? 'lg:cols-3';
$cards_display_mode = $attributes['cardsDisplayMode'] ?? 'standard';

if (mmd_block_require_posts($posts)) {
  return;
}
?>
<div class="mmd-grid-content-picker mmd-row mmd-row-static <?php echo esc_attr($columns); ?>">
  <?php echo mmd_block_render_post_columns($posts, $cards_display_mode); ?>
</div>
