/*

hover styles

*/

define(['jquery'],function($){

    return function(el){

        var $el = $(el);
        if ($el.data('hover-installed') == true) return;
        $el.data('hover-installed',true);

        $el.on({
            mouseenter: function () {
                //stuff to do on mouse enter
                console.info('enter');
                $el.find(".hover-sync").addClass('hover').filter('a').addClass('u');
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                console.info('exit');
                $el.find(".hover-sync").removeClass('hover').filter('a').removeClass('u');
            }
        },".hover-sync");

    }
});

