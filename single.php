<?php get_header(); ?>

<!-- ▼#content▼ -->
<div id="content_border">
<div id="content">

<!-- ▼#entry▼ -->
<main id="entry">
<div id="entry_sub">
<?php
if(have_posts()):
while(have_posts()):the_post();
?>

<!-- ▼article▼ -->
<article id="article">

  <header>
    <nav class="breadcrumb"><?php breadcrumb(); ?></nav>
    <h1 id="post-<?php the_ID(); ?>" class="entry-title"><?php the_title(); ?></h1>
    <ul class="entry-meta">
      <li class="entry-meta-li"><i class="fa fa-calendar" aria-hidden="true"></i> <time pubdate><?php the_date('Y年m月d日'); ?></time></li>
      <li class="entry-meta-li"><i class="fa fa-pencil" aria-hidden="true"></i> <a rel="author" href="<?php echo get_page_link(5); ?>"><?php the_author(); ?></a> <a rel="author" title="⇒Google+プロフィールへ" href="https://plus.google.com/u/0/105642680110503345013/posts" target="_blank"><i class="fa fa-google-plus" style="color: #db4437;"></i></a></li>
      <li class="entry-meta-li"><?php the_tags('#', ', #'); ?></li>
    </ul>

  <?php mc_social_button(); ?>
  </header>

  <div class="ad-single1">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- maesblog（記事上レスポンシブ） -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-6331923403728737"
         data-ad-slot="3040249173"
         data-ad-format="auto"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>

<?php
$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
$Android = stripos($_SERVER['HTTP_USER_AGENT'],"Android");
$webOS   = stripos($_SERVER['HTTP_USER_AGENT'],"webOS");

if ($iPod || $iPhone || $iPad) {

} else {

}
?>

  <div class="entry">
  <?php the_content(); ?>
  </div>

  <div id="linkpages">
  <?php //wp_link_pages('before=&after=&next_or_number=next&previouspagelink=<span class="pre">前へ</span>&nextpagelink=<span class="next">次へ</span>'); ?>
  <?php wp_link_pages('before=&after=&next_or_number=number&pagelink=%'); ?>
  </div>

  <div class="ad-single2">
    <div class="sd-single2__banner">
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-format="autorelaxed"
           data-ad-client="ca-pub-6331923403728737"
           data-ad-slot="3210202778"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  </div>

  <div class="ad-single2">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- maesblog（記事下レスポンシブ） -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-6331923403728737"
         data-ad-slot="7877624377"
         data-ad-format="auto"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>

  <ul class="postmetadata">
    <li class="postmetadata-li">カテゴリー: <?php the_category(', '); ?></li>
    <li class="postmetadata-li"><?php the_tags(); ?></li>
  </ul>

  <?php mc_social_button(); ?>

  <ul id="nav-below" class="navigation">
    <li class="nav-previous"><?php previous_post_link('%link','<span class="meta-nav">←</span> %title'); ?></li>
    <li class="nav-next"><?php next_post_link('%link','%title <span class="meta-nav">→</span>'); ?></li>
  </ul><!-- #nav-below -->

</article>
<!-- ▲article▲ -->

<?php comments_template('',true); ?>


<?php endwhile; ?>

<?php if($wp_query->max_num_pages>1): ?>
<nav id="nav_below" class="navigation">
  <p class="nav_previous"><?php next_posts_link('<span class="meta-nav">&larr;</span> 古い投稿へ'); ?></p>
  <p class="nav_next"><?php previous_posts_link('新しい投稿へ <span class="meta-nav">&rarr;</span>'); ?></p>
</nav><!-- #nav_below -->
<?php endif; ?>

<?php else : ?>
<h2 class="entry-h3 center">Not Found</h2>
<p class="center"><?php _e("Sorry, but you are looking for something that isn't here."); ?></p>
<?php endif; ?>

</div><!-- #entry_sub -->
</main><!-- #entry -->
<!-- ▲#entry▲ -->

<?php get_sidebar(); ?>
</div><!-- .content -->
</div><!-- .content_border -->
<!-- ▲#content▲ -->

<?php get_footer(); ?>
