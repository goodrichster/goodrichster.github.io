/*
// setup iframe container
*/

define(['jquery'],function($){
     
       return function(el){
          var $el = $(el);
       
          if ($(el).data('iframe-installed') == true) return;
          $(el).data('iframe-installed',true);

          var src = $(el).find('a').attr('href');
          $(el).find('a').remove();
          var iframe = document.createElement('iframe');
          iframe.src = src;
          var style = $(el).attr('style');
          console.info(style);
          $(iframe).attr('style',style);
          $(iframe).attr('scrolling','no');
          $(iframe).css('width','100%');
          $(iframe).attr('frameborder','0');
          $el.append(iframe);

          
       }
       
});     