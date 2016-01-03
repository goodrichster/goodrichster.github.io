/*
autorender.js
*/   

define(['jquery'],function($){


    function flyoutHTML(){
        var h = '<button class="flyout-panel-button slider-backdrop-above slider-close btn-glass white"><i class="icon24-close"></i></button>';

        h += '<div class="slider-targets" id="flyout-navigation">';
        var siteheader = $('.site-header h1').eq(0).text();
        var siteHeaderLink = $('.site-header h1 a').eq(0).attr('href');
        h += '   <h2 class="gamma-uc"><a class="white" href="' + siteHeaderLink + '">' +siteheader+'</a></h2>';

        var links = [];
        $(".navbar a").each(function(){
            links.push(this);
        });
        if (links.length) {
            h += '   <div class="hr"></div>';
            h += '<ul class="epsilon-uc unbulleted">'
            $(links).each(function(i,a) {
                h += '<li>' + a.outerHTML + '</li>'
            })
            h += '</ul>';
        }
        var toolbar = [];
        $(".toolbar a").each(function(){
            toolbar.push(this);
        });
        if (toolbar.length) {
            h += '<div class="hr"></div>'
            h += '<ul class="kappa-uc unbulleted">'
            $(toolbar).each(function(i,a) {
                h += '<li>' + a.outerHTML + '</li>'
            })
            h += '</ul>';
        }
        h += '<div class="hr"></div>'
        
        h += '<ul class="kappa-uc unbulleted">'
          h += '<li><a href="http://www.hbs.edu/maps/">Map / Directions</a></li>'
          h += '<li><a href="http://www.hbs.edu/siteindex/">Site Map</a></li>'
        h += '</ul>'

        h += '</div>';

        h += '<div class="search-container slider-targets hidden" id="flyout-search">';
        h += '<h2 class="gamma-uc white">Search</h2>';
        h += '<div class="hr"></div>';
        h += '<table class="search-box">';
        h += '   <tr>';
        h += '      <td><input type="text" class="universal-site-search-query" name="qt" value=""></td>';
        h += '      <td><input type="submit" class="universal-site-search-button" value="Go"></td>';
        h += '  </tr>';
        h += '</table>';
        h += '<div class="hr"></div>';
        h += '</div>';
        return h;

    }



    return function(el){
    
        var $el = $(el);

        if ($(el).data('autorender-installed') == true) return;
        $(el).data('autorender-installed',true);

        if ($el.hasClass('responsive-filters-inject')) {
            var stickyFilterHTML =  '<div class="smoke-bg filter-sticky" style="padding-top:16px; padding-bottom:16px; visibility:hidden;">' +
                                    '<div class="container  tablet-container mobile-container">' +
                                    '<a href="#filter-top" class="black epsilon nosmooth">Filter Results: <span class="hbsred">' +
                                    $('.responsive-filters-total').first().text() +
                                    '</span>' +
                                    '<i class="icon24-filter-open xtoggle-hide"></i>' + 
                                    '</a>' + 
                                    '</div>' + 
                                    '</div>';               

            $(".responsive-filters-inject").prepend(stickyFilterHTML);
        }

        if ($el.hasClass('responsive-facet-inject')) {
            $('.desktop-visible .facets').clone().appendTo('.responsive-facet-inject'); 
            $('.responsive-facet-inject-target').clone().appendTo('.responsive-facet-inject'); 
        }

        if ($el.hasClass('slider-inject')) {
            $el.addClass('slider-right-220 slider-container');
            $el.wrapInner('<div class="slider-content responsive-type"></div>');
            $el.prepend('<div class="slider-menu inherit-bg responsive-type"><div class="flyout-panel">'+flyoutHTML()+'</div></div>');
            $el.find('.slider-content').append('<div class="slider-backdrop"></div>');
            var v = $(".universal-site-search-query").val();
            $(".universal-site-search-query").val(v);

        }
        
        if ($el.hasClass('h1-responsive-nav')) {
            $el.find('h1,h2').each(function(){
                var h = '<div class="responsive-local-navigation toggle-container mobile-visible tablet-visible">';
                h += '<a href="#" class="toggle-button white">' + this.outerHTML;
                h += '</a>';
                h += '<div class="toggle-show has-slide">';
                h += '<ul class="kappa-uc">';
                var li = '';
                var label = $(this).text();
                var found = false;
                //loop through dropdowns looking for the one that matches the text in the h1
                $el.find('.responsive-breadcrumb .dropdown-container').each(function(){
                    var text = $(this).find('.dropdown-toggle').text();
                    var title = $(this).find('.dropdown-toggle').attr('title');
                    if (text.toLowerCase() == label.toLowerCase()
                        || (title && title.toLowerCase() == label.toLowerCase())
                        ) {
                        found = true;
                        $(this).find('.dropdown-menu a:gt(0)').each(function(){
                            li += '<li>' + this.outerHTML + '</li>';
                        });
                    }
                });
                h += li;
                h += '</ul>';
                h += '</div>';
                h += '</div>';
                if (!found) return;
                $(this).addClass('mobile-hidden tablet-hidden');
                $(this).after(h);
                $el.find('.responsive-local-navigation a').removeClass('inherit-color white');
                $el.find('.responsive-local-navigation a.active').addClass('white').parent().addClass('white');

                // console.info(this);
            });
            var button = '<span class="toggle-hide"><i class="icon24-open"></i></span>';
            button += '<span class="toggle-show"><i class="icon24-close"></i></span>';
            $(".responsive-local-navigation h1,.responsive-local-navigation h2",el).append(button);
        }

            
    };  
   

});

