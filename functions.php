<?php
remove_action('wp_head','wp_generator');
remove_action('wp_head','index_rel_link');

#動的サイドバーを必要としていることをプラグインに伝える
if (function_exists('register_sidebar')) {

  register_sidebar(

    array(
      'before_widget' => '',
      'after_widget' => '',
      'before_title' => '<div class="title">',
      'after_title' => '</div>',
    )

  );

}

#タイトル
function site_title() {

  //Print the <title> tag based on what is being viewed.
  global $page,$paged;
  wp_title('|', true, 'right');

  // Add the blog name.
  bloginfo('name');

  // Add the blog description for the home/front page.
  $site_description = get_bloginfo('description', 'display');

  if ($site_description && (is_home() || is_front_page())) {
    echo(" | $site_description");
  }

  // Add a page number if necessary:
  if ($paged >= 2 || $page >= 2) {
    echo(' | ' . sprintf(__('Page %s', 'twentyten'), max($paged,$page)));
  }

}

#パンくずリスト
function breadcrumb() {
  //パンくずリストの内容を格納する変数
  $parents = array();

  //現在表示しているページのカテゴリー情報を$tmpに格納
  if (is_category()) {
    $cate = get_queried_object();
    $tmp = $cate;
  } else if (is_single()) {
    $cate = get_the_category();
    $tmp = $cate[0];
  }

  //トップページへのリンクを表示
  echo '<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="' . home_url() . '/" itemprop="url"><span itemprop="title"><i class="fa fa-home" title="mae.chab.in"></i></span></a>　<i class="fa fa-angle-right"></i></span>　';

  //現在のページの親が無くなるまで処理を繰り返す
  while ($tmp->parent) {

    //現在のページの親カテゴリーの情報を取得して$parentsの先頭に追加
    $tmp = get_category($tmp->parent);
    array_unshift($parents , $tmp);
  }

  //パンくずの変数に格納されている情報の数だけ繰り返し
  foreach ($parents as $parent) {

    //カテゴリーページへのリンクとカテゴリー名を表示
    echo '<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="'. get_category_link( $parent->term_id ) .'" itemprop="url"><span itemprop="title">' . $parent->name . '</span></a></span> > ';

  }

  //現在のページの属しているカテゴリーを表示
  if (is_category()) {
    echo $cate->name;
  } else if (is_single()) {
    echo '<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="'. get_category_link( $cate[0]->term_id ) .'" itemprop="url"><span itemprop="title">'. $cate[0]->name .'</span></a></span>';
  }

}


#ソーシャルボタン
function mc_social_button() {
?>
<ul class="social-button">

<li>
<!-- Hatena Button -->
<a href="http://b.hatena.ne.jp/entry/" class="hatena-bookmark-button" data-hatena-bookmark-layout="vertical-balloon" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
</li>

<li>
<!-- Twitter Button -->
<a href="https://twitter.com/share" class="twitter-share-button" data-via="maechabin" data-lang="ja" data-count="vertical">ツイート</a>
<script async>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
</li>

<li>
<!-- Facebook Button -->
<span class="fb-like" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></span>
<span id="fb-root"></span>
<script async>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId=305618339584509";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
</li>

<li>
<!-- G+ Button -->
<!-- +1 ボタン を表示したい位置に次のタグを貼り付けてください。 -->
<span class="g-plusone" data-size="tall"></span>

<!-- 最後の +1 ボタン タグの後に次のタグを貼り付けてください。 -->
<script async>
  window.___gcfg = {lang: 'ja'};

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
</li>

<li>
<!-- Pocket Button -->
<a data-pocket-label="pocket" data-pocket-count="vertical" class="pocket-btn" data-lang="en"></a>
<script async>!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");</script>
</li>

</ul>
<?php
}



if( function_exists('register_sidebar_widget'))
register_sidebar_widget(__('Search'), 'widget_mytheme_search');




if(!function_exists('chabin_comment')) :
/**
 * Template for comments and pingbacks.
 *
 * To override this walker in a child theme without modifying the comments template
 * simply create your own chabin_comment(), and that function will be used instead.
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 */
function chabin_comment($comment,$args,$depth) {

  $GLOBALS['comment']=$comment;
  switch($comment->comment_type):
  case '':
?>

<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">

<article id="comment-<?php comment_ID(); ?>">
<div class="comment_author_img">
<?php echo get_avatar($comment,40); ?>
</div><!-- .comment_author_img -->
<div class="comment_article">
<?php if($comment->comment_approved=='0'): ?>
<p><em>承認待ち</em></p>
<?php endif; ?>

<div class="comment_text"><?php comment_text(); ?></div>
<p class="comment_meta">
<?php printf( __('%s'),sprintf('<span class="comment_author_name">%s</span>',get_comment_author_link())); ?>　
<?php
/* translators: 1: date, 2: time */
printf( __('<time>%1$s %2$s</time>'),get_comment_date(),get_comment_time());
?>

<?php comment_reply_link(array_merge($args, array('depth'=>$depth,'max_depth'=>$args['max_depth']))); ?>
<?php edit_comment_link(__('(編集)'),' '); ?>

</p>
</div><!-- .comment_article -->
</article><!-- #comment-## -->

<?php
  break;

  case 'pingback':
  case 'trackback':
?>

<li class="pingback">
<p>ピンバック: <?php comment_author_link(); ?></p>
<p class="comment_meta">
<?php printf( __('<time>%1$s %2$s</time>'),get_comment_date(),get_comment_time()); ?>　<?php edit_comment_link(__('(編集)'),' '); ?>
</p>

<?php
  break;
  endswitch;

}
endif;



function comment_form_mae( $args = array(), $post_id = null ) {
  global $user_identity, $id;

  if ( null === $post_id )
    $post_id = $id;
  else
    $id = $post_id;

  $commenter = wp_get_current_commenter();

  $req = get_option( 'require_name_email' );
  $aria_req = ( $req ? " aria-required='true'" : '' );

  $fields =  array(
    'author' => '<li class="comment-form-author">' . '<label for="author">' . __( 'Name' ) . '</label> ' . ( $req ? '（ <span class="required">必須</span> ）' : '' ) .
    '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></li>',
    'email'  => '<li class="comment-form-email"><label for="email">' . __( 'Email' ) . '</label> ' . ( $req ? '（ <span class="required">必須</span> ）　※公開されません' : '' ) .
    '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' /></li>',
    'url'    => '<li class="comment-form-url"><label for="url">' . __( 'Website' ) . '</label>' .
    '<input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" /></li>',
  );

  $required_text = sprintf( ' ' . __('Required fields are marked %s'), '<span class="required">*</span>' );
  $defaults = array(
    'fields'               => apply_filters( 'comment_form_default_fields', $fields ),
    'comment_field'        => '<div class="comment-form-comment"><p class="comment-label">コメント</p><textarea id="comment" name="comment" cols="45" rows="6" aria-required="true"></textarea></div>',
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
<div id="respond">
<!--<h4 id="reply-title"><?php comment_form_title( $args['title_reply'], $args['title_reply_to'] ); ?></h4>-->
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
echo('<ul class="comment_form_list">');
foreach ( (array) $args['fields'] as $name => $field ) {
echo apply_filters("comment_form_field_{$name}",$field);
}
echo("</ul>");
do_action( 'comment_form_after_fields' );
?>
<?php endif; ?>

<?php echo apply_filters( 'comment_form_field_comment', $args['comment_field'] ); ?>

<p class="form-submit"><input name="submit" type="submit" id="<?php echo esc_attr( $args['id_submit'] ); ?>" value="コメントする" /><?php comment_id_fields(); ?></p>
<p class="cancel-comment-reply-link"><?php cancel_comment_reply_link( $args['cancel_reply_link'] ); ?></p>
<?php do_action( 'comment_form',$post_id); ?>
</form>
<?php endif; ?>
</div><!-- #respond -->
<?php do_action( 'comment_form_after' ); ?>

<?php else : ?>
<?php do_action( 'comment_form_comments_closed' ); ?>
<?php endif; ?>
<?php
}

remove_filter('the_content', 'wpautop');

//category-templete.php→163行　$rel=""

// &の自動変換停止
function my_replace_amp($content) {
    return str_replace('&#038;', '&', $content);
}
add_filter( 'the_content', 'my_replace_amp' );


function replace_header() {
  /*
  ob_start();
  include 'header.php'; // PATH
  $data = ob_get_clean();
  $data = str_replace(array('http:\/\/', 'http://'), '//', $data); // REGEX
  echo $data;

  $fp = fopen('/wp-content/themes/chabin/header.php', 'w');
  echo $fp;
  fwrite($fp, $data);
  fclose($fp);
  */


}
replace_header();
