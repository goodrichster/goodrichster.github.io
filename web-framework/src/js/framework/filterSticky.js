/*
Enables sticky Filters on mobile devices
*/

define(['jquery'],function($){
	
	return function(el){ 
	
		$(window).scroll(function (event) {
			var filterSticky = $('.filter-sticky');
			var filter = $('.filter-top');		
            if (filter.length == 0) return;
			
			var top = filter.offset().top - parseFloat(filter.css('marginTop')) +5;

			var ypos = $(this).scrollTop();
			if (ypos >= top && !$('.filter-top > div > div.toggled').length) {
				filterSticky.addClass('fixed');
			}
			else {
				filterSticky.removeClass('fixed');
				filterSticky.css('opacity',"0");
				filterSticky.css('visibility',"hidden");
			}
		});

		$('.responsive-filters .filter-sticky').click(function(){
			$('.filter-top .toggle-container:not(.toggled) a.toggle-button').eq(0).click();
		});

	}

});







	