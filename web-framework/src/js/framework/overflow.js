/*
overflow container
*/
jQuery.fn.isChildOverflowing = function(child) {
    var p = jQuery(this).get(0);
    var el = jQuery(child).get(0);
    return (el.offsetTop < p.offsetTop || el.offsetLeft < p.offsetLeft) ||
            (el.offsetTop + el.offsetHeight > p.offsetTop + p.offsetHeight || el.offsetLeft + el.offsetWidth > p.offsetLeft + p.offsetWidth);
};

define(['jquery'],function($){

    function fadeCheck(el){
        var $element = $(el);
        var $overflow = $(el).parent();
        var $wrap = $overflow.parent();
        if ($element.outerWidth(true) > $overflow.width()) {
            $wrap.addClass('fade-container-active');
        } else {
            $wrap.removeClass('fade-container-active');
        }
    }

    function liFadeCheck(el) {
        var $element = $(el);
        var $overflow = $(el).parent().parent();//parent div
        var $lastli = $element.find('li:last-child');
        if ($lastli != undefined) {
            var state = $element.isChildOverflowing($lastli);
            // console.log("element", $element);
            // console.log("state ", state);
            if (state) {
                $overflow.addClass('fade-container-active');
            } else {
                $overflow.removeClass('fade-container-active');
            }
        }
    }


    return function(el){
    
       if ($(el).data('overflow-installed') == true) return;
       $(el).data('overflow-installed',true);
       
       $(el).wrap('<div class="fade-container"><div class="overflow-x"></div></div>');
       $(document).bind('framework.resize',function(){
          fadeCheck(el);
          if ($(el).hasClass('liFadeChecker') == true) {
                liFadeCheck(el);
          }
       });
       fadeCheck(el);
        if ($(el).hasClass('liFadeChecker') == true) {
            liFadeCheck(el);
        }
        //console.log(el);

    }     
});

