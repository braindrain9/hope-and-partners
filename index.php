<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
   <title>Hope & Partners</title>
   <link rel='shortcut icon' type='image/x-icon' href='favicon.ico'/>
   <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700">
   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700">
   <meta name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0">
   <meta name="description" content="<?php echo getDescription(); ?>">
   <meta property="og:site_name" content="Hope&Partners"/>
   <meta property="og:locale" content="<?php echo getLocale(); ?>"/>
   <meta property="og:title" content="Hope&Partners"/>
   <meta property="og:description" content="<?php echo getDescription(); ?>">
   <meta property="og:url" content="<?php echo getSiteUrl(); ?>"/>
   <meta property="og:type" content="website"/>
   <meta property="og:image" content="https://hopeandpart.com/opengraph-image.jpg"/>
   <meta name="twitter:card" content="summary"/>
   <meta name="twitter:title" content="Hope&Partners"/>
   <meta name="twitter:description" content="<?php echo getDescription(); ?>"/>
   <meta name="twitter:image" content="https://hopeandpart.com/opengraph-image.jpg"/>

   <?php
     function getSiteUrl() {
       if(get_locale() == 'en_US') {
         return 'https://hopeandpart.com/en';
       } else {
         return 'https://hopeandpart.com';
       }
     }

     function getLocale() {
       if(get_locale() == 'en_US') {
         return 'en_us';
       } else {
         return 'uk_ua';
       }
     }

     function getDescription() {
       if(get_locale() == 'en_US') {
         return 'We build connection with reality';
       } else {
         return 'Налагоджуємо зв’язки з реальністю';
       }
     }
    ?>
  <?php wp_head(); ?>
</head>
<body>
  <div id="app"></div>
  <?php wp_footer(); ?>
</body>
</html>