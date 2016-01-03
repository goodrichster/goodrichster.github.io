/*
Slider.js
*/   
     
define(['jquery'],function($){

    return function(el){
    
       var $el = $(el);

       if ($(el).data('slider-installed') == true) return;
       $(el).data('slider-installed',true);
       
        $(".slider-open",$el).click(function(e){
            if ($(this).hasClass('inherit-bg')) {
                // it is already open
                var c = $(this).removeClass('inherit-bg').parents(".slider-container")
                c.addClass('slider-closing').removeClass('slider-open');
                window.setTimeout(function(){c.removeClass('slider-closing')},400);
            } else {
                $(".slider-open",$el).removeClass('inherit-bg');
                $(this).addClass('inherit-bg');
                var target = $(this).data('target');
                $(".slider-targets",$el).hide();
                $(document.getElementById(target)).show();
                $(this).parents(".slider-container").addClass('slider-open');
            }
            e.preventDefault();
        })
        $(".slider-close",$el).click(function(e){
            $(".slider-open",$el).removeClass('inherit-bg');
            var c = $(this).parents(".slider-container").addClass('slider-closing')
            c.addClass('slider-closing').removeClass('slider-open');
            window.setTimeout(function(){c.removeClass('slider-closing')},400);
            e.preventDefault();
        })
        $(".slider-backdrop",$el).click(function(e){
            $(this).parents(".slider-container").removeClass('slider-open');
            e.preventDefault();
        })
            
    }     
});

