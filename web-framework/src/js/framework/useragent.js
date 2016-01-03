/*

Add device detection classes

*/

define(['jquery','framework/modernizr.custom'],function($,m){

    function is_touch_device() {
      //http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
      return 'ontouchstart' in window // works on most browsers 
             || navigator.maxTouchPoints; // works on ie10/11
    }

    function is_retina() {
      if (window.devicePixelRatio >= 2) {
        //console.log("Retina display detected.");
        return true;
      } else {
        //console.log("Standard display detected.")
        return false;
      }      
    }

    function checkBreakpoints(){
       var $html = $("html");
       var currClass = '';
       if ($html.hasClass('ua-desktop')) {
         currClass = 'ua-desktop';
       } else if ($html.hasClass('ua-tablet')) {
         currClass = 'ua-tablet';
       } else if ($html.hasClass('ua-mobile')) {
         currClass = 'ua-mobile';
       }

       var finalClass = 'ua-desktop';
       var w = $(window).width();
       if (w < 650) {
           finalClass = 'ua-mobile';
       } else if (w < 920) {
           finalClass = 'ua-tablet';
       }

       if (currClass == finalClass) {return;}

       $html.removeClass('ua-desktop ua-tablet ua-mobile');

       if (finalClass == 'ua-desktop') {
          $html.removeClass('ua-tablet ua-mobile');
       } else if (finalClass == 'ua-tablet') {
          $html.removeClass('ua-desktop ua-mobile');
       } else if (finalClass == 'ua-mobile') {
          $html.removeClass('ua-desktop ua-tablet');
       }
       if (!$html.hasClass(finalClass)) {
          $html.addClass(finalClass);
          if (currClass) {
             $(document).trigger('framework.breakpoint');
          }
       }
    }


    return function() {
       var $html = $("html");

       $html.addClass("ua-js");
       
       if ($html.data('useragent-installed') == true) return;
       $html.data('useragent-installed',true);
  
       if (is_touch_device()) $html.addClass("ua-touch");
       else $html.addClass("ua-no-touch");

       if (is_retina()) $html.addClass("ua-retina");
       else $html.addClass("ua-not-retina");

       $(document).bind("framework.resize",checkBreakpoints);
       checkBreakpoints();


    }
    
});

