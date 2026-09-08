<?php

/**
 * Implement add_filter for body_class to add mod--theme--light by default
 */
add_filter('body_class', function($classes) {
    if (!in_array('mod--theme--light', $classes)) {
        $classes[] = 'mod--theme--light';
    }
    return $classes;
});
