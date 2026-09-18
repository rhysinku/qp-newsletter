<?php

add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
	$ris['content_media_small'] = [
		'sizes' => '(min-width: 992px) 400px, calc(100vw - 2rem)',
		'whratio' => '3:2',
	];

	$ris['content_media_medium'] = [
		'sizes' => '(min-width: 992px) 600px, calc(100vw - 2rem)',
		'whratio' => '3:2',
	];

	$ris['content_media_large'] = [
		'sizes' => '(min-width: 1320) 1000px, calc(100vw - 2rem)',
		'whratio' => '3:2',
	];

	return $ris;
});