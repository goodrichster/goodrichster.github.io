/*
// trigger resize event
*/

define(['jquery','framework/exports'],function($,FW){
     
       return function(){
       
          if ($(window).data('resize-installed') == true) return;
          $(window).data('resize-installed',true);

          
          $(window).bind('resize',FW.debounce(function (e) {
              $(document).trigger('framework.resize');
          }, 250, false));
          
       }
       
});     