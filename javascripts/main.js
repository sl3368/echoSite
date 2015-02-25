require.config({
  shim: {
    "jquery-mobile": {
      deps: ["jquery"]
    }
  },
  paths: {
    "backbone": "lib/backbone-amd/backbone",
    "jquery": "lib/jquery/dist/jquery",
    "underscore": "lib/underscore-amd/underscore",
    "jquery-mobile": "lib/jquery.mobile-1.4.5.min"
  }
});

/* Override the mobileinit function automatically run by jQuery Mobile */
require(['jquery'], function($) {
  $(document).bind('mobileinit', function() {
    $.mobile.autoInitializePage = false;
    $.mobile.loadingMessage = false;
  });
});

require(['src/views/app'], function(AppView) {
  new AppView();
});
