<?php

function <<0>>_setup() {

  add_theme_support( 'title-tag' );

}

add_action( 'after_setup_theme', '<<0>>_setup' );

function <<0>>_script_enqueue() {

  wp_enqueue_style('styles', get_template_directory_uri() . '/dist/<<0>>.bundle.css', false, 0.1, 'all');
  wp_enqueue_script( 'scripts', get_template_directory_uri() . '/dist/<<0>>.bundle.js', false, 0.1, true);

}

add_action( 'wp_enqueue_scripts', '<<0>>_script_enqueue');
  
?>