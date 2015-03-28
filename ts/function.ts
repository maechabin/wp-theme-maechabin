/// <reference path="../typings/tsd.d.ts" />

var maechabin_ui = (function (window, document) {

  var timer = null;
  var w = $(window);
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
      var position = target.offset().top;

      smoothScroll(position, speed);
      return false;

    });

  }

  // ヘッダーバーをクリックした時
  function clickHeaderBar() {

    header_bar.on("click", function (e) {

      var element = $(e.target).attr("id");

      if (element === "header_bar" || element === "header_bar_inner") {

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
    var blog_title = $("#blog_title");
    var blog_title_link = blog_title.find("a");
    var blog_title_icon = blog_title.find("i");
    var referrer = document.referrer;

    if (url.match(regexp1) && referrer.match(regexp2) && !referrer.match(regexp1)) {

      blog_title_icon.attr("class", "fa fa-arrow-circle-left");
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

      if ($(this).scrollTop() > 0) {
        header_bar.css({
          "box-shadow": "0 1px 3px #000",
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

    clearTimeout(timer);

    timer = setTimeout(function () {

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

      goTop();
      clickHeaderBar();
      backlink();
      clickTopPost();
      makeShadowHeaderBar();
      fixSidebar();
      resizeSidebarHeight();
      resizeWidth();
      checkBrowserSize();

    }

  };

} (window, document));

window.onload = maechabin_ui.init;

// ▼jquery.pageswitch.js▼
var jQuery: JQueryStatic;
; (function ($) {

  $.fn.pageswitch = function (opt) {

    var defaults = {
      url: "default",
      event: "click",
      target: "body",
      properties: {opacity: 0},
      options: {duration: 750, easing: "linear", queue: true}
    };

    var options = $.extend({}, defaults, opt);

    return this.each(function () {

      var target;

      if (options.url === "default") {
        target = $(this).attr("href");
      } else {
        target = options.url;
      }

      $(this).bind(options.event, function () {
        options.options.complete = function () {
          window.location.assign(target);
        };
        $(options.target).animate(options.properties, options.options);
        return false;
      });

    });

  };

})(jQuery);
// ▲jquery.pageswitch.js▲

$(document).ready(function ($) {

  // ▼ページ遷移エフェクト▼
  $(function () {

    $("#content").fadeIn(400);
    $("#content_border").css("height", "auto");

  });

  $(".nav-previous a").pageswitch({

    target: "#content",
    properties: {marginRight: -$("body").width()},
    options: {duration: 400}

  });

  $(".nav-next a").pageswitch({

    target: "#content",
    properties: {marginLeft: -$("body").width()},
    options: {duration: 400}

  });

  $("#article a:not([target = '_blank', '.internal-link']), header a:not([target = '_blank']), #sidebar_sub a:not([target = '_blank']), #footer_sub a:not([target = '_blank'])").pageswitch({
    target: "#content",
    options: {duration: 300}
  });
  // ▲ページ遷移エフェクト▲

});