<!doctype html>

<html lang="ja">
<head>
  <meta charset="utf-8">
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <title><?php site_title() ?></title>
  <meta http-equiv="default-style" content="<?php bloginfo('stylesheet_url'); ?>">
  <meta name="description" content="JavaScript、HTML5、CSS3などのフロントエンド関連のWeb技術の話題から、Apple製品のこと、音楽（ピアノ、作曲）のことなどを書いています。">
  <meta name="keywords" content="JavaScript, jQuery, HTML5, wordpress, apple">
  <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">

  <!-- OGP -->
  <?php if(is_home()): ?>
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?php bloginfo('name'); ?>">
  <meta property="og:url" content="http://mae.chab.in/">
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
  <meta property="og:description" content="<?php echo mb_substr(str_replace(array("rn", "r", "n"), '', strip_tags($post-> post_content)), 0, 100).'...'; ?>">
  <?php endif; ?>
  <?php $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'large'); ?>
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
  <meta name="twitter:description" content="<?php echo mb_substr(str_replace(array("rn", "r", "n"), '', strip_tags($post-> post_content)), 0, 100).'...'; ?>">
  <?php endif; ?>
  <?php $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'large'); ?>
  <?php if(is_single() && has_post_thumbnail() ): ?>
  <meta name="twitter:image:src" content="<?php echo $image_url[0] ?>">
  <?php elseif(!is_home() && !is_page() ): ?>
  <meta name="twitter:image:src" content="http://mae.chab.in/wp-content/uploads/2015/11/maechabin_400.png">
  <?php endif; ?>
  <!-- Twitter Card -->

  <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/wp-content/themes/chabin/favicon.ico">
  <link rel="icon" type="image/vnd.microsoft.icon" href="/wp-content/themes/chabin/favicon.ico">
  <link rel="stylesheet" href="/wp-content/themes/chabin/assets/style-00488b810a2b023021cdd6eeee62f846.css" media="all">
  <link rel="alternate" type="application/rss+xml" title="RSS" href="<?php bloginfo('rdf_url'); ?>">
  <?php wp_head(); ?>
  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
</head>

<body id="TOP">
  <div id="index">

    <!-- ▼header▼ -->
    <header id="header_bar" class="header cb-header">
      <div id="header_bar_inner" class="header__inner">

        <h1 class="header__title">
          <a href="/"><i style="color:#fff;"></i></a>
          <a href="/">mae's blog</a>
        </h1>

        <div class="header__search">
          <form role="search" method="get" id="header__search-form" action="<?php bloginfo('url') ?>" >
            <input type="text" value="<?php echo get_search_query(); ?>" name="s" placeholder="ブログ記事を検索" class="header__search-text"><button type="submit" class="header__search-button"><i class="fa fa-search"></i></button>
          </form>
        </div>

        <div class="header__button_search">
          <i class="fa fa-search"></i>
        </div>
        <div class="header__share">
          <a href="//cloud.feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Fmae.chab.in%2Ffeed" target="_blank"><i class="fa fa-rss"></i></a>
        </div>

      </div>
    </header>
    <!-- ▲header▲ -->

    <div class="header__search_mobile <?php if (is_search()) echo 'header__display' ?>">
      <p class="header__button_back"><i class="fa fa-chevron-left"></i></p>
      <form role="search" method="get" class="header__search-form_mobile" action="<?php bloginfo('url') ?>" >
        <input type="text" value="<?php echo get_search_query(); ?>" name="s" placeholder="ブログ記事を検索" class="header__search-text_mobile"><button type="submit" class="header__search-button_mobile"><i class="fa fa-search"></i></button>
      </form>
    </div>

    <div id="blog_header"></div>
