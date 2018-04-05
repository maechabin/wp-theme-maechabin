import jQuery from 'jquery';
import 'cbslideheader';
// require('cbsharecount');
// import 'slideshowad';
require('smoothscroll-polyfill').polyfill();

const Turbolinks = require('turbolinks');
const StickyState = require('sticky-state');

window.maechabin = window.maechabin || {};

window.maechabin.ui = (($, window, document) => {
  const header = $('.header');
  const headerBar = $('#header_bar');
  const div = document.createElement('div');

  /**
   * スムーズスクロール
   */
  function callSmoothScroll(position = 0) {
    return window.scrollTo({ top: position, left: 0, behavior: 'smooth' });
  }

  /**
   * ヘッダーバーをクリックした時にトップに戻る
   */
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
    const url = window.location.href;
    const domain = window.location.host;
    const search = window.location.search || '';
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
    index.each(function visitToLink() {
      const $this = $(this);
      $this.on('click', (e) => {
        const element = e.target.nodeName;
        if (element === 'SECTION' || element === 'H1' || element === 'UL') {
          const link = this.getElementsByTagName('a')[0];
          const href = link.getAttribute('href');
          if (Turbolinks.supported) {
            Turbolinks.visit(href);
          } else {
            window.location.assign(href);
          }
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
    const agenda = document.querySelector('#agenda');
    const agendaLink = document.querySelector('#footer__bar__agenda-link');

    if (agenda) {
      agendaLink.classList.add('footer__style--show');
      agendaLink.classList.remove('footer__style--hidden');
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
        const position = (targetElem.getBoundingClientRect().top + window.pageYOffset) - 56;
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

if (Turbolinks.supported) {
  Turbolinks.start();
  document.addEventListener(
    'turbolinks:load',
    () => {
      window.maechabin.ui.init();

      const links = document.querySelectorAll('a');
      const html = document.querySelector('html');
      links.forEach((link) => {
        link.addEventListener(
          'click',
          (e) => {
            if (link.href && link.href.match(/[#]/)) {
              html.setAttribute('style', 'scroll-behavior: smooth;');
              e.target.setAttribute('data-turbolinks', 'false');
            } else {
              html.setAttribute('style', 'scroll-behavior: auto;');
            }
          }, false
        );
      });
    },
    false
  );

  document.addEventListener(
    'turbolinks:before-visit',
    (e) => {

    }, false
  );
} else {
  document.addEventListener(
    'DOMContentLoaded',
    () => window.maechabin.ui.init(),
    false
  );
}
