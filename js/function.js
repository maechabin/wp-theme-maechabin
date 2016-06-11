(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _jquery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('cbslideheader');
require('cbsharecount');

var maechabin = maechabin || {};

maechabin.ui = function ($, window, document) {
  var w = $(window);
  var header = $('.header');
  var headerBar = $('#header_bar');
  var contentWidthSize = 1092;
  var timer = null;

  // Smooth Scroll
  function smoothScroll(position, speed) {
    $('html, body').animate({ scrollTop: position }, speed, 'swing');
  }

  // ページ上部に戻る押したとき
  function goTop() {
    $('a[href^="#"]').on('click', function (e) {
      var speed = 400;
      var href = $(this).attr('href');
      var target = $(href === '#' || href === '' ? 'html' : href);
      var position = target.offset().top - headerBar.height();

      e.preventDefault();
      smoothScroll(position, speed);
      return false;
    });
  }

  function currentCategory() {
    var path = location.pathname;
    var currentClassName = 'category__list_current';
    var categoryList = $('.category__list').find('li') || '';
    var addCurrentClass = function addCurrentClass(n) {
      if (categoryList) {
        categoryList.eq(n).addClass(currentClassName);
      }
    };
    var categoryName = void 0;

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
    headerBar.on('click', function (e) {
      var element = $(e.target).attr('id');
      var speed = void 0;
      var position = void 0;

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
    var url = location.href;
    var domain = location.host;
    var search = location.search || '';
    // const port = location.port ? ":" + location.port : "";
    var regexp1 = new RegExp('^https?://' + domain + '/archives/[0-9]+$', 'ig');
    var regexp2 = new RegExp('^https?://' + domain, 'ig');
    var regexp3 = new RegExp('/?s=.+?', 'ig');
    var blogTitle = $('.header__title').eq(0);
    var blogTitleLink = blogTitle.find('a').eq(0);
    var blogTitleIcon = blogTitle.find('i').eq(0);
    var referrer = document.referrer || '';

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
    var index = $('.post-box');
    index.each(function () {
      var _this = this;

      var $this = $(this);
      $this.on('click', function (e) {
        var element = e.target.nodeName;
        if (element === 'SECTION' || element === 'H1' || element === 'UL') {
          var link = _this.getElementsByTagName('a')[0];
          var href = link.getAttribute('href');
          window.location.assign(href);
        }
      });
    });
  }

  function displayMobileSearch() {
    var searchMobile = $('.header__search_mobile');
    var buttonSearch = $('.header__button_search');
    var buttonBack = $('.header__button_back');

    buttonSearch.on('click', function () {
      searchMobile.stop().animate({
        left: 0
      }, 500, 'swing');
    });
    buttonBack.on('click', function () {
      searchMobile.stop().animate({
        left: '100vw'
      }, 300, 'linear');
    });
  }

  // サイドバー固定
  function fixSidebar() {
    var headerbarHeight = headerBar.height();
    var contentHeight = $('#content_border').height();
    var sidebarHeight = $('#sidebar').height();
    var footerBarHight = 24;

    if (sidebarHeight < contentHeight) {
      (function () {
        var sidebar = $('#sidebar');
        var sidebarSub = $('#sidebar_sub');
        var sidebarScrollStop = headerbarHeight + sidebarSub.height() + footerBarHight - w.height();
        var sidebarScrollStart = headerbarHeight + contentHeight + footerBarHight - w.height();

        sidebar.css('height', contentHeight + 'px');
        w.on('scroll', function () {
          if (window.matchMedia('(min-width: ' + contentWidthSize + 'px)').matches) {
            if (sidebarScrollStop < w.scrollTop() && w.scrollTop() < sidebarScrollStart) {
              sidebarSub.css({ position: 'fixed', bottom: footerBarHight + 'px' });
            } else if (w.scrollTop() >= sidebarScrollStart) {
              sidebarSub.css({ position: 'absolute', bottom: 0 });
            } else {
              sidebarSub.css('position', 'static');
            }
          }
        });
      })();
    }
  }

  function showAgendaLink() {
    var agenda = $('#agenda');
    var agendaLink = $('#footer__bar__agenda-link');

    if (agenda[0]) {
      agendaLink.addClass('footer__style--show');
      agendaLink.removeClass('footer__style--hidden');
    }
  }

  function resizeSidebarHeight() {
    var sidebar = $('#sidebar');
    var sidebarHeight = sidebar.height();
    var sidebarSub = $('#sidebar_sub');
    var sidebarSubHeight = sidebarSub.height();
    var contentHeight = $('#content_border').height();

    if (sidebarHeight < contentHeight) {
      if (window.matchMedia('(max-width: ' + contentWidthSize + 'px)').matches) {
        sidebar.css('height', sidebarSubHeight + 'px');
        sidebarSub.css('position', 'static');
      } else {
        sidebar.css('height', contentHeight + 'px');
      }
    }
  }

  function startFunc() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      resizeSidebarHeight();
    }, 400);
  }

  function checkBrowserSize() {
    w.on('resize', function () {
      startFunc();
    });
  }

  return {
    init: function init() {
      currentCategory();
      showAgendaLink();
      goTop();
      clickHeaderBar();
      backlink();
      clickTopPost();
      fixSidebar();
      resizeSidebarHeight();
      checkBrowserSize();
      header.cbSlideUpHeader({
        headroom: true
      });
      displayMobileSearch();
    }
  };
}(_jquery2.default, window, document);

document.addEventListener('DOMContentLoaded', function () {
  maechabin.ui.init();
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"cbsharecount":2,"cbslideheader":3}],2:[function(require,module,exports){
(function (global){
/*!
 * jquery.cbsharecount.js v1.0.2
 * Auther @maechabin
 * Licensed under mit license
 * https://github.com/maechabin/jquery.cb-share-count.js
 */
;(function (factory) {

  if (typeof module === "object" && typeof module.exports === "object") {

    module.exports = factory((typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null), window, document);

  } else {

    factory(jQuery, window, document);

  }

} (function ($, window, document, undefined) {

  "use strict";

  var Share = function (element, i) {

    this.element = element;
    this.$element = $(element);
    this.site_url = "";
    this.api_url = "";
    this.param_name = "";
    this.send_data = {};
    this.num = i;

  };

  Share.prototype.data = {
/*
    twitter: {
      api_url: "http://urls.api.twitter.com/1/urls/count.json",
      param_name: "url",
      count: 0
    },
*/
    facebook: {
      api_url: "http://graph.facebook.com/",
      param_name: "id",
      count: 0
    },

    hatena: {
      api_url: "http://api.b.st-hatena.com/entry.count",
      param_name: "url",
      count: 0
    }

  };

  Share.prototype.get_count = function () {

    var d = new $.Deferred();

    $.ajax({

      type: "get",
      url: this.api_url,
      cache: true,
      dataType: "jsonp",
      data: this.send_data,
      success: d.resolve,
      error: d.reject

    });

    return d.promise();

  };

  Share.prototype.view = function (arg) {

    var that = this;
//    var tw = $(".cb-tw").eq(that.num).find("span");
    var fb = $(".cb-fb").eq(that.num).find("span");
    var hb = $(".cb-hb").eq(that.num).find("span");

    $(arg).each(function (i) {

      switch (i) {
/*
        case 0:
          that.data.twitter.count = this[0].count || "";
          break;
*/
        case 0:
          that.data.facebook.count = this[0].shares || this[0].likes || 0;
          break;

        case 1:
          that.data.hatena.count = this[0];
          break;

      }

    });

//    tw.html(that.data.twitter.count);
    fb.html(that.data.facebook.count);
    hb.html(that.data.hatena.count);

  };

  Share.prototype.setup = function () {

    var that = this;
    var df = [];

    $.each(that.data, function (key, val) {

      that.api_url = val.api_url;
      that.send_data[val.param_name] = that.site_url;
      df.push(that.get_count());

    });

    $.when.apply($, df).done(function () {

      that.view(arguments);

    });

  };

  Share.prototype.init = function () {

    this.site_url = this.$element.attr("title");
    this.setup();

    return this;

  };

  $.fn.cbShareCount = function () {

    return this.each(function (i) {

      new Share(this, i).init();

    });

  };

}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
/**
 * jquery.cb-slideheader.js - A jQuery plugin to display or hide headerbar with a sliding motion
 * @version v0.3.3
 * @author maechabin <mail@chab.in> http://mae.chab.in/
 * @license MIT license
 */
!function(e){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e((typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),window,document):e(jQuery,window,document)}(function(e,i,o,t){"use strict";var n=function(i,o){this.element=i,this.$element=e(i),this.methodType="",this.config={},this.options=o,this.slideFlag="up",this.defaults={headerBarHeight:this.$element.height(),headerBarWidth:"100%",header2SelectorName:".cb-header2",headerClone:!1,fullscreenView:!1,zIndex:9999,boxShadow:"none",opacity:1,slidePoint:0,slideDownDuration:"normal",slideUpDuration:"normal",slideDownEasing:"swing",slideUpEasing:"swing",slideDownCallback:function(){},slideUpCallback:function(){},headroom:!1}};n.prototype.slide=function(e,i,o,t){this.slideFlag="up"===e?"down":"up",this.$element.stop().animate({top:i},this.config["slide"+o+"Speed"],this.config["slide"+o+"Easing"],this.config["slide"+o+"Callback"]).css(t)},n.prototype.slideHeader=function(){var o=this,t=e(i),n="slideDown"===o.methodType?0:"-"+o.config.headerBarHeight+"px",s="slideDown"===o.methodType?"-"+o.config.headerBarHeight+"px":0,d="slideDown"===o.methodType?"Down":"Up",l="slideDown"===o.methodType?"Up":"Down",a={"box-shadow":o.config.boxShadow,transition:"box-shadow .9s linear"},h={"box-shadow":"none"},c="slideDown"===o.methodType?a:h,r="slideDown"===o.methodType?h:a,p=0,g=0;t.on("scroll",function(){"slideUp"===o.methodType&&o.config.headroom===!0?(g=t.scrollTop(),g>p&&g>0?"up"===o.slideFlag&&o.slide.call(o,o.slideFlag,n,d,c):"down"===o.slideFlag&&o.slide.call(o,o.slideFlag,s,l,r),p=g):t.scrollTop()>o.config.slidePoint?"up"===o.slideFlag&&o.slide.call(o,o.slideFlag,n,d,c):"down"===o.slideFlag&&o.slide.call(o,o.slideFlag,s,l,r)})},n.prototype.setStyle=function(){var e=this,i="slideDown"===e.methodType?"-"+e.config.headerBarHeight+"px":0;e.$element.css({top:i,visibility:"visible",opacity:e.config.opacity,width:e.config.width,"z-index":e.config.zIndex})},n.prototype.cloneHeader=function(){var e=this,i=e.$element.clone(!0);i.insertAfter(e.$element).removeClass("cb-header").css({"z-index":1e4})},n.prototype.changeHeaderHeight=function(){var o=this,t=o.$element.height(),n=e(o.config.header2SelectorName),s=t+n.height(),d=e(i).height(),l="";d>s?(l=o.config.headerClone===!0?(d-s)/2:(d-s+t)/2,o.config.slidePoint=d,n.css({"padding-top":l+"px","padding-bottom":l+"px"})):o.config.slidePoint=o.config.headerClone===!0?s:s-t},n.prototype.init=function(i){return this.methodType=i,this.config=e.extend({},this.defaults,this.options),this.config.headerClone===!0&&this.cloneHeader(),this.setStyle(),this.config.fullscreenView===!0&&this.changeHeaderHeight(),this.slideHeader(),this},e.extend(e.fn,{cbSlideDownHeader:function(e){return this.each(function(){new n(this,e).init("slideDown")})},cbSlideUpHeader:function(e){return this.each(function(){new n(this,e).init("slideUp")})}})});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
