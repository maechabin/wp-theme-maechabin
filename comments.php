<!-- ▼#comments▼ -->
<section id="comments">
<?php if(post_password_required()): ?>
<?php /* ▼パスワード制限がある場合▼ */ ?>
<p class="nopassword"><?php _e( 'コメントを閲覧するには、パスワードの入力が必要です。','maechabin'); ?></p>
</div>
<?php
return;
endif;
?>
<?php /*  ▲パスワード制限がある場合▲ */ ?>
<h1 id="comments-title"><i class="fa fa-comments"></i> コメント一覧 <!--コメント <?php comments_number('0','1','%'); ?>--></h1>
<?php if(have_comments()): ?>
<?php if(get_comment_pages_count()>1 && get_option('page_comments')): // Are there comments to navigate through? ?>
<div class="navigation">
<div class="nav-previous"><?php previous_comments_link( __( '<span class="meta-nav">&larr;</span> Older Comments', 'maechabin' ) ); ?></div>
<div class="nav-next"><?php next_comments_link( __( 'Newer Comments <span class="meta-nav">&rarr;</span>', 'maechabin' ) ); ?></div>
</div><!-- .navigation -->
<?php endif; // check for comment navigation ?>

<ol class="commentlist">
<?php wp_list_comments(array('callback'=>'chabin_comment')); ?>
</ol><!-- .commentlist -->

<?php if(get_comment_pages_count()>1 && get_option('page_comments')): // Are there comments to navigate through? ?>
<div class="navigation">
<div class="nav-previous"><?php previous_comments_link( __( '<span class="meta-nav">&larr;</span> Older Comments', 'maechabin' ) ); ?></div>
<div class="nav-next"><?php next_comments_link( __( 'Newer Comments <span class="meta-nav">&rarr;</span>', 'maechabin' ) ); ?></div>
</div><!-- .navigation -->
<?php endif; // check for comment navigation ?>

<?php else : // or, if we don't have comments:

/* If there are no comments and comments are closed,
 * let's leave a little note, shall we?
 */
if(!comments_open()):
?>
<p class="nocomments">Comments are closed.</p>
<?php endif; // end ! comments_open() ?>

<?php endif; // end have_comments() ?>

<?php comment_form_mae(); ?>

<?php if(pings_open()): ?>
<h2 id="trackback-title">トラックバックURL</h2>
<p><input type="text" value="<?php trackback_url(); ?>" size="50" class="trackback-url"></p>
<?php endif; ?>

</section><!-- #comments -->
<!-- ▲#comments▲ -->
