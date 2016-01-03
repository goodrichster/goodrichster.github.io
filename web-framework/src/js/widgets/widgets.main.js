
(function( window, $, undefined ) {
    "use strict";
    
    var Widgets = {

        options: {},
        
        refresh: function(){
            Widgets.disabled = $('.ms-rtestate-write').size() > 0;
            if (Widgets.disabled) return;

            // run a post load queue if found
            if (window._Widgets) {
               for (var x = 0;x<window._Widgets.length;x++){
                  window._Widgets[x]();
               }
            }

            Widgets._twitter();
            Widgets._sharethis();
            Widgets.Videos.refresh();
        },
        
        _twitter: function(){
            var w = $(".widget-twitter-follow,.widget-twitter-stream");
            if (w.length > 0) {
                Widgets._tryRun("twitter","preInit",Widgets.Twitter,w);
                Widgets.Twitter(w);
                w.removeClass("widget-twitter-follow widget-twitter-stream"); // prevent double-installation
            }
        },
        
        _sharethis: function(){
            var ShareBar = Widgets.ShareBar;
            
            $(".widget-sharethis").each(function(){
                Widgets._tryRun("sharethis","preInit",ShareBar,this);
                ShareBar.shareThis(this);
            });
            
            var hasBar = false;
            $(".widget-sharebar").each(function(){
                hasBar = true;

                Widgets._tryRun("sharethis","preInit",ShareBar,this);
                     
                var options = {};
                     
                //data-title and data-url are set in video popups
                var iTitle = $(this).attr('data-title');
                if (typeof iTitle === 'undefined'){ iTitle = "";}
                options.itemTitle = iTitle;
                 
                var iUrl = $(this).attr('data-url');
                if (typeof iUrl === 'undefined'){ iUrl = "";}
                options.itemUrl = iUrl;
                 

                var comments = $(this).attr('data-comments');
                var commentsAnchor = $(this).attr('data-comments-anchor');
                if (typeof comments !== 'undefined') {
                    options.commentCount = parseInt(comments,10);
                    options.comment = true;
                    if (typeof commentsAnchor !== 'undefined') {
                        options.commentAnchor = commentsAnchor;
                    }
                }
                   
                   
                var download = $(this).attr('data-download');
                if (typeof download !== 'undefined') {
                    options.download = download;
                }
                 
                var print = $(this).attr('data-print');
                if (typeof print === 'undefined') {
                    options.print = false;
                } else {
                    if (print !== 'true') {
                        options.printUrl = print;
                    }
                }

                var facebook = $(this).attr('data-facebook');
                if (typeof facebook !== 'undefined') {
                    options.fbrecommend = facebook == 'false' ? false : true;
                }
                 
                if ($(this).attr('data-style') === 'framework' || $(this).hasClass('widget-style-framework')) {
                    options.style = 'framework';
                    options.wrapperClass = 'dark'; 
                    if ($(this).hasClass('light')) {
                        options.wrapperClass = 'light';
                    }
                    if ($(this).hasClass('mini')) {
                        options.wrapperClass += ' mini';
                    }
                    $(this).html(ShareBar.create(options));
                } else {
                    $(this).html(ShareBar.create({itemTitle:iTitle, itemUrl:iUrl}));
                }
                if (window.FB) window.FB.XFBML.parse();
            });

            if (hasBar) {
                $(document).trigger('framework.domupdate');
            }


        },
   
        _tryRun: function(moduleName,name,module,args) {
            if (Widgets.options[moduleName] && typeof Widgets.options[moduleName][name] === "function") {
                Widgets.options[moduleName][name].call(module,args);
            }
        },

        // user configurable options
        settings: function(module,opt){
            if (!Widgets.options[module]) Widgets.options[module] = {};
            for (var v in opt) {
                Widgets.options[module][v] = opt[v];
            }
        }

    };

    window.Widgets = Widgets;
    $(document).ready(Widgets.refresh);

})(this,jQuery);

/* ----------------------------------------------------
 *
 * for browsers that don't support logging
 *
 * ----------------------------------------------------
 */
 
if(typeof console === 'undefined' || typeof console.info === 'undefined') {
    var names = ["log", "debug", "info", "warn", "error", "assert","dir", "dirxml", "group","groupEnd", "time", "timeEnd", "count", "trace","profile","profileEnd"];
    window.console = {};
    for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}