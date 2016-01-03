  
 define(["jquery"],function($){

   function styledCheckboxButtons($el,$zone){
       if ($el.hasClass('field-checkbox')) {
           fixCheckbox = function($el){
               if ($el.find('input:checked').size() > 0) {
                  $el.addClass("field-checkbox-checked");
               } else {
                  $el.removeClass('field-checkbox-checked');
               }
               window.setTimeout(function(){
                   if ($el.find('input:focus').size() > 0) {
                      $el.addClass("field-checkbox-focus");
                   } else {
                      $el.removeClass('field-checkbox-focus');
                   }
               },1);
           }
           
           $el.on('change focus blur','input',function(){
              fixCheckbox($el);
           })
           
           fixCheckbox($el);
       }
   }
   
   function styledSelect($el,$zone){
       if ($el.hasClass('field-select')) {
           
           $el.on('focus','select',function(){
              $el.addClass('field-select-focus');
           })
           $el.on('blur','select',function(){
              $el.removeClass('field-select-focus');
           })
        }

        function installSelectBoxIt(s){
            s.selectBoxIt({ autoWidth: false });
            // android scrolls to top on a focus, hacky
            s.bind("touchstart",function(){
                $(".back-to-top").remove();
            })

            $(document).bind('framework.domupdate',function(){
                if (s && s.data && s.data("selectBox-selectBoxIt")) {
                   s.data("selectBox-selectBoxIt").refresh();
                } 
            })
        }

        if ($el.hasClass('field-select2')) {
            var s = $el.find('select');
            // only install select2 on a visible field
            if (s.is(':visible')) {
               installSelectBoxIt(s);
            } else {
                (function(s){
                    s.interval = window.setInterval(function() {
                                    if (s.is(':visible')) {
                                       installSelectBoxIt(s);
                                       window.clearInterval(s.interval);
                                    }
                                }, 500);
                })(s);
            }

        }

   }
 
   function styledRadioButtons($el,$zone){
       if ($el.hasClass('field-radio')) {
           fixRadio = function($el){
               if ($el.find('input:checked').size() > 0) {
                  $el.addClass("field-radio-checked");
               } else {
                  $el.removeClass('field-radio-checked');
               }
               window.setTimeout(function(){
                   if ($el.find('input:focus').size() > 0) {
                      $el.addClass("field-radio-focus");
                   } else {
                      $el.removeClass('field-radio-focus');
                   }
               },1)
           }
           
           fixAllRadio = function() {
              $(".field-radio").each(function(){
                 fixRadio($(this));
              })
           }
           
           $el.on('change focus blur','input',function(){
              fixAllRadio($el,this);
           })
           
           fixRadio($el);
       }
   }
 
 
   return function(zone,el){
       var $el = $(el);
       var $zone = $(zone);
       
       if ($el.data('styledfields-installed') == true) return;
       $el.data('styledfields-installed',true);

       styledRadioButtons($el,$zone);
       styledCheckboxButtons($el,$zone);
       styledSelect($el,$zone);
   }   

 });