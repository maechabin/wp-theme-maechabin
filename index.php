<!doctype html>

<html lang="ja">
  <?php get_header(); ?>

  <body id="TOP">
    <?php include('include/content_header.php'); ?>
    <div class="content">
      <main class="main">
        <?php if(have_posts()): ?>
          <?php
            while(have_posts()):the_post();
              $cat = get_the_category();
              $catname = $cat[0]->cat_name; //カテゴリー名
              $catslug = $cat[0]->slug; //スラッグ名
          ?>
            <!-- ▼section▼ -->
            <section class="post">
              <h1 id="post-<?php the_ID(); ?>" class="post__title">
                <a
                  class="post__title_link"
                  href="<?php the_permalink(); ?>"
                >
                  <?php the_title(); ?>
                </a>
              </h1>

              <div class="post__meta">
                <ul class="post__meta-ul">
                  <li class="post__meta-li post__category_<?php echo $catslug; ?>">
                    <i class="fa fa-archive"></i> <?php the_category(', '); ?>
                  </li>
                  <li class="post__meta-li">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <time pubdate class="post__date">
                      <a
                        class="post__date_link"
                        href="<?php the_permalink(); ?>"
                      >
                        <?php the_date('Y年m月d日'); ?>
                      </a>
                    </time>
                  </li>
                  <?php /*<li class="postmetadata-li post__tags"><?php the_tags('#', ', #'); ?></li>*/ ?>
                  <li class="post__meta-li">
                    <?php edit_post_link('編集'); ?>
                  </li>
                </ul>
              </div>
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
