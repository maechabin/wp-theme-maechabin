var maechabin_ui = (function () {

  var timer = null;
  var w = $(window);
  var header_bar = $("#header_bar");

  // Smooth Scroll
  function smoothScroll(position, speed) {
    $("html, body").animate({scrollTop:position}, speed, "swing");
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

      if(element === "header_bar" || element === "header_bar_inner") {

        var speed = 600;
        var position = $(document.body).offset().top;

        smoothScroll(position, speed);
        return false;

      }

    });

  }

  // トップページのポストをクリックした時
  function clickTopPost() {

    var index = $(".post-box");

    index.each(function (i) {

      var $this = $(this);

      $this.hover(
        function () {
          $this.find("h1 a").animate({color: "#3160aa"}, 600);
        },
        function () {
          $this.find("h1 a").animate({color: "#333"}, 600);
        }
      );

      $this.onclick = function (e) {
        var element = e.target.nodeName;
        if (element === "SECTION" || element === "H1" || element === "UL") {
          var link = this.getElementsByTagName("a")[0];
          var href = link.getAttribute("href");
          window.location.assign(href);
        }
      }
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

    // .hight()
    var headerbar_height = header_bar.height();
    var content_height = $("#content_border").height();
    var sidebar_height = $("#sidebar").height();

    if (sidebar_height < content_height) {

      $("#sidebar").css("height", content_height);

      var sidebar_sub = $("#sidebar_sub");
      var sidebar_scroll_stop = headerbar_height + $("#sidebar_sub").height() + 24 - w.height();
      var sidebar_scroll_start = headerbar_height + content_height + 24 - w.height();

      w.on("scroll", function () {

        if (sidebar_scroll_stop < $(this).scrollTop() && $(this).scrollTop() < sidebar_scroll_start) {
          sidebar_sub.css({"position": "fixed", "bottom": "24px"});
        } else if (w.scrollTop() >= sidebar_scroll_start) {
          sidebar_sub.css({"position": "absolute", "bottom": "0"});
        } else {
          sidebar_sub.css("position", "static");
        }

      });

    } else {
      $("#content").css("height", sidebar_height);
    }

  }

  function widthEnd() {
      
    var content_width = $("#content_border").width();

    if (content_width > 990) {

      // console.log(content_width);

      var end_width = (content_width - 990) / 2;

      var content = $("#content");
      content.css("width", content_width + "px");

      var sidebar = $("#sidebar");
      sidebar.css("padding-right", end_width + "px");
          
      var entry = $("#entry");
      entry.css("margin-left", end_width + "px");

    }

  }

  function startFunc() {

    clearTimeout(timer);

    timer = setTimeout(function () {
      widthEnd();
    }, 200);

  } 

  function resizeBrowser() {

      w.on("resize", function () {
        startFunc();
      });

  }

  return {

    init: function () {

      goTop();
      clickHeaderBar();
      clickTopPost();
      makeShadowHeaderBar();
      fixSidebar();
      widthEnd();
      resizeBrowser();

    }

  };

})();

window.onload = maechabin_ui.init();


// ▼jquery.pageswitch.js▼
(function ($) {
  $.fn.pageswitch = function (options) {

    var defaults = {
      url: 'default',
      event: 'click',
      target: 'body',
      properties: {opacity: 0},
      options: {duration: 750, easing: "linear", queue: true}
    };

    var options = $.extend(defaults, options);

    return this.each(function () {
    
      if(options.url == 'default') var target = $(this).attr('href');
      else var target = options.url;

      $(this).bind(options.event, function () {
        options.options.complete = function () {
          window.location.assign(target)
        };
        $(options.target).animate(options.properties,options.options);
        return false;
      });
      
    });
    
  };
  
})(jQuery);
// ▲jquery.pageswitch.js▲

$(document).ready(function () {

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

  $("#article a:not([target = '_blank']), header a:not([target = '_blank']), #sidebar_sub a:not([target = '_blank']), #footer_sub a:not([target = '_blank'])").pageswitch({
    target: "#content",
    options: {duration: 300}
  });
  // ▲ページ遷移エフェクト▲

});