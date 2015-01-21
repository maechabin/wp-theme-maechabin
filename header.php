<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8">
<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<title><?php
//Print the <title> tag based on what is being viewed.
global $page,$paged;
wp_title('|', true, 'right');
// Add the blog name.
bloginfo('name');
// Add the blog description for the home/front page.
$site_description = get_bloginfo('description','display');
if ($site_description && (is_home() || is_front_page()))
  echo(" | $site_description");
// Add a page number if necessary:
if ($paged >= 2 || $page >= 2)
  echo(' | ' . sprintf(__('Page %s', 'twentyten'), max($paged,$page)));
?></title>
<meta http-equiv="default-style" content="<?php bloginfo('stylesheet_url'); ?>">
<meta name="description" content="都内のIT企業でWebディレクターをやってます。HTML5、CSS3、JavaScript,jQueryなどのWeb技術に関する話題から、Apple製品のこと、音楽（ピアノ、作曲）のことなどを書いています。">
<meta name="keywords" content="JavaScript, jQuery, HTML5, wordpress, apple, ドメイン, ピアノ">
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/wp-content/themes/chabin/favicon.ico">
<link rel="icon" type="image/vnd.microsoft.icon" href="/wp-content/themes/chabin/favicon.ico">
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" media="all">
<?php /*<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Play&amp;text=mae's+blog">*/ ?>
<link rel="stylesheet" href="//google-code-prettify.googlecode.com/svn/trunk/src/prettify.css">
<link rel="stylesheet" href="/wp-content/themes/chabin/css/font-awesome3.min.css">
<link rel="stylesheet" href="/wp-content/themes/chabin/css/font-awesome.min.css">
<link rel="alternate" type="application/rss+xml" title="RSS" href="<?php bloginfo('rdf_url'); ?>">
<?php wp_head(); ?>
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-16293533-1', 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');
  ga('require', 'linkid', 'linkid.js');
  
</script>
</head>

<body id="TOP">
<div id="index">

<!-- ▼header▼ -->
<header id="header_bar">
<div id="header_bar_inner">

<h1 id="blog_title"><a href="<?php get_option('home'); ?>"><i style="color:#fff;"></i><?php bloginfo('name'); ?></a></h1>

<div id="blog_search"><?php widget_mytheme_search(); ?></div>
<!--<div id="blog_profile"><a href="/about"><i class="icon-user"></i> プロフィール</a></div>-->

<div class="rss">
  <a href="//cloud.feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Fmae.chab.in%2Ffeed" target="_blank"><img id="feedlyFollow" src="//s3.feedly.com/img/follows/feedly-follow-rectangle-volume-medium_2x.png" alt="follow us in feedly" width="71" height="28"></a>
  <a href="/feed" target="_blank"><i class="fa fa-rss" style="margin-left:10px;"></i></a>
</div>

</div>
</header>
<div id="blog_header"></div>
<!-- ▲header▲ -->