;(function ($) {

  'use strict';

  /* ===============================
     Full height sections (hero)
  =============================== */
  var fullHeight = function () {
    var setHeight = function () {
      $('.js-fullheight').css('height', $(window).height());
    };
    setHeight();
    $(window).on('resize', setHeight);
  };

  /* ===============================
     Hero Flexslider
  =============================== */
  var heroSlider = function () {
    if (!$('.flexslider').length) return;

    $('.flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: 6000,
      animationSpeed: 800,
      directionNav: true,
      controlNav: false,
      pauseOnHover: false,
      smoothHeight: true,
      start: function () {
        $('.slider-text').removeClass('animated fadeInUp');
        $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
      },
      after: function () {
        $('.slider-text').removeClass('animated fadeInUp');
        $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
      }
    });
  };

  /* ===============================
     Datepicker (Check-in / Check-out)
  =============================== */
  var datePickers = function () {
    if (!$.fn.datepicker) return;

    $('#date-start, #date-end').datepicker({
      format: 'mm/dd/yyyy',
      autoclose: true,
      todayHighlight: true
    });
  };

  /* ===============================
     Scroll Animations (.animate-box)
  =============================== */
  var scrollAnimations = function () {
    if (!$('.animate-box').length || !$.fn.waypoint) return;

    $('.animate-box').waypoint(function (direction) {
      if (direction !== 'down') return;

      var $el = $(this.element);
      if ($el.hasClass('animated')) return;

      var effect = $el.data('animate-effect') || 'fadeInUp';

      $el.addClass('in-view animated ' + effect);
    }, {
      offset: '80%'
    });
  };

  /* ===============================
     Counters
  =============================== */
  var counters = function () {
    var $section = $('#fh5co-counter-section');
    if (!$section.length || !$.fn.waypoint || !$.fn.countTo) return;

    $section.waypoint(function (direction) {
      if (direction !== 'down') return;
      if ($section.hasClass('counted')) return;

      $('.js-counter').each(function () {
        var $this = $(this);
        $this.countTo({
          from: $this.data('from') || 0,
          to: $this.data('to') || $this.text(),
          speed: $this.data('speed') || 2500,
          refreshInterval: $this.data('refresh-interval') || 50
        });
      });

      $section.addClass('counted');
    }, {
      offset: '80%'
    });
  };

  /* ===============================
     Tabs (Amenities)
  =============================== */
  var tabs = function () {
    var $tabs = $('.fh5co-tabs');
    if (!$tabs.length) return;

    $tabs.each(function () {
      var $this = $(this);
      var $links = $this.find('.fh5co-tab-nav a');
      var $contents = $this.find('.fh5co-tab-content-wrap .tab-content');

      $links.on('click', function (e) {
        e.preventDefault();
        var $link = $(this);
        var tab = $link.data('tab');

        $links.parent('li').removeClass('active');
        $link.parent('li').addClass('active');

        $contents.removeClass('active').hide();
        $contents.filter('[data-tab-content="' + tab + '"]').fadeIn(200).addClass('active');
      });
    });
  };

  /* ===============================
     Mobile Menu Toggle
  =============================== */
  var mobileMenu = function () {
    var $toggle = $('.js-fh5co-nav-toggle');
    var $menuWrap = $('#fh5co-menu-wrap');

    if (!$toggle.length || !$menuWrap.length) return;

    $toggle.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active');
      $menuWrap.slideToggle(200);
    });

    // Reset on resize (desktop)
    $(window).on('resize', function () {
      if ($(this).width() > 768) {
        $menuWrap.show();
        $toggle.removeClass('active');
      }
    });
  };

  /* ===============================
     Smooth Scroll for nav links
  =============================== */
  var smoothScroll = function () {
    var $links = $('#fh5co-primary-menu a[href^="#"]');
    if (!$links.length) return;

    $links.on('click', function (e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 800);
      }
    });
  };

  /* ===============================
     Active nav item on scroll
  =============================== */
  var navOnScroll = function () {
    var $links = $('#fh5co-primary-menu a[href^="#"]');
    if (!$links.length) return;

    var getSections = function () {
      var sections = [];
      $links.each(function () {
        var selector = $(this).attr('href');
        if (selector && selector.charAt(0) === '#') {
          var $sec = $(selector);
          if ($sec.length) sections.push($sec);
        }
      });
      return sections;
    };

    var sections = getSections();

    $(window).on('scroll', function () {
      var scrollPos = $(document).scrollTop() + 100;

      for (var i = 0; i < sections.length; i++) {
        var $sec = sections[i];
        var top = $sec.offset().top;
        var bottom = top + $sec.outerHeight();
        var id = $sec.attr('id');

        if (scrollPos >= top && scrollPos <= bottom) {
          $links.removeClass('active');
          $('#fh5co-primary-menu a[href="#' + id + '"]').addClass('active');
        }
      }
    });
  };

  /* ===============================
     Init
  =============================== */
  $(function () {
    fullHeight();
    heroSlider();
    datePickers();
    scrollAnimations();
    counters();
    tabs();
    mobileMenu();
    smoothScroll();
    navOnScroll();
  });

})(jQuery);
