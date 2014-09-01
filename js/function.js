// ▼jquery.pageswitch.js▼
(function($) {
  $.fn.pageswitch = function(options) {

    var defaults = {
      url: 'default',
      event: 'click',
      target: 'body',
      properties: {opacity: 0},
      options: {duration: 750, easing: "linear", queue: true}
    };

    var options = $.extend(defaults, options);

    return this.each(function() {
    
      if(options.url=='default') var target=$(this).attr('href');
      else var target=options.url;

      $(this).bind(options.event, function() {
        options.options.complete = function() {
          window.location.assign(target)
        };
        $(options.target).animate(options.properties,options.options);
        return false;
      });
      
    });
    
  };
  
})(jQuery);
// ▲jquery.pageswitch.js▲



$(document).ready(function() {

  // ▼ページ遷移エフェクト▼
  $(function() {

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


  // ▼スムーズスクロール（ページ上部に戻る）▼
  $.easing.quart = function(x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  };

  $('a[href^=#]').on("click", function() {
      
    if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name='+this.hash.slice(1)+']');

      if($target.length) {
        var targetOffset = $target.offset().top;
        $('html, body').animate({scrollTop: targetOffset}, 600, 'quart');
        return false;
      }
      
    }
    
  }); 
  // ▲スムーズスクロール（ページ上部に戻る）▲


  // ▼ヘッダーバー▼
  var headerBar = $("#header_bar");

  headerBar.on("click", function(e) {

    var element = $(e.target).attr("id");

    if(element === "header_bar" || element === "header_bar_inner") {

      var target = $(document.body).offset().top;
      $("html, body").animate({scrollTop: target}, 600, "quart");
      return false;

    }
    
  });
  // ▲ヘッダーバー▲


  // ▼トップページ▼
  var index = $(".post-box");
  for(var i = 0, idxLength = index.length; i < idxLength; i++) {

    $(index[i]).hover(
      function() {
        $(this).find("h1 a").animate({color: "#3160aa"}, 600);
      },
      function() {
        $(this).find("h1 a").animate({color: "#333"}, 600);
      }
    );

    index[i].onclick = function(e) {
      var element = e.target.nodeName;
      if(element === "SECTION" || element === "H1" || element === "UL") {
        var link = this.getElementsByTagName("a")[0];
        var href = link.getAttribute("href");
        window.location.assign(href);
      }
    }

  }
  // ▲トップページ▲

});


window.onload=function() {

  // ▼sidebar▼
  var contentHeight = $("#content_border").height();
  var sidebarHeight = $("#sidebar").height();
  var w = $(window);
  var wscrollTop = w.scrollTop();
  var headerBar = $("#header_bar");

  w.on("scroll", function() {
        
    if (w.scrollTop() > 0) {
      headerBar.css({"box-shadow": "0 1px 3px #000", "transition": "box-shadow .4s linear"});  
    } else {
      headerBar.css("box-shadow", "none");   
    }

  });

  if (sidebarHeight < contentHeight) {

    $("#sidebar").css("height", contentHeight);

    var sidebarSub = $("#sidebar_sub");
    var sidebarScrollStop = 36 + $("#sidebar_sub").height() + 36 + 24 - w.height();
    var sidebarScrollStart = 36 + $("#content_border").height() + 24 - w.height();

    w.on("scroll", function() {
          
      if (sidebarScrollStop < w.scrollTop() && w.scrollTop() < sidebarScrollStart) {
        sidebarSub.css({"position": "fixed", "bottom": "24px"});
      } else if (w.scrollTop() >= sidebarScrollStart) {
        sidebarSub.css({"position": "absolute", "bottom": "0"});
      } else {
        sidebarSub.css("position", "static");
      }

    });

  } else {

    $("#content").css("height", sidebarHeight);

  }
  // ▲sidebar▲

}


var maechabinUI = (function() {

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

  return {
      
    widthEnd: widthEnd,
    
    resizeBrowser: function() {
        
      $(window).on("resize", function() {

        widthEnd();

      });

    },

    
    open: function() {
    
      this.widthEnd();
      this.resizeBrowser();
    
    }
      
  };

})();

maechabinUI.open(); 


