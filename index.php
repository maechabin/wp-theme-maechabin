<?php get_header(); ?>

<!-- ▼#content▼ -->
<div id="content_border">
<div id="content">

<!-- ▼#entry▼ -->
<div id="entry">
<div id="entry_sub">

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
<section class="post post-box">
<h1 id="post-<?php the_ID(); ?>" class="post-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>
<ul class="postmetadata-ul postmetadata">
  <li class="postmetadata-li"><i class="fa fa-archive"></i> <?php the_category(', '); ?></li>
  <?php /*<li class="postmetadata-li"><?php the_tags(); ?></li>*/ ?>
  <?php /*<li class="postmetadata-li"><a href="http://b.hatena.ne.jp/entry/<?php the_permalink(); ?>" target="_blank"><img src="http://b.hatena.ne.jp/entry/image/<?php the_permalink(); ?>" alt="" /></a></li>*/ ?>
  <li class="postmetadata-li"><?php edit_post_link('編集'); ?></li>
</ul>
<ul class="cb-share post__sharebutton" title="<?php the_permalink(); ?>">
  <?php /*<li><i class="fa fa-comments-o"></i> <?php comments_popup_link('0','1','%'); ?></li>*/ ?>
  <li class="cb-hb"><a href="//b.hatena.ne.jp/entry/mae.chab.in/archives/<?php the_ID(); ?>" target="_blank"><b>B!</b> <span></span></a></li>
  <?php /*<li class="cb-tw"><a href="//twitter.com/intent/tweet?text=<?php the_title(); ?> <?php the_permalink(); ?> @maechabinさんから" target="_blank"><i class="fa fa-twitter"></i><span></span></a></li> */ ?>
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
<?php get_footer(); ?>
