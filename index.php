<?php get_header(); ?>

<!-- ▼#content▼ -->
<div id="content_border">
<div id="content">

<!-- ▼#entry▼ -->
<div id="entry">
<div id="entry_sub">
<?php
if(have_posts()):
while(have_posts()):the_post();

//if(!is_single()):
?>
<!-- ▼section▼ -->
<section class="post post-box">
<h1 id="post-<?php the_ID(); ?>" class="post-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>
<ul class="postmetadata-ul postmetadata">
<li class="postmetadata-li"><i class="icon-archive"></i> <?php the_category(', '); ?></li>
<?php /*<li class="postmetadata-li"><?php the_tags(); ?></li>*/ ?>
<?php /*<li class="postmetadata-li"><a href="http://b.hatena.ne.jp/entry/<?php the_permalink(); ?>" target="_blank"><img src="http://b.hatena.ne.jp/entry/image/<?php the_permalink(); ?>" alt="" /></a></li>*/ ?>
<li class="postmetadata-li"><?php edit_post_link('編集'); ?></li>
</ul>
<ul class="cb-share" title="<?php the_permalink(); ?>">
<li><i class="icon-comments-alt"></i> <?php comments_popup_link('0','1','%'); ?></li>
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
<h2 class="center">Not Found</h2>
<p class="center"><?php _e("Sorry, but you are looking for something that isn't here."); ?></p>
<?php endif; ?>

<script src="/wp-content/themes/chabin/js/jquery.cbsharecount.min.js"></script>
<script>
$(document).ready(function () {
	$(".cb-share").cbShareCount();
});
</script>
</div><!-- #entry_sub -->
</div><!-- #entry -->
<!-- ▲#entry▲ -->

<?php get_sidebar(); ?>
</div><!-- .content -->
</div><!-- .content_border -->
<!-- ▲#content▲ -->

<?php get_footer(); ?>