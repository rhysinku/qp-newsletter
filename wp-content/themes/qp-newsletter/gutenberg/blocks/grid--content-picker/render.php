<?php

$is_gutenberg = mmd_is_gutenberg_edit_mode();

// Available variables: $attributes, $content, $block
$posts = $attributes['posts'] ?? [];
$columns = $attributes['columns'] ?? 'lg:cols-3';
$cards_display_mode = $attributes['cardsDisplayMode'] ?? 'standard';

if (empty($posts)) {
  if ($is_gutenberg) {
    echo '<div class="py-6 px-4 text-center border border-dashed border-neutral-grey-300 rounded-lg text-neutral-grey-500 font-medium my-4">';
    echo '<p class="m-0 text-sm">No content selected. Choose items in the block settings.</p>';
    echo '</div>';
  }
  return;
}
?>
<div class="mmd-grid-content-picker mmd-row mmd-row-static <?php echo esc_attr($columns); ?> gap-y-6">
  <?php foreach ($posts as $item) :
    $post_id = is_array($item) ? ($item['id'] ?? 0) : (int) $item;
    if (empty($post_id)) {
      continue;
    }
  ?>
    <div class="mmd-col">
      <?php echo mmd_render_content_by_display($post_id, $cards_display_mode); ?>
    </div>
  <?php endforeach; ?>
</div>
