<?php

$is_gutenberg = is_gutenberg_edit_mode();

// Available variables: $attributes, $content, $block
$people = $attributes['posts'] ?? [];
$columns = $attributes['columns'] ?? 'lg:cols-3';
$displayMode = $attributes['displayMode'] ?? 'stacked';
$showPopup = $attributes['showPopup'] ?? 0;

if (empty($people)) {
  echo '<p>No people selected.</p>';
  return;
}
?>
<div class="mmd-people-grid mmd-spacing mmd-spacing-md mmd-padding-y mmd-row mmd-row-static md:cols-2 <?php echo esc_attr($columns); ?> <?php echo $displayMode == 'stacked' ? 'gap-y-7 lg:gap-y-14' : 'gap-y-4 lg:gap-y-6'; ?>">
  <?php foreach ($people as $person) : ?>
    <div class="mmd-col">
      <?php 
      try {
        echo render_content_by_display($person['id'], $displayMode, ['has_popup' => $showPopup]);
      } catch (Exception $e) {
        echo '<p>Error rendering content: ' . esc_html($e->getMessage()) . '</p>';
      }
      ?>
    </div>
  <?php endforeach; ?>
</div>
