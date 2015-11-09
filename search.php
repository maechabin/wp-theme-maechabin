<?php get_header(); ?>

<!-- ▼#content▼ -->
<div id="content_border">
<div id="content">

<!-- ▼#entry▼ -->
<div id="entry">
<div id="entry_sub">
<?php

$allsearch =& new WP_Query("s=$s&posts_per_page=-1");

$key = wp_specialchars($s, 1);
$count = $allsearch->post_count;
?>

<p class="search__result"><span class="search__display"><strong><?php echo $key ?></strong> の</span>検索結果: <strong><?php echo $count ?></strong> 件</p>

<aside class="ad-index1">
  <div class="ad-index1__banner">
    <p class="ad-index1__title">スポンサードリンク</p>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- mae's blog（記事上モバイルバナー） -->
    <ins class="adsbygoogle"
         style="display:inline-block;width:320px;height:100px"
         data-ad-client="ca-pub-6331923403728737"
         data-ad-slot="7675360770"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
</aside>


<?php
if(have_posts()):
while(have_posts()):the_post();
//if(!is_single()):
?>
<!-- ▼section▼ -->
<section class="search__box">
  <h1  class="search__box_title">
    <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
    <small><?php edit_post_link('編集'); ?></small>
  </h1>
  <?php the_excerpt(); ?>
  <ul class="search__box_category">
    <li><i class="fa fa-archive"></i> <?php the_category(', '); ?></li>
    <?php if(has_tag()): ?>
    <li><i class="fa fa-tag"></i> <?php the_tags(''); ?></li>
    <?php endif ?>
  </ul>
  <ul class="search__box_share" title="<?php the_permalink(); ?>">
    <li class="cb-hb"><a href="//b.hatena.ne.jp/entry/mae.chab.in/archives/<?php the_ID(); ?>" target="_blank"><b>B!</b> <span></span></a></li>
    <li class="cb-tw"><a href="//twitter.com/intent/tweet?text=<?php the_title(); ?> <?php the_permalink(); ?> @maechabinさんから" target="_blank"><i class="fa fa-twitter"></i><span></span></a></li>
    <li class="cb-fb"><a href="//www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>', 'new', 'width=500,height=300');return false;"><i class="fa fa-facebook"></i><span></span></a></li>
  </ul>
</section>
<!-- ▲section▲ -->

<?php
//endif;
endwhile;

wp_pagenavi();
?>

<?php else : ?>
<h2 class="entry-h3" style="text-align: center;">Not Found</h2>
<p style="font-size: 16px;text-align: center;">キーワードを含む記事はありませんでした。</p>
<div style="text-align: center;margin-top: 40px;">
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- mae's blog（Page/index用） -->
<ins class="adsbygoogle"
   style="display:inline-block;width:468px;height:60px"
   data-ad-client="ca-pub-6331923403728737"
   data-ad-slot="8443865971"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
<?php endif; ?>

</div><!-- #entry_sub -->
</div><!-- #entry -->
<!-- ▲#entry▲ -->

<?php get_sidebar(); ?>
</div><!-- .content -->
</div><!-- .content_border -->
<!-- ▲#content▲ -->

<script src="/wp-content/themes/chabin/js/jquery.cbsharecount.min.js"></script>
<script>
$(document).ready(function () {
	$(".search__box_share").cbShareCount();
});
</script>
<?php get_footer(); ?>
