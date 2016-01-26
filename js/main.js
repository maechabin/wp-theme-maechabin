var jQuery = require('jquery');
require('cbslideheader');
require('cbsharecount');

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

  function currentCategory() {
    var path = location.pathname;
    var currentClassName = "category__list_current";
    var categoryName;
    var categoryList = $(".category__list").find("li") || "";

    var addCurrentClass = function (n) {
      if (categoryList) {
        categoryList.eq(n).addClass(currentClassName);
      }
    }

    categoryList.removeClass(currentClassName);

    if (path) {
      categoryName = path.split("/");
      switch(categoryName[3]) {
        case "tech":
          addCurrentClass(1);
          break;
        case "event":
          addCurrentClass(2);
          break;
        case "impression":
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
    var search = location.search || "";

    //var port = location.port ? ":" + location.port : "";
    var regexp1 = new RegExp("^https?:\/\/" + domain + "\/archives\/[0-9]+$", "ig");
    var regexp2 = new RegExp("^https?:\/\/" + domain, "ig");
    var regexp3 = new RegExp("\/\?s\=.+?", "ig");
    var blog_title = $(".header__title").eq(0);
    var blog_title_link = blog_title.find("a").eq(0);
    var blog_title_icon = blog_title.find("i").eq(0);
    var referrer = document.referrer || "";

    if (url.match(regexp1) && referrer.match(regexp2) && !referrer.match(regexp1)) {

      blog_title_icon.attr("class", "fa fa-chevron-left");
      blog_title_link.attr("href", referrer);

    } else if (search !== "" && search.match(regexp3)) {

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

  function displayMobileSearch() {
    var searchMobile = $(".header__search_mobile");
    var buttonSearch = $(".header__button_search");
    var buttonBack = $(".header__button_back");

    buttonSearch.on("click", function () {
      searchMobile.stop().animate({
          "left": 0
      }, 500, "swing");
    });
    buttonBack.on("click", function () {
      searchMobile.stop().animate({
          "left": "100vw"
      }, 300, "linear");
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

    if (content_width > 1060) {

      margin_width = (content_width - 1060) / 2;
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

      currentCategory();
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
      displayMobileSearch();

    }

  };

})(jQuery, window, document);

window.onload = maechabin.ui.init;
