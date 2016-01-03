/*

List filtering

*/   
     
define(['jquery','framework/exports'],function($,FW){

    function filter(el, str) {
        if (str == $(this).data('current-filter'))
            return;
        $(this).data('current-filter', str);
        var li = $(el).data('li');
        if (!li || li.length == 0) {
            console.info('loading');
            li = $('.filtering-list>li', el);
            $(el).data('li', li);
        }
        li.hide();
        li.each(function () {
            var txt = $(this).data('text');
            if (!txt) {
                txt = $(this).text().toLowerCase();
                $(this).data('text', txt);
            }
            if (!str || txt.indexOf(str) > -1) {
                $(this).show();
            }
        });
     }

     return function(el){
       if ($(el).data('filtering-installed') == true) return;
       $(el).data('filtering-installed',true);
                     
       /*$('.filtering-input',el).bind('keyup',function () { 
          filter(el,$(this).val())
       });*/

       $('.filtering-input',el).bind('keyup',FW.debounce(function (e) {
              filter(el,$(this).val())
        }, 150, false));
          


       $('.filtering-input',el).bind('change',function () { 
          filter(el,$(this).val())
       });

        
    }     
});

 