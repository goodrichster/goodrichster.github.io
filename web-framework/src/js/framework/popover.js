/*

activate popovers

*/

define(['jquery'],function($){

    function showPopover($container,$target,$content) {
       $container.addClass("popover-active");
       $content.fadeIn('fast');
    }
    
    function hidePopover($container) {
       $container.removeClass("popover-active");
       $(".popover-content",$container).fadeOut('fast');
    }

    return function(el){
        var $el = $(el);
        if ($el.data('popover-installed') == true) return;
        $el.data('popover-installed',true);
        
        var config = {
            over: function(){
                var $content = $(this).next('.popover-content');
                if ($content.size() == 0) { 
                   $content = $(this).find('.popover-content');
                }
                hidePopover($el);
                showPopover($el,$(this),$content)
            },
            out: function(){
               hidePopover($el);
            },
            interval: 20,
            sensitivity:10
        }
        
        $(".popover-toggle",$el).hoverIntent(config);
        
    }
});

