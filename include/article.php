<!-- ▼article▼ -->
<article class="article">
  <header class="article__header">
    <nav class="article__breadcrumb"><?php breadcrumb(); ?></nav>
    <h1 class="article__title" id="post-<?php the_ID(); ?>">
      <?php the_title(); ?>
    </h1>
    <ul class="article__meta">
      <li class="article__meta-li">
        <i class="fa fa-calendar" aria-hidden="true"></i> <time pubdate><?php the_date('Y年m月d日'); ?></time>
      </li>
      <li class="article__meta-li">
        <i class="fa fa-pencil" aria-hidden="true"></i>
        <a href="<?php echo get_page_link(5); ?>"><?php the_author(); ?></a>
      </li>
      <li class="article__meta-li">
        <?php the_tags('<span class="article__meta-tag">', '', '</span>'); ?>
      </li>
    </ul>
    <?php mc_social_button(); ?>
  </header>

  <div class="ad-single1">
    <!-- maesblog（記事上レスポンシブ） -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-6331923403728737"
         data-ad-slot="3040249173"
         data-ad-format="auto"></ins>
    <?php
      $iPod    = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
      $iPhone  = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
      $iPad    = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
      $Android = stripos($_SERVER['HTTP_USER_AGENT'], "Android");
      $webOS   = stripos($_SERVER['HTTP_USER_AGENT'], "webOS");

      if ($iPod || $iPhone || $iPad) {
        /** iOS用の広告 */
      } else {
        /** iOS以外の広告 */
      }
    ?>
  </div>

  <div class="entry">
    <?php the_content(); ?>
  </div>

  <div class="article__linkpages">
    <?php //wp_link_pages('before=&after=&next_or_number=next&previouspagelink=<span class="pre">前へ</span>&nextpagelink=<span class="next">次へ</span>'); ?>
    <?php wp_link_pages('before=&after=&next_or_number=number&pagelink=%'); ?>
  </div>

  <div class="ad-single2">
    <div class="ad-single2__banner">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-format="autorelaxed"
           data-ad-client="ca-pub-6331923403728737"
           data-ad-slot="3210202778"></ins>
    </div>
  </div>

  <div class="ad-single2">
    <!-- maesblog（記事下レスポンシブ） -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-6331923403728737"
         data-ad-slot="7877624377"
         data-ad-format="auto"></ins>
  </div>

  <ul class="article__meta">
    <li class="article__meta-li">カテゴリー: <?php the_category(', '); ?></li>
    <li class="article__meta-li">
      <?php the_tags('<span class="article__meta-tag">', '', '</span>'); ?>
    </li>
  </ul>

  <?php mc_social_button(); ?>

  <ul class="article__nav" id="nav-below">
    <li class="article__nav-previous"><?php previous_post_link('%link','<span class="meta-nav">←</span> %title'); ?></li>
    <li class="article__nav-next"><?php next_post_link('%link','%title <span class="meta-nav">→</span>'); ?></li>
  </ul>
</article>
<!-- ▲article▲ -->