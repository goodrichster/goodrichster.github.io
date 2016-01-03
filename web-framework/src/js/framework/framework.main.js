//
// framework.js - Sitewide JavaScript for Headers/Footers
//
// $Author: suchan $
// $Date: 2012-10-26 12:45:41 -0400 (Fri, 26 Oct 2012) $
// $Revision: 132348 $
//

(function($){

var Framework = {
   init: function(){
       Framework.supernav();
       Framework.mainsearch();
       Framework.superfooter();
   },
   
   supernav: function(){

       if (/hbs\.edu\/doctoral\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-doctoral").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/mba\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-mba").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/about\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-about").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/news\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-about").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/faculty\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-faculty").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/exed\.hbs\.edu\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-ee").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/alumni/.test(document.location.hostname)) {
          $(".universal-header-v3 .nav-tabs #header-nav-alumni").toggleClass('active inherit-bg inherit-color-onhover');
       }

       $(".universal-banner .toggle-button").click(function(){
          window.setTimeout(function(){
              $(".universal-site-search-query").each(function(){
                 this.selectionStart = this.selectionEnd = this.value.length;
              })
          },500);
       });

       $("#supernav-sitemap,.supernav-sitemap-trigger").click(function(){
          $("#supernav .sitemap").slideToggle(400);
          $("#supernav-sitemap").toggleClass("on");
          if (window.analytics && !window.sitemapEventSent)  {
                analytics.event("sitemap");
                window.sitemapEventSent = 1;
          }
          return false;
       }).attr('href','#');

       $("#supernav .close a").click(function(){
          $("#supernav .sitemap").slideToggle(400);
          $("#supernav-sitemap").toggleClass("on");
          return false;
       });
   },
      
   mainsearch: function() {
      var prompt = 'SEARCH';
      if ($("#search_text").attr('data-placeholder')) { prompt = $("#search_text").attr('data-placeholder') }
      $("#search_text").focus(function(){
            if ($(this).val() == prompt) { $(this).val('') }
      });
      // new
      $(".universal-site-search-query").keypress(function (e) {
          var code = (e.keyCode ? e.keyCode : e.which);
          if (code === 13) { //Enter keycode                        
              $("#aspnetForm").submit(function(){return false});
              $(".universal-site-search-button").click();
          }
      });
      // legacy
      $('#search_text').keypress(function(e) { 
          if(e.which == 13) {
             $(this).blur();
             $('#search_submit').click();
             return false;
          }
          else{
             return true;
          }
      });

      $("#search_submit,.universal-site-search-button").click(function(){
          var val = '';
          $("#search_text,.universal-site-search-query").filter(':visible').each(function(){
              val = val || $(this).val();
          });
          if (val != prompt && val != '') {
             var url = $("meta[name=HBSSearchUrl]").attr('content');
             if (url) {
                var subset = $("meta[name=HBSSearchSubset]").attr('content');
                if (subset) {
                    subset = 'sub='+subset+'&';
                } else {
                    subset = ''
                }
                document.location.href = url +"?"+subset+"q=" + encodeURIComponent(val);
             } else {
                url = "http://search.hbs.edu:8765/";
                var subset = $("meta[name=HBSSearchSubset]").attr('content');
                if (subset) {
                    subset = 'sub='+subset+'&';
                } else {
                    subset = ''
                }
                var theme = $("meta[name=HBSSearchTheme]").attr('content');
                if (theme) {
                    theme = theme + '/'
                } else {
                    theme = ''
                }
                document.location.href = url + theme+"?"+subset+"qt=" + encodeURIComponent(val);
            }
          }
          return false;
      });

      $(".mobile-navbar-search").each(function(){
             var subset = $("meta[name=HBSSearchSubset]").attr('content');
             if (subset) {
                $(this).append('<input type="hidden" name="subset" value="'+subset+'"/>');
             } 
      })

      $("meta[name=HBSSearchSuggestUrl]").eq(0).each(function(){
          var url = $(this).attr('content');
          var searchurl = $("meta[name=HBSSearchUrl]").attr('content');
          $(".universal-site-search-query").wrap('<div class="typeahead-container" data-typeahead-prefetch="'+url+'?_autocomplete=1&step=9999"></div>') 
          $(document).trigger('framework.domupdate');

          $(".typeahead-container").on('select',function(e,data){
               document.location.href = framework.URI(searchurl).search({'q':data.val}).toString()
          })

          $(".universal-site-search-query").on('keyup',function(){
             console.info($(this).val())
             if ($(this).val()){
               $(".slider-container").addClass('slider-backdrop-active')
             } else {
               $(".slider-container").removeClass('slider-backdrop-active')
             }
          }).blur(function(){
               $(".slider-container").removeClass('slider-backdrop-active')
          })

      })

   },

   mobilesearch: function(){
       
   },
       
   superfooter: function(){


          if( /hbs.edu\/employment/.test(document.location) ) {
            // Use linkedin school page for HR site and company page for the rest (Service now #INC0044210)
            $('.universal-footer .linkedin a#footer-linkedin').attr("href", "https://www.linkedin.com/company/4867?trk=vsrp_companies_res_name&trkInfo=VSRPsearchId%3A827216871418409731774%2CVSRPtargetId%3A4867%2CVSRPcmpt%3Aprimary"); 
          } else {
            $('.universal-footer .linkedin a#footer-linkedin').attr("href", "https://www.linkedin.com/edu/school?id=18484&trk=tyah&trkInfo=tarId%3A1416328166551%2Ctas%3Aharvard%20bus%2Cidx%3A6-1-10");  
          }

           // inherit color       
           var match = false;
           $("div[class*='-inherit']").eq(0).each(function(){
              /([a-z]+-inherit)/.test(this.className);
              var color = RegExp.$1
              match = true;
              $(".universal-footer-v3,.universal-header-v3").addClass(color);
           })
           if (!match) $(".universal-footer-v3,.universal-header-v3").addClass('hbsred-inherit');


          // inject site-footer into the superfooter
          var footer = $("#site-footer #info").html() || $("#site-footer").html();
          $("#site-footer").remove();          
          $("#superfooter .infobar .inner").append(footer);
          
          function toggleopen(){
             
             $("#superfooter .selector").not('.opened').each(function(){
                $("#superfooter .icon-footer-expand").removeClass("icon-footer-expand").addClass("icon-footer-collapse")
                $("#superfooter .infobar").slideDown(150,function(){
                    $("#superfooter .selector").toggleClass("opened");
                });
             });
          }

          function toggleclose(){
                closeAll();
                
                $("#superfooter .selector.opened").each(function(){
                   $("#superfooter .icon-footer-collapse").removeClass("icon-footer-collapse").addClass("icon-footer-expand")
                   $(".footerspace").slideUp(150);
                   $("#superfooter .infobar").slideToggle(150,function(){
                      $("#superfooter .selector").toggleClass("opened");
                   });
                });
          }

          // opening the infobar with click
                
          $("#superfooter .selector").click(function(){
             toggleopen();
             if (window.analytics && !window.footerOpenEventSent)  {
                analytics.event("footer");
                window.footerOpenEventSent = 1;
             }
          });   
                
          $("#superfooter").click(function(){
             toggleclose();
          });   
                
          // Social Icons
               
          $("#superfooter").click(function(event){event.stopPropagation();})


          function toggleOverlay(li) {
              $("li:last",li).addClass("last");
              $(".overlay", li).slideToggle(function(){
                  $(this).toggleClass("closed");                  
              });     
              
              $("a.close",li).remove();
              $(".overlay",li).prepend('<a href="#" class="close"><span class="icon-square-close-micro"></span></a>');
              $("a.close",li).click(function(){
                 closeAll();
                 return false;
              })
          }
             
          function closeAll() { 
               $(".overlay:not(.closed)").slideToggle(function(){
                  $(this).toggleClass("closed");
               }); 
               $(".overlay.closed").hide();
          }
              
          $("#superfooter .opens-overlay-popup").addClass("opens-overlay");

          $("#superfooter .opens-overlay>a").click(function(event){
               closeAll();
               var $p = $(this).parent();
               if ($(">div,>ul",$p).hasClass("closed")) { 
                    toggleOverlay($p);
               }
               event.stopPropagation();
               return false;
          });
                
          $("html").click(function(){
               toggleclose();
          });
          
    }

}


$(window).load(function(){Framework.init()}); // make sure this happens last for the mobile flyout search box


})(jQuery);


/**
* Functions extracted from the core.js library, these are stored in framework.js so they can be changed globally.
*
*
**/ 

(function($){

var GlobalCore = {

    inSharePointEditModeCache: null,
    inSharePointEditMode: function(){
      if (GlobalCore.inSharePointEditModeCache == null) {
         GlobalCore.inSharePointEditModeCache = $(".ms-formfieldlabel").size() > 0;
      }
      return GlobalCore.inSharePointEditModeCache;
    },
    
    add_link_class: function(a) {
        $a = $(a);

        //add to prevent double event bindings
        $a.data("linkClassAdded",true);

        var ext = false;
        var pdf = false;
        var href = a.href;
        var hrefAttr = $a.attr("href");
        
        if (href && href.indexOf('mailto') == -1) {
            //with exception of 1)PDFs 2)clubhub.hbs.org and 3)hbs.planyourlegacy.org, all non hbs.edu links are to open in a new tab.

            if (hrefAttr == "#" || href.indexOf('hbs.edu') > -1 || href.indexOf('hbs.org') > -1 || 
                href.indexOf('service-now.com') > -1 || href.indexOf('hbsstg.org') > -1 ||
                href.indexOf('force.com') > -1 ||
                href.indexOf('hbs.planyourlegacy.org') > -1 || href.indexOf('javascript:') > -1){
                ext = false;
            } else {
                ext = true;
            }
            if ( href.indexOf('.pdf') > -1 ) {
                ext = false;
                pdf = true;
             }
        }
        
        if ($a.hasClass('noext')) {
            ext = false;
        }

        if (($a.attr('class') || '').indexOf('widget-video') > -1) {
            ext = false;
        }
        
        if ($a.hasClass('nopdf')) {
            pdf = false;
        }

        // if there are any images inside the a tag and marked as ext
        if (ext && ($a.children("img").size() > 0) && ($a.attr("href") != "#")){    
            ext = false;
            $a.addClass('ext-no-icon');
        }
        // if there are any images inside the a tag and marked as ext        
        if (pdf && ($a.children("img").size() > 0)&&($a.attr("href") != "#")){    
            pdf = false;
            $a.addClass('ext-no-icon');
        }
        if (ext) $a.addClass('ext');
        if (pdf) $a.addClass('pdf');
    },
    
    std_link: function(a,options) {

        if( GlobalCore.inSharePointEditMode() ) return;
    
        if( $(a).data("linkClassAdded") == true ) return;
        
        // fix the sharepoint deployment bug
        if (document.location.hostname === 'www.hbs.edu' && a.hostname && a.hostname === 'prod.hbs.edu') a.hostname = 'www.hbs.edu';

        var defaults = {
           noIcons: false
        };

        options = $.extend(defaults,options)
        GlobalCore.add_link_class(a);
        $a = $(a);
        
        //add code to open in a new window
        if (($a.hasClass("ext")||($a.hasClass("pdf"))||($a.hasClass("ext-no-icon")))) {
            if(!$(a).parent().hasClass("opens-overlay")){ //without this, clicking on a footer's social media icon opens up in a new tab
                if (!a.target) {
                    a.target = "_blank";
                }
                /*$(a).click(function(){
                    window.open(a.href);
                    return false;
                });*/
            }
        }

        //hover effect for .pdf links
        if($("#pdfHover").length < 1){
            $("body").append($('<div id="pdfHover"><span class="pdf-text">PDF</span><span class="arrow-down"> </span></div>'));
        }
        if ($a.hasClass('pdf') || $a.hasClass('protected')) {
           if((!options.noIcons) && (!$a.hasClass('ext-no-icon'))){    //skip if unwanted
                
                $(a).hover(
                    function(e){

                        var x = e.pageX;
                        var y = e.pageY;
                        var $a = $(this);
                        if (!$a.hasClass('pdf') && !$a.hasClass('protected')) return;
                        
                        //get the y distance of the link
                        var $t = $(e.target);
                        var top = Math.ceil($t.offset().top);
                        var cursorDistance = y - top;
        
                        // get lineHeight
                        $t.prepend('<span>I</span>');
                        var measure = $t.find('span').eq(0);
                        var lineHeight = measure.height();
                        measure.remove();
        
                        //Supports up to 2 lines only. Anything beyond, hover icon appears at line 2.
                        var lines = 0;
                        if (cursorDistance >= lineHeight) {
                            lines = 1
                        } 

                        if ($a.hasClass('protected')) {
                           $("#pdfHover .pdf-text").html("LOGIN&nbsp;REQUIRED");
                           $("#pdfHover").addClass("protected");
                        } else {
                           $("#pdfHover").removeClass("protected");
                           $("#pdfHover .pdf-text").html("PDF");
                        }

                        $("#pdfHover").css("top", top + (lines * lineHeight)-33);
                        $("#pdfHover").css("left", x-20);
                    },
                    function(){
                        $("#pdfHover").css("top", "-50px");
                        $("#pdfHover").css("left", "-50px");
                });
            }
        }
    }
}



window.GlobalCore = GlobalCore;

})(jQuery);

/* ----------------------------------------------------
 *
 * Load Query Parameters
 *
 * ----------------------------------------------------
 */

window.query = {};
window.location.href.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) { if ($3) window.query[$1] = $3;}
);

/* ----------------------------------------------------
 *
 * for browsers that don't support logging
 *
 * ----------------------------------------------------
 
 
if(typeof console == 'undefined' || typeof console.info == 'undefined') {
   var names = ["log", "debug", "info", "warn", "error", "assert","dir", "dirxml", "group"
                , "groupEnd", "time", "timeEnd", "count", "trace","profile", "profileEnd"];
   window.console = {};
   for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}*/

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  global.console = global.console || {};
  var con = global.console;
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
})(typeof window === 'undefined' ? this : window);
// Using `this` for web workers while maintaining compatibility with browser
// targeted script loaders such as Browserify or Webpack where the only way to
// get to the global object is via `window`.













