/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1.2, { minFontSize: '34px', maxFontSize: '72px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target),
         navOffset = $('#nav-wrap').outerHeight() || 0,
         scrollTarget = target === '#home' ? 0 : Math.max($target.offset().top - navOffset - 18, 0);

	    $('html, body').stop().animate({
	        'scrollTop': scrollTarget
	    }, 800, 'swing', function () {
	        if (window.history && window.history.replaceState) {
               window.history.replaceState(null, null, target);
            } else {
               window.location.hash = target;
            }
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Let the header grow with content while keeping a
/* strong first-screen presence.
------------------------------------------------------ */

   function syncHeaderMinHeight() {
      $('header').css({ 'min-height': $(window).height() });
   }

   syncHeaderMinHeight();
   $(window).on('resize', function() {

        syncHeaderMinHeight();
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   function syncNavigationVisibility() {
		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

      if ($(window).outerWidth() <= 768) {
         nav.removeClass('opaque is-hidden');
         return;
      }

      if (y < h - 20) {
         nav.addClass('is-hidden').removeClass('opaque');
      } else {
         nav.removeClass('is-hidden').addClass('opaque');
      }
   }

   syncNavigationVisibility();
   $(window).on('scroll resize', syncNavigationVisibility);

});








