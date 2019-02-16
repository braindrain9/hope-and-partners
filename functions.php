<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

function remove_admin_bar_menus() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('new-content');
    $wp_admin_bar->remove_menu('updates');
    $wp_admin_bar->remove_menu('comments');
    $wp_admin_bar->remove_menu('customize');
}
add_action( 'wp_before_admin_bar_render', 'remove_admin_bar_menus' );

function remove_menus(){
  remove_menu_page( 'edit.php' );                   //Записи
  remove_menu_page( 'edit.php?post_type=page' );    //Страницы
  remove_menu_page( 'edit-comments.php' );          //Комментарии
  remove_menu_page( 'themes.php' );                 //Внешний вид
}
add_action( 'admin_menu', 'remove_menus' );

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
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

add_filter( 'clean_url', function( $url )
{
    if ( FALSE === strpos( $url, '.js' ) )
    { // not our file
        return $url;
    }
    // Must be a ', not "!
    return "$url' defer='defer";
}, 11, 1 );