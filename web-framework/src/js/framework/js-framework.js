
require(
         ["jquery",
         "framework/smoothscroll",
         "framework/tabs",
         "framework/choice",
         "framework/megamenu",
         "framework/links",
         "framework/slideshow",
         "framework/obfuscate",
         "framework/expandable",
         "framework/backtotop",
         "framework/dropdown",
         "framework/toggle",
         "framework/datepicker",
         "framework/carousel",
         "framework/placeholder",
         "framework/trim",
         "framework/formcontainer",
         "framework/resize",
         "framework/useragent",
         "framework/hover",
         "framework/popover",
         "framework/lazy",
         "framework/iframe",
         "framework/randomize",
         "framework/scroll-lock",
         "framework/in-viewport",
         "framework/styledfields",
         "framework/imgcontroller",
         "framework/timeago",
         "framework/overflow",
         "framework/slider",
         "framework/autorender",
         "framework/cover",
         "framework/map",
         "framework/inputmask",
         "framework/filtering",
         "framework/typeahead",
         "framework/filterSticky"
         ],
  function($,smoothscroll , tabs , choice, megamenu, links, slideshow, obfuscate, 
           expandable ,backtotop, dropdown, toggle, 
           datepicker, carousel, placeholder, trim, formcontainer, 
           resize, useragent, hover, popover, lazy, iframe, randomize, scrolllock, inview, styledfields, imgcontroller, 
           timeago, overflow, slider, autorender, cover, map, inputmask, filtering,typeahead, filterSticky ){
  

    var oldJQuery = typeof $.fn.on == 'undefined';

    function main(){
   
        // return if in edit mode
        if ($('.ms-rtestate-write').size() > 0) return;

        useragent();
        resize();

        $(".js-framework").each(function(){
             var $zone = $(this);

             // support this for older sites
             $(".dropdown-container,.dropdown-container2,.dropdown-container3",this).each(function(){
                dropdown(this);
             });

             // return if jquery is too old
             if (oldJQuery) return;

             $(".random-container",this).each(function(){
                randomize(this);
             });
             
             $(this).on("click","a[href*='#']",function(e,args){
                smoothscroll(this,e,args == 'mock');
                return true;
             })
             
             $(".slider-inject,.h1-responsive-nav,.responsive-facet-inject,.responsive-filters-inject",this).each(function(){
                autorender(this);
             });

             $(".nav-tabs",this).each(function(){
                tabs(this);
             });

             $(".megamenu-container",this).each(function(){
                megamenu(this);
             });

             $(".hover-container",this).each(function(){
                hover(this);
             });
             
             $(".to",this).each(function(){
                obfuscate(this);
             });

             $(".filtering-container",this).each(function(){
                filtering(this);
             });

             $(".in-viewport-trigger",this).each(function(){
                inview(this);
             });

             $(".table-overflow",this).each(function(){
                overflow(this);
             });

             $(".typeahead-container",this).each(function(){
                typeahead(this);
             });

             $(".plusminus, .accordian, .mobile-accordion, .mobile-accordion2, .mobile-expandable-headings",this).each(function(){
                expandable(this);
             });
             
             $(".lazy,.defer,.ondemand",this).each(function(){
                lazy(this);
             });
             
             $(".slider-container",this).each(function(){
                slider(this);
             });

             $(".map-container",this).each(function(){
                map(this);
             });
             
             $("input[placeholder].field",this).each(function(){
                placeholder(this);
             });

             $("input[data-mask]",this).each(function(){
                inputmask(this);
             });
             
             $(".back-to-top",this).each(function(){
                backtotop(this);
             });
             
             $(".trim-container",this).each(function(){
                trim(this);
             });

             $(".scroll-lock",this).each(function(){
                scrolllock(this);
             });

             $(".iframe-container",this).each(function(){
                iframe(this);
             });

             $(".choice-container",this).each(function(){
                choice(this);
             }); 
             

             $(".link-controller",this).each(function(){
                links(this);
             });

             $(".img-controller",this).each(function(){
                imgcontroller(this);
             });
             
             $(".toggle-container",this).each(function(){
                toggle(this);
             });
             
             $(".timeago",this).each(function(){
                timeago(this);
             });

             $(".datepicker,.datepicker-container",this).each(function(){
                datepicker(this);
             });
             
             $(".popover-container",this).each(function(){
                popover(this);
             });
             
             $(".cover-container",this).each(function(){
                cover(this);
             });
             
             $(".filter-sticky",this).each(function(){
                filterSticky(this);
             });
           
             $(".slideshow-container",this).each(function(){
                slideshow(this);
             });

             $(".carousel-container",this).each(function(){
                carousel(this);
             });
             
             $(".field-checkbox,.field-radio,.field-select,.field-select2",this).each(function(){
                styledfields($zone,this);
             });

             $(".form-container",this).each(function(){
                formcontainer(this);
             });

             $(".responsive-breadcrumb > li:last-child .txt-arrow").hide() // ie fix

         })
     }

     
     // after you update the dom, trigger a domupdate to reattach your events
     $(document).bind("framework.domupdate",main);

     $(document).ready(function(){

        // add esc event
        $(document).keyup(function(e){
            if(e.keyCode === 27) $(document).trigger('esc');
        });


        // execute any deferred load calls
        if (typeof window._onload === 'object') {
            for (var i = 0;i<window._onload.length;i++){
                 $(window).load(window._onload[i]);
            }
            window._onload = [];
        }

        if (typeof window._domready === 'object') {
            for (var i = 0;i<window._domready.length;i++){
                 $(document).ready(window._domready[i]);
            }
            window._domready = [];
        }

        $(document).trigger("framework.domupdate");
        if (window.analytics && window.analytics.rebind) {
            $(document).bind("framework.domupdate",function(){
               window.window.analytics.rebind();
            });
        }
     })
     
     // hide the address bar in mobile devices
     /* stopped working in IOS7
     var rx = /mobile/i;
     if (rx.test(navigator.userAgent) && !location.hash) {
        if (!window.pageYOffset) window.scrollTo(0, 1);
     }
     */
     
  })


var _analytics = window._analytics || [];
_analytics.push(function(){
    if (window.analytics && analytics.warn) {
        // warn for non-responsive
        analytics.warn(function(){
            return $(".responsive-framework").length == 0 ? 'non-responsive' : '';
        });
        // warn for off-brand
        analytics.warn(function(){
            return $(".type-framework").length == 0 ? 'off-brand' : '';
        });
        // warn for legacy videos
        analytics.warn(function(){
            var result = '';
            $(".widget-video-popup,.widget-video-inline,.widget-video-embed").each(function(){
                if (this.href && this.href.indexOf('/videos/') > -1) {
                   result = 'legacy-videos';
                }
            })
            return result;
        });
    }
})


