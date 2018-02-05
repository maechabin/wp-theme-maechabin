import jQuery from 'jquery';
import 'cbslideheader';
// require('cbsharecount');
import 'slideshowad';
require('smoothscroll-polyfill').polyfill();

const StickyState = require('sticky-state');
const maechabin = maechabin || {};

maechabin.ui = (($, window, document) => {
  const header = $('.header');
  const headerBar = $('#header_bar');
  const div = document.createElement('div');

  // Smooth Scroll
  function callSmoothScroll(position = 0) {
    return window.scrollTo({ top: position, left: 0, behavior: 'smooth' });
  }

  // ヘッダーバーをクリックした時
  function clickHeaderBar() {
    headerBar.on('click', (e) => {
      const element = $(e.target).attr('id');

      if (element === 'header_bar' || element === 'header_bar_inner') {
        return callSmoothScroll(0);
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
    const index = $('.post');
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

  function showAgendaLink() {
    const agenda = $('#agenda');
    const agendaLink = $('#footer__bar__agenda-link');

    if (agenda[0]) {
      agendaLink.addClass('footer__style--show');
      agendaLink.removeClass('footer__style--hidden');
    }
  }

  function contenteditable() {
    const code = $('.prettyprint');
    code.attr({
      contenteditable: true,
      spellcheck: false,
    });
  }

  /* === polyfill === */

  // ページ上部に戻る押したとき
  function getTargetPosition(callback) {
    const elem = document.querySelectorAll('a[href^="#"]');
    return Array.prototype.forEach.call(elem, (a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const href = a.getAttribute('href');
        const regexp = new RegExp('#.*$', 'ig');
        const target = href.match(regexp);
        const targetElem = document.querySelector(target[0]);
        const position = targetElem.getBoundingClientRect().top + window.pageYOffset - 56;
        return callback(position);
      }, false);
    });
  }

  function detectSticky() {
    div.style.position = 'sticky';
    return div.style.position.indexOf('sticky') !== -1;
  }

  function callStickyState() {
    const sidebarBox = document.querySelector('.sidebar__box');
    sidebarBox.setAttribute('class', 'sidebar__box sticky');
    return new StickyState(document.querySelectorAll('.sticky'));
  }

  return {
    init() {
      showAgendaLink();
      clickHeaderBar();
      backlink();
      clickTopPost();
      contenteditable();
      header.cbSlideUpHeader({
        headroom: true,
        slidePoint: 64,
      });
      displayMobileSearch();
      if (!('scroll-behavior' in div.style)) {
        getTargetPosition(callSmoothScroll);
      }
      if (!detectSticky()) {
        callStickyState();
      }
    },
  };
})(jQuery, window, document);

document.addEventListener(
  'DOMContentLoaded',
  () => maechabin.ui.init(),
  false
);
