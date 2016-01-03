
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
