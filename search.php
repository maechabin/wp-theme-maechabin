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
          <span class="search__display">
            <strong class="search__display_big"><?php echo $key ?></strong> の
          </span>
          検索結果: 
          <strong class="search__display_big"><?php echo $count ?></strong> 件
        </p>

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
                <li class="search__box_category-list"><i class="fa fa-archive"></i> <?php the_category(', '); ?></li>
                <?php if(has_tag()): ?>
                  <li class="search__box_category-list"><i class="fa fa-tag"></i> <?php the_tags(''); ?></li>
                <?php endif ?>
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
