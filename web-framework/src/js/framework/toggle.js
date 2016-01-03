/*
toggle container

*/

define(['jquery','framework/exports'],function($,FW){

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function saveToggleCookie(el,save){
        var id = $(el).attr('id');
        if (!id) return;
        var cookie = readCookie("fw.toggle");
        var parts = [];
        if (cookie != null) parts = cookie.split('&');
        var states = []
        var found = false;
        for (var i = 0;i<parts.length;i++) {
           if (!save && parts[i] == id) {
              // pass
              found = true;
           } else if (save && parts[i] == id) {
              found = true;
              states.push(id);
           } else if (parts[i]) {
              states.push(parts[i]);
           }
        }
        if (!found && save) states.push(id);
        document.cookie = "fw.toggle=" + states.join('&') + '; path=/';
    }
    
    function loadToggleCookie(el){
        var id = $(el).attr('id');
        if (!id) return;
        var cookie = readCookie("fw.toggle");
        if (cookie) {
           var parts = cookie.split("&");
           for (var i = 0; i<parts.length;i++) {
              if (parts[i] == id) {
                 return true;
              }
           }
        }
        return false;
    }
   

    function isClosest(obj,thisContainer) {
       var objContainer = $(obj).closest(".toggle-container")[0]
       return $.data(objContainer) == $.data(thisContainer);
    }
    
    return function(el){ 
    
       if ($(el).data('toggle-installed') == true) return;
       $(el).data('toggle-installed',true);
       
       $(".toggle-show",el).hide();
       
       $(el).find(".toggle-button").each(function(){
          //not working on certain devices, android Firefox
          //FW.fastClick(this);
       });

       $(el).bind('reset',function(){
         $(el).removeClass('toggled');
         $(el).find('input.toggle-button:checkbox').prop('checked', false);
         $(".toggle-show",el).each(function(){
            if (isClosest(this,el)) {
               $(this).hide();
            }
         });
         $(".toggle-hide",el).each(function(){
            if (isClosest(this,el)) {
               $(this).show();
            }
         });
       });
       
       $(el).on("click",".toggle-button",function(event){

          var target = $(this).attr('href');
          if (typeof target === 'string' && target.indexOf('#') == 0) target = target.substring(1);

          if ($(this).hasClass('toggle-plus') || $(this).hasClass('toggle-minus')) {
            $(this).toggleClass('toggle-plus toggle-minus');
          }

          if (isClosest(this,el)) {
              // hunt for toggle-show,toggle-hide
              $(".toggle-hide,.toggle-show,.mobile-toggle-show,.mobile-toggle-hide",el).each(function(){
                 if (isClosest(this,el)) {
                     if (!target || !$(this).attr('id') || (target == $(this).attr('id'))) {
                        $(this).addClass("to-toggle");
                     }
                 }
              })
              // hunt for any IDs outside
              if (target) {
                 $("#"+target).addClass("to-toggle");
              }
              $(".to-toggle").each(function(){
                  if ($(this).hasClass('has-slide')) {
                     $(this).slideToggle('fast');
                  } else {
                     $(this).toggle();
                  }
                  $(this).removeClass("to-toggle");
                  $(this).parent().find('.toggle-focus:visible').focus();
              })

              $(el).toggleClass('toggled');
              if ($(el).hasClass('has-memory')) {
                 saveToggleCookie(el,$(el).hasClass('toggled'));
              }
              $(document).trigger('framework.domupdate');
              $(el).trigger('change');
              if ($(this).is(':checkbox')) {
                 //alert('checkbox');
              } else {
                  event.stopPropagation();
                  event.preventDefault();
              }
          }


       })
       
       if ($(el).hasClass('has-memory')) {
          if (loadToggleCookie(el)) {
             $(el).toggleClass('toggled');
             $(el).find('input.toggle-button:checkbox').prop('checked', true);
             $(".toggle-hide,.toggle-show",el).each(function(){
                if (isClosest(this,el)) {
                   $(this).toggle();
                }
             })
          }
       }
       
    }     
});

