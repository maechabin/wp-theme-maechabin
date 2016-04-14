<div id="sidebar" class="sidebar">
  <div id="sidebar_sub" class="sidebar__sub">

    <aside>
      <div class="sidebar__widget_ad sidebar__ad1">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- mae's blog（サイドバー上） -->
        <ins class="adsbygoogle"
          style="display:inline-block;width:300px;height:250px"
          data-ad-client="ca-pub-6331923403728737"
          data-ad-slot="3530398982"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </aside>

    <div class="sidebar__title">About Me</div>
    <figure class="sidebar__author-photo">
      <img src="/wp-content/uploads/2015/11/maechabin_400.png" width="128" height="128" alt="maechabin / Takanori Maeda">
    </figure>
    <p class="sidebar__author-name">Takanori Maeda</p>

    <p class="sidebar__author-social">
      <a href="//github.com/maechabin" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-github');"><i class="fa fa-github-alt"></i></a>
      <a href="//twitter.com/maechabin" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-twitter');"><i class="fa fa-twitter"></i></a>
      <a href="//www.facebook.com/maechabin" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-facebook');"><i class="fa fa-facebook"></i></a>
      <a href="//plus.google.com/+TakanoriMaeda0_0/" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-google+');"><i class="fa fa-google-plus"></i></a>
      <a href="//maechabin.tumblr.com/" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-tumblr');"><i class="fa fa-tumblr"></i></a>
      <a href="//www.muzie.ne.jp/artist/a024945/" target="_blank" onclick="ga('send', 'event', 'sidebar', 'click', 'about-muzie');"><i class="fa fa-music"></i></a>
    </p>

    <p class="sidebar__author-description">フロントエンドエンジニア & デザイナー。JavaScript、HTML5/CSS3、UI/UXデザインなどが専門分野。フレームワークはReact派。現在はネット広告会社でマーケティング担当。趣味はカメラ、ピアノ、作曲。</p>
<!--
    <figure class="sidebar__author-description">
      <a href="//maechabin.tumblr.com" target="_blank">
        <img src="/wp-content/uploads/2013/11/maes-works.png" width="298" height="49" alt="写真ブログ Nikon[D5300/ニコワン]ユーザー mae's works">
      </a>
      <figcaption>私の写真ブログです。写真が趣味で日々撮った写真をアップしています。使用しているTumblrも全力でカスタマイズ中！</figcaption>
    </figure>
-->
    <?php if(!is_home()): ?>
      <div class="sidebar__widget_twitter">
        <a class="twitter-timeline" href="//twitter.com/maechabin" data-widget-id="510042758585651200">
          @maechabin からのツイート
        </a>
        <script>
          !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        </script>
      </div>
    <?php endif; ?>

    <nav>
    <?php if(!function_exists('dynamic_sidebar') || !dynamic_sidebar() ): ?>
    <?php endif; ?>
    </nav>

    <aside>
      <div class="sidebar__widget_ad sidebar__ad2">
        <div>スポンサードリンク</div>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- mae's blog（サイドバー下） -->
        <ins class="adsbygoogle"
          style="display:inline-block;width:300px;height:250px"
          data-ad-client="ca-pub-6331923403728737"
          data-ad-slot="2944739979"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </aside>

  </div><!-- #sidebar_sub -->
</div><!-- #sidebar -->
