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

<header>
<h1 id="post-<?php the_ID(); ?>" class="entry-title"><?php the_title(); ?></h1>
<ul class="entry-meta">
<li class="entry-meta-li"><time pubdate><?php the_date() ?></time></li>
<li class="entry-meta-li"><a rel="author" href="<?php echo get_page_link(5); ?>"><?php the_author(); ?></a> <a rel="author" title="⇒Google+プロフィールへ" href="https://plus.google.com/u/0/105642680110503345013/posts" target="_blank"><img src="http://www.google.com/images/icons/ui/gprofile_button-16.png" width="16" height="16" alt="Google+プロフィールへ"></a></li>
</ul>
</header>

<div class="entry">
<?php the_content(); ?>
</div>

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

<aside>
<div style="text-align:center;">
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- mae's blog（Page用） -->
<ins class="adsbygoogle"
     style="display:inline-block;width:468px;height:60px"
     data-ad-client="ca-pub-6331923403728737"
     data-ad-slot="8443865971"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
</aside>

</div><!-- #entry_sub -->
</div><!-- #entry -->
<!-- ▲#entry▲ -->

<?php get_sidebar(); ?>
</div><!-- .content -->
</div><!-- .content_border -->
<!-- ▲#content▲ -->

<?php get_footer(); ?>