<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts() {
    wp_enqueue_script('blankslate/vendor.js', get_template_directory_uri() . '/dist/vendor.js', null, null, true);
    wp_enqueue_script('blankslate/bundle.js', get_template_directory_uri() . '/dist/bundle.js', null, null, true);
    wp_enqueue_script('blankslate/font.json', get_template_directory_uri() . '/dist/src/assets/json/Montserrat_Bold.json', null, null, true);
    wp_enqueue_script('blankslate/services.json', get_template_directory_uri() . '/dist/src/assets/json/services.json', null, null, true);
    wp_enqueue_script('blankslate/partners.json', get_template_directory_uri() . '/dist/src/assets/json/partners.json', null, null, true);
    wp_enqueue_script('blankslate/cases.json', get_template_directory_uri() . '/dist/src/assets/json/cases.json', null, null, true);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);
