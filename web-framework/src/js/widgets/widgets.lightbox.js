
(function( window, $, undefined ) {
    "use strict";

    var Widgets = window.Widgets;

    var Lightbox = {
        style: 'default',
        assetHost: 'http://www.hbs.edu',
       
        ondomready: function(){
        
            if (Widgets.disabled) return;
            
            $(".color-framework").each(function(){
               if (!$(this).parent().hasClass('universal-footer') && !$(this).parent().hasClass('universal-banner') ) {
                  Lightbox.style = 'framework';
               }
            });
            
            $(".widget-popup").click(function(){
                Lightbox.popupLink(this);
                return false;
            });
            $(".widget-popup-dark").click(function(){
                Lightbox.popupLink(this,"html-lightbox-dark");
                return false;
            });
            Lightbox.loadLibs();
            
            $("#fancybox-wrap").remove(); // fix for multiple fancybox installs
        },
        
        popupLink: function(link,className) {
            var href = $(link).attr('href');
            if (href) {
                var options = {width:612,height:2500,autoDimensions:false,autoScale:true,wrapClass:className}
                options.onComplete = function(){ $(document).trigger('framework.domupdate'); };
                if (href.indexOf('#') === 0) {
                    var html = $(href).html();
                    Lightbox.displayHTML(html,options);
                } else {
                    Widgets.Lightbox.displayOverlay();
                    var contentid = $(link).attr('href').split('#')[1];
                    $.get(link.href,function(data){   
                        var html = $(data).find('#'+contentid).html();
                        Lightbox.displayHTML(html,options);
                    });
                }
            }
        },
        
        getStyle: function(){
            return Lightbox.style;
        },

        render: function(html,options) {
            var defaults = {width:500,height:500,autoDimensions:false,autoScale:true,padding:0,scrolling:'yes',
                            transitionIn:'none',transitionOut:'none',overlayColor:'#000',overlayOpacity:0,onClosed:function(){
                                $(document).trigger('widgets.lightbox.closed');
                                Lightbox.removeOverlay();
                            }};
            options = $.extend(defaults,options);
            $.fancybox(html,options);
            if (options.wrapClass) {
                $("#fancybox-wrap").removeClass();
                $("#fancybox-wrap").addClass(options.wrapClass);
            } else {
                $("#fancybox-wrap").removeClass();
            }
            $(".fancybox-close").click(function(){
                $.fancybox.close();
                return false;
            });
        },

        close: function(){
           if ($ && $.fancybox) $.fancybox.close();
        },
        
        displayOverlay: function(){
            if ($("#hbs-widget-overlay").length > 0) return;
            Lightbox.animating = true;
            var opacity = '-moz-opacity: 0.3;opacity:.30;filter: alpha(opacity=30)';
            if (Lightbox.style === 'framework') {
                opacity = '-moz-opacity: 0.9;opacity:.90;filter: alpha(opacity=90)';
            }
            $("body").append('<div id="hbs-widget-overlay" style="'+opacity+';position: fixed;top: 0;left: 0;bottom: 0;right: 0;background-color: black;z-index:1001;display:none;"></div>');
            $("#hbs-widget-overlay").fadeIn(100,function(){
                Lightbox.animating = false;
            });
        },
        
        removeOverlay: function(){
            window.setTimeout(function(){
                $("#hbs-widget-overlay").fadeOut(200,function(){
                    $("#hbs-widget-overlay").remove();
                });
            },10);
        },
       
        loadOnceCSS: function(url) {
            if ($("link[href='"+url+"']").size() === 0) {
                $("head").append("<link>");
                var css = $("head").children(":last");
                css.attr({
                    rel:  "stylesheet",
                    type: "text/css",
                    href: url
                });
            }
        },
        
        loadLibs: function(){
            Lightbox.setAssetHost();
            if (Lightbox.style === 'framework') {
                Lightbox.loadOnceCSS(Lightbox.assetHost+"/videos/js/plugins/fancybox/jquery.fancybox.hbs-framework.css");
            } else {
                Lightbox.loadOnceCSS("//fast.fonts.com/cssapi/340b86ed-e421-467f-9adf-04c7bf70d998.css");
                Lightbox.loadOnceCSS(Lightbox.assetHost+"/videos/js/plugins/fancybox/jquery.fancybox-hbs.css");
            }
        },
        
        setAssetHost:function(){
            if (document.location.protocol === 'https:') {
                Lightbox.assetHost = "https://secure.hbs.edu/static";
            } else if (document.location.host.indexOf("dev") > -1) {
                Lightbox.assetHost = "http://webdev.hbs.edu";
            } else if (document.location.host.indexOf("webstage") > -1 || document.location.host.indexOf("qa") > -1) {
                Lightbox.assetHost = "http://webdev.hbs.edu";
            } 
        },
         
        onReady: function(callback) {
            Lightbox.loadLibs();
            if ($.fancybox) {
                callback.call();
            } else {
                $.ajax({
                    type: 'GET',
                    url: Lightbox.assetHost+'/videos/js/plugins/fancybox/jquery.fancybox-1.3.1.js',
                    cache: true,
                    success: function() {
                        callback.call();
                    },
                    dataType: 'script',
                    data: null
                });
            }
        },
       

        displayHTML: function(html,options){
            Lightbox.displayOverlay();
            options = options || {};
            options.wrapClass = options.wrapClass || "html-lightbox";
            html = '<a href="#" class="fancybox-close">&times;</a>' + html;
            
            window.setTimeout(function(){
                Lightbox.onReady(function(){
                    if (Lightbox.animating) {
                        setTimeout(function() { Lightbox.render(html,options); }, 100);
                    } else {
                        Lightbox.render(html,options);
                    }
                });
            },10); //ie wants a small delay to show the overlay
        }
        
    };
    
    window.Widgets.Lightbox = Lightbox;
    $(document).ready(Lightbox.ondomready);

})(this, jQuery);