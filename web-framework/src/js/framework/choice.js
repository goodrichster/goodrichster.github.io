/*
activate choice buttons
*/

define(['jquery'],function($){


    function toggle(clicked,el) {
        $(el).find('.choice-button-active').removeClass('choice-button-active');
        $(clicked).addClass('choice-button-active');
        $("a.choice-button",el).each(function(){
           $target = $(document.getElementById(this.href.split('#',2)[1]));
           clicked == this ? $target.show() : $target.hide();
           clicked == this ? $target.addClass('choice-active') : $target.removeClass('choice-active');
        });
        $("option.choice-button",el).each(function(){
           $target = $(document.getElementById(this.value.split('#',2)[1]));
           clicked == this ? $target.show() : $target.hide();
           clicked == this ? $target.addClass('choice-active') : $target.removeClass('choice-active');
        });
        $(document).trigger('framework.domupdate');
        $(el).trigger('changed');
    }

    return function(el){

        var $el = $(el);
        if ($el.data('choice-installed') === true) return;
        $el.data('choice-installed',true);

        if ($(el).is('select')) {
            $(el).on('change',function(){
                toggle($(this).find(':selected')[0],el);
            })
            toggle($(el).find(':selected')[0],el);
        }

        $(el).on("click","a[href^='#']",function(event){
            toggle(this,el);
            event.preventDefault();
        })   
        $(el).find(".choice-button").eq(0).click();           
    }     
});

