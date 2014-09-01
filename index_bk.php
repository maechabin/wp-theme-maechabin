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
?>

<!-- ▼article▼ -->
<article>

<?php if(!is_single()): ?>
<header>
<h2 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
</header>
<?php endif ?>


<?php if(is_single()): ?>
<header>
<h2 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
<ul class="entry_meta">
<li><time pubdate><?php the_date() ?></time></li>
<li><a rel="author" href="<?php echo get_page_link(5); ?>"><?php the_author(); ?></a> <a rel="author" title="Google+プロフィールへ" href="https://plus.google.com/u/0/105642680110503345013/posts" target="_blank"><img src="http://www.google.com/images/icons/ui/gprofile_button-16.png" width="16" height="16" alt="Google+プロフィールへ"></a></li>
</ul>
</header>
<div class="entry">
<?php the_content(); ?>
</div>


<div id="linkpages">
<?php //wp_link_pages('before=&after=&next_or_number=next&previouspagelink=<span class="pre">前へ</span>&nextpagelink=<span class="next">次へ</span>'); ?>
<?php wp_link_pages('before=&after=&next_or_number=number&pagelink=%'); ?>
</div>
<?php endif ?>


<?php if(is_page()): ?>
<div class="entry">
<?php the_content(); ?>
</div>
<?php endif ?>


<ul class="postmetadata">
<li>カテゴリー: <?php the_category(', '); ?></li>
<li><?php the_tags(); ?></li>
</ul>

<?php if(!is_single()): ?>
<ul class="comments">
<li class="comments_number"><?php comments_popup_link('コメント 0','コメント 1','コメント %'); ?></li>
<li><?php edit_post_link('編集'); ?></li>
</ul>
<?php endif ?>

<?php if(is_single()): ?>
<script type="text/javascript"><!--
google_ad_client = "ca-pub-6331923403728737";
/* maechabin2 */
google_ad_slot = "4144613456";
google_ad_width = 336;
google_ad_height = 280;
//-->
</script>
<script src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>

<ul id="nav-below" class="navigation">
<li class="nav-previous"><?php previous_post_link('%link','<span class="meta-nav">←</span> %title'); ?></li>
<li class="nav-next"><?php next_post_link('%link','%title <span class="meta-nav">→</span>'); ?></li>
</ul><!-- #nav-below -->

<?php comments_template('',true); ?>
<?php endif; ?>
</article>
<!-- ▲article▲ -->
<?php endwhile; ?>

<?php if($wp_query->max_num_pages>1): ?>
<nav id="nav_below" class="navigation">
<p class="nav_previous"><?php next_posts_link('<span class="meta-nav">&larr;</span> 古い投稿へ'); ?></p>
<p class="nav_next"><?php previous_posts_link('新しい投稿へ <span class="meta-nav">&rarr;</span>'); ?></p>
</nav><!-- #nav_below -->
<?php endif; ?>

<?php else : ?>
<h2 class="center">Not Found</h2>
<p class="center">
<?php _e("Sorry, but you are looking for something that isn't here."); ?></p>

<?php endif; ?>
<p class="back_to_top"><a href="#top">ページ上部に戻る</a></p>
</div><!-- #entry_sub -->
</div><!-- #entry -->
<!-- ▲#entry▲ -->

<?php get_sidebar(); ?>
</div><!-- .content -->
</div><!-- .content_border -->
<!-- ▲#content▲ -->

<?php get_footer(); ?>