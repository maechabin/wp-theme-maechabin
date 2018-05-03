<div id="sidebar" class="sidebar">
  <div id="sidebar_sub" class="sidebar__sub">
    <div class="sidebar__box">
      <div  id="sidebar-author" class="sidebar__author">
        <figure class="sidebar__author-photo">
          <img src="/wp-content/uploads/2018/03/maechabin.png" width="128" height="128" alt="maechabin / Takanori Maeda">
        </figure>
        <p class="sidebar__author-name">Takanori Maeda</p>
        <p class="sidebar__author-description">フロントエンドエンジニア / JavaScipt / React / Angular。趣味はカメラ、読書、英語、作曲。</p>
        <p class="sidebar__author-social">
          <a href="https://github.com/maechabin" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-github');" rel="noopener"><i class="fa fa-github-alt"></i></a>
          <a href="https://twitter.com/maechabin" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-twitter');" rel="noopener"><i class="fa fa-twitter"></i></a>
          <a href="https://www.facebook.com/maechabin" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-facebook');" rel="noopener"><i class="fa fa-facebook"></i></a>
          <a href="http://maechabin.tumblr.com/" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-tumblr');" rel="noopener"><i class="fa fa-tumblr"></i></a>
          <a href="https://www.instagram.com/maechabin/" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-insta');" rel="noopener"><i class="fa fa-instagram" aria-hidden="true"></i></a>
          <a href="https://big-up.style/artists/9902/singles?q%5Bs%5D=id%20desc" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-muzie');" rel="noopener"><i class="fa fa-music"></i></a>
        </p>
      </div>

      <div class="sidebar__widget_ad">
        <!-- maesblog（サイドバー上） -->
        <ins class="adsbygoogle"
             style="display:block;"
             data-ad-client="ca-pub-6331923403728737"
             data-ad-slot="1831090771"
             data-ad-format="auto"></ins>
      </div>
    </div>
    
    <div class="mobile_only">
      <?php if(!function_exists('dynamic_sidebar') || !dynamic_sidebar() ): ?>
      <?php endif; ?>
    </div>
  </div><!-- #sidebar_sub -->
</div><!-- #sidebar -->
