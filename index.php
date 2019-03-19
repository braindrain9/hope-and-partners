<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="UTF-8">
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
   <meta name="apple-mobile-web-app-capable" content="yes">
   <link rel="canonical" href="<?php echo getSiteUrl(); ?>" />
   <meta name="google-site-verification" content="4GCnA31OD27Xqb8cvbyNZEPLC5WBdPUO8BEQ3uTjs0Y" />


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
  <style>
    body {
       background: #030301;
    }

    .noscript {
        text-align: center;
        color: #BCBFC1;
        display: flex;
        align-items: center;
        height: 80vh;
        flex-direction:column;
        justify-content: center;
        font-family: 'Montserrat';
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <noscript>
    <div class="noscript">
       <h1>Javascript Required</h1>
       <p style="line-height: 26px;">
        We're sorry, but <a href="<?php echo getSiteUrl(); ?>" style="color: #F44336;">Hope&Partners</a> doesn't work properly without Javascript.<br />
        Please enable Javascript to get a full experience of using our site.
       </p>
    </div>
  </noscript>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-136492029-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-136492029-1');
  </script>

  <?php wp_footer(); ?>
</body>
</html>