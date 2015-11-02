(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var jQuery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
require('cbslideheader');

var maechabin = maechabin || {};

maechabin.ui = (function ($, window, document) {

  "use strict";

  var timer = null;
  var w = $(window);
  var header = $(".header");
  var header_bar = $("#header_bar");
  var sidebar_height = $("#sidebar").height();

  // Smooth Scroll
  function smoothScroll(position, speed) {
    $("html, body").animate({scrollTop: position}, speed, "swing");
  }

  // ページ上部に戻る押したとき
  function goTop() {

    $("a[href^=#]").on("click", function () {

      var speed = 400;
      var href = $(this).attr("href");
      var target = $(href === "#" || href === "" ? "html" : href);
      var position = target.offset().top - header_bar.height();

      smoothScroll(position, speed);
      return false;

    });

  }

  // ヘッダーバーをクリックした時
  function clickHeaderBar() {

    header_bar.on("click", function (e) {

      var element = $(e.target).attr("id");

      if(element === "header_bar" || element === "header_bar_inner") {

        var speed = 600;
        var position = $(document.body).offset().top;

        smoothScroll(position, speed);
        return false;

      }

    });

  }

  function backlink() {

    var url = location.href;
    var domain = location.host;
    //var port = location.port ? ":" + location.port : "";
    var regexp1 = new RegExp("^https?:\/\/" + domain + "\/archives\/[0-9]+$", "ig");
    var regexp2 = new RegExp("^https?:\/\/" + domain, "ig");
    var blog_title = $(".header__title").eq(0);
    var blog_title_link = blog_title.find("a").eq(0);
    var blog_title_icon = blog_title.find("i").eq(0);
    var referrer = document.referrer || "";

    if (url.match(regexp1) && referrer.match(regexp2) && !referrer.match(regexp1)) {

      blog_title_icon.attr("class", "fa fa-chevron-left");
      blog_title_link.attr("href", referrer);

    } else {

      //blog_title_icon.attr("class", "fa fa-medium");
      blog_title_link.attr("href", "/");

    }

  }

  // トップページのポストをクリックした時
  function clickTopPost() {

    var index = $(".post-box");

    index.each(function () {

      var $this = $(this);

      $this.on("click", function (e) {

        var element = e.target.nodeName;

        if (element === "SECTION" || element === "H1" || element === "UL") {

          var link = this.getElementsByTagName("a")[0];
          var href = link.getAttribute("href");
          window.location.assign(href);

        }

      });

    });

  }

  // スクロール位置によってヘッダーバーに影を付ける
  function makeShadowHeaderBar() {

    w.on("scroll", function () {

      var $this = $(this);
      if ($this.scrollTop() > 0) {
        header_bar.css({
          "box-shadow": "0 1px 3px #111",
          "transition": "box-shadow .4s linear"
        });
      } else {
        header_bar.css({
          "box-shadow": "none"
        });
      }

    });

  }

  // サイドバー固定
  function fixSidebar() {

    var headerbar_height = header_bar.height();
    var content_height = $("#content_border").height();
    var sidebar_height = $("#sidebar").height();

    if (sidebar_height < content_height) {

      var sidebar = $("#sidebar");
      var sidebar_sub = $("#sidebar_sub");
      var sidebar_scroll_stop = headerbar_height + sidebar_sub.height() + 24 - w.height();
      var sidebar_scroll_start = headerbar_height + content_height + 24 - w.height();

      sidebar.css("height", content_height + "px");

      w.on("scroll", function () {

        if (window.matchMedia("(min-width: 1024px)").matches) {

          if (sidebar_scroll_stop < $(this).scrollTop() && $(this).scrollTop() < sidebar_scroll_start) {

            sidebar_sub.css({"position": "fixed", "bottom": "24px"});

          } else if (w.scrollTop() >= sidebar_scroll_start) {

            sidebar_sub.css({"position": "absolute", "bottom": "0"});

          } else {

            sidebar_sub.css("position", "static");

          }

        }

      });

    }

  }

  function showAgendaLink() {

    var agenda = $("#agenda");
    var agendaLink = $("#footer__bar__agenda-link");

    if (agenda[0]) {
      agendaLink.addClass("footer__style--show");
      agendaLink.removeClass("footer__style--hidden");
    }

  }

  function resizeWidth() {

    var content = $("#content");
    var content_width = $("#content_border").width();
    var entry = $("#entry");
    var sidebar = $("#sidebar");
    var margin_width = 0;

    if (content_width > 1020) {

      margin_width = (content_width - 1020) / 2;
      content.css("width", content_width + "px");

    }

      sidebar.css("padding-right", margin_width + "px");
      entry.css("margin-left", margin_width + "px");

  }

  function resizeSidebarHeight() {

    var sidebar = $("#sidebar");
    var sidebar_height = sidebar.height();
    var sidebar_sub = $("#sidebar_sub");
    var sidebar_sub_height = sidebar_sub.height();
    var content_height = $("#content_border").height();

    if (sidebar_height < content_height) {

      if (window.matchMedia("(max-width: 1024px)").matches) {

        sidebar.css("height", sidebar_sub_height + "px");
        sidebar_sub.css("position", "static");

      } else {

        sidebar.css("height", content_height + "px");

      }

    }

  }

  function startFunc() {

    window.clearTimeout(timer);

    timer = window.setTimeout(function () {

      resizeWidth();
      resizeSidebarHeight();

    }, 200);

  }

  function checkBrowserSize() {

      w.on("resize", function () {
        startFunc();
      });

  }

  return {

    init: function () {

      showAgendaLink();
      goTop();
      clickHeaderBar();
      backlink();
      clickTopPost();
      makeShadowHeaderBar();
      fixSidebar();
      resizeSidebarHeight();
      resizeWidth();
      checkBrowserSize();
      header.cbSlideUpHeader({
        headroom: true
      });

    }

  };

})(jQuery, window, document);

window.onload = maechabin.ui.init;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"cbslideheader":2}],2:[function(require,module,exports){
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
