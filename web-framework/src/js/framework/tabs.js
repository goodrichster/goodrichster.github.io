/*
activate page tabs
*/

define(['jquery'],function($){
	return function(el){

        var $el = $(el);
        if ($el.data('tabs-installed') === true) return;
        $el.data('tabs-installed',true);

        var toggleClass = 'inherit-bg';
        if ($(el).hasClass('active-white-bg')) toggleClass = 'white-bg';

        $(el).on("mouseenter","a",function(){
            if (!$(this).hasClass(toggleClass) && $("html").hasClass('ua-no-touch')) $(this).addClass('hover');
        });
        $(el).on("mouseleave","a",function(){
            if (!$(this).hasClass(toggleClass)) $(this).removeClass('hover');
        });
        $(el).on("click","a[href^='#']",function(event,skipAnalytics){
            var clicked = this;
            var scrollContainer = $el.parents(".fade-container-active").eq(0)
            if (scrollContainer.length) {
                if ($el.is('table')) {
                   scrollContainer.find('.overflow-x').animate({scrollLeft: $(clicked).offset().left + scrollContainer.find('.overflow-x').scrollLeft() - 60}, 500);
                } else {
                   $el.animate({ scrollLeft: $(clicked).offset().left + $el.scrollLeft() - 40}, 500);
                }
            }
            $("a",$(this).parents('.nav-tabs').eq(0)).each(function(){
               $(this).removeClass(toggleClass+' hover');
               $(this).parent().removeClass('active');
               var id = this.href.split('#',2)[1];
               //console.info('click',clicked,skipAnalytics);
               $target = $("*[id='"+id+"']");
               if (window.analytics && !skipAnalytics && clicked == this && $target.length) analytics.event('nav-tab-'+id.toLowerCase());
               clicked == this ? $target.show() : $target.hide();
            });
            $(clicked).addClass(toggleClass).parent().addClass('active');
            $(document).trigger('framework.domupdate');
            return false;
        })   
	    $(el).find("li, td").eq(0).find("a").trigger('click',true);
	}     
});

