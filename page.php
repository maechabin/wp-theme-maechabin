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
          ?>
            <!-- ▼article▼ -->
            <article class="article">
              <header>
                <h1 id="post-<?php the_ID(); ?>" class="entry-title"><?php the_title(); ?></h1>
                <ul class="entry-meta">
                  <li class="entry-meta-li"><time pubdate><?php the_date() ?></time></li>
                  <li class="entry-meta-li"><a rel="author" href="<?php echo get_page_link(5); ?>"><?php the_author(); ?></a> <a rel="author" title="⇒Google+プロフィールへ" href="https://plus.google.com/u/0/105642680110503345013/posts" target="_blank"><img src="http://www.google.com/images/icons/ui/gprofile_button-16.png" width="16" height="16" alt="Google+プロフィールへ"></a></li>
                </ul>
              </header>

              <div class="entry">
                <?php the_content(); ?>
                <div style="text-align:center;">
                  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                  <!-- maesblog（Page用） -->
                  <ins class="adsbygoogle"
                      style="display:inline-block;width:468px;height:60px"
                      data-ad-client="ca-pub-6331923403728737"
                      data-ad-slot="8443865971"></ins>
                  <script>
                  (adsbygoogle = window.adsbygoogle || []).push({});
                  </script>
                </div>
              </div>
            </article>
            <!-- ▲article▲ -->
          <?php endwhile; ?>
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
