<?php

/**
 * @file
 * Standard post display template.
 *
 * Renders a post card inside grid and archive layouts.
 * Defaults to the unified post card display.
 *
 * @package QP NewsLetter
 */

if (!defined('ABSPATH')) {
  exit;
}

get_template_part('templates/displays/post--related', NULL, $args);
