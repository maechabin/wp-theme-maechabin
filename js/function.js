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



var Iine = function (url, i) {

  this.site_url = url;
  this.api_url;
  this.param_name;
  this.send_data = {};
  this.num = i;

};

Iine.prototype.data = {

  twitter: {
    api_url: "http://urls.api.twitter.com/1/urls/count.json",
    param_name: "url",
    count: 0
  },

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

Iine.prototype.get_count = function () {

  var d = new $.Deferred();

  $.ajax({

    type: "get",
    url: this.api_url,
    dataType: "jsonp",
    data: this.send_data,
    success: d.resolve,
    error: d.reject

  });

  return d.promise();

};

Iine.prototype.view = function (arg) {

  var that = this;
  //var iine = $(".cb-iine");
  var tw = $(".cb-tw").eq(that.num).find("span");
  var fb = $(".cb-fb").eq(that.num).find("span");
  var hb = $(".cb-hb").eq(that.num).find("span");

  $(arg).each(function (i) {

    switch (i) {

      case 0:
        that.data.twitter.count = this[0].count;
        break;

      case 1:
        that.data.facebook.count = this[0].shares || this[0].likes || 0;
        break;

      case 2:
        that.data.hatena.count = this[0];
        break;

    }

  });

  tw.html(that.data.twitter.count);
  fb.html(that.data.facebook.count);
  hb.html(that.data.hatena.count);

};

Iine.prototype.init = function () {

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

$(document).ready(function () {

  var iine = $(".cb-iine");

  iine.each(function (i) {

    var $this = $(this);
    var url = $this.attr("title");
    
    new Iine(url, i).init();

  });


});