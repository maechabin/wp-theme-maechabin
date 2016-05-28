import jQuery from 'jquery';
require('cbslideheader');
require('cbsharecount');

const maechabin = maechabin || {};

maechabin.ui = (($, window, document) => {
  const w = $(window);
  const header = $('.header');
  const headerBar = $('#header_bar');
  const contentWidthSize = 1092;
  let timer = null;

  // Smooth Scroll
  function smoothScroll(position, speed) {
    $('html, body').animate({ scrollTop: position }, speed, 'swing');
  }

  // ページ上部に戻る押したとき
  function goTop() {
    $('a[href^="#"]').on('click', function (e) {
      const speed = 400;
      const href = $(this).attr('href');
      const target = $(href === '#' || href === '' ? 'html' : href);
      const position = target.offset().top - headerBar.height();

      e.preventDefault();
      smoothScroll(position, speed);
      return false;
    });
  }

  function currentCategory() {
    const path = location.pathname;
    const currentClassName = 'category__list_current';
    const categoryList = $('.category__list').find('li') || '';
    const addCurrentClass = (n) => {
      if (categoryList) {
        categoryList.eq(n).addClass(currentClassName);
      }
    };
    let categoryName;

    categoryList.removeClass(currentClassName);
    if (path) {
      categoryName = path.split('/');
      switch (categoryName[3]) {
        case 'tech':
          addCurrentClass(1);
          break;
        case 'event':
          addCurrentClass(2);
          break;
        case 'impression':
          addCurrentClass(3);
          break;
        default:
          addCurrentClass(0);
          break;
      }
    }
  }

  // ヘッダーバーをクリックした時
  function clickHeaderBar() {
    headerBar.on('click', (e) => {
      const element = $(e.target).attr('id');
      let speed;
      let position;

      if (element === 'header_bar' || element === 'header_bar_inner') {
        speed = 600;
        position = $(document.body).offset().top;
        smoothScroll(position, speed);
        return false;
      }
      return true;
    });
  }

  function backlink() {
    const url = location.href;
    const domain = location.host;
    const search = location.search || '';
    // const port = location.port ? ":" + location.port : "";
    const regexp1 = new RegExp(`^https?://${domain}/archives/[0-9]+$`, 'ig');
    const regexp2 = new RegExp(`^https?://${domain}`, 'ig');
    const regexp3 = new RegExp('/?s=.+?', 'ig');
    const blogTitle = $('.header__title').eq(0);
    const blogTitleLink = blogTitle.find('a').eq(0);
    const blogTitleIcon = blogTitle.find('i').eq(0);
    const referrer = document.referrer || '';

    if (url.match(regexp1) && referrer.match(regexp2) && !referrer.match(regexp1)) {
      blogTitleIcon.attr('class', 'fa fa-chevron-left');
      blogTitleLink.attr('href', referrer);
    } else if (search !== '' && search.match(regexp3)) {
      blogTitleIcon.attr('class', 'fa fa-chevron-left');
      blogTitleLink.attr('href', referrer);
    } else {
      // blogTitleIcon.attr("class", "fa fa-medium");
      blogTitleLink.attr('href', '/');
    }
  }

  // トップページのポストをクリックした時
  function clickTopPost() {
    const index = $('.post-box');
    index.each(function () {
      const $this = $(this);
      $this.on('click', (e) => {
        const element = e.target.nodeName;
        if (element === 'SECTION' || element === 'H1' || element === 'UL') {
          const link = this.getElementsByTagName('a')[0];
          const href = link.getAttribute('href');
          window.location.assign(href);
        }
      });
    });
  }

  function displayMobileSearch() {
    const searchMobile = $('.header__search_mobile');
    const buttonSearch = $('.header__button_search');
    const buttonBack = $('.header__button_back');

    buttonSearch.on('click', () => {
      searchMobile.stop().animate({
        left: 0,
      }, 500, 'swing');
    });
    buttonBack.on('click', () => {
      searchMobile.stop().animate({
        left: '100vw',
      }, 300, 'linear');
    });
  }

  // サイドバー固定
  function fixSidebar() {
    const headerbarHeight = headerBar.height();
    const contentHeight = $('#content_border').height();
    const sidebarHeight = $('#sidebar').height();

    if (sidebarHeight < contentHeight) {
      const sidebar = $('#sidebar');
      const sidebarSub = $('#sidebar_sub');
      const sidebarScrollStop = headerbarHeight + sidebarSub.height() + 24 - w.height();
      const sidebarScrollStart = headerbarHeight + contentHeight + 24 - w.height();

      sidebar.css('height', `${contentHeight}px`);
      w.on('scroll', function () {
        if (window.matchMedia('(min-width: 1124px)').matches) {
          if (sidebarScrollStop < $(this).scrollTop() && $(this).scrollTop() < sidebarScrollStart) {
            sidebarSub.css({ position: 'fixed', bottom: '24px' });
          } else if (w.scrollTop() >= sidebarScrollStart) {
            sidebarSub.css({ position: 'absolute', bottom: 0 });
          } else {
            sidebarSub.css('position', 'static');
          }
        }
      });
    }
  }

  function showAgendaLink() {
    const agenda = $('#agenda');
    const agendaLink = $('#footer__bar__agenda-link');

    if (agenda[0]) {
      agendaLink.addClass('footer__style--show');
      agendaLink.removeClass('footer__style--hidden');
    }
  }

  function resizeWidth() {
    const content = $('#content');
    const contentBorderWidth = $('#content_border').width();
    const entry = $('#entry');
    const sidebar = $('#sidebar');
    let marginWidth = 0;
    if (contentBorderWidth > 1124) {
      marginWidth = (contentBorderWidth - contentWidthSize) / 2;
      content.css('width', `${contentBorderWidth}px`);
    }
    sidebar.css('padding-right', `${marginWidth}px`);
    entry.css('margin-left', `${marginWidth}px`);
  }

  function resizeSidebarHeight() {
    const sidebar = $('#sidebar');
    const sidebarHeight = sidebar.height();
    const sidebarSub = $('#sidebar_sub');
    const sidebarSubHeight = sidebarSub.height();
    const contentHeight = $('#content_border').height();

    if (sidebarHeight < contentHeight) {
      if (window.matchMedia('(max-width: 1124px)').matches) {
        sidebar.css('height', `${sidebarSubHeight}px`);
        sidebarSub.css('position', 'static');
      } else {
        sidebar.css('height', `${contentHeight}px`);
      }
    }
  }

  function startFunc() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      resizeWidth();
      resizeSidebarHeight();
    }, 400);
  }

  function checkBrowserSize() {
    w.on('resize', () => {
      startFunc();
    });
  }

  return {
    init() {
      currentCategory();
      showAgendaLink();
      goTop();
      clickHeaderBar();
      backlink();
      clickTopPost();
      fixSidebar();
      resizeSidebarHeight();
      resizeWidth();
      checkBrowserSize();
      header.cbSlideUpHeader({
        headroom: true,
      });
      displayMobileSearch();
    },
  };
})(jQuery, window, document);

window.onload = maechabin.ui.init;
