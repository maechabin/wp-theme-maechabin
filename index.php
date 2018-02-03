<!doctype html>

<html lang="ja">
  <?php get_header(); ?>

  <body id="TOP">
    <?php include('include/content_header.php'); ?>
    <div class="content">
      <main class="main">
        <div class="ad-index1">
          <div class="ad-index1__banner">
            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- maesblog（記事上モバイルバナー） -->
            <ins class="adsbygoogle"
                style="display:inline-block;width:320px;height:100px"
                data-ad-client="ca-pub-6331923403728737"
                data-ad-slot="7675360770"></ins>
            <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        </div>

        <?php if(have_posts()): ?>
          <?php
            while(have_posts()):the_post();
              $cat = get_the_category();
              $catname = $cat[0]->cat_name; //カテゴリー名
              $catslug = $cat[0]->slug; //スラッグ名
          ?>
            <!-- ▼section▼ -->
            <section class="post post-box">
              <h1 id="post-<?php the_ID(); ?>" class="post__title">
                <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
              </h1>
              <ul class="postmetadata-ul postmetadata post__metadata">
                <li class="postmetadata-li post__category_<?php echo $catslug; ?>">
                  <i class="fa fa-archive"></i> <?php the_category(', '); ?>
                </li>
                <li class="postmetadata-li">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  <time pubdate class="post__date">
                    <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_date('Y年m月d日'); ?></a>
                  </time>
                </li>
                <?php /*<li class="postmetadata-li post__tags"><?php the_tags('#', ', #'); ?></li>*/ ?>
                <li class="postmetadata-li">
                  <?php edit_post_link('編集'); ?>
                </li>
              </ul>
              <ul class="cb-share post__sharebutton" title="<?php the_permalink(); ?>">
                <?php /*<li><i class="fa fa-comments-o"></i> <?php comments_popup_link('0','1','%'); ?></li>*/ ?>
                <li class="cb-tw">
                  <a href="//twitter.com/intent/tweet?text=<?php the_title(); ?> <?php the_permalink(); ?> @maechabinさんから" target="_blank">
                    <i class="fa fa-twitter"></i> <span></span>
                  </a>
                </li>
                <li class="cb-fb">
                  <a href="//www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>', 'new', 'width=500,height=300');return false;">
                    <i class="fa fa-facebook"></i><span></span>
                  </a>
                </li>
                <li class="cb-hb">
                  <a href="//b.hatena.ne.jp/entry/mae.chab.in/archives/<?php the_ID(); ?>" target="_blank">
                    <b>B!</b> <span></span>
                  </a>
                </li>
                <li class="cb-pk">
                  <a href="//getpocket.com/edit?url=<?php the_permalink(); ?>" target="_blank">
                    <i class="fa fa-get-pocket"></i> <span></span>
                  </a>
                </li>
              </ul>
            </section>
            <!-- ▲section▲ -->
          <?php endwhile; ?>
          <?php wp_pagenavi(); ?>
        <?php else : ?>
          <?php include('include/notfound.php'); ?>
        <?php endif; ?>
      </main>
      <?php get_sidebar(); ?>
    </div>

    <?php include('include/content_footer.php'); ?>
    <?php get_footer(); ?>
  </body>
</html>
