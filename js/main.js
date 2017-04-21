import jQuery from 'jquery';
require('cbslideheader');
require('cbsharecount');
require('slideshowad');
require('smoothscroll-polyfill').polyfill();

const maechabin = maechabin || {};

maechabin.ui = (($, window, document) => {
  const w = $(window);
  const header = $('.header');
  const headerBar = $('#header_bar');
  const contentWidthSize = 1100 + 80;
  const style = document.createElement('div').style;
  let timer = null;

  // Smooth Scroll
  function callSmoothScroll(target = '#TOP') {
    const elem = document.querySelector(target);
    const rect = elem.getBoundingClientRect().top + window.pageYOffset - 56;
    return window.scrollTo({ top: rect, left: 0, behavior: 'smooth' });
  }

  // ページ上部に戻る押したとき
  function goTop() {
    const elem = document.querySelectorAll('a[href^="#"]');
    return Array.prototype.forEach.call(elem, x => {
      x.addEventListener('click', (e) => {
        e.preventDefault();
        const regexp = new RegExp(/#.*$/, 'ig');
        const href = x.getAttribute('href');
        const target = href.match(regexp);
        return callSmoothScroll(target);
      }, false);
    });
  }

  // ヘッダーバーをクリックした時
  function clickHeaderBar() {
    headerBar.on('click', (e) => {
      const element = $(e.target).attr('id');

      if (element === 'header_bar' || element === 'header_bar_inner') {
        return callSmoothScroll('#TOP');
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
    const contentHeight = $('#content_border').height();
    const sidebarHeight = $('#sidebar').height();

    if (sidebarHeight < contentHeight) {
      const headerbarHeight = headerBar.height();
      const sidebar = $('#sidebar');
      const sidebarSub = $('#sidebar_sub');
      const footerBarHight = 40;
      const sidebarScrollStart = headerbarHeight + contentHeight + 80 - w.height();

      sidebar.css('height', `${contentHeight}px`);
      window.addEventListener('scroll', () => {
        if (window.matchMedia(`(min-width: ${contentWidthSize}px)`).matches) {
          if (w.scrollTop() > 107 && w.scrollTop() < sidebarScrollStart) {
            sidebarSub.css({ position: 'fixed', top: 0 });
          } else if (w.scrollTop() > sidebarScrollStart) {
            sidebarSub.css({ position: 'absolute', bottom: 0, top: 'auto' });
          } else {
            sidebarSub.css('position', 'static');
          }
        }
      }, { passive: true });
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

  function resizeSidebarHeight() {
    const sidebar = $('#sidebar');
    const sidebarHeight = sidebar.height();
    const sidebarSub = $('#sidebar_sub');
    const sidebarSubHeight = sidebarSub.height();
    const contentHeight = $('#content_border').height();

    if (sidebarHeight < contentHeight) {
      if (window.matchMedia(`(max-width: ${contentWidthSize}px)`).matches) {
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
      resizeSidebarHeight();
    }, 400);
  }

  function checkBrowserSize() {
    w.on('resize', () => {
      startFunc();
    });
  }

  function contenteditable() {
    const code = $('.prettyprint');
    code.attr({
      contenteditable: true,
      spellcheck: false,
    });
  }

  return {
    init() {
      showAgendaLink();
      if (!('scroll-behavior' in style)) {
        goTop();
      }
      clickHeaderBar();
      backlink();
      clickTopPost();
      fixSidebar();
      resizeSidebarHeight();
      checkBrowserSize();
      contenteditable();
      header.cbSlideUpHeader({
        headroom: true,
        slidePoint: 64,
      });
      displayMobileSearch();
    },
  };
})(jQuery, window, document);

document.addEventListener(
  'DOMContentLoaded',
  () => maechabin.ui.init(),
  false
);
