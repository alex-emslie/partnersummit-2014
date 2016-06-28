(function() {
  var isRetina, retina;

  html5tooltips({
    contentText: "Coming Soon",
    targetSelector: ".not-linked",
    stickDistance: -5
  });

  isRetina = function() {
    var mediaQuery;
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
    return false;
  };

  retina = function() {
    if (!isRetina()) {
      return;
    }
    return $("img.2x").map(function(i, image) {
      var path;
      path = $(image).attr("src");
      path = path.replace(".png", "@2x.png");
      path = path.replace(".jpg", "@2x.jpg");
      return $(image).attr("src", path);
    });
  };

  $(function() {
    retina();
    $('a.disabled').on('click', function(e) {
      e.preventDefault();
      return e.stopPropagation();
    });
    if (window.location.href.indexOf('thankyou=yes') > 0) {
      $('.confirmation').show();
      $('body').addClass('js-has-thankyou');
    }
    $('#header-logo').on('click', function() {
      return window.open('/', '_self');
    });
    return $('.video-launch').on('click', function(e) {
      var videoId;
      e.preventDefault();
      e.stopPropagation();
      videoId = $(this).data('videoid');
      return $.get('static/js/templates/video.jst', (function(_this) {
        return function(response) {
          var output, template;
          template = Hogan.compile(response);
          output = template.render({
            id: videoId
          });
          $('body').append(output);
          $(".video-popup, .video-shade").fadeIn(200);
          return $(".video-popup .close, .video-shade").on('click', function(e) {
            return $(".video-popup, .video-shade").fadeOut(200, function() {
              return $(".video-popup, .video-shade").remove();
            });
          });
        };
      })(this));
    });
  });

}).call(this);
