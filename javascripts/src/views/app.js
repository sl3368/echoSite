define([
  'underscore',
  'jquery',
  'backbone',
  'jquery-mobile',
], function(_, $, Backbone) {

  var App = Backbone.View.extend({

    el: '.echo-background', 

    page: 0,

    events: {
      'click .echo-left-arrow': 'changePage',
      'click .echo-right-arrow': 'changePage',
      'click .echo-inactive': 'changePage',
      'click .echo-link': 'followEchoLink',
      'keyup': 'changePageWithKey',
      'swipeleft .echo-container': 'nextPage',
      'swiperight .echo-container': 'prevPage',
    }, 

    initialize: function() {
      /* Assign the width of the browser widnow to our slider container. */
      this.updateSliderWidth();

      /* Update width of slider pages when the browser window resizes. */
      $(window).on('resize', _.throttle(this.handleBrowserResize, 100).bind(this));

      /* Render page components. */
      this.renderPage();
      this.updateBars();
    },

    changePageWithKey: function(ev) {
      ev.preventDefault();
      if (!this.scrolling) {
        if (ev.keyCode === 37) {
          this.prevPage();
        } else if (ev.keyCode === 39) {
          this.nextPage();
        }
      } 
    },

    nextPage: function() {
      if (this.page < 2) {
        this.page += 1;
        this.renderPage();
      }
    },

    prevPage: function() {
      if (this.page > 0) {
        this.page -= 1;
        this.renderPage();
      }
    },
        
    followEchoLink: function(ev) {
      var templateName = $(ev.currentTarget).attr('data-template-name');
      var content = _.template( $('#' + templateName).html());
      $('#echo-dynamic').html(content);
      this.page += 1;
      this.renderSlider();
    },

    renderPage: function() {
      this.renderSlider();
      this.renderArrows();
      this.renderBars();
    },

    renderSlider: function() {
      var width = $('#echo-content').width();
      var target = (0 - width) * this.page;
      target *= 2; 
      this.run('#echo-content', target);
      this.updateScrollable();
    },

    run: function(part, target) {
      $(part + ' .pan').stop().animate(
        {'margin-left': target},
        1000,
        'swing'
      );
    },

    renderBars: function() {
      var _this = this;

      /* Update the sizes of the bars themselves. */
      _.forEach($('.echo-bars li'), function(node, index) {
        if (index === _this.page)
          $(node).removeClass('echo-inactive').addClass('echo-active');
        else
          $(node).removeClass('echo-active').addClass('echo-inactive');
      });

      /* Update the location of the download link. */
      if ($(window).width() > 500) {
        switch (this.page) {
          case 0:
            $('#echo-download-link').css({'margin-left': '-135px'});
            break;
          case 1:
            $('#echo-download-link').css({'margin-left': '20px'});
            break;
          case 2:
            $('#echo-download-link').css({'margin-left': '187px'});
            break;
        }
      }
    },

    renderArrows: function() {
      $('.echo-left-arrow').removeClass('hidden');
      $('.echo-right-arrow').removeClass('hidden');
      if (this.page === 0)
        $('.echo-left-arrow').addClass('hidden');
      else if (this.page === 2)
        $('.echo-right-arrow').addClass('hidden');
    },

    changePage: function(ev) {
      if ($(ev.currentTarget).attr('class') === 'echo-right-arrow')
        this.page += 1;
      else if ($(ev.currentTarget).attr('class') === 'echo-left-arrow')
        this.page -= 1;
      else if ($(ev.currentTarget).attr('class') === 'echo-inactive')
        this.page = parseInt($(ev.currentTarget).attr('data-page-index'));
      this.renderPage();
    },

    handleBrowserResize: function() {
      this.updateSliderWidth();
      this.updateBars();
      this.updateScrollable();
    },

    updateScrollable: function() {
      $('.scrollable').css({'height': $('#echo-content').height()});
    },

    updateSliderWidth: function() {
      var padding = Math.floor($(window).width() * .20);
      var windowWidth = $(window).width() - padding;
      $('#echo-content, .page').css({'width': windowWidth});
      $('.page').css({'margin-right': windowWidth});
      this.updateSlider();
    },
  
    updateSlider: function() {
      var width = $('#echo-content').width();
      var target = (0 - width) * this.page;
      target *= 2;
      $('.pan').css({'margin-left': target});
    },

    updateBars: function() {
      if ($(window).width() < 500)
        $('#echo-download-link').css({'margin-left': '0px'});
      else
        this.renderBars();
    }

  });

  return App;

});

