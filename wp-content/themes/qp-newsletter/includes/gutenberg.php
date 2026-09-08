<?php

/**
 * @file
 * Gutenberg functions and helper callbacks.
 */

/**
 * Check if currently in gutenberg edit mode.
 *
 * Internal use only for the custom blocks render.php files.
 *
 * @return bool
 *   True if in edit mode, false otherwise.
 */
function mmd_is_gutenberg_edit_mode(): bool {
  return \defined('\REST_REQUEST') && TRUE === \REST_REQUEST;
}
