<div id="sidebar" class="sidebar">
  <div class="sidebar__box">
    <div class="sidebar__author">
      <figure class="sidebar__author_photo">
        <img
          class="sidebar__author_img"
          src="/wp-content/uploads/2018/03/maechabin.png"
          width="128"
          height="128"
          alt="maechabin / Takanori Maeda"
        >
      </figure>
      <p class="sidebar__author_name">Takanori Maeda</p>
      <p class="sidebar__author_description">Frontend Engineer. TypeScript, React, Angular<br>趣味はカメラ、読書、英語、作曲。</p>
      <p class="sidebar__author_social">
        <a
          class="sidebar__author_link"
          href="https://github.com/maechabin"
          target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-github');" rel="noopener"
        ><i class="fa fa-github"></i></a>
        <a
          class="sidebar__author_link"
          href="https://twitter.com/maechabin"
          target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-twitter');" rel="noopener"
        ><i class="fa fa-twitter"></i></a>
        <a
          class="sidebar__author_link"
          href="https://www.facebook.com/maechabin"
          target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-facebook');" rel="noopener"
        ><i class="fa fa-facebook"></i></a>
        <a
          class="sidebar__author_link"
          href="http://maechabin.tumblr.com/"
          target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-tumblr');" rel="noopener"
        ><i class="fa fa-tumblr"></i></a>
        <a
          class="sidebar__author_link"
          href="https://www.instagram.com/maechabin/"
          target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-insta');" rel="noopener"
        ><i class="fa fa-instagram" aria-hidden="true"></i></a>
        <a
          class="sidebar__author_link"
          href="https://big-up.style/artists/9902/singles?q%5Bs%5D=id%20desc"
          target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-muzie');" rel="noopener"
        ><i class="fa fa-music"></i></a>
      </p>
    </div>

    <div class="ad__space ad__space_sidebar">
      <!-- maesblog（サイドバー上） -->
      <ins class="adsbygoogle"
        style="display:inline-block;width:300px;height:250px"
        data-ad-client="ca-pub-6331923403728737"
        data-ad-slot="3530398982"></ins>
    </div>
  </div>
  
  <div class="mobile_only">
    <?php if(!function_exists('dynamic_sidebar') || !dynamic_sidebar() ): ?>
    <?php endif; ?>
  </div>
</div><!-- #sidebar -->
