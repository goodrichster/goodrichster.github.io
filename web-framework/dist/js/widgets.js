/*! Framework 1.1.0 - 2015-12-28 4:22:48 PM EST - dgoo */

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

/*
 *
 * ShareBar Widget
 *
 */

(function( window, $, undefined ) {
    "use strict";
    
    var ShareBar = {

        libsLoaded: false, 
        assetHostSet: false,
        assetHost: "http://www.hbs.edu",

        setAssetHost: function() {
            if(ShareBar.assetHostSet) return;
            var jsfile = $('script[src*="widgets.js"]').attr('src');
            if (jsfile.indexOf("dev") > -1 || document.location.href.indexOf("dev") > -1 ) {
                ShareBar.assetHost = "http://webdev.hbs.edu/shared";
            } else if (jsfile.indexOf("webstage") > -1 || document.location.href.indexOf("webstage") > -1) {
                ShareBar.assetHost = "http://webstage.hbs.edu";
            } 
            ShareBar.assetHostSet = true;
        },
        
        loadLibs: function(){
            if (ShareBar.libsLoaded) return;
            ShareBar.setAssetHost();
            //add sharebar.css 
            var css;
            if ($("link[href*='sharebar.css']").size() === 0) {
                $("head").prepend("<link>");
                css = $("head").children(":first");
                css.attr({
                    rel:  "stylesheet",
                    type: "text/css",
                    href: ShareBar.assetHost+"/js/widgets/sharebar/sharebar.css"
                });
            }
            if ($("link[href*='framework.css']").size() === 0) {
                $("head").prepend("<link>");
                css = $("head").children(":first");
                css.attr({
                    rel:  "stylesheet",
                    type: "text/css",
                    href: document.location.host.indexOf("dev") > -1 ? "http://webdev.hbs.edu/shared/css/framework.css" : "https://secure.hbs.edu/static/shared/css/framework.css"
                });
            }
        },
        
        //load facebook libraries
        loadJSLibs: function(options){

            if (!ShareBar.jslibsLoaded) {
                if (options.fbrecommend || options.fblike) {
                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); 
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                }

                if (options.linkedin) {
                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = "//platform.linkedin.com/in.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'linkedin-jssdk'));
                }

            }

            ShareBar.jslibsLoaded = true;
        },
        

        // careful with chinese characters and ampersands
        // www.exed.hbs.edu/cn/programs/gcpc-cn/Pages/default.aspx
        unicodeEscape: function(string) {
            string = string.replace(/&/g,'%26');
            var s = string.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
                return '&#'+c.charCodeAt(0) + ';';
            });
            return s;
        },

        create: function(options){

            if (!window.Widgets.options.sharebar) window.Widgets.options.sharebar = {};

            if (typeof options === 'undefined') options = {};
            
            //If specific title and url are provided, use those instead of the document properties.
            var title = (options && options.itemTitle) ? options.itemTitle : document.title;
            var url = (options && options.itemUrl) ? options.itemUrl : document.location.href;

            
            url = url.replace(/#.*?$/,''); // strip any hash signs
            url = url.replace(/utm_[a-zA-Z0-9_%().=]+/g,''); // strip google campaign parameters
            url = url.replace(/[&?]+$/,''); // strip any trailing & or ?

            var defaults = {
                    showDottedBorders: true,
                    comment:false,
                    commentCount: 0,
                    commentAnchor: 'comments',
                    print: true,
                    printUrl: '#',
                    theme: 'dark',
                    downloadLabel: 'Download',
                    email: true,
                    wrapperClass: '',
                    mailtoSubject: 'You have received a shared article',
                    sharethis:true,
                    sharethisLabel: 'Share This',
                    style: 'default',
                    emailLabel: 'Email',
                    printLabel: 'Print',
                    fbrecommend:true
                };

            options = $.extend(defaults,options);
            options = $.extend(options,window.Widgets.options.sharebar);
            ShareBar.setAssetHost();
            
            var s = ShareBar.unicodeEscape(options.mailtoSubject);
            var t = ShareBar.unicodeEscape(title);
            options.mailto = 'mailto:?subject='+s+'&amp;body='+t+'%0A'+escape(url);
            
            var html = '';
            
            var shareBarClass = (!options.showDottedBorders) ? "noborders" : "";

            if (options.style === 'framework') {
                ShareBar.loadJSLibs(options);
                html += '<div class="style-framework '+options.wrapperClass+'">';
                html += '<ul>';
                if(options.comment){
                    html += '<li class="o mobile-hidden"><a href="#'+options.commentAnchor+'"><span class="icon-comments"></span>Comments</a></li>';
                    html += '<li class="comment-count mobile-hidden"><span class="icon-comments-count"><span class="icon-comments-nub"></span>'+options.commentCount+'</span>';
                }
                if(options.email){
                    html += '<li class="o mobile-hidden"><a href="'+options.mailto+'" class="w-analytics-event-email"><span class="icon-email"></span>'+options.emailLabel+'</a></li>\n';
                }
                if(options.print) {
                    if (options.printUrl === '#'){
                        html += ' <li class="w-sharebar-print-action o mobile-hidden"><a href="#"><span class="icon-print p"></span>'+options.printLabel+'</a></li>\n';
                    } else {
                        html += ' <li class="o mobile-hidden"><a href="'+options.printUrl+'" target="_blank"><span class="icon-print p"></span>'+options.printLabel+'</a></li>\n';
                    }
                } 
                if(options.download){
                    html += ' <li class="o mobile-hidden"><a href="'+options.download+'"><span class="icon-download"></span>'+options.downloadLabel+'</a></li>\n';
                }
                if(options.sharethis){
                    html += '<li><span class="sharethis-insert" data-style="framework"></span></li>';
                }
                html += '</ul>\n';

                if (options.linkedin && options.linkedinCompany && options.linkedinProduct){
                    html += '<div class="linkedin-wrap"><script type="IN/RecommendProduct" data-company="'+options.linkedinCompany+'" data-product="'+options.linkedinProduct+'" data-counter="right"></script></div>';
                }

                if (options.fbrecommend){
                    html += '<div class="fb-recommend-wrap"><div class="fb-like" data-href="'+url+'" data-send="true" data-layout="button_count" data-width="450" data-show-faces="false" data-action="recommend" data-font="lucida grande"></div></div>';
                } else if (options.fblike) {
                    html += '<div class="fb-like-wrap"><div class="fb-like" data-href="'+url+'" data-layout="button_count" data-width="450" data-show-faces="false" data-action="like" data-font="lucida grande"></div></div>';
                }

                html += '</div>';
            } else {
                ShareBar.loadLibs();
                ShareBar.loadJSLibs(options);
                html += '<div><div class="w-sharebar '+ shareBarClass +'">';
                html += '<ul>';
                if(options.email){
                    html += '<li class="w-sharebar-email"><a href="'+options.mailto+'" class="w-analytics-event-email">'+options.emailLabel+'</a></li>\n';
                }
                if(options.print){
                    html += ' <li class="w-sharebar-print"><a href="#">'+options.printLabel+'</a></li>\n';
                }
                if(options.comment){
                    html += '<li class="w-sharebar-comments"><a href="#commentform">Comments <span class="count">'+options.commentCount+'</span></a></li>';
                }
                if(options.sharethis){
                    html += '<li class="w-sharebar-share"><div class="sharecontainer"></div></li>';
                }
                if(options.fbrecommend){
                    html += ' <li class="w-sharebar-facebook"><div class="fbrecommends"><div class="fb-like" data-href="'+url+'" data-send="true" data-layout="button_count" data-width="450" data-show-faces="false" data-action="recommend" data-font="lucida grande"></div></div></li>';
                }
                html += '</ul>';
                html += '</div></div>';
            }

            var bar = $(html);
            bar.find("> ul > li:last-child").addClass("last");
            bar.data('title',title);
            bar.data('url',url);
            ShareBar.addEvents(bar);

            //pass in title and url to shareThis
            var shareThisOptions = {title:title,url:url,emailLabel:options.emailLabel,mailto:options.mailto};

            // install sharethis
            $(".w-sharebar-share > div.sharecontainer",bar).each(function(){ ShareBar.shareThis(this, shareThisOptions);}  );
            bar.find(".sharethis-insert").each(function(){ ShareBar.shareThis(this, shareThisOptions);});
            return bar;
        },


        addEvents: function(bar) {
            $(".w-sharebar-print > a,.w-sharebar-print-action > a",bar).click(function(){
                window.print();
                if (window.analytics) analytics.event('share-print');
                return false;
            });
            $(".w-analytics-event-email",bar).click(function(){
                window.setTimeout(function(){
                   if (window.analytics) analytics.event('share-email');
                },1000);
            })
        },
        
        sharethisCount : 0,
        shareThis: function(node,options) {
            var $container = $(node);
            if ($container.hasClass("w-rendered")) return;
            $container.addClass("w-rendered");

            var defaults = {url:document.location.href,
                            title:document.title,
                            label:"Share This",
                            icon: '',
                            tweet:'',
                            openStyle: "click",
                            emailLabel: "Email",
                            sites:['facebook','linkedin','twitter','email'],
                            extraSites: {}
                            };

            if (!window.Widgets.options.sharethis) window.Widgets.options.sharethis = {};
            options = $.extend(options,window.Widgets.options.sharethis);

            var style = 'style-default';
            var container = 'w-sharethis-container';
            if ($container.attr('data-style') === 'framework') {
                defaults.label = "Share";
                defaults.icon = '<span class=icon-share></span>';
                style = 'style-framework';
                container = 'sharethis-container';
            } else {
                ShareBar.loadLibs();
            }

            options = $.extend(defaults,options);

            var html = "";
            var li = [];
            li.facebook = '<li class="w-sharethis-facebook"><a target="_blank" href="http://www.facebook.com/share.php?u=$URL"><span class="icon-facebook"></span>Facebook</a></li>';
            li.linkedin = '<li class="w-sharethis-linkedin"><a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&url=$URL&amp;title=$TITLE&summary=&source="><span class="icon-linkedin"></span>LinkedIn</a></li>';
            li.twitter = '<li class="w-sharethis-twitter"><a target="_blank" href="http://twitter.com/home?status=$TWEET+$URL"><span class="icon-twitter"></span>Twitter</a></li>';
            li.email = '<li class="w-sharethis-email mobile-visible"><a href="'+options.mailto+'"><span class="icon-email"></span>'+options.emailLabel+'</a></li>';
            if (style == 'style-default') li.email = '';
            li = $.extend(options.extraSites,li);

            for (var x=0;x<options.sites.length;x++){
                var site = options.sites[x];
                var h = li[site];
                var t = escape(options.title);
                // twitter has a bug with unicode
                if (site === 'twitter') t = t.replace(/%u\d+/g,'').replace('%20%20','%20');
                h = h.replace("$URL",escape(options.url));
                h = h.replace("$TITLE",t);
                h = h.replace("$TWEET",escape(options.tweet) || t);
                html += h;
            }
            
            var toggle = '<a href="#" class="toggle">' + options.icon + options.label + '</a>';
            $container.html('<div class="component-framework"><div class="'+style+'"><div class="'+container+'" id="sharethis-'+ShareBar.sharethisCount+'">' + toggle + '<ul class="menu">'+html+"</ul></div></div></div>");
            ShareBar.sharethisCount = ShareBar.sharethisCount + 1;
            

            if (options.openStyle === "click") {
                $("a.toggle",$container).click(function(e) {
                    var top = window.pageYOffset || document.documentElement.scrollTop;
                    if (e.pageY - top + 300 > $(window).height()) {
                        $("ul.menu",$(this).parent()).addClass('bottom').toggle("fast").toggleClass("shareThisOpen");
                    } else {
                        $("ul.menu",$(this).parent()).removeClass('bottom').toggle("fast").toggleClass("shareThisOpen");
                    }
                    return false;
                });
                $("body").click(function() {
                    $(".shareThisOpen").removeClass("shareThisOpen").hide();
                });
            }

            $("ul li a",$container).click(function(){ 
                if (window.analytics) {
                    if ($(this).parent().hasClass('w-sharethis-facebook')) window.analytics.event('share-facebook');
                    if ($(this).parent().hasClass('w-sharethis-linkedin')) window.analytics.event('share-linkedin');
                    if ($(this).parent().hasClass('w-sharethis-twitter')) window.analytics.event('share-twitter');
                    window.analytics.view(this.href);
                }
            });
        }
        
    };
    
    window.Widgets.ShareBar = ShareBar;

    $(document).ready(function(){ShareBar.setAssetHost();});


})(this, jQuery);


(function( window, $, undefined ) {
    "use strict";

    window.Widgets.Twitter = function(el){
        follow($(el).filter('.widget-twitter-follow'));
        stream($(el).filter('.widget-twitter-stream'));
    };
    
    /* follow widget */
    
    var NUM_INSTALLS = 0;
    
    function loadlibs(){
            if (window.twttr && window.twttr.widgets) twttr.widgets.load();
            (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}})(document,"script","twitter-wjs");
    }

    function follow($el) {
        if ($el.length === 0) return;
        $el.each(function(){
            $(this).addClass("twitter-follow-button").attr('data-show-count','false');
        });
        loadlibs();
    }
    
    function stream($el) {
        var others = [];
        $el.addClass('widget-twitter-stream-loading');
        $el.each(function(i){
            var thisWidgetID = $(this).attr('data-widget-id');
            if (thisWidgetID) {
                var w = $(this).width();
                //data-link-color="#a41034"
                $(this).append('<a class="twitter-timeline" href="https://twitter.com/" data-chrome="nofooter transparent noheader" data-widget-id="'+thisWidgetID+'"></a>');
                loadlibs();
            } 
        });
        $el.not("[data-widget-id]").each(function(){
           stream_json($(this));
        })
    }
    
    function parse(iso8601) {
        var s = $.trim(iso8601);
        s = s.replace(/\.\d+/,""); // remove milliseconds
        s = s.replace(/-/,"/").replace(/-/,"/");
        s = s.replace(/T/," ").replace(/Z/," UTC");
        s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
        return new Date(s);
    }
    
    function zeroPad(num, numZeros) {
        var n = Math.abs(num);
        var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
        var zeroString = Math.pow(10,zeros).toString().substr(1);
        if( num < 0 ) {
            zeroString = '-' + zeroString;
        }

        return zeroString+n;
    }
    
    function stream_json($el) {
    
        $el.addClass('widget-twitter-stream-loading');
        var thisLimit = parseInt($el.attr('data-limit'),10) || 3;
        var thisMore = parseInt($el.attr('data-more'),10) || 0;
        var thisProfile = $el.attr('data-profile');
        var thisHashtag = $el.attr('data-hashtag');
        var thisJSON = $el.attr('data-json');
        var thisProfileType = $el.attr('data-profiletype');
        var thisStyle = $el.attr('data-style')  || 'framework';
        
        var url = "http://www.hbs.edu/news/twitter-json.aspx?source=twitter&limit=" + (thisLimit + thisMore)
        if (thisProfile) url = url + "&handle=" + thisProfile;
        if (thisHashtag) url = url + "&hashtag=" + thisHashtag;
        if (thisProfileType) url = url + "&type=" + thisProfileType;

        if (thisJSON) url = thisJSON;
        if (url.indexOf('?') == -1) url = url + '?'
                
        $.getJSON(url + "&callback=?",function(data){
               var entries = data.entries;
               var h = '';
               var hasWindowShade = false;

               $el.removeClass('widget-twitter-stream-loading');
               if (entries.length == 0) {
                   $el.addClass('widget-twitter-stream-noresults');
                   return;
               } else {
                   console.info("entried",entries);

               }

               for(var i=0;i<entries.length;i++){
                  var item = entries[i];
                  var date = parse(item.updated);
                  
                  if (thisStyle == 'framework') {
                      if (i == thisLimit) {
                         h += '<li class="more-tweets mu-uc"><a href="#"><span class="icon-expand-large"></span>Load More Tweets</a></li>';
                      }
                      if (i < thisLimit) {
                          h += '<li class="tweet" id="tweet-'+i+'">'
                      } else {
                          h += '<li class="tweet-hidden tweet" style="display:none" id="tweet-'+i+'">'
                      }
                      var curr_date = date.getDate();
                      var curr_month = date.getMonth() + 1; //Months are zero based
                      var curr_year = date.getFullYear();
                      var datestr = curr_month + "/" + curr_date + "/" + curr_year;
        
                      h += '<ul class="linear mu-uc"><li class="timeago" data-timestamp="'+item.updated+'">'+datestr+'</li> <li><a href="http://twitter.com/intent/user?screen_name='+item.twitterhandle+'" class="ash ext">@'+item.twitterhandle+'</a></li></ul>';
                      h += '<p>'+item.content+'</p>';
                      h += '</li>'
                  } else if (thisStyle == 'framework-span4' || thisStyle == 'framework-span3') {

                      if (i == thisLimit && thisMore > 0) {
                         h += '<div class="more-tweets mu-uc"><a href="#"><span class="icon-expand-large"></span>Load More Tweets</a></div>';
                         h += '<div class="twitter-windowshade" style="display:none">';
                         hasWindowShade = true;
                      }

                  
                      var curr_date = date.getDate();
                      var curr_month = date.getMonth(); //Months are zero based
                      var curr_year = date.getFullYear();

                      var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                      var datestr = zeroPad(curr_date,2) + " " + months[curr_month] + " " + curr_year;
                      var timestr = date.getHours() + ":" + zeroPad(date.getMinutes(),2) + " AM, ";
                      if (date.getHours() > 12) {
                         timestr = (date.getHours()-12) + ":" + zeroPad(date.getMinutes(),2) + " PM, ";
                      }

                      var curr_date = date.getDate();
                      var curr_month = date.getMonth() + 1; //Months are zero based
                      var curr_year = date.getFullYear();
                      var datestr = curr_month + "/" + curr_date + "/" + curr_year;
                      var timeago = '<li class="timeago tweet-timeago" data-timestamp="'+item.updated+'">'+datestr+'</li>';
                      var author = (item.author && item.author.name) ? item.author.name : item.twittername;

                      if (thisStyle == 'framework-span4') {
                         h += '<div class="row-left tweet twitter-hover-container" id="tweet-'+i+'" data-feature="tweet">'
                         h += '<div class="span1 tweet-pic"><img src="'+item.twitterpic+'" class="stroke2" width="56" height="56"/></div>';
                         h += '<div class="span99">'
                         h += '<ul class="linear mu-uc tweet-byline">'+timeago+'<li class="tweet-name">'+author+'</li> <li class="tweet-handle"><a href="http://twitter.com/intent/user?screen_name='+item.twitterhandle+'" class="ash ext">@'+item.twitterhandle+'</a></li></ul>';
                      } else if (thisStyle == 'framework-span3') {
                         h += '<div class="tweet twitter-hover-container" id="tweet-'+i+'" data-feature="tweet">'
                         h += '<div class="row-left valign"><div class="span1"><div class="tweet-pic"><img src="'+item.twitterpic+'" class="stroke2" width="56"/></div></div>';
                         h += '<div class="span99 valign-bottom"><ul class="linear mu-uc tweet-byline"><li class="tweet-name">'+author+'</li> <li class="tweet-handle"><a href="http://twitter.com/intent/user?screen_name='+item.twitterhandle+'" class="ash ext">@'+item.twitterhandle+'</a></li></ul></div>';
                         h += '</div>';

                      }
                      h += '<div class="tweet-text nu" data-feature="content">'+item.content+'</div>';
                      h += '<div class="nu tweet-timestamp">'+timestr + datestr+'</div>';
                      h += '<div class="row-left"><div class="span1"><p class="tweet-follow"><a href="http://twitter.com/'+item.twitterhandle+'" class="twitter-follow" data-show-screen-name="false">Follow</a></p></div>';
                      h += '<div class="span99"><div class="tweet-actions hover-opacity" data-feature="action">'
                      h += '<a href="https://twitter.com/intent/tweet?in_reply_to='+item.twitteritemid+'" title="Reply"><span class="icon-twitter-reply"></span></a>';
                      h += '<a href="https://twitter.com/intent/retweet?tweet_id='+item.twitteritemid+'" title="Retweet"><span class="icon-twitter-retweet"></span></a>';
                      h += '<a href="https://twitter.com/intent/favorite?tweet_id='+item.twitteritemid+'" title="Favorite"><span class="icon-twitter-favorite"></span></a>';
                      h += '</div></div></div>';
                      if (thisStyle == 'framework-span4') {
                          h += '</div>' // span99
                      }
                      h += '</div>' // row
                          
                  }
               }
               if (hasWindowShade) h += '</div>';
               if (thisStyle == 'framework') {
                  h = '<ul class="tweets">' + h + '</ul>';
               } else {
                  h = '<div class="tweet-list">'+ h +'</div>'
               }

               if ($el.find('.widget-twitter-stream-placeholder').length) {
                   $el.find('.widget-twitter-stream-placeholder').append(h);
               } else {
                   $el.append(h);
               }

               follow($el.find(".twitter-follow"));

               $(".more-tweets a",$el).click(function(){
                  $(this).parent().hide();
                  $(".twitter-windowshade",$el).slideDown('fast');
                  $(".tweet-hidden",$el).show();
                  return false;
               });

               $(".twitter-hover-container",$el).each(function(){
                 $(this).on("touchstart",function(){
                    $(this).addClass('touching');
                 });
                 $(this).on("touchend",function(){
                     var el = this;
                     window.setTimeout(function(){
                         $(el).removeClass('touching');
                         $(".twitter-hover-container.hover",$el).removeClass("hover");
                         $(el).addClass("hover");
                     },500);
                 });
                 $(this).on("mouseenter",function(){
                     if ($(this).hasClass('touching')) {return;}
                     var el = this;
                     $(".twitter-hover-container.hover",$el).removeClass("hover");
                     $(el).addClass("hover");
                 });
                 $(this).on("mouseleave",function(){
                     if ($(this).hasClass('touching')) {return;}
                     var el = this;
                     $(".twitter-hover-container.hover",$el).removeClass("hover");
                 });
               });

               $(document).trigger("framework.domupdate");
          });
    }
 
           

})(this, jQuery);
/*
 *
 * Video Embed Widget
 *
 */

(function( window, $, undefined ) {
    "use strict";
    
    var Videos = {

        dataMode: 'embed',  // what type of action
        dataNode: null,     // where the action should occur
        modalWidth: 640,
        modalHeight: 360,
        assetHost: "http://www.hbs.edu",
        assetHostSet: false,
        setauto: false,
        hrefVal: "",
        
        setautowidth:function (){
            Videos.setauto = true;
            Videos.ondomready();
        },
        
        // call this function when the page has pulled in new content (ajax refresh)
        refresh: function(){
            if (window.Widgets.disabled) return;
            Videos.recursiveEmbed();
        },

        isTouchDevice: function() {
          return !!('ontouchstart' in window) // works on most browsers 
          || !!('onmsgesturechange' in window); // works on ie10
        },

        ie: (function(){
            // https://gist.github.com/padolsey/527683
            var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
            while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);
            return v > 4 ? v : undef;
        }()),

        ondomready: function() {
            if (!window.Widgets.options.video) window.Widgets.options.video = {};

            if (window.Widgets.disabled) return;
            $(document).bind('framework.resize',Videos.refresh);
            
            // fix for very old versions of jquery
            if (typeof $.fn.live === 'undefined' ) { $.fn.live = $.fn.bind; }

            // play the video in a popup
            $('a.widget-video-popup').live('click',function() {
                if (window.analytics) window.analytics.view(this.href);
                $(document).trigger('widgets.pause');

                if(false && navigator.appVersion.toLowerCase().indexOf("mobile") > -1 && navigator.appVersion.toLowerCase().indexOf("ipad") == -1 && this.href.indexOf(".aspx") > -1) {
                    Videos.mobile(this);
                } else {
                    window.Widgets.Lightbox.displayOverlay();
                    var a = this;
                    window.setTimeout(function(){
                        Videos.popup(a);
                    },10); //ie wants a small delay to show the overlay
                }
                return false;
            });
             
            // play the video on page after click
            $('a.widget-video-inline').live('click',function() {
                if (window.analytics) window.analytics.view(this.href);
                $(document).trigger('widgets.pause');

                Videos.inline(this);
                return false;
            });

            $('a.widget-video-play').live('click',function(){
                function hmsToSecondsOnly(str) {
                    if (!str) return 0;
                    var p = str.split(':'),
                        s = 0, m = 1;
                    while (p.length > 0) {
                        s += m * parseInt(p.pop(), 10);
                        m *= 60;
                    }
                    return s;
                }
                var seconds = hmsToSecondsOnly(this.href.split('#t=')[1]);
                $(document).trigger('widgets.play',[this.href.split('#')[0],seconds]);
                return false;
            });

            // load the youtube player on page
            Videos.recursiveEmbed();
           
            // movie analytics
            window.flashEvent = function(msg) { 
                if (window.analytics) {
                    var a = document.createElement('a');
                    a.href = msg;
                    if (window.analytics.mediaMilestone) {
                        window.analytics.mediaMilestone(a.hostname + a.pathname,a.hash.replace('#','').replace('%',''));
                    } else {
                        window.analytics.view(msg); 
                    }
                }
            };
           
        },
        
        recursiveEmbed: function() {
            // empty <a> tags don't support :visible unless it is a display block
            $('a.widget-video-embed,a.widget-audio-embed').filter(':empty').css('display','block');
            $('a.widget-video-embed,a.widget-audio-embed').filter(':visible').eq(0).each(function() {
                if ($(this).hasClass('loading')) return;
                $(this).addClass('loading'); // to fix a refresh() problem while items are still in the queue for IE
                Videos.embed(this);
            });
        },
        
        getDataURL: function(link) {
            var href = link.href;
            if (href.indexOf('/videos/') > -1) {
                href = href.replace(".html",".js").replace("/videos/","/videos/data/");
            } else if (link.href.indexOf('/video.aspx') > -1) {
                href = href.replace('/Pages/video.aspx','/video-data.aspx');
                href = href.replace('/video.aspx','/video-data.aspx');
            }

            if (document.location.protocol === 'https:') {
                if (document.location.hostname.indexOf('prod') > -1) {
                    href = href.replace("http://www.hbs.edu/about/video-data.aspx","https://prod.alumni.hbs.edu/Style Library/hbs/ajax/video-data.aspx");
                } else {
                    href = href.replace("http://www.hbs.edu/about/video-data.aspx","https://www.alumni.hbs.edu/Style Library/hbs/ajax/video-data.aspx");
                }
            }
            return href;
        },

        getScript: function(url, callback, onerror, timeout) {
            $.ajax({
              url: url,
              timeout: timeout,
              dataType: "script",
              cache: true,
              error: onerror,
              success: callback
            });

            if (timeout) {
                Videos.timeoutId = window.setTimeout(function() {
                    onerror();
                }, timeout);
            }
        },

        embed: function(link) {
            Videos.dataMode = 'embed';
            Videos.dataNode = link;
            Videos.hrefVal = link.href;
            if(Videos.hrefVal.indexOf(".hbs.edu/videos") > -1 || Videos.hrefVal.indexOf("video.aspx") > -1){
                var jsdataurl = Videos.getDataURL(link);
                var onerror = function(){
                    console.error("Failed to load",link.href);
                    $(link).remove();
                    Videos.recursiveEmbed();
                }
                Videos.getScript(jsdataurl,null,onerror,10000);
            } else {
                Videos.nonCatalogVideo('embed');
            }
        },

        mobile: function(link) {
            window.Widgets.Lightbox.displayOverlay();
            Videos.dataMode = 'mobile';
            Videos.dataNode = link;
            Videos.hrefVal = link.href;
            var jsdataurl = Videos.getDataURL(link);
            Videos.getScript(jsdataurl);
        },
        
        inline: function(link) {
            Videos.dataMode = 'inline';
            Videos.dataNode = link;
            Videos.hrefVal = link.href;
            if(Videos.hrefVal.indexOf(".hbs.edu/videos") > -1 || Videos.hrefVal.indexOf("video.aspx") > -1) {
               var jsdataurl = Videos.getDataURL(link);
               Videos.getScript(jsdataurl);    
            } else {
               Videos.nonCatalogVideo('inline');
            }
        },
        
        popup: function(link){
            Videos.dataMode = 'popup';
            Videos.dataNode = link;
            Videos.hrefVal = link.href;
            var onerror = function(){document.location.href = link.href;}
            //cross domain error
            if (document.location.protocol == 'https:' && link.protocol == 'http:') onerror();
            if(Videos.hrefVal.indexOf(".hbs.edu/videos") > -1 || Videos.hrefVal.indexOf("video.aspx") > -1){
                var jsdataurl = Videos.getDataURL(link);
                window.Widgets.Lightbox.onReady(function(){
                    // if a 404, we won't know if the JSONP call fails. Timeout after 5 sec
                    Videos.getScript(jsdataurl,null,onerror,10000);
                });
            }
            else{
                Videos.nonCatalogVideo('popup');
            }
        },
        
        //TODO: centralize this function.
        getQueryString: function(key, url) {
            var vars = [], hash;
            var q = url.split('?')[1];
            if(q !== undefined){
                q = q.split('&');
                for(var i = 0; i < q.length; i++){
                    hash = q[i].split('=');
                    vars.push(hash[1]);
                    vars[hash[0]] = hash[1];
                }
            }
            return vars[key];
        },
            
        nonCatalogVideo: function(type){
            var youtubeID = "";
            var vimeoID = "";
            var soundCloudID = "";
            var filename = "";
            var display = 'Public';

            if(Videos.hrefVal.indexOf("youtu.be/")> -1){
                youtubeID = Videos.hrefVal.substr(Videos.hrefVal.indexOf(".be/") + 4);
            }
            else if(Videos.hrefVal.indexOf("youtube.com/")> -1){
                youtubeID = Videos.getQueryString("v",Videos.hrefVal);
            }
            else if(Videos.hrefVal.indexOf("vimeo.com/") > -1){
                vimeoID = Videos.hrefVal.substr(Videos.hrefVal.indexOf(".com/") + 5);
            }
            else if(Videos.hrefVal.indexOf("soundcloud.com/") > -1){
                soundCloudID = Videos.hrefVal;
            }
            else if(Videos.hrefVal.indexOf("mp4") > -1){
                filename = Videos.hrefVal;
                display = 'Private';
            }
            else{
                console.info("This video type is not supported.");	
            }
           
            //construct data object
            var data = new Object({
                title:"",
                subhead:"",
                blurb:"",
                source:"",
                display: display,
                youtube: youtubeID,
                soundcloud: soundCloudID,
                filename:filename,
                image:"",
                vidly:"",
                vimeo:vimeoID,
                height: Videos.modalHeight,
                width: Videos.modalWidth,
                resize:false
            });             
            if (type == 'popup') {
                window.Widgets.Lightbox.onReady(function(){
                   Videos.dataCallback(data);
                });
            } else {
                Videos.dataCallback(data);
            }
           
        },
        
        
        /* allows a totally video popup where fed the raw data */
        //EE uses this
        popupData: function(data,link) {
            Videos.dataMode = 'popup';
            Videos.dataNode = link;
            Videos.hrefVal = link.href;
            window.Widgets.Lightbox.onReady(function(){
                Videos.dataCallback(data);
            });
        },
        
        dataCallback: function(data) {

            window.clearTimeout(Videos.timeoutId);
           
            data.node = Videos.dataNode;
            data.mode = Videos.dataMode;
           
            if (window.Widgets.options.video && window.Widgets.options.video['data-loaded'] && typeof window.Widgets.options.video['data-loaded'] === 'function') {
                data = window.Widgets.options.video['data-loaded'](data);
            }
            if (!data) return;
           
            var html;
           
            Videos.num += 1;
            data.num = Videos.num;

            // alumni hack for legacy support
            if (data.type == 'Audio' && /alumni.hbs.edu/.test(document.location.href) && $(data.node).hasClass('widget-video-embed') ) {
                $(data.node).toggleClass('widget-video-embed widget-audio-embed ')
            }

            if (data.type == 'Audio' && !$(data.node).hasClass('widget-audio-embed') ) {
                data.width = 1920;
                data.height = 1080;
                data.type = 'AudioThumb';
            }

            if (data.mode === 'popup') {
                if (data.error) {
                    window.Widgets.Lightbox.removeOverlay();
                    document.location.href = data.node.href;
                    return;
                }
                html = Videos.renderPopup(data);
                var options = {width:Videos.modalWidth};
                var defaults = {width:'auto',height:'auto',onComplete:function(){Videos.popupComplete(data);}, autoDimensions:false,autoScale:false,padding:0,scrolling:'no',transitionIn:'none',transitionOut:'none',overlayColor:'#000'};
                options = $.extend(defaults,options);
                $(document).bind('widgets.lightbox.closed',function(){
                    var kdp = document.getElementById(window.KalturaPlayerId);
                    if (kdp) kdp.sendNotification('doStop');
                    document.title = document.title.replace("\u25b6 ",'');
                    //if (window.analytics.mediaClose && window.activeVideo) window.analytics.mediaClose(window.activeVideo);
                    if ("pushState" in history) history.pushState("", document.title, document.location.pathname + document.location.search);
                });
                if (window.Widgets.Lightbox.animating) {
                    setTimeout(function() { window.Widgets.Lightbox.render(html,options);}, 100);
                } else {
                    window.Widgets.Lightbox.render(html,options);
                }
            }

            if (data.mode === 'mobile') {
                html = Videos.renderInline(data);                                                         // video class used by some sites (prematric)
                var mobileHTML = '<div style="height:10px;width:10px;"><div id="video-embed-'+data.num+'" class="video" style="height:'+(data.height)+'px;width:'+data.width+'px"></div></div>';
                $('body').append(mobileHTML);
                Videos.renderVideos(data,{autoplay:true});
            }
           
            if (data.mode === 'inline') {
                html = Videos.renderInline(data);
                $(data.node).replaceWith(html);
                Videos.renderVideos(data,{autoplay:true});
            }
           
            if (data.mode === 'embed') {

                if (data.error) {
                } else {
                    html = Videos.renderInline(data);
                    $(data.node).replaceWith(html);
                    if ($(data.node).hasClass('autoplay')) {
                        Videos.renderVideos(data,{autoplay:true});
                    } else {
                        Videos.renderVideos(data);
                    }
                    window.setTimeout(Videos.recursiveEmbed,100);
                }
            }
        },

        //apply events once popup completes loading
        popupComplete: function(data){ 
            Videos.sharethisEvents();
            Videos.renderVideos(data,{autoplay:true,modalsize:true});
            $("#fancybox-overlay,#fancybox-wrap").show(); // fix chrome bug
            try{window.FB.XFBML.parse();}catch(ex){}
            if ("pushState" in history) {
                document.location.hash = "popup";
                $(window).unbind('hashchange.videos').bind('hashchange.videos',function(){
                    if (document.location.hash.indexOf('popup') == -1) {
                        $.fancybox.close();
                        $(window).unbind('hashchange.videos');
                    }
                });
            }
            window.Widgets.refresh();
        },
        
        num: 0,

        
        renderInline: function(data) {
            var type = data.type ? data.type.toLowerCase() : 'video';
            var html = '<div id="video-embed-'+data.num+'" class="widget-video-rendered '+type+'" style="height:'+(data.height+30)+'px;width:'+data.width+'px"></div>';
            return html;
        },
        
        renderPopup: function(data) {
            var html = '';
            var style = window.Widgets.Lightbox.getStyle();
            var isHBSCatalog = (Videos.hrefVal.indexOf("hbs.edu") > -1)? true : false;

            //used for sharebar items
            var videoTitle = (data.title) ? data.title : escape(document.title);
            var videoUrl = (Videos.hrefVal) ? Videos.hrefVal :  escape(document.location.href);
            if (style === 'framework') {
                html += '<div class="video-container type-framework color-framework js-framework component-framework pattern-framework grid-framework responsive-framework" style="float:none">';
            } else {
                html += '<div class="video-container container mobile-container tablet-container">';
            }
            html += '<div class="lightbox-video"><div class="video-border">';
            if (data.kaltura) {
                // kaltura videos are big, lets try to get them to fit in the lightbox
                var height = (Videos.modalWidth / data.width ) * data.height;
                html += '<div id="video-embed-'+data.num+'" class="video" style="height:'+height+'px;width:100%"></div>';
            } else {
                html += '<div id="video-embed-'+data.num+'" class="video" style="height:'+(data.height+30)+'px;width:'+data.width+'px"></div>';
            }

           
            if(data.title || data.subhead || data.blurb){html += '<div class="lightbox-text">';}
            if (style === 'framework') {
                if (data.title) html += ' <div class="title hbsred epsilon">'+data.title+'</div>' ;
                if (data.subhead) html += '<div class="shim2"></div><div class="white mu-uc">'+data.subhead+'</div>' ;
                if (data.blurb) html += '<div class="shim8"></div><p>'+data.blurb+'</p>';
                //only show sharebar if this is a hbs catalog video
                if(isHBSCatalog && (!data.display || data.display != 'Private')){
                    html += '<div class="widget-sharebar light" data-style="framework" data-title="'+ videoTitle +'" data-url="'+videoUrl+'">ShareBar</div><br/><br/>';   
                }
            } else {
                var subhead = data.subhead ? ' <span>'+data.subhead+'</span>' : '';
                if(data.title) {html += '<h4 class="title">'+data.title+subhead+'</h4>';}
                if (data.blurb) { html += '<p>'+data.blurb+'</p>'; }
            }
            if(data.title || data.subhead || data.blurb){html += '</div>';}

            //only show sharebar if this is a hbs catalog video
            if(isHBSCatalog && style === 'default'){
                html += '<div class="widget-sharebar" style="height:25px" data-title="'+ videoTitle +'" data-url="'+videoUrl+'">ShareBar</div>';
            }

            html += '</div></div></div>';
            return html;
        },
        
        
        sharethisEvents: function() {
            $(".sharebox .sharethis ul li a").click(function(){   
                window.analytics.view(this.href);
            });    
            $(".sharebox a.trigger").click(function(){
                $(".sharebox ul").toggle();
                return false;
            });
            $("body").bind("BodyClick",function() {
                $(".sharebox ul").hide();
            });
        },

        kalturaEmbed: function(target,data,options) {
            // http://html5video.org/wiki/Kaltura_HTML5_Configuration
            // http://player.kaltura.com/docs/CaptionsKalturaApi

            var pid = '1423662';
            var uid =  '15168141';
            if (data.display == 'Private') { uid = '24701771'; }
            if (data.type == 'Audio' && data.mode != 'popup') { uid = '20998871'; }

            
            uid =  window.Widgets.options.video.playerId || uid; // allow an override
            var entryID = data.kaltura;

            if (navigator.appVersion.toLowerCase().indexOf("mobile") > -1) options.autoplay = false;
            if (navigator.appVersion.toLowerCase().indexOf("android") > -1) options.autoplay = false;
            if (navigator.appVersion.toLowerCase().indexOf("ipad") > -1) options.autoplay = false;
            if (navigator.appVersion.toLowerCase().indexOf("silk") > -1) options.autoplay = false; // kindle

            //http://www.kaltura.org/kalorg/kdp/trunk/kdp3Lib/docs/flashvars.txt
            function embed(){
                var kalturaConfig = {'targetId': target, 
                          'wid':'_'+pid, 
                          'uiconf_id':uid, 
                          'entry_id':entryID,
                          'flashvars':{
                                'externalInterfaceDisabled' : false,
                                'kalturaShare.dynamicLink' : data.node.href,
                                'mediaProxy.preferedFlavorBR': 2500,
                                'kalturaLogo.visible':false,
                                'kalturaLogo.includeInLayout':false,
                                //'generalPluginContainer.height': '95%',
                                //'generalPluginContainer.width': '95%',
                                'generalPluginContainer.height': '103%',
                                'generalPluginContainer.width': '103%',
                                'contentPusher.height': '50%',
                                'contentPusher.width': '50%',
                                /*
                                'generalPluginContainer.height': data.captions ? '95%' : '0%', // fix a scrollbar bug
                                'generalPluginContainer.width': data.captions ? '95%' : '0%', // fix a scrollbar bug
                                'contentPusher.height': data.captions ? '50%' : '0%', // fix a scrollbar bug
                                'contentPusher.width': data.captions ? '50%' : '0%', // fix a scrollbar bug
                                */
                                'autoPlay' : options.autoplay ? true : false
                           },
                           'params': {
                                'wmode': 'transparent'
                           },
                           //captureClickEventForiOS: true,
                           'readyCallback': function( playerId ){
                                window.KalturaPlayerId = playerId;
                                var kdp = document.getElementById(playerId);

                                $(document).bind('widgets.pause',function(event,skipping){
                                   try {
                                       if (kdp.id != skipping) {
                                          kdp.sendNotification('doPause');
                                       }
                                   } catch (e) {}
                                });

                                function hashSeek(kdp){
                                    try {
                                        if (/t=(\d+)/.test(document.location.hash)) {
                                            var seek = parseInt(RegExp.$1);
                                            if (seek != kdp.lastSeek) {
                                               kdp.sendNotification('doSeek', seek );
                                               kdp.lastSeek = seek;
                                            }
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }

                                kdp.duration = 0;
                                kdp.currentTime = 0;
                                kdp.zero = false;
                                kdp.five = false;
                                kdp.twentyfive = false;
                                kdp.fifty = false;
                                kdp.seventyfive = false;
                                kdp.hundred = false;
                                kdp.openEvent = false;
                                kdp.playEvent = false;
                                kdp.lastSeek = 0;

                                kdp.kBind('mediaReady', function () {
                                    if (options.autoplay) {
                                        this.sendNotification('doPlay');
                                    }
                                    this.duration = this.evaluate('{duration}');
                                });

                                kdp.kBind("doPlay", function(id){
                                    if (data.mode == 'mobile') window.setTimeout(function(){
                                            window.Widgets.Lightbox.removeOverlay();
                                        },2000);
                                    if (document.title.indexOf("\u25b6") == -1) {
                                        document.title = "\u25b6 " + document.title;
                                    }
                                    window.activeVideo = data.title + ' : ' + data.kaltura;
                                    if (window.analytics && window.analytics.mediaPlay) window.analytics.mediaPlay(window.activeVideo);
                                    $(document).trigger('widgets.pause',playerId); // pause other players
                                });

                                kdp.kBind("doPause", function(){
                                    document.title = document.title.replace("\u25b6 ",'');
                                    if (window.analytics && window.analytics.mediaStop) window.analytics.mediaStop(window.activeVideo);
                                });

                                kdp.kBind('durationChange',function(duration){
                                    this.duration = duration.newValue;
                                })

                                //http://www.kaltura.org/demos/kdp3/docs.html
                                kdp.kBind('playerUpdatePlayhead',function(time){
                                    var p = Math.round((time/kdp.duration) * 100);
                                    this.currentTime = time;
                                    hashSeek(this);
                                    if (window.analytics && data.node) {
                                        if (!this.zero) {
                                            if (window.analytics.mediaMilestone) window.analytics.mediaMilestone(window.activeVideo,0);
                                            window.analytics.view(data.node.href);
                                            this.zero = true;
                                        }
                                        if (p >= 5 && !this.five) {
                                            window.analytics.view(data.node.href+"#5%");
                                            this.five = true;
                                        }
                                        if (p >= 25 && !this.twentyfive) {
                                            if (window.analytics.mediaMilestone) window.analytics.mediaMilestone(window.activeVideo,25);
                                            window.analytics.view(data.node.href+"#25%");
                                            this.twentyfive = true;
                                        }
                                        if (p >= 50 && !this.fifty) {
                                            if (window.analytics.mediaMilestone) window.analytics.mediaMilestone(window.activeVideo,50);
                                            window.analytics.view(data.node.href+"#50%");
                                            this.fifty = true;
                                        }
                                        if (p >= 75 && !this.seventyfive) {
                                            if (window.analytics.mediaMilestone) window.analytics.mediaMilestone(window.activeVideo,75);
                                            window.analytics.view(data.node.href+"#75%");
                                            this.seventyfive = true;
                                        }
                                        if (p >= 90 && !this.hundred) {
                                            if (window.analytics.mediaMilestone) window.analytics.mediaMilestone(window.activeVideo,100);
                                            window.analytics.view(data.node.href+"#100%");
                                            this.hundred = true;
                                        }
                                    }
                                })
                           }
                       };
                if (options.autoplay || data.type == 'Audio') {
                   kWidget.embed(kalturaConfig);
                } else {
                   kWidget.thumbEmbed(kalturaConfig); // helps remove the scrubber on desktop embeds and speeds up the page load
                }

                $(document).bind('widgets.play',function(e,url,pos){
                    if (data.node.href == url) {

                        var kdp = document.getElementById(target);
                        $(document).trigger('widgets.pause',target);
                        if (kdp && $(kdp).is('object')) {
                           document.location.hash = '';
                           kdp.sendNotification('doSeek',parseInt(pos));
                        } else {
                            // fix for old samsungs
                           var evt = document.createEvent('MouseEvents');
                           evt.initMouseEvent("click", true, true, window,0, 0, 0, 80, 20, false, false, false, false, 0, null);
                           document.getElementById(target+'_playBtn').dispatchEvent(evt);
                           window.setTimeout(function(){
                             document.location.hash = 't='+pos
                           },500)
                       }
                     } 
                })
            }

            if (window.kWidget) {
                embed();
            } else {              
                var host = 'http://cdnbakmi.kaltura.com';
                if (document.location.protocol == 'https:') host = 'https://www.kaltura.com';
                Videos.getScript(host+"/p/"+pid+"/sp/"+pid+"00/embedIframeJs/uiconf_id/"+uid+"/partner_id/"+pid,function(){
                    //mw.setConfig('Kaltura.LeadWithHTML5', true);  // helped with fullscreen on blackberry, disabled share on desktop
                    mw.setConfig('EmbedPlayer.UseFlashOnAndroid', true);  // galaxy tablet wanted 'true'
                    mw.setConfig('EmbedPlayer.EnableIpadHTMLControls', true);     // sets native controls on ios
                    mw.setConfig('EmbedPlayer.EnableIpadNativeFullscreen', true);  // sets fullscreen on ios
                    embed();
                });
            }
        },

        soundcloudAnalytics: function(frame){

            if (!window.analytics || !window.analytics.mediaMilestone) return;

            function doAnalytics(frame) {
                var song = SC.Widget(frame);
                song.zero = false;
                song.twentyfive = false;
                song.fifty = false;
                song.seventyfive = false;
                song.hundred = false;
                song.tick = 0;
                song.bind(SC.Widget.Events.PLAY_PROGRESS ,function(){
                    // slow play_progress down
                    if (this.tick++ < 10) return;
                    this.tick = 0;
                    this.getCurrentSound(function (currentSound) {
                        this.getDuration(function (currentDuration) {
                            this.getPosition(function(currentPosition) {
                                var p = Math.round((currentPosition/currentDuration) * 100);
                                var name = currentSound.permalink_url.replace('https://','');
                                if (!this.zero) {
                                    window.analytics.mediaMilestone(name,0);
                                    this.zero = true;
                                }
                                if (p >= 25 && !this.twentyfive) {
                                    window.analytics.mediaMilestone(name,25);
                                    this.twentyfive = true;
                                }
                                if (p >= 50 && !this.fifty) {
                                    window.analytics.mediaMilestone(name,50);
                                    this.fifty = true;
                                }
                                if (p >= 75 && !this.seventyfive) {
                                    window.analytics.mediaMilestone(name,75);
                                    this.seventyfive = true;
                                }
                                if (p >= 90 && !this.hundred) {
                                    window.analytics.mediaMilestone(name,100);
                                    this.hundred = true;
                                }
                            });
                        });
                    });
                });
            }
            Videos.getScript("https://w.soundcloud.com/player/api.js",function(){
                doAnalytics(frame);
            });
        },


        youtubeEmbed: function(target,data,options) {
           //https://developers.google.com/youtube/iframe_api_reference

           var embed = function(target,data,options){
                // This endpoint no longer works - and was only used to grab video title - so disabling JSON call
               //$.getJSON('//gdata.youtube.com/feeds/api/videos/'+data.youtube+'?v=2&alt=json&callback=?',function(json) {
                       //var vname = json.entry.title.$t + ' : yt-' + data.youtube;
                       var vname = data.youtube; // MJ: Log video id vs title in analytics for now 
                       var player = new YT.Player(target, {
                                             videoId: data.youtube,
                                              events: {
                                                 'onStateChange': function(events){
                                                    if (!window.analytics || !window.analytics.mediaMilestone) return;
                                                    if (events.data == YT.PlayerState.PLAYING) {
                                                        //$(document).trigger('widgets.pause',target);
                                                        analytics.mediaPlay(vname);
                                                        if (player.inerval) window.clearInterval(player.interval);
                                                        player.interval = window.setInterval(function(){
                                                            var p = Math.round((player.getCurrentTime()/player.getDuration()) * 100);
                                                            if (!player.zero) {
                                                                analytics.mediaMilestone(vname,0);
                                                                player.zero = true;
                                                            }
                                                            if (p >= 25 && !player.twentyfive) {
                                                                analytics.mediaMilestone(vname,25);
                                                                player.twentyfive = true;
                                                            }
                                                            if (p >= 50 && !player.fifty) {
                                                                analytics.mediaMilestone(vname,50);
                                                                player.fifty = true;
                                                            }
                                                            if (p >= 75 && !player.seventyfive) {
                                                                analytics.mediaMilestone(vname,75);
                                                                player.seventyfive = true;
                                                            }
                                                            if (p >= 90 && !player.hundred) {
                                                                analytics.mediaMilestone(vname,100);
                                                                player.hundred = true;
                                                            }
                                                        },1000);
                                                    }
                                                    if (events.data == YT.PlayerState.PAUSED || events.data == YT.PlayerState.BUFFERING) {
                                                        analytics.mediaPause(vname);
                                                        window.clearInterval(player.interval);
                                                    }
                                                    if (events.data == YT.PlayerState.ENDED) {
                                                        analytics.mediaMilestone(vname,100);
                                                        window.clearInterval(player.interval);
                                                    }
                                                 }
                                             }
                                    });
                        player.zero = false;
                        player.twentyfive = false;
                        player.fifty = false;
                        player.seventyfive = false;
                        player.hundred = false;
                        // capture the player value into a closure
                        var pause = (function(player) {
                          return function(except){
                               try {
                                   if (player.o.id != except) {
                                      player.pauseVideo();
                                   }
                               } catch (e) {}
                          }
                        })(player);
                        $(document).bind('widgets.pause',function(event,except){
                            pause(except);
                        });
               //}); // MJ: Disable JSON call


           };


           if (window.onYouTubeIframeAPIReadyCalled) {
               embed(target,data,options);
           } else {
               window.onYouTubeIframeAPIReadyQueue = window.onYouTubeIframeAPIReadyQueue || [];
               window.onYouTubeIframeAPIReadyQueue.push(function(){
                   embed(target,data,options);
               })
               window.onYouTubeIframeAPIReady = function(){
                  for (var i = 0;i<window.onYouTubeIframeAPIReadyQueue.length;i++) {
                     window.onYouTubeIframeAPIReadyQueue[i]();
                  }
                  window.onYouTubeIframeAPIReadyCalled = true;
               }
               Videos.getScript("https://www.youtube.com/iframe_api",function(){
               });
           }
        },

        renderVideos: function(data,options) {
            if (!options) options = {};

            var resizeVideo = (function(data){
                return function(){
                    var container = $("#video-embed-"+data.num);
                    container.attr('style',null).css({'display':'block','width':'100%'});
                    var height = (container.width() / data.width ) * data.height;
                    if (container.parents('.img-container-228x144').length) {
                        height = container.width() * .6325;
                    }
                    if (data.type == 'Audio')  {
                        height = 30;
                    }
                    container.css('height',Math.ceil(height));
                    container.css('width','100%');
                    container.css('background-color','black');
                };
            })(data);

            if (data.source) {
               
                if (Videos.isFallback()) {
                    if (data.vidly) {
                        var vid = data.vidly.split('/').pop();
                        if (vid) {
                            $("#video-embed-"+data.num).replaceWith('<iframe frameborder="0" width="'+data.width+'" height="'+data.height+'" src="http://vid.ly/embeded.html?link='+vid+'&autoplay=false"><a target=\'_blank\' href=\'http://vid.ly/'+vid+'\'><img src=\'http://cf.cdn.vid.ly/'+vid+'/poster.jpg\' /></a></iframe>');
                            return;
                        }
                    } 
                    $("#video-embed-"+data.num).replaceWith('<p>Video is not supported on this device.</p>');
                    return;
                }
                var fo = new window.SWFObject(Videos.assetHost+"/videos/flash/player.swf", "flash"+data.num, data.width, (data.height+30), "8", "#000000");
                if (options.modalsize && options.modalsize === true) {
                    fo = new window.SWFObject(Videos.assetHost+"/videos/flash/player.swf", "flash"+data.num, Videos.modalWidth, (data.height+30), "8", "#000000");
                } 

                fo.addVariable("source",data.source);
                fo.addVariable("allowFullScreen", "true");
                fo.addVariable("analytics", "true");
                if (data.resize) fo.addVariable("autoscale", "true");
                if (data.image) fo.addVariable("image",data.image);
                if (options.autoplay) {
                    fo.addVariable("autoplay",true);
                }
                fo.addParam("allowFullScreen", "true");
                fo.addParam("wmode", "opaque");     
                // this crashes on IE8 if the .widget-video-embed is in a 'p' tag  
                fo.write("video-embed-"+data.num);
            } else if (data.kaltura && Videos.dataMode === 'popup') {
                // http://html5video.org/wiki/Kaltura_HTML5_Configuration
                $("#video-embed-"+data.num).css('background-color','black');
                window.setTimeout(function(){ // to allow the lightbox to render
                    resizeVideo();
                    Videos.kalturaEmbed('video-embed-'+data.num,data,options);
                },100);

            } else if (data.kaltura) {
                resizeVideo();
                $(window).bind('orientationchange', function() {
                    resizeVideo();
                });
                $(document).bind('framework.resize',function(){
                    resizeVideo();
                });
                Videos.kalturaEmbed('video-embed-'+data.num,data,options);
            } else if (data.youtube && Videos.dataMode === 'popup') { /* YouTube in PopUp */
                $("#video-embed-"+data.num).html('<iframe width="'+Videos.modalWidth+'" height="'+(data.height+30)+'" src="//www.youtube.com/embed/'+data.youtube+'?rel=0&autoplay=1&wmode=opaque" frameborder="0" allowfullscreen></iframe>');
                $("#video-embed-"+data.num).css('background-color','black');
                if (window.analytics && window.analytics.mediaMilestone) window.analytics.mediaMilestone('http://youtu.be/'+data.youtube,0);  // can only track video starts
            } else if (data.vimeo && Videos.dataMode === 'popup') { /* Vimeo in PopUp */
                $("#video-embed-"+data.num).html('<iframe width="'+Videos.modalWidth+'" height="'+(data.height+30)+'" src="//player.vimeo.com/video/'+data.vimeo+'?autoplay=1" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>');
                $("#video-embed-"+data.num).css('background-color','black');
                if (window.analytics && window.analytics.mediaMilestone) window.analytics.mediaMilestone('http://vimeo.com/'+data.vimeo,0);  // can only track video starts
            } else if (data.soundcloud) { 
                $("#video-embed-"+data.num).html('<iframe width="100%" height="166" src="https://w.soundcloud.com/player/?url='+escape(data.soundcloud)+'&amp;color=ff5500&amp;auto_play=false&amp;show_artwork=true" frameborder="0" scrolling="no" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>');
                if (Videos.ie < 10) {
                   $("#video-embed-"+data.num).css('height','80px').css('width','100%').find('iframe').css('height','80px');
                } else {
                   $("#video-embed-"+data.num).css('height','166px').css('width','100%');
                   Videos.soundcloudAnalytics($("#video-embed-"+data.num).find('iframe')[0]);
                }
            } else if (data.filename) { 
                Videos.getScript("//jwpsrv.com/library/c4IOKvMwEeOUQyIAC0MJiQ.js", function(){
                    jwplayer("video-embed-"+data.num).setup({
                            autostart: options.autoplay,
                            stretching: "fill",
                            levels: [ {file: data.filename} ],
                            aspectratio: "16:9",
                            width: "100%"
                    });
                    var container = $("#video-embed-"+data.num);
                })
            } else if (data.youtube && options.autoplay) { /* YouTube Inline */
                $("#video-embed-"+data.num).html('<iframe width="'+data.width+'" height="'+(data.height+30)+'" src="//www.youtube.com/embed/'+data.youtube+'?rel=0&wmode=Opaque&autoplay=1" frameborder="0" allowfullscreen></iframe>');
                $("#video-embed-"+data.num).css('background-color','black');
            } else if (data.youtube) { /* YouTube Embed */
                //$("#video-embed-"+data.num).html('<iframe width="100%" height="100%" src="//www.youtube.com/embed/'+data.youtube+'?rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>');
                //$("#video-embed-"+data.num).css('background-color','black');

                Videos.youtubeEmbed('video-embed-'+data.num,data,options);
                resizeVideo();
                $(document).bind('framework.resize',resizeVideo);
            }
        },
        
        isFallback: function(){
            var fo = new window.SWFObject(Videos.assetHost+"/videos/flash/player.swf", "flash"+Videos.num, 1, 1, "8", "#000000");
            return !fo.installedVer.versionIsValid(fo.getAttribute('version'));
        }
    };

    window.Videos = Videos;
    window.Widgets.Videos = Videos;

    $(document).ready(function(){Videos.ondomready();});

})(this, jQuery);




// fix for multiple installs of fancybox on the page
$(document).ready(function(){
if ($.fancybox) return;


/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 *
 * Version: 1.3.1 (05/03/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

 
(function($) {

	var tmp, loading, overlay, wrap, outer, inner, close, nav_left, nav_right,

		selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

		ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

		loadingTimer, loadingFrame = 1,

		start_pos, final_pos, busy = false, shadow = 20, fx = $.extend($('<div/>')[0], { prop: 0 }), titleh = 0, 

		isIE6 = !$.support.opacity && !window.XMLHttpRequest,

		/*
		 * Private methods 
		 */

		fancybox_abort = function() {
			loading.hide();

			imgPreloader.onerror = imgPreloader.onload = null;

			if (ajaxLoader) {
				ajaxLoader.abort();
			}

			tmp.empty();
		},

		fancybox_error = function() {
			$.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
				'scrolling'		: 'no',
				'padding'		: 20,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none'
			});
		},

		fancybox_get_viewport = function() {
			return [ $(window).width(), $(window).height(), $(document).scrollLeft(), $(document).scrollTop() ];
		},

		fancybox_get_zoom_to = function () {
			var view	= fancybox_get_viewport(),
				to		= {},

				margin = currentOpts.margin,
				resize = currentOpts.autoScale,

				horizontal_space	= (shadow + margin) * 2,
				vertical_space		= (shadow + margin) * 2,
				double_padding		= (currentOpts.padding * 2),
				
				ratio;

			if (currentOpts.width.toString().indexOf('%') > -1) {
				to.width = ((view[0] * parseFloat(currentOpts.width)) / 100) - (shadow * 2) ;
				resize = false;

			} else {
				to.width = currentOpts.width + double_padding;
			}

			if (currentOpts.height.toString().indexOf('%') > -1) {
				to.height = ((view[1] * parseFloat(currentOpts.height)) / 100) - (shadow * 2);
				resize = false;

			} else {
				to.height = currentOpts.height + double_padding;
			}

			if (resize && (to.width > (view[0] - horizontal_space) || to.height > (view[1] - vertical_space))) {
				if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
					horizontal_space	+= double_padding;
					vertical_space		+= double_padding;

					ratio = Math.min(Math.min( view[0] - horizontal_space, currentOpts.width) / currentOpts.width, Math.min( view[1] - vertical_space, currentOpts.height) / currentOpts.height);

					to.width	= Math.round(ratio * (to.width	- double_padding)) + double_padding;
					to.height	= Math.round(ratio * (to.height	- double_padding)) + double_padding;

				} else {
					to.width	= Math.min(to.width,	(view[0] - horizontal_space));
					to.height	= Math.min(to.height,	(view[1] - vertical_space));
				}
			}

			to.top	= view[3] + ((view[1] - (to.height	+ (shadow * 2 ))) * 0.5);
			to.left	= view[2] + ((view[0] - (to.width	+ (shadow * 2 ))) * 0.5);

			if (currentOpts.autoScale === false) {
				to.top	= Math.max(view[3] + margin, to.top);
				to.left	= Math.max(view[2] + margin, to.left);
			}

			return to;
		},

		fancybox_format_title = function(title) {
			if (title && title.length) {
				switch (currentOpts.titlePosition) {
					case 'inside':
						return title;
					case 'over':
						return '<span id="fancybox-title-over">' + title + '</span>';
					default:
						return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' + title + '</span><span id="fancybox-title-right"></span></span>';
				}
			}

			return false;
		},

		fancybox_process_title = function() {
			var title	= currentOpts.title,
				width	= final_pos.width - (currentOpts.padding * 2),
				titlec	= 'fancybox-title-' + currentOpts.titlePosition;
				
			$('#fancybox-title').remove();

			titleh = 0;

			if (currentOpts.titleShow === false) {
				return;
			}

			title = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(title, currentArray, currentIndex, currentOpts) : fancybox_format_title(title);

			if (!title || title === '') {
				return;
			}

			$('<div id="fancybox-title" class="' + titlec + '" />').css({
				'width'			: width,
				'paddingLeft'	: currentOpts.padding,
				'paddingRight'	: currentOpts.padding
			}).html(title).appendTo('body');

			switch (currentOpts.titlePosition) {
				case 'inside':
					titleh = $("#fancybox-title").outerHeight(true) - currentOpts.padding;
					final_pos.height += titleh;
				break;

				case 'over':
					$('#fancybox-title').css('bottom', currentOpts.padding);
				break;

				default:
					$('#fancybox-title').css('bottom', $("#fancybox-title").outerHeight(true) * -1);
				break;
			}

			$('#fancybox-title').appendTo( outer ).hide();
		},

		fancybox_set_navigation = function() {
			$(document).unbind('keydown.fb').bind('keydown.fb', function(e) {
				if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
					e.preventDefault();
					$.fancybox.close();

				} else if (e.keyCode == 37) {
					e.preventDefault();
					$.fancybox.prev();

				} else if (e.keyCode == 39) {
					e.preventDefault();
					$.fancybox.next();
				}
			});

			if ($.fn.mousewheel) {
				wrap.unbind('mousewheel.fb');

				if (currentArray.length > 1) {
					wrap.bind('mousewheel.fb', function(e, delta) {
						e.preventDefault();

						if (busy || delta === 0) {
							return;
						}

						if (delta > 0) {
							$.fancybox.prev();
						} else {
							$.fancybox.next();
						}
					});
				}
			}

			if (!currentOpts.showNavArrows) { return; }

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
				nav_left.show();
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
				nav_right.show();
			}
		},

		fancybox_preload_images = function() {
			var href, 
				objNext;
				
			if ((currentArray.length -1) > currentIndex) {
				href = currentArray[ currentIndex + 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (currentIndex > 0) {
				href = currentArray[ currentIndex - 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		},

		_finish = function () {
			inner.css('overflow', (currentOpts.scrolling == 'auto' ? (currentOpts.type == 'image' || currentOpts.type == 'iframe' || currentOpts.type == 'swf' ? 'hidden' : 'auto') : (currentOpts.scrolling == 'yes' ? 'auto' : 'visible')));

			if (!$.support.opacity) {
				inner.get(0).style.removeAttribute('filter');
				wrap.get(0).style.removeAttribute('filter');
			}

			$('#fancybox-title').show();

			if (currentOpts.hideOnContentClick)	{
				inner.one('click', $.fancybox.close);
			}
			if (currentOpts.hideOnOverlayClick)	{
				overlay.one('click', $.fancybox.close);
			}

			if (currentOpts.showCloseButton) {
				close.show();
			}

			fancybox_set_navigation();

			$(window).bind("resize.fb", $.fancybox.center);

			if (currentOpts.centerOnScroll) {
				$(window).bind("scroll.fb", $.fancybox.center);
			} else {
				$(window).unbind("scroll.fb");
			}

			if ($.isFunction(currentOpts.onComplete)) {
				currentOpts.onComplete(currentArray, currentIndex, currentOpts);
			}

			busy = false;

			fancybox_preload_images();
		},

		fancybox_draw = function(pos) {
			var width	= Math.round(start_pos.width	+ (final_pos.width	- start_pos.width)	* pos),
				height	= Math.round(start_pos.height	+ (final_pos.height	- start_pos.height)	* pos),

				top		= Math.round(start_pos.top	+ (final_pos.top	- start_pos.top)	* pos),
				left	= Math.round(start_pos.left	+ (final_pos.left	- start_pos.left)	* pos);

			wrap.css({
				'width'		: width		+ 'px',
				'height'	: height	+ 'px',
				'top'		: top		+ 'px',
				'left'		: left		+ 'px'
			});

			width	= Math.max(width - currentOpts.padding * 2, 0);
			height	= Math.max(height - (currentOpts.padding * 2 + (titleh * pos)), 0);

			inner.css({
				'width'		: width		+ 'px',
				'height'	: height	+ 'px'
			});

			if (typeof final_pos.opacity !== 'undefined') {
				wrap.css('opacity', (pos < 0.5 ? 0.5 : pos));
			}
		},

		fancybox_get_obj_pos = function(obj) {
			var pos		= obj.offset();

			pos.top		+= parseFloat( obj.css('paddingTop') )	|| 0;
			pos.left	+= parseFloat( obj.css('paddingLeft') )	|| 0;

			pos.top		+= parseFloat( obj.css('border-top-width') )	|| 0;
			pos.left	+= parseFloat( obj.css('border-left-width') )	|| 0;

			pos.width	= obj.width();
			pos.height	= obj.height();

			return pos;
		},

		fancybox_get_zoom_from = function() {
			var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
				from = {},
				pos,
				view;

			if (orig && orig.length) {
				pos = fancybox_get_obj_pos(orig);

				from = {
					width	: (pos.width	+ (currentOpts.padding * 2)),
					height	: (pos.height	+ (currentOpts.padding * 2)),
					top		: (pos.top		- currentOpts.padding - shadow),
					left	: (pos.left		- currentOpts.padding - shadow)
				};
				
			} else {
				view = fancybox_get_viewport();

				from = {
					width	: 1,
					height	: 1,
					top		: view[3] + view[1] * 0.5,
					left	: view[2] + view[0] * 0.5
				};
			}

			return from;
		},

		fancybox_show = function() {
			loading.hide();

			if (wrap.is(":visible") && $.isFunction(currentOpts.onCleanup)) {
				if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
					$.event.trigger('fancybox-cancel');

					busy = false;
					return;
				}
			}

			currentArray	= selectedArray;
			currentIndex	= selectedIndex;
			currentOpts		= selectedOpts;

			inner.get(0).scrollTop	= 0;
			inner.get(0).scrollLeft	= 0;

			if (currentOpts.overlayShow) {
				if (isIE6) {
					$('select:not(#fancybox-tmp select)').filter(function() {
						return this.style.visibility !== 'hidden';
					}).css({'visibility':'hidden'}).one('fancybox-cleanup', function() {
						this.style.visibility = 'inherit';
					});
				}

				overlay.css({
					'background-color'	: currentOpts.overlayColor,
					'opacity'			: currentOpts.overlayOpacity
				}).unbind().show();
			}

			final_pos = fancybox_get_zoom_to();

			fancybox_process_title();

			if (wrap.is(":visible")) {
				$( close.add( nav_left ).add( nav_right ) ).hide();

				var pos = wrap.position(),
					equal;

				start_pos = {
					top		:	pos.top ,
					left	:	pos.left,
					width	:	wrap.width(),
					height	:	wrap.height()
				};

				equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

				inner.fadeOut(currentOpts.changeFade, function() {
					var finish_resizing = function() {
						inner.html( tmp.contents() ).fadeIn(currentOpts.changeFade, _finish);
					};
					
					$.event.trigger('fancybox-change');

					inner.empty().css('overflow', 'hidden');

					if (equal) {
						inner.css({
							top			: currentOpts.padding,
							left		: currentOpts.padding,
							width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
							height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
						});
						
						finish_resizing();

					} else {
						inner.css({
							top			: currentOpts.padding,
							left		: currentOpts.padding,
							width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
							height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
						});
						
						fx.prop = 0;

						$(fx).animate({ prop: 1 }, {
							 duration	: currentOpts.changeSpeed,
							 easing		: currentOpts.easingChange,
							 step		: fancybox_draw,
							 complete	: finish_resizing
						});
					}
				});

				return;
			}

			wrap.css('opacity', 1);

			if (currentOpts.transitionIn == 'elastic') {
				start_pos = fancybox_get_zoom_from();

				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
					})
					.html( tmp.contents() );

				wrap.css(start_pos).show();

				if (currentOpts.opacity) {
					final_pos.opacity = 0;
				}

				fx.prop = 0;

				$(fx).animate({ prop: 1 }, {
					 duration	: currentOpts.speedIn,
					 easing		: currentOpts.easingIn,
					 step		: fancybox_draw,
					 complete	: _finish
				});

			} else {
				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
					})
					.html( tmp.contents() );

				wrap.css( final_pos ).fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
			}
		},

		fancybox_process_inline = function() {
			tmp.width(	selectedOpts.width );
			tmp.height(	selectedOpts.height );

			if (selectedOpts.width	== 'auto') {
				selectedOpts.width = tmp.width();
				
			}
			if (selectedOpts.height	== 'auto') {
				selectedOpts.height	= tmp.height();
			}

			fancybox_show();
		},
		
		fancybox_process_image = function() {
			busy = true;

			selectedOpts.width	= imgPreloader.width;
			selectedOpts.height	= imgPreloader.height;

			$("<img />").attr({
				'id'	: 'fancybox-img',
				'src'	: imgPreloader.src,
				'alt'	: selectedOpts.title
			}).appendTo( tmp );

			fancybox_show();
		},

		fancybox_start = function() {
			fancybox_abort();

			var obj	= selectedArray[ selectedIndex ],
				href, 
				type, 
				title,
				str,
				emb,
				selector,
				data;

			selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));
			title = obj.title || $(obj).title || selectedOpts.title || '';
			
			if (obj.nodeName && !selectedOpts.orig) {
				selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
			}

			if (title === '' && selectedOpts.orig) {
				title = selectedOpts.orig.attr('alt');
			}

			if (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href)) {
				href = selectedOpts.href || null;
			} else {
				href = selectedOpts.href || obj.href || null;
			}

			if (selectedOpts.type) {
				type = selectedOpts.type;

				if (!href) {
					href = selectedOpts.content;
				}
				
			} else if (selectedOpts.content) {
				type	= 'html';

			} else if (href) {
				if (href.match(imgRegExp)) {
					type = 'image';

				} else if (href.match(swfRegExp)) {
					type = 'swf';

				} else if ($(obj).hasClass("iframe")) {
					type = 'iframe';

				} else if (href.match(/#/)) {
					obj = href.substr(href.indexOf("#"));

					type = $(obj).length > 0 ? 'inline' : 'ajax';
				} else {
					type = 'ajax';
				}
			} else {
				type = 'inline';
			}

			selectedOpts.type	= type;
			selectedOpts.href	= href;
			selectedOpts.title	= title;

			if (selectedOpts.autoDimensions && selectedOpts.type !== 'iframe' && selectedOpts.type !== 'swf') {
				selectedOpts.width		= 'auto';
				selectedOpts.height		= 'auto';
			}

			if (selectedOpts.modal) {
				selectedOpts.overlayShow		= true;
				selectedOpts.hideOnOverlayClick	= false;
				selectedOpts.hideOnContentClick	= false;
				selectedOpts.enableEscapeButton	= false;
				selectedOpts.showCloseButton	= false;
			}

			if ($.isFunction(selectedOpts.onStart)) {
				if (selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts) === false) {
					busy = false;
					return;
				}
			}

			tmp.css('padding', (shadow + selectedOpts.padding + selectedOpts.margin));

			$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
				$(this).replaceWith(inner.children());
			});

			switch (type) {
				case 'html' :
					tmp.html( selectedOpts.content );
					fancybox_process_inline();
				break;

				case 'inline' :
					$('<div class="fancybox-inline-tmp" />').hide().insertBefore( $(obj) ).bind('fancybox-cleanup', function() {
						$(this).replaceWith(inner.children());
					}).bind('fancybox-cancel', function() {
						$(this).replaceWith(tmp.children());
					});

					$(obj).appendTo(tmp);

					fancybox_process_inline();
				break;

				case 'image':
					busy = false;

					$.fancybox.showActivity();

					imgPreloader = new Image();

					imgPreloader.onerror = function() {
						fancybox_error();
					};

					imgPreloader.onload = function() {
						imgPreloader.onerror = null;
						imgPreloader.onload = null;
						fancybox_process_image();
					};

					imgPreloader.src = href;
		
				break;

				case 'swf':
					str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
					emb = '';
					
					$.each(selectedOpts.swf, function(name, val) {
						str += '<param name="' + name + '" value="' + val + '"></param>';
						emb += ' ' + name + '="' + val + '"';
					});

					str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

					tmp.html(str);

					fancybox_process_inline();
				break;

				case 'ajax':
					selector	= href.split('#', 2);
					data		= selectedOpts.ajax.data || {};

					if (selector.length > 1) {
						href = selector[0];

						if (typeof data == "string") {
							data += '&selector=' + selector[1];
						} else {
							data.selector = selector[1];
						}
					}

					busy = false;
					$.fancybox.showActivity();

					ajaxLoader = $.ajax($.extend(selectedOpts.ajax, {
						url		: href,
						data	: data,
						error	: fancybox_error,
						success : function(data, textStatus, XMLHttpRequest) {
							if (ajaxLoader.status == 200) {
								tmp.html( data );
								fancybox_process_inline();
							}
						}
					}));

				break;

				case 'iframe' :
					$('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" scrolling="' + selectedOpts.scrolling + '" src="' + selectedOpts.href + '"></iframe>').appendTo(tmp);
					fancybox_show();
				break;
			}
		},

		fancybox_animate_loading = function() {
			if (!loading.is(':visible')){
				clearInterval(loadingTimer);
				return;
			}

			$('div', loading).css('top', (loadingFrame * -40) + 'px');

			loadingFrame = (loadingFrame + 1) % 12;
		},

		fancybox_init = function() {
			if ($("#fancybox-wrap").length) {
				return;
			}

			$('body').append(
				tmp			= $('<div id="fancybox-tmp"></div>'),
				loading		= $('<div id="fancybox-loading"><div></div></div>'),
				overlay		= $('<div id="fancybox-overlay"></div>'),
				wrap		= $('<div id="fancybox-wrap"></div>')
			);

			if (!$.support.opacity) {
				wrap.addClass('fancybox-ie');
				loading.addClass('fancybox-ie');
			}

			outer = $('<div id="fancybox-outer"></div>')
				.append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>')
				.appendTo( wrap );

			outer.append(
				inner		= $('<div id="fancybox-inner"></div>'),
				close		= $('<a id="fancybox-close">&times;</a>'),

				nav_left	= $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
				nav_right	= $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
			);

			close.click($.fancybox.close);
			loading.click($.fancybox.cancel);

			nav_left.click(function(e) {
				e.preventDefault();
				$.fancybox.prev();
			});

			nav_right.click(function(e) {
				e.preventDefault();
				$.fancybox.next();
			});

			if (isIE6) {
				overlay.get(0).style.setExpression('height',	"document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
				loading.get(0).style.setExpression('top',		"(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");

				outer.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>');
			}
		};

	/*
	 * Public methods 
	 */

	$.fn.fancybox = function(options) {
		$(this)
			.data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
			.unbind('click.fb').bind('click.fb', function(e) {
				e.preventDefault();

				if (busy) {
					return;
				}

				busy = true;

				$(this).blur();

				selectedArray	= [];
				selectedIndex	= 0;

				var rel = $(this).attr('rel') || '';

				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);

				} else {
					selectedArray	= $("a[rel=" + rel + "], area[rel=" + rel + "]");
					selectedIndex	= selectedArray.index( this );
				}

				fancybox_start();

				return false;
			});

		return this;
	};

	$.fancybox = function(obj) {
		if (busy) {
			return;
		}

		busy = true;

		var opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

		selectedArray	= [];
		selectedIndex	= opts.index || 0;

		if ($.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					$(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
				} else {
					obj[i] = $({}).data('fancybox', $.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				$(obj).data('fancybox', $.extend({}, opts, obj));
			} else {
				obj = $({}).data('fancybox', $.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		if (selectedIndex > selectedArray.length || selectedIndex < 0) {
			selectedIndex = 0;
		}

		fancybox_start();
	};

	$.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(fancybox_animate_loading, 66);
	};

	$.fancybox.hideActivity = function() {
		loading.hide();
	};

	$.fancybox.next = function() {
		return $.fancybox.pos( currentIndex + 1);
	};
	
	$.fancybox.prev = function() {
		return $.fancybox.pos( currentIndex - 1);
	};

	$.fancybox.pos = function(pos) {
		if (busy) {
			return;
		}

		pos = parseInt(pos, 10);

		if (pos > -1 && currentArray.length > pos) {
			selectedIndex = pos;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos < 0) {
			selectedIndex = currentArray.length - 1;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos >= currentArray.length) {
			selectedIndex = 0;
			fancybox_start();
		}

		return;
	};

	$.fancybox.cancel = function() {
		if (busy) {
			return;
		}

		busy = true;

		$.event.trigger('fancybox-cancel');

		fancybox_abort();

		if (selectedOpts && $.isFunction(selectedOpts.onCancel)) {
			selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);
		}

		busy = false;
	};

	// Note: within an iframe use - parent.$.fancybox.close();
	$.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		if (currentOpts && $.isFunction(currentOpts.onCleanup)) {
			if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
				busy = false;
				return;
			}
		}

		fancybox_abort();

		$(close.add( nav_left ).add( nav_right )).hide();

		$('#fancybox-title').remove();

		wrap.add(inner).add(overlay).unbind();

		$(window).unbind("resize.fb scroll.fb");
		$(document).unbind('keydown.fb');

		function _cleanup() {
			//overlay.fadeOut('fast');
            overlay.hide();

			wrap.hide();

			$.event.trigger('fancybox-cleanup');

			inner.empty();

			if ($.isFunction(currentOpts.onClosed)) {
				currentOpts.onClosed(currentArray, currentIndex, currentOpts);
			}

			currentArray	= selectedOpts	= [];
			currentIndex	= selectedIndex	= 0;
			currentOpts		= selectedOpts	= {};

			busy = false;
		}

		inner.css('overflow', 'hidden');

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = fancybox_get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top		:	pos.top ,
				left	:	pos.left,
				width	:	wrap.width(),
				height	:	wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			fx.prop = 1;

			$(fx).animate({ prop: 0 }, {
				 duration	: currentOpts.speedOut,
				 easing		: currentOpts.easingOut,
				 step		: fancybox_draw,
				 complete	: _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	$.fancybox.resize = function() {
		var c, h;
		
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		c = inner.wrapInner("<div style='overflow:auto'></div>").children();
		h = c.height();

		wrap.css({height:	h + (currentOpts.padding * 2) + titleh});
		inner.css({height:	h});

		c.replaceWith(c.children());

		$.fancybox.center();
	};

	$.fancybox.center = function() {
		busy = true;

		var view	= fancybox_get_viewport(),
			margin	= currentOpts.margin,
			to		= {};

		to.top	= view[3] + ((view[1] - ((wrap.height() - titleh) + (shadow * 2 ))) * 0.5);
		to.left	= view[2] + ((view[0] - (wrap.width() + (shadow * 2 ))) * 0.5);

		to.top	= Math.max(view[3] + margin, to.top);
		to.left	= Math.max(view[2] + margin, to.left);

		wrap.css(to);

		busy = false;
	};

	$.fn.fancybox.defaults = {
		padding				:	10,
		margin				:	20,
		opacity				:	false,
		modal				:	false,
		cyclic				:	false,
		scrolling			:	'auto',	// 'auto', 'yes' or 'no'

		width				:	560,
		height				:	340,

		autoScale			:	true,
		autoDimensions		:	true,
		centerOnScroll		:	false,

		ajax				:	{},
		swf					:	{ wmode: 'transparent' },

		hideOnOverlayClick	:	true,
		hideOnContentClick	:	false,

		overlayShow			:	true,
		overlayOpacity		:	0.3,
		overlayColor		:	'#666',

		titleShow			:	true,
		titlePosition		:	'outside',	// 'outside', 'inside' or 'over'
		titleFormat			:	null,

		transitionIn		:	'fade',	// 'elastic', 'fade' or 'none'
		transitionOut		:	'fade',	// 'elastic', 'fade' or 'none'

		speedIn				:	300,
		speedOut			:	300,

		changeSpeed			:	300,
		changeFade			:	'fast',

		easingIn			:	'swing',
		easingOut			:	'swing',

		showCloseButton		:	true,
		showNavArrows		:	true,
		enableEscapeButton	:	true,

		onStart				:	null,
		onCancel			:	null,
		onComplete			:	null,
		onCleanup			:	null,
		onClosed			:	null
	};

	$(document).ready(function() {
		fancybox_init();
	});

})(jQuery);




}); // end fix

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
 
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;



