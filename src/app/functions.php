<?php
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'index_rel_link');

# アイキャッチ対応
add_theme_support('post-thumbnails');

# WP4.2デフォルト 絵文字機能無効化
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles', 10 );

# 出力される全てのEmbed系のタグを削除
remove_action('wp_head','rest_output_link_wp_head');
remove_action('wp_head','wp_oembed_add_discovery_links');
remove_action('wp_head','wp_oembed_add_host_js');

# HTTPレスポンスから外す
remove_action('template_redirect', 'rest_output_link_header', 11 );

# 動的サイドバーを必要としていることをプラグインに伝える
if (function_exists('register_sidebar')) {
  register_sidebar(
    array(
      'id' => 'sidebar-1',
      'before_widget' => '',
      'after_widget' => '',
      'before_title' => '<div class="title">',
      'after_title' => '</div>',
    )
  );
}

# タイトル
function site_title() {
  //Print the <title> tag based on what is being viewed.
  global $page, $paged;
  wp_title('|', true, 'right');

  // Add the blog name.
  bloginfo('name');

  // Add the blog description for the home/front page.
  $site_description = get_bloginfo('description', 'display');

  if ($site_description && (is_home() || is_front_page())) {
    echo(' | ' . $site_description);
  }

  // Add a page number if necessary:
  if ($paged >= 2 || $page >= 2) {
    echo(' | ' . sprintf(__('Page %s', 'twentyten'), max($paged, $page)));
  }
}

# カテゴリー
function current_category($category) {
  if (is_category()) {
    $cate = get_queried_object();
  } else if (is_single()) {
    $cate = get_the_category()[0];
  }

  if ($category === $cate->name) {
    return 'category__list_current';
  } else if ($category === 'all' && $cate->name === null) {
    return 'category__list_current';
  } else {
    return $cate->name;
  }
}

# パンくずリスト
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
  echo '<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="' . home_url() . '/" itemprop="url"><span itemprop="title"><i class="fa fa-home" title="mae.chab.in"></i> maesblog</span></a>　<i class="fa fa-angle-double-right"></i></span>　';

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

/**
 *  任意のウィジェットを登録するための関数
 */
/*
if ( function_exists('wp_register_sidebar_widget')) {
  wp_register_sidebar_widget(__('Search'), 'widget_mytheme_search');
}
*/

if (!function_exists('chabin_comment')):
  /**
   * Template for comments and pingbacks.
   *
   * To override this walker in a child theme without modifying the comments template
   * simply create your own chabin_comment(), and that function will be used instead.
   *
   * Used as a callback by wp_list_comments() for displaying the comments.
   */
  function chabin_comment($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;
    switch ($comment->comment_type):
      case '':
  ?>
    <li <?php comment_class('comments__list-li'); ?> id="li-comment-<?php comment_ID(); ?>">
      <article id="comment-<?php comment_ID(); ?>">
        <div class="comment__author">
          <?php echo get_avatar($comment,40); ?>
        </div><!-- .comment_author_img -->

        <div class="comment__article">
          <?php if($comment->comment_approved == '0'): ?>
            <p><em>承認待ち</em></p>
          <?php endif; ?>

          <div class="comment__text">
            <?php comment_text(); ?>
          </div>

          <p class="comment__meta">
            <?php
              printf(
                __('%s'),
                sprintf('<span class="comment__author-name">%s</span>', get_comment_author_link())
              );
            ?>　
            <?php /* translators: 1: date, 2: time */
              printf( __('<time>%1$s %2$s</time>'), get_comment_date(), get_comment_time());
            ?>
            <?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))); ?>
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
        <p class="pingback__text">ピンバック: <?php comment_author_link(); ?></p>
        <p class="comment__meta">
          <?php printf( __('<time>%1$s %2$s</time>'), get_comment_date(), get_comment_time()); ?>　<?php edit_comment_link(__('(編集)'),' '); ?>
        </p>
  <?php
      break;
    endswitch;
  }
endif;

remove_filter('the_content', 'wpautop');

//category-templete.php→163行　$rel=""

// &の自動変換停止
function my_replace_amp($content) {
    return str_replace('&#038;', '&', $content);
}
add_filter( 'the_content', 'my_replace_amp' );
