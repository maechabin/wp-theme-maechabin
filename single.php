<!doctype html>

<html lang="ja">
  <?php get_header(); ?>
  <?php include('include/content_header.php'); ?>

  <body id="TOP">
    <div class="content">
      <main class="main">
        <?php if(have_posts()): ?>
          <?php
            while(have_posts()):the_post();
              include('include/article.php');
              comments_template('', true);
            endwhile;
          ?>

          <?php if($wp_query->max_num_pages > 1): ?>
            <nav id="nav_below" class="navigation">
              <p class="nav_previous"><?php next_posts_link('<span class="meta-nav">&larr;</span> 古い投稿へ'); ?></p>
              <p class="nav_next"><?php previous_posts_link('新しい投稿へ <span class="meta-nav">&rarr;</span>'); ?></p>
            </nav>
          <?php endif; ?>

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
