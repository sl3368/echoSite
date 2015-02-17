require.config({
  paths: {
    "backbone": "lib/backbone-amd/backbone",
    "jquery": "lib/jquery/dist/jquery",
    "underscore": "lib/underscore-amd/underscore"
  }
});

require(['src/views/app'], function(AppView) {
  new AppView();
});
