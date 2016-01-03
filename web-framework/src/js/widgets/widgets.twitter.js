
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