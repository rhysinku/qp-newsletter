<?php
/**
 * Server-side render template for the qp/resource-cta block.
 *
 * @package QP NewsLetter
 */

if (empty($attributes['resource_id'])) {
  return;
}

$resource_id = intval($attributes['resource_id']);
$button_label = !empty($attributes['button_label']) ? esc_html($attributes['button_label']) : __('Download Resource', 'qp-newsletter');

// Query the resource post
$resource = get_post($resource_id);

if (!$resource || $resource->post_type !== 'resource') {
  if (is_admin()) {
    echo '<div style="padding: 1rem; border: 1px solid #ef4444; border-radius: 6px; background-color: #fef2f2; color: #b91c1c; font-size: 0.875rem;">Error: Post with ID ' . $resource_id . ' is not a valid Resource post type.</div>';
  }
  return;
}

// Fetch custom ACF fields for resources
$resource_type = get_field('resource_type', $resource_id);
$skill_level = get_field('skill_level', $resource_id);
$external_url = get_field('external_url', $resource_id);
$file_attachment = get_field('file_attachment', $resource_id); // Returns ID, array or URL

// Build the download link URL based on the resource type
$target_url = '#';
if ($resource_type === 'external_link') {
  $target_url = esc_url($external_url);
} elseif ($resource_type === 'downloadable_file') {
  if (is_array($file_attachment)) {
    $target_url = esc_url($file_attachment['url']);
  } elseif (is_numeric($file_attachment)) {
    $target_url = esc_url(wp_get_attachment_url($file_attachment));
  } else {
    $target_url = esc_url($file_attachment);
  }
} else {
  // Internal fallback
  $target_url = esc_url(get_permalink($resource_id));
}

// Build classes based on skill levels for decorative touches
$skill_badge_class = 'bg-primary-blue-200 text-primary-default';
if ($skill_level === 'advance') {
  $skill_badge_class = 'bg-red-50 text-red-700 border border-red-200';
} elseif ($skill_level === 'intermediate') {
  $skill_badge_class = 'bg-yellow-50 text-yellow-800 border border-yellow-200';
}

// Format the Resource Type label for humans
$type_label = esc_html(ucfirst(str_replace('_', ' ', $resource_type)));
?>

<div class="mmd-resource-cta qp-resource-cta p-6 border border-solid border-primary-brass-300 rounded-md bg-neutral-light-grey flex flex-col md:flex-row md:items-center md:justify-between gap-6 my-6" style="background-color: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 1.5rem; margin: 1.5rem 0; display: flex; flex-direction: column; gap: 1.5rem;">
  <div class="mmd-resource-cta__info" style="flex: 1;">
    <div class="mmd-resource-cta__meta" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
      <span class="mmd-resource-cta__badge <?php echo esc_attr($skill_badge_class); ?>" style="padding: 0.125rem 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px;">
        <?php echo esc_html(ucfirst($skill_level)); ?>
      </span>
      <span class="mmd-resource-cta__type" style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">
        <?php echo esc_html($type_label); ?>
      </span>
    </div>
    <h4 class="mmd-resource-cta__title" style="font-size: 1.125rem; font-weight: 700; color: #f8fafc; margin: 0; line-height: 1.25;">
      <?php echo esc_html(get_the_title($resource_id)); ?>
    </h4>
    <?php if (!empty($resource->post_excerpt)): ?>
      <p class="mmd-resource-cta__excerpt" style="font-size: 0.875rem; color: #94a3b8; margin-top: 0.25rem; margin-bottom: 0; line-height: 1.5;">
        <?php echo esc_html($resource->post_excerpt); ?>
      </p>
    <?php endif; ?>
  </div>
  <div class="mmd-resource-cta__action">
    <a href="<?php echo esc_url($target_url); ?>" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="mmd-button mmd-resource-cta__btn"
       style="display: inline-flex; align-items: center; gap: 0.5rem; background-color: #3b82f6; color: #ffffff; padding: 0.75rem 1.25rem; border-radius: 4px; font-weight: 700; font-size: 0.875rem; text-decoration: none; transition: background-color 0.2s ease;">
      <svg class="icon" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style="display: inline-block; vertical-align: middle;">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
      </svg>
      <?php echo esc_html($button_label); ?>
    </a>
  </div>
</div>
