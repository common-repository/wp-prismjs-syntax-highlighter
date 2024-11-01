<?php

/*

  Plugin Name: WP PrismJS - Syntax Highlighter

  Plugin URI: /

  Description: Highlight your code on Wordpress with WP PrismJS !

  Version: 1.0

  Author: Anthony Da Mota

  Author URI: http://www.anthonydamota.me

  License: GPL v2

*/

/**

	Adding the Prism Stylesheet and Javascript

*/
function wp_prismjs_style_js(){

	wp_enqueue_script( 'prism.js', plugins_url( 'js/prism.js' , __FILE__ ), '', '1.0', true);
	wp_enqueue_script( 'source.js', plugins_url( 'js/source.js' , __FILE__ ), array('jquery'), '1.0', true);

	wp_enqueue_style( 'prism.css', plugins_url( 'css/prism.css' , __FILE__ ) );

}
add_action( 'wp_enqueue_scripts', 'wp_prismjs_style_js' );

/**
	Adding a new button to TinyMCE Advanced
*/
// Hooks your functions into the correct filters
function prismjsbutton_add_mce_button() {
// check user permissions
	if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
		return;
	}
// check if WYSIWYG is enabled
	if ( 'true' == get_user_option( 'rich_editing' ) ) {
		add_filter( 'mce_external_plugins', 'prismjsbutton_add_tinymce_plugin' );
		add_filter( 'mce_buttons', 'prismjsbutton_register_mce_button' );
	}
}
add_action('admin_head', 'prismjsbutton_add_mce_button');

// Declare script for new button
function prismjsbutton_add_tinymce_plugin( $plugin_array ) {
	$plugin_array['prismjsbutton'] =  plugins_url( 'js/wp-prismjs.js' , __FILE__ );
	return $plugin_array;
}

// Register new button in the editor
function prismjsbutton_register_mce_button( $buttons ) {
	array_push( $buttons, 'prismjsbutton' );
	return $buttons;
}

/**

	Adding the shortcode support

*/
/*
http://stackoverflow.com/questions/11695610/how-to-add-a-closing-shortcode-to-wordpress-template-file
http://www.wpexplorer.com/wordpress-tinymce-tweaks
*/
function wp_prismjs_shortcode( $atts, $content = null ) {
	$language = $atts["language"];
	$prismheight = $atts["prismheight"];
	$filename = $atts["filename"];

	return sprintf( '<pre data-prism="yes" class="line-numbers" data-filename="%s" style="max-height: %s"><code class="language-%s">%s</code></pre>', $filename, $prismheight, $language, $content);
}
add_shortcode( 'prismjs', 'wp_prismjs_shortcode' );


?>