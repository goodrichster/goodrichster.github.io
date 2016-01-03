  
 define(["jquery"],function($){
 
    // this function accounts for 
    // 1) a touch device double-clicking events on a popup
    // 2) a touch device hovering, but not touchend
    // 3) a desktop
    function open($el,touched){

       $("body").trigger("framework.dropdown.closeall");

       if ($el.hasClass('dropdown-container3')) {

         $el.find('.dropdown-anchor').toggleClass('dropdown-anchor');
         var anchor = $('<div class="dropdown-anchor"></div>');
         var menu = $el.find('.dropdown-menu3').eq(0);
         $el.find('.dropdown-toggle3').addClass('active');
         
         if( (
                $el.offset().top > ($(window).scrollTop() + $(window).height() - menu.height())) && 
                ($el.offset().top - menu.height()) > 0

             ) {
             anchor.addClass('dropdown-anchor-up');
             $el.prepend(anchor)
         } else {
             anchor.addClass('dropdown-anchor-down');
             $el.append(anchor)
         } 

         if( ($el.offset().left > ($(window).scrollLeft() + $(window).width() - menu.width())) ) {
             anchor.addClass('dropdown-anchor-left');
         } else {
             anchor.addClass('dropdown-anchor-right');
         }

         menu.appendTo(anchor)
       }


       if ($el.hasClass('active')) { 
         close($el); 
         return; 
       }

       $el.find('.hover').removeClass("hover inherit-bg");
       $el.addClass('opening active').trigger('opened');
       $el.find('.filtering-input').val('').trigger('change');;
       if (touched) {
           window.setTimeout(function(){
              $el.removeClass('opening');
           },1000);
       } else {
           if ($("html").hasClass('ua-touch')) {
               window.setTimeout(function(){
                  $el.removeClass('opening');
               },1000);
           } else {
               $el.removeClass('opening');
           }
       }
    }
    
    function close($el) {
       if ($el.hasClass("opening")) return;
       $el.removeClass('active');
       $el.find('.dropdown-toggle3').removeClass('active').trigger('closed');;
    }
    
    function bindevents($el) {

        // hover states for inner links
        $(".dropdown-menu a,.dropdown-menu2 a",$el).on("mouseenter",function(){
            if ($el.hasClass("opening")) return;
            $el.find('.hover').removeClass("hover inherit-bg");
            $(this).addClass('inherit-bg').addClass("hover");
        });

        $(".dropdown-menu a,.dropdown-menu2 a",$el).on("mouseleave",function(){
            //$(this).removeClass('inherit-bg').removeClass("hover");
        });

        // prevent double clicking on touch devices
        $(".dropdown-menu a,.dropdown-menu2 a",$el).on("click",function(event){
            if ($el.hasClass("opening")) return false;
            // change the text on anchor links
            if ($(this).is("a[href^='#']")) {
                var val = $(this).text();
                $('.dropdown-toggle',$el).html(val + '<span class="icon-select"></span>');
                close($el);
                event.preventDefault();
            }
        })

        $el.on('click','.dropdown-option',function(){
            $(".inherit-color.active",$el).removeClass('inherit-color active').addClass('white');
            $(this).addClass('inherit-color active').removeClass('white');
            $el.find('.dropdown-selected').html($(this).html());
            document.location.hash = $(this).attr('href');
            $el.trigger('change');
        })
        
        /*
        NOT SURE WHY THIS IS HERE, it broke the lenovo
        $el.on("click",function(){
            if (!$el.hasClass("active")) {
              return false;
            }
        })
        */
        
        // close the menu on a body click
        if ($el.hasClass('dropdown-container') || $el.hasClass('dropdown-container2')) {
          $("body").on("click",function(event){
             if (!$(event.target).is("a")) {
                close($el);
             }
          });
        }

        if ($el.hasClass('dropdown-container3')) {
          $("body").on("click",function(event){
             if ($el.has(event.target).length == 0) {
                close($el);
             }
          });
          $el.on('click','.dropdown-close3',function(event){
            close($el);
            event.preventDefault(); 
          })
        }



        $("body").on("framework.dropdown.closeall",function(event){
           close($el);
        });

        $(document).on('esc.dropdown',function(e){
            close($el);
        });
        
    }
 
    // this was much more complicated than I expected to account for touch devices
    // if you make a change, be sure to test on ipad old, ipad new, android.
 
    return function(el){
    
        var $el = $(el);

        if ($el.data('dropdown-installed') == true) return;
        $el.data('dropdown-installed',true);

        if (!$.fn.on) $.fn.on = $.fn.bind;
       
        // disable clicking on the toggle link
        $("a.dropdown-toggle",$el).click(function(){
            open($el,true);
            return false;
        });

        $("a.dropdown-toggle2",$el).click(function(){
            open($el);
            return false;
        });

        $("a.dropdown-toggle3",$el).click(function(){
            if ($el.hasClass('active')) {
              close($el);
            } else {
              open($el);
            }
            return false;
        });
        
        /* Firing this event breaks touch devices 
        $el.on("touchend",function(event){
           open($el,true);
        });
        */
        
        if ($el.hasClass('dropdown-container')) {
           $el.on("mouseenter",function(event){
              open($el);
           });
           $el.on("mouseleave",function(){
               close($el);
           });
        }


        
        if ($el.hasClass('dropdown-container2')) {
          // adjust the width of dropdown2 
          var w = $(".dropdown-toggle2",$el).width();
          if (w) {
             if ($(".dropdown-menu2",$el).attr('class').indexOf("dropdown-split") > -1) {
                // do nothing
             } else {
                $(".dropdown-menu2",$el).css('min-width',w+12);
             }
          }
        }

        bindevents($el);

        
    }
 });