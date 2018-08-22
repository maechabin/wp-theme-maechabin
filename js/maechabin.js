import Turbolinks from 'turbolinks';

const StickyState = require('sticky-state');
// import SlideHeader from 'slideheader';
// import smoothscroll from 'smoothscroll-polyfill';

export default class Maechabin {
  constructor(options) {
    this.div = document.createElement('div');
    this.allowTurbolinks = options.allowTurbolinks || false;
  }

  /**
   * スムーズスクロール
   */
  static callSmoothScroll(position = 0) {
    window.scrollTo({ top: position, left: 0, behavior: 'smooth' });
  }

  /**
   * ヘッダーバーをクリックした時にトップに戻る
   */
  static clickHeaderBar() {
    const headerBar = document.querySelector('#header_bar');

    headerBar.addEventListener(
      'click',
      (event) => {
        const element = event.target.id;
        if (element === 'header_bar') {
          Maechabin.callSmoothScroll(0);
        }
      },
      false,
    );
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
    const referrer = window.referrer || '';

    if (url.match(regexp1) && referrer.match(regexp2) && !referrer.match(regexp1)) {
      blogTitleIcon.setAttribute('class', 'fa fa-chevron-left');
      blogTitleLink.setAttribute('href', referrer);
    } else if (search !== '' && search.match(regexp3)) {
      blogTitleIcon.setAttribute('class', 'fa fa-chevron-left');
      blogTitleLink.setAttribute('href', referrer);
    } else {
      blogTitleLink.setAttribute('href', '/');
    }
  }

  // トップページのポストをクリックした時
  clickTopPost() {
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
      post.addEventListener(
        'click',
        (event) => {
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
        },
        false,
      );
    });
  }

  static displayMobileSearch() {
    const searchMobile = document.querySelector('.header__search_mobile');
    const buttonSearch = document.querySelector('.header__button_search');
    const buttonBack = document.querySelector('.header__button_back');

    buttonSearch.addEventListener(
      'click',
      () => {
        searchMobile.setAttribute(
          'style',
          `
        transition: transform 500ms ease-in-out;
        transform: translate3d(-100vw, 0, 0);
      `,
        );
      },
      false,
    );
    buttonBack.addEventListener(
      'click',
      () => {
        searchMobile.setAttribute(
          'style',
          `
        transition: transform 300ms linear;
        transform: translate3d(100vw, 0, 0);
      `,
        );
      },
      false,
    );
  }

  static displayAgendaLink() {
    const agenda = document.querySelector('#agenda');
    const agendaLink = document.querySelector('#footer__bar__agenda-link');

    if (agenda) {
      agendaLink.classList.add('footer__style--show');
      agendaLink.classList.remove('footer__style--hidden');
    }
  }

  static makeContentEditable() {
    const codes = document.querySelectorAll('.code');
    codes.forEach((code) => {
      code.setAttribute('contenteditable', true);
      code.setAttribute('soellcheck', false);
    });
  }

  /* === polyfill === */

  // ページ上部に戻る押したとき
  static getTargetPosition(callback) {
    const elem = document.querySelectorAll('a[href^="#"]');
    return Array.prototype.forEach.call(elem, (a) => {
      a.addEventListener(
        'click',
        (event) => {
          event.preventDefault();
          const href = a.getAttribute('href');
          const regexp = new RegExp('#.*$', 'ig');
          const target = href.match(regexp);
          const targetElem = document.querySelector(target[0]);
          const position = targetElem.getBoundingClientRect().top + window.pageYOffset;
          return callback(position - 56);
        },
        false,
      );
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

  /**
   * Google AdSenseの広告を表示する
   */
  static callAdSense() {
    const ads = document.querySelectorAll('.adsbygoogle');
    ads.forEach((ad) => {
      if (ad.firstChild) {
        ad.removeChild(ad.firstChild);
      }
    });

    if (ads.length > 0) {
      try {
        ads.forEach(() => {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Google Analyticsにトラフィックを送信する
   */
  static callAnalytics() {
    const path = window.location.pathname;
    const params = window.location.search;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-16293533-1', { page_path: path + params });
  }

  init() {
    Maechabin.displayAgendaLink();
    Maechabin.clickHeaderBar();
    Maechabin.backlink();
    Maechabin.callAnalytics();
    this.clickTopPost();
    Maechabin.makeContentEditable();
    // new SlideHeader('.cb-header', {
    //   headroom: true,
    //   slidePoint: 64,
    // }).init('slideUp');
    Maechabin.displayMobileSearch();
    // if (!('scroll-behavior' in this.div.style)) {
    //   smoothscroll.polyfill();
    // }
    if (!this.detectSticky()) {
      Maechabin.callStickyState();
    }
    PR.prettyPrint();
  }
}
