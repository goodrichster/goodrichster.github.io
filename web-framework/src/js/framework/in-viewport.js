/*

Detect if an item is viewable in the viewport

*/

define(['jquery'],function($){

    function update($el){
       var settings = {};
       if ($el.is(':in-viewport')) {
           $el.addClass('in-viewport').trigger('framework.in-viewport');
       } else {
           $el.removeClass('in-viewport');
       }
    }

    return function(el) {
       var $el = $(el);
       
       if ($el.data('in-viewport-installed') == true) return;
       $el.data('in-viewport-installed',true);
    
       var $container = $(document.getElementById('s4-workspace') || window);
       $container.bind('scroll', function(event) {
          return update($el);
       });
   
    }
    
});

