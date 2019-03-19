<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

function remove_admin_bar_menus() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('new-content');
    $wp_admin_bar->remove_menu('updates');
    $wp_admin_bar->remove_menu('comments');
    $wp_admin_bar->remove_menu('customize');
    $wp_admin_bar->remove_menu('view');
    $wp_admin_bar->remove_menu('imagify');
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
    wp_enqueue_script('vendor.js', get_template_directory_uri() . '/dist/vendor.js', null, null, true);
    wp_enqueue_script('bundle.js', get_template_directory_uri() . '/dist/bundle.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

function add_defer_attribute($tag, $handle) {
    // add script handles to the array below
   $scripts_to_defer = array('vendor.js', 'bundle.js');
 
   foreach($scripts_to_defer as $defer_script) {
      if ($defer_script === $handle) {
         return str_replace(' src', ' defer="defer" src', $tag);
      }
   }
   return $tag;
}
add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);

function remove_embeded_scripts(){
 wp_deregister_script('wp-embed');
}
add_action( 'wp_footer', 'remove_embeded_scripts' );

//Remove JQuery migrate
function isa_remove_jquery_migrate( &$scripts) {
    if(!is_admin()) {
        $scripts->remove('jquery');
    }
}
add_filter( 'wp_default_scripts', 'isa_remove_jquery_migrate' );

if ( is_plugin_active( 'autoptimize/autoptimize.php' ) ) {
    add_filter('autoptimize_html_after_minify', function($content) {
        $content = str_replace("type='text/javascript'", '', $content);
        $content = str_replace('type="text/javascript"', '', $content);

        $content = str_replace("type='text/css'", '', $content);
        $content = str_replace('type="text/css"', '', $content);

        return $content;
    }, 10, 1);
}

function remove_jquery() {    
    if( !is_admin()){
     wp_deregister_script('jquery');
    }
}

add_action( 'wp_enqueue_scripts', 'remove_jquery' );

add_action('wp_enqueue_scripts', function() {
  wp_dequeue_style( 'wp-block-library' );
});