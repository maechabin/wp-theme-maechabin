<!doctype html>

<html lang="ja">
  <?php get_header(); ?>

  <body id="TOP">
    <?php include('include/content_header.php'); ?>
    <div class="content">
      <main class="main">
        <?php
          $allsearch = new WP_Query("s=$s&posts_per_page=-1");
          $key = wp_specialchars($s, 1);
          $count = $allsearch->post_count;
        ?>
        <p class="search__result">
          <span class="search__display"><strong><?php echo $key ?></strong> の</span>
          検索結果: <strong><?php echo $count ?></strong> 件
        </p>

        <aside class="ad-index1">
          <div class="ad-index1__banner">
            <p class="ad-index1__title">スポンサードリンク</p>
            <!-- mae's blog（記事上モバイルバナー） -->
            <ins class="adsbygoogle"
                style="display:inline-block;width:320px;height:100px"
                data-ad-client="ca-pub-6331923403728737"
                data-ad-slot="7675360770"></ins>
          </div>
        </aside>

        <?php if(have_posts()): ?>
          <?php while(have_posts()):the_post(); ?>
            <!-- ▼section▼ -->
            <section class="search__box">
              <h1  class="search__box_title">
                <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
                <small><?php edit_post_link('編集'); ?></small>
              </h1>
              <p class="search__box_date"><time pubdate><?php the_date('Y年m月d日'); ?></time></p>
              <?php the_excerpt(); ?>
              <ul class="search__box_category">
                <li><i class="fa fa-archive"></i> <?php the_category(', '); ?></li>
                <?php if(has_tag()): ?>
                <li><i class="fa fa-tag"></i> <?php the_tags(''); ?></li>
                <?php endif ?>
              </ul>
              <ul class="search__box_share" title="<?php the_permalink(); ?>">
                <li class="cb-hb">
                  <a
                    href="//b.hatena.ne.jp/entry/mae.chab.in/archives/<?php the_ID(); ?>"
                    target="_blank"
                    rel="noopener"
                  >
                    <b>B!</b> <span></span>
                  </a>
                </li>
                <li class="cb-tw">
                  <a
                    href="//twitter.com/intent/tweet?text=<?php the_title(); ?> <?php the_permalink(); ?> @maechabinさんから"
                    target="_blank"
                    rel="noopener"
                  >
                    <i class="fa fa-twitter"></i><span></span>
                  </a>
                </li>
                <li class="cb-fb">
                  <a
                    href="//www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"
                    target="_blank"
                    rel="noopener"
                    onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>', 'new', 'width=500,height=300');return false;"
                  >
                    <i class="fa fa-facebook"></i><span></span>
                  </a>
                </li>
              </ul>
            </section>
            <!-- ▲section▲ -->
          <?php endwhile; ?>

          <?php wp_pagenavi(); ?>
        <?php else: ?>
          <?php include('include/notfound.php'); ?>
        <?php endif; ?>
      </main>

      <?php get_sidebar(); ?>
    </div>

    <?php include('include/content_footer.php'); ?>
    <?php get_footer(); ?>
  </body>
</html>
