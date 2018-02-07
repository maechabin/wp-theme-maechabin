<!-- ▼#comments▼ -->
<section class="comments">
  <?php if(post_password_required()): ?>
    <?php /* ▼パスワード制限がある場合▼ */ ?>
    <p class="nopassword"><?php _e( 'コメントを閲覧するには、パスワードの入力が必要です。', 'maechabin'); ?></p>
    <?php return; ?>
  <?php endif; ?>

  <h1 class="comments__title">
    <i class="fa fa-comments"></i> コメント <?php /** comments_number('0','1','%'); */ ?>
  </h1>
  <?php if(have_comments()): ?>
    <?php if(get_comment_pages_count() > 1 && get_option('page_comments')): // Are there comments to navigate through? ?>
      <div class="navigation">
        <div class="nav-previous">
          <?php previous_comments_link( __( '<span class="meta-nav">&larr;</span> Older Comments', 'maechabin' ) ); ?>
        </div>
        <div class="nav-next">
          <?php next_comments_link( __( 'Newer Comments <span class="meta-nav">&rarr;</span>', 'maechabin' ) ); ?>
        </div>
      </div>
    <?php endif; // check for comment navigation ?>

    <ol class="comments__list">
      <?php wp_list_comments(array('callback' => 'chabin_comment')); ?>
    </ol><!-- .commentlist -->

    <?php if(get_comment_pages_count() > 1 && get_option('page_comments')): // Are there comments to navigate through? ?>
      <div class="navigation">
        <div class="nav-previous">
          <?php previous_comments_link( __( '<span class="meta-nav">&larr;</span> Older Comments', 'maechabin' ) ); ?>
        </div>
        <div class="nav-next">
          <?php next_comments_link( __( 'Newer Comments <span class="meta-nav">&rarr;</span>', 'maechabin' ) ); ?>
        </div>
      </div><!-- .navigation -->
    <?php endif; // check for comment navigation ?>
  <?php else : // or, if we don't have comments: ?>
    <?php    
    /* If there are no comments and comments are closed,
    * let's leave a little note, shall we?
    */
    if(!comments_open()):
    ?>
      <p class="nocomments">Comments are closed.</p>
    <?php endif; // end ! comments_open() ?>
  <?php endif; // end have_comments() ?>

  <?php
  $args = array();
  $post_id = null;
  global $user_identity, $id;

  if ( null === $post_id )
    $post_id = $id;
  else
    $id = $post_id;
    $commenter = wp_get_current_commenter();
    $req = get_option( 'require_name_email' );
    $aria_req = ( $req ? " aria-required='true'" : '' );

    $fields =  array(
      'author' => '<li class="respond__form-author">' . '<label for="author" class="respond__form-label">' . __( 'Name' ) . '</label> ' . ( $req ? '<span class="respond__form-required">必須</span>' : '' ) .
      '<input class="respond__form-input" id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></li>',
      'email'  => '<li class="respond__form-email"><label for="email" class="respond__form-label">' . __( 'Email' ) . '</label> ' . ( $req ? '<span class="respond__form-required">必須</span>　※公開されません' : '' ) .
      '<input class="respond__form-input" id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' /></li>',
      'url'    => '<li class="respond__form-url"><label for="url" class="respond__form-label">' . __( 'Website' ) . '</label>' .
      '<input class="respond__form-input" id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" /></li>',
    );

    $required_text = sprintf( ' ' . __('Required fields are marked %s'), '<span class="required">*</span>' );
    $defaults = array(
      'fields'               => apply_filters( 'comment_form_default_fields', $fields ),
      'comment_field'        => '<div class="respond__form-comment"><p class="respond__form-label">コメント</p><textarea class="respond__comment" id="comment" name="comment" cols="45" rows="6" aria-required="true"></textarea></div>',
      'must_log_in'          => '<p class="must-log-in">' .  sprintf( __( 'You must be <a href="%s">logged in</a> to post a comment.' ), wp_login_url( apply_filters( 'the_permalink', get_permalink( $post_id ) ) ) ) . '</p>',
      'logged_in_as'         => '<p class="logged-in-as">' . sprintf( __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ), admin_url( 'profile.php' ), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink( $post_id ) ) ) ) . '</p>',
      'id_form'              => 'commentform',
      'id_submit'            => 'submit',
      'title_reply'          => __( 'Leave a Reply' ),
      'title_reply_to'       => __( 'Leave a Reply to %s' ),
      'cancel_reply_link'    => __( 'Cancel reply' ),
    );

    $args = wp_parse_args( $args, apply_filters( 'comment_form_defaults', $defaults ) );
  ?>

  <?php if ( comments_open() ) : ?>
    <?php do_action( 'comment_form_before' ); ?>
    <div class="respond">
      <!--<h4 id="reply-title">
      <?php comment_form_title( $args['title_reply'], $args['title_reply_to'] ); ?>
      </h4>-->
      <?php if ( get_option( 'comment_registration' ) && !is_user_logged_in() ) : ?>
        <?php echo $args['must_log_in']; ?>
        <?php do_action( 'comment_form_must_log_in_after' ); ?>
      <?php else : ?>
        <form action="<?php echo site_url( '/wp-comments-post.php' ); ?>" method="post" id="<?php echo esc_attr( $args['id_form'] ); ?>">
          <?php do_action( 'comment_form_top' ); ?>
          <?php if ( is_user_logged_in() ) : ?>
            <?php echo apply_filters( 'comment_form_logged_in', $args['logged_in_as'], $commenter, $user_identity ); ?>
            <?php do_action( 'comment_form_logged_in_after', $commenter, $user_identity ); ?>
          <?php else : ?>
            <?php
              do_action( 'comment_form_before_fields' );
              echo('<ul class="respond__list">');
              foreach ( (array) $args['fields'] as $name => $field ) {
                echo apply_filters('comment_form_field_{$name}', $field);
              }
              echo("</ul>");
              do_action( 'comment_form_after_fields' );
            ?>
          <?php endif; ?>
          
          <?php echo apply_filters( 'comment_form_field_comment', $args['comment_field'] ); ?>
          <p class="form-submit">
            <input class="respond__form-submit" name="submit" type="submit" id="<?php echo esc_attr( $args['id_submit'] ); ?>" value="コメントする" /><?php comment_id_fields(); ?>
          </p>
          <p class="cancel-comment-reply-link">
            <?php cancel_comment_reply_link( $args['cancel_reply_link'] ); ?>
          </p>
          <?php do_action( 'comment_form', $post_id); ?>
        </form>
      <?php endif; ?>
    </div><!-- #respond -->

    <?php do_action( 'comment_form_after' ); ?>
  <?php else : ?>
    <?php do_action( 'comment_form_comments_closed' ); ?>
  <?php endif; ?>
</section>
