/*
megamenu 
*/

define(['jquery'],function($){
    return function(el){

        var $el = $(el);
        if ($el.data('megamenu-installed') === true) return;
        $el.data('megamenu-installed',true);

        $el.on("click",".megamenu-close",function(event){
            $(".megamenu-toggled",el).removeClass("megamenu-toggled");
            event.preventDefault();
        });

        $("body").click(function(event){
            if (!jQuery.contains(el,event.target)) {
               $(".megamenu-toggled",el).removeClass("megamenu-toggled");
            }
        });

        var opening = false;

        $el.on("click",".megamenu-button",function(event){
            var item = $(this).parents(".megamenu-item").eq(0);
            if (item.hasClass('megamenu-toggled')) {
                $(".megamenu-toggled",el).removeClass("megamenu-toggled");
            } else {
                $(".megamenu-toggled",el).removeClass("megamenu-toggled");
                $(item).addClass("megamenu-toggled");
            }

            event.preventDefault();
        })   
    }     
});

