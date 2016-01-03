/*
activate datepicker items
*/   
     
define(['jquery','framework/plugins'],function($,Plugins){

    function cleanup(dp,color) {
      var dpdiv;
      if (dp.dpDiv) {
        dpdiv = $(dp.dpDiv[0])
      } else {
        dpdiv = dp
      }      
      if (color == null) color = '';
      var cssStyles = {width:'250px',backgroundColor:'#cecece'}
      dpdiv.css('z-index','1000');
      dpdiv.addClass('component-framework color-framework type-framework').css(cssStyles).children().addClass('datepicker-pattern '+color);
    }

    function cleanup2(dp,color) {
      var dpdiv;
      if (dp.dpDiv) {
        dpdiv = $(dp.dpDiv[0])
      } else {
        dpdiv = dp
      }      
      if (color == null) color = '';
      dpdiv.children().addClass('datepicker-pattern '+color);
    }
    
    function parseDate(strDate) {
       var dateParts = strDate.split("/");
       return new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
    }

    function installDatepicker(el){
          
          var opts = {}

          opts.beforeShow = function(input,dp){
             dpdiv = $(dp.dpDiv[0]);
             $(input).data('dp',dp);
             cleanup(dp)
          }
          opts.beforeShowDay = function(date){
             var data = {date:date};
             $(el).trigger('beforeShowDay',data);
             if (data.result) {
                return data.result;
             } else {
                return [true,'',''];
             }
          }
          opts.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(' ');
          opts.showAnim = '';
          //opts.nextText = '';
          //opts.prevText = '';
          opts.constrainInput = true;
          opts.gotoCurrent = true;
          opts.dateFormat = "mm/dd/yy";

          if ($(el).hasClass('datepicker-cn')) {
              opts.monthNames = "1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月".split(' ');
              opts.dayNamesMin = "一 二 三 四 五 六 日".split(' ');
          }

          opts.onChangeMonthYear = function(year,month,dp){
             if (year) $(el).trigger('changeMonthYear',{year:year,month:month});
             window.setTimeout(function(){cleanup(dp)},1)
          }; 
          opts.onSelect = function(str,dp){
             if (str) $(el).trigger('select',{date:str});
             window.setTimeout(function(){cleanup(dp)},1)
          }; 
          
          if ($(el).attr('data-maxDate') || $('input',el).attr('data-maxDate')) {
             var d = parseDate($(el).attr('data-maxDate') || $('input',el).attr('data-maxDate'));
             if (d) opts.maxDate = d;
          }

          if ($(el).attr('data-minDate') || $('input',el).attr('data-minDate')) {
             var d = parseDate($(el).attr('data-minDate') || $('input',el).attr('data-minDate'));
             if (d) opts.minDate = d;
          }

          if ($(el).attr('data-dateFormat')) {
             opts.dateFormat = $(el).attr('data-dateFormat');
          }
        
          var classNames = $(el).parents("[class*='-inherit']").attr('class');
          var color = 'white-inherit';
          if (/([^ ]+-inherit)/.test(classNames)) {
             color = RegExp.$1;
          }

          if ($(el).is(':input')) {
              var dp = $(el).datepicker(opts);

              $(el).keyup(function(){
                 var dp = $(this).data('dp');
                 cleanup(dp)
                 window.setTimeout(function(){cleanup(dp)},1)
              })

              $(el).bind('focus keydown',function(){
                  cleanup($(this).data('dp'),color);              
              });

          } else {
              // container

              $(el).prepend($('<div class="datepicker-top-container"></div>'));
              $(el).append($('<div class="datepicker-bottom-container"></div>'));

              //var dp = $(el).datepicker(opts);
              $(el).on('focus',':input',function(){

                 var dp = $(el).data('dp');
                
                 if (dp && dp.find('.ui-datepicker-inline').length) {
                    return;
                 }

                 var sel = '.datepicker-bottom-container';
                 if( ($(this).offset().top > ($(window).scrollTop() + $(window).height() - 220)) ) {
                   sel = '.datepicker-top-container';
                 }

                 opts.defaultDate = $(this).val();
                 $(this).addClass('focus');

                 dp = $(sel,el).datepicker(opts);
                 $(el).data('dp',dp);

                 cleanup2(dp,color); 
              })

              $(el).on('select',function(e,data){
                  if (data) {
                     console.info('select',e,data);
                     $(':input',el).val(data.date);
                     $('.ui-datepicker',el).fadeOut(200,function(){
                         var dp = $(el).data('dp');
                         if (dp) dp.datepicker('destroy');
                         $(':input',el).removeClass('focus');
                     });
                  }
              })

              $("body").click(function(e){
                 dp = $(el).data('dp');
                 if ($(el).has(e.target).length == 0 && $(e.target).attr('class') && $(e.target).attr('class').indexOf('ui-datepicker') == -1) {
                   var dp = $(el).data('dp');
                   if (dp) dp.datepicker('destroy');
                   $(':input',el).removeClass('focus');
                 }
              })

              $(el).on('keyup',':input',function(){
                 var val = $(this).val();
                 console.info('input change',val);
                 try {
                   var date = $.datepicker.parseDate( "mm/dd/yy", val );
                   console.info('new date',date);
                   var dp = $(el).data('dp');
                   if (dp) $(dp).datepicker( "setDate", val);
                 } catch(e) {

                 }
              })

          }
    }
    

    return function(el){
    
       if ($(el).data('datepicker-installed') == true) return;
       $(el).data('datepicker-installed',true);
       
       Plugins.ready('jqueryui',function(){
          installDatepicker(el);
       })
            
	}     
});

