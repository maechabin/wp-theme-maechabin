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
<!--<li class="postmetadata-li"><?php the_tags(); ?></li>-->
<li class="postmetadata-li comments_number"><i class="icon-comments-alt"></i> <?php comments_popup_link('0','1','%'); ?></li>
<li class="postmetadata-li"><a href="http://b.hatena.ne.jp/entry/<?php the_permalink(); ?>" target="_blank"><img src="http://b.hatena.ne.jp/entry/image/<?php the_permalink(); ?>" alt="" /></a></li>
<li class="postmetadata-li"><?php edit_post_link('編集'); ?></li>
</ul>
<ul class="cb-share" title="<?php the_permalink(); ?>">
<!--<li class="cb-hb"><i class="fa fa-bold"></i>!<span></span></li>-->
<li class="cb-tw"><i class="fa fa-twitter"></i><span></span></li>
<li class="cb-fb"><i class="fa fa-facebook"></i><span></span></li>
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