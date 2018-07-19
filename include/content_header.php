<header id="header_bar" class="header cb-header">
  <div id="header_bar_inner" class="header__inner">

    <h1 class="header__title">
      <a href="/"><i style="color:#fff;"></i></a>
      <a href="/">maesblog</a>
    </h1>

    <div class="header__search">
      <form role="search" method="get" id="header__search-form" action="<?php bloginfo('url') ?>" >
        <input type="text" value="<?php echo get_search_query(); ?>" name="s" placeholder="ブログ記事を検索" class="header__search-text"><button type="submit" class="header__search-button"><i class="fa fa-search"></i></button>
      </form>
    </div>

    <div class="header__button_search">
      <i class="fa fa-search"></i>
    </div>
    <div class="header__share">
      <a href="https://feedly.com/i/subscription/feed/https://mae.chab.in/feed" target="_blank" rel="noopener"><i class="fa fa-rss"></i></a>
    </div>

  </div>
</header>
<!-- ▲header▲ -->

<div class="header__search_mobile <?php if (is_search()) echo 'header__display' ?>">
  <p class="header__button_back"><i class="fa fa-chevron-left"></i></p>
  <form role="search" method="get" class="header__search-form_mobile" action="<?php bloginfo('url') ?>" >
    <input type="text" value="<?php echo get_search_query(); ?>" name="s" placeholder="ブログ記事を検索" class="header__search-text_mobile"><button type="submit" class="header__search-button_mobile"><i class="fa fa-search"></i></button>
  </form>
</div>

<?php
  $all = get_category(31)->category_count + get_category(33)->category_count + get_category(32)->category_count;
?>
<nav class="category">
  <ul class="category__list">
    <li class="<?php echo current_category('all'); ?>"><a href="/">All<span>（<?php echo $all; ?>）</span></a></li>
    <li class="<?php echo current_category('Web技術'); ?>"><a href="/archives/category/tech">Web技術<span>（<?php echo get_category(31)->category_count; ?>）</span></a></li>
    <li class="<?php echo current_category('出来事'); ?>"><a href="/archives/category/event">出来事<span>（<?php echo get_category(33)->category_count; ?>）</span></a></li>
    <li class="<?php echo current_category('所感'); ?>"><a href="/archives/category/impression">所感<span>（<?php echo get_category(32)->category_count; ?>）</span></a></li>
  </ul>
</nav>
