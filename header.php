<?php
$image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'large');
$path = htmlspecialchars($_SERVER['REQUEST_URI'], ENT_QUOTES);
?>

<head>
  <meta charset="utf-8">
  <title><?php site_title() ?></title>
  <meta http-equiv="default-style" content="<?php bloginfo('stylesheet_url'); ?>">
  <meta name="description" content="JavaScript、Reactなどのフロントエンド関連のWeb技術の話題から、Apple製品のこと、音楽（ピアノ、作曲）のことなどを書いています。">
  <meta name="keywords" content="JavaScript, Raect, Angular, css, wordpress, apple">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="google-site-verification" content="auMacOLlBwYsiL4oZPE_McmHLAHEb6_T8FnBMaC69Dw">

  <!-- OGP -->
  <?php if(is_home()): ?>
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php bloginfo('name'); ?>">
    <meta property="og:url" content="https://mae.chab.in/">
    <meta property="og:description" content="<?php bloginfo('description'); ?>">
    <meta property="og:image" content="/wp-content/uploads/2015/11/maechabin_400.png">
  <?php elseif(is_page()): ?>
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php the_title(); ?>">
    <meta property="og:url" content="<?php echo get_permalink(); ?>">
    <meta property="og:description" content="<?php bloginfo('description'); ?>">
    <meta property="og:image" content="/wp-content/uploads/2015/11/maechabin_400.png">
  <?php else: ?>
    <meta property="og:type" content="article">
    <meta property="og:title" content="<?php the_title(); ?>">
    <meta property="og:url" content="<?php echo get_permalink(); ?>">
    <meta property="og:description" content="<?php echo mb_substr(str_replace(array("\r\n", "\r", "\n"), '', strip_tags($post-> post_content)), 0, 100).'...'; ?>">
  <?php endif; ?>

  <?php if(is_single() && has_post_thumbnail() ): ?>
    <meta property="og:image" content="<?php echo $image_url[0] ?>">
  <?php elseif(!is_home() && !is_page() ): ?>
    <meta property="og:image" content="/wp-content/uploads/2015/11/maechabin_400.png">
  <?php endif; ?>
  <!-- OGP -->

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"> <!-- ←Twitterカードの種類 -->
  <meta name="twitter:site" content="@maechabin"> <!-- ←Twitterアカウント -->

  <?php if(is_home()): ?>  <!-- ←でブログのトップページを判定 -->
    <meta name="twitter:title" content="<?php bloginfo('name'); ?>">
    <meta name="twitter:description" content="<?php bloginfo('description'); ?>">
    <meta name="twitter:image:src" content="/wp-content/uploads/2015/11/maechabin_400.png">
  <?php elseif(is_page()): ?> <!-- ←で固定ページを判定 -->
    <meta name="twitter:title" content="<?php the_title(); ?>">
    <meta name="twitter:description" content="<?php bloginfo('description'); ?>">
    <meta name="twitter:image:src" content="/wp-content/uploads/2015/11/maechabin_400.png">
  <?php else: ?> <!-- ←上記の条件にもれたページ（記事ページ） -->
    <meta name="twitter:title" content="<?php the_title(); ?>">
    <meta name="twitter:description" content="<?php echo mb_substr(str_replace(array("\r\n", "\r", "\n"), '', strip_tags($post-> post_content)), 0, 100).'...'; ?>">
  <?php endif; ?>

  <?php if(is_single() && has_post_thumbnail() ): ?>
    <meta name="twitter:image:src" content="<?php echo $image_url[0] ?>">
  <?php elseif(!is_home() && !is_page() ): ?>
    <meta name="twitter:image:src" content="/wp-content/uploads/2015/11/maechabin_400.png">
  <?php endif; ?>
  <!-- Twitter Card -->

  <?php if(is_home()): ?> 
    <link rel="canonical" href="https://mae.chab.in<?php echo $path ?>">
  <?php endif; ?>

  <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/wp-content/themes/chabin/favicon.ico">
  <link rel="icon" type="image/vnd.microsoft.icon" href="/wp-content/themes/chabin/favicon.ico">
  <link rel="alternate" type="application/rss+xml" title="RSS" href="<?php bloginfo('rdf_url'); ?>">

  <?php wp_head(); ?>

  <link rel="stylesheet" href="/wp-content/themes/chabin/assets/style-8d9fb797a02029895ec65371887dcce3.css" media="all">
  <style>
  body {
    margin: 0;
    padding: 0;
  }

  <script src="/wp-content/themes/chabin/assets/function.min-5f7582c954ef8f13241ba01219cfae7f.js" defer></script>
  <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" defer></script>
  <script src="https://www.googletagmanager.com/gtag/js?id=UA-44221308-1" defer></script>
  .header {
    width: 100%;
    overflow: hidden;
    background-color: #191919;
    line-height: 64px;
    height: 64px;
    position: absolute;
    z-index: 1000;
  }

  .content {
    z-index: 2;
    background-color: #fff;
    border-top: 1px solid #cfd8dc;
    width: calc(100% - 80px);
    padding-right: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .main {
    padding-top: 16px;
    padding-left: calc((100% - 1100px) / 2);
    width: 760px;
    margin-bottom: 0;
  }

  .category {
    padding-top: 72px;
    width: 100%;
    background-color: #eceff1;
  }

  @media screen and (max-width: 1179px) {
    .content {
      display: block;
      max-width: 100%;
      width: 100%;
      padding-right: 0;
    }

    .main {
      width: 100%;
      max-width: 100%;
      padding-left: 0;
    }

    .category {
      max-width: 100%;
    }
  }
  </style>
</head>
