/*
activate expandable items
*/

define(['jquery'],function($){


    function updateExpandableHeading($el) {
        
        var currentContent = $el.clone(true, true);

        if ($('html').hasClass('ua-mobile') && !$el.next().hasClass('accordionized')) {
            //activating an accordian
            console.log("Mobile");
            var h = '';
            h += '<div class="expandable-headings accordionized"><div class="toggle-container">';
            h += '<a href="#" class="toggle-button black eta-uc">' + $el.find('h2, h3').first().text() + ' <i class="icon24-open toggle-hide"></i><i class="icon24-close toggle-show"></i></a>';
            h += '<div class="toggle-show has-slide accordion-body">';
            currentContent.find('h2, h3').first().remove();
            //h += currentContent.html();
            h += '</div></div></div>'
            $el.addClass('original').hide();
            $newel = $(h);
            $el.after($newel);
            $newel.find('.accordion-body').append(currentContent);
            $(document).trigger('framework.domupdate');
        }

        if ($('html').hasClass('ua-tablet') || $('html').hasClass('ua-desktop')) {
            // unwrappig an accordian
            console.log("tablet or desktop");
            $el.next('.accordionized').remove();
            $el.show()
            $(document).trigger('framework.domupdate');
        }
    }


    return function(el){
    
        if ($(el).data('expandable-installed') === true) return;
        $(el).data('expandable-installed',true);
       
        var $el = $(el);
       
        $el.find("dd").hide();
       
        if ($el.hasClass('plusminus')) {
            $el.find(">dt").each(function(){
                $(this).find("a:first").prepend('<span class="plus">+</span><span class="minus">&ndash;</span>');           
            });
        }
       
        if ($el.hasClass('accordian')) {
            $el.find(">dt").each(function(){
                $(this).find("a:first").after('<span class="icon-accordian-expand"></span><span class="icon-accordian-collapse"></span>');        
            });
        }

        if ($el.hasClass('mobile-accordion')) {

            $('.mobile-accordion-header',$el).each(function(){
                window.framework.fastClick(this);
                if ($(this).hasClass('mobile-accordion-header-plusminus')) {
                    $(this).prepend('<span class="icon-plusbox mobile-visible"></span>');
                } else {
                    $(this).prepend('<span class="icon-expand2 mobile-visible black"></span>');
                }
            });

            $el.on("click",".mobile-accordion-header",function(){
                console.info($(this).find('mobile-visible:visible').length);
                if ($(this).find('.mobile-visible:visible').length === 0) return;
                if ($(this).hasClass('mobile-accordion-header-plusminus')) {
                    $(this).find('.icon-plusbox,.icon-minusbox').toggleClass('icon-minusbox icon-plubox');
                }
                $(this).toggleClass("mobile-accordion-header-active").next('.mobile-accordion-body').slideToggle('fast');
            });

            $el.find(".mobile-accordion-header.mobile-accordion-header-active").each(function(){
                if ($(this).hasClass('mobile-accordion-header-plusminus')) {
                    $(this).find('.icon-plusbox,.icon-minusbox').toggleClass('icon-minusbox icon-plubox');
                }
                $(this).next('.mobile-accordion-body').css('display','block');
            });

        } else if ($el.hasClass('mobile-accordion2')) {

            $el.on("click","a",function(event){
                var parent = $(this).parent()
                parent.toggleClass('active');
                var placeholder = parent.find('.mobile-accordion2-placeholder');
                if (placeholder.length == 0) {
                    var target = $(this).attr('href');
                    parent.append('<div class="mobile-accordion2-placeholder"></div>');
                    $(target).each(function(){
                        parent.find('.mobile-accordion2-placeholder').append(this);
                    })
                }
                event.preventDefault();
            });

        } else if ($el.hasClass('mobile-expandable-headings')) { 

            updateExpandableHeading($el);
            $(document).bind("framework.resize", function(){
               updateExpandableHeading($el);
            });

        } else {
            $el.on("click","dt",function(){
                $(this).toggleClass("open").next('dd').slideToggle('fast');
                if (window.Widgets) window.Widgets.refresh();
                return false;
            });
        }
    }
});

