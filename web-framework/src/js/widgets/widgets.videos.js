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



