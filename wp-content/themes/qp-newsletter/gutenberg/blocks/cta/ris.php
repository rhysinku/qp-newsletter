<?php

add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
	$ris['cta'] = [
		'sizes' => '(min-width: 992px) 400px, calc(100vw - 2rem)',
		'whratio' => '3:2',
	];

	return $ris;
});