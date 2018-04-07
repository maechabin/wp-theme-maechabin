import $ from 'jquery';
import 'cbslideheader';
// require('cbsharecount');
// import 'slideshowad';
require('smoothscroll-polyfill').polyfill();

const Turbolinks = require('turbolinks');
const StickyState = require('sticky-state');

const allowTurbolinks = true;

class Maechabin {
  constructor(options) {
    this.header = $('.header');
    this.div = document.createElement('div');
    this.allowTurbolinks = options.allowTurbolinks || false;
  }

  /**
   * スムーズスクロール
   */
  static callSmoothScroll(position = 0) {
    return window.scrollTo({ top: position, left: 0, behavior: 'smooth' });
  }

  /**
   * ヘッダーバーをクリックした時にトップに戻る
   */
  static clickHeaderBar() {
    const headerBar = document.querySelector('#header_bar');

    headerBar.addEventListener('click', (event) => {
      const element = event.target.id;
      if (element === 'header_bar' || element === 'header_bar_inner') {
        return Maechabin.callSmoothScroll(0);
      }
      return true;
    });
  }

  static backlink() {
    const url = window.location.href;
    const domain = window.location.host;
    const search = window.location.search || '';
    // const port = location.port ? ":" + location.port : "";
    const regexp1 = new RegExp(`^https?://${domain}/archives/[0-9]+$`, 'ig');
    const regexp2 = new RegExp(`^https?://${domain}`, 'ig');
    const regexp3 = new RegExp('/?s=.+?', 'ig');
    const blogTitle = document.querySelector('.header__title');
    const blogTitleLink = blogTitle.querySelector('a');
    const blogTitleIcon = blogTitle.querySelector('i');
    const referrer = document.referrer || '';

    if (url.match(regexp1) && referrer.match(regexp2) && !referrer.match(regexp1)) {
      blogTitleIcon.setAttribute('class', 'fa fa-chevron-left');
      blogTitleLink.setAttribute('href', referrer);
    } else if (search !== '' && search.match(regexp3)) {
      blogTitleIcon.setAttribute('class', 'fa fa-chevron-left');
      blogTitleLink.setAttribute('href', referrer);
    } else {
      // blogTitleIcon.attr("class", "fa fa-medium");
      blogTitleLink.setAttribute('href', '/');
    }
  }

  // トップページのポストをクリックした時
  clickTopPost() {
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
      post.addEventListener('click', (event) => {
        const element = event.target.nodeName;
        if (element === 'SECTION' || element === 'H1' || element === 'UL' || element === 'LI') {
          const link = post.getElementsByTagName('a')[0];
          const href = link.getAttribute('href');

          if (Turbolinks.supported && this.allowTurbolinks) {
            event.preventDefault();
            Turbolinks.visit(href);
          } else {
            window.location.assign(href);
          }
        }
      }, false);
    });
  }

  static displayMobileSearch() {
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

  static showAgendaLink() {
    const agenda = document.querySelector('#agenda');
    const agendaLink = document.querySelector('#footer__bar__agenda-link');

    if (agenda) {
      agendaLink.classList.add('footer__style--show');
      agendaLink.classList.remove('footer__style--hidden');
    }
  }

  static contenteditable() {
    const code = $('.prettyprint');
    code.attr({
      contenteditable: true,
      spellcheck: false,
    });
  }

  /* === polyfill === */

  // ページ上部に戻る押したとき
  static getTargetPosition(callback) {
    const elem = document.querySelectorAll('a[href^="#"]');
    return Array.prototype.forEach.call(elem, (a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const href = a.getAttribute('href');
        const regexp = new RegExp('#.*$', 'ig');
        const target = href.match(regexp);
        const targetElem = document.querySelector(target[0]);
        const position = (targetElem.getBoundingClientRect().top + window.pageYOffset) - 56;
        return callback(position);
      }, false);
    });
  }

  detectSticky() {
    this.div.style.position = 'sticky';
    return this.div.style.position.indexOf('sticky') !== -1;
  }

  static callStickyState() {
    const sidebarBox = document.querySelector('.sidebar__box');
    sidebarBox.setAttribute('class', 'sidebar__box sticky');
    return new StickyState(document.querySelectorAll('.sticky'));
  }

  static callAdSense() {
    const ads = document.querySelectorAll('.adsbygoogle');
    if (ads.length > 0) {
      try {
        ads.forEach(() => {
          const adsbygoogle = window.adsbygoogle || [];
          adsbygoogle.push({});
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  static callAnalytics() {
    const path = window.location.pathname;
    const params = window.location.search;
    const dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    // UA-16293533-1
    // UA-44221308-1
    gtag('config', 'UA-16293533-1', { page_path: path + params });
  }

  init() {
    Maechabin.showAgendaLink();
    Maechabin.clickHeaderBar();
    Maechabin.backlink();
    this.clickTopPost();
    Maechabin.contenteditable();
    Maechabin.callAdSense();
    Maechabin.callAnalytics();
    this.header.cbSlideUpHeader({
      headroom: true,
      slidePoint: 64,
    });
    Maechabin.displayMobileSearch();
    if (!('scroll-behavior' in this.div.style)) {
      this.getTargetPosition(this.callSmoothScroll);
    }
    if (!this.detectSticky()) {
      this.callStickyState();
    }
  }
}

if (Turbolinks.supported && allowTurbolinks) {
  Turbolinks.start();

  document.addEventListener('turbolinks:load', () => {
    new Maechabin({
      allowTurbolinks,
    }).init();

    const links = document.querySelectorAll('a');
    const html = document.querySelector('html');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        if (link.href && link.href.match(/[#]/)) {
          html.setAttribute('style', 'scroll-behavior: smooth;');
          e.target.setAttribute('data-turbolinks', 'false');
        } else {
          html.setAttribute('style', 'scroll-behavior: auto;');
        }
      }, false);
    });
  }, false);

  document.addEventListener('turbolinks:before-visit', () => {
    //
  }, false);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    new Maechabin().init();
  }, false);
}
