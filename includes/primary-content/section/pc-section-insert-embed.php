<?php

	$iframe = get_sub_field('tour_pc-bg__select-videoembed');

	preg_match('/src="(.+?)"/', $iframe, $matches);
	$src = $matches[1];

	$params = array(
	    'controls'    => 0,
	    'autoplay'    => 1,
	    'rel'         => 0,
	    'showinfo'    => 0,
	    'controls'	  => 0,
	    'loop'        => 1,
	);

	$new_src = add_query_arg($params, $src);

	$iframe = str_replace($src, $new_src, $iframe);

	$attributes = 'frameborder="0" class="pc--s__bg-embed"';

	$iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);

	echo $iframe;

?>