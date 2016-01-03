  
define(["jquery","framework/jquery.parsley.min"],function($){
    return function(el){

        var $el = $(el);

        if ($el.data('formcontainer-installed') === true) return;
        $el.data('formcontainer-installed',true);
        
        var action = $el.attr('data-action');
        var method = $el.attr('data-method');
        var form = $("#aspnetForm");
        var isFakeFormElement = !$el.is("form");

        if (isFakeFormElement) {


            // if we are not in a sharepoint form
            if ($el.parents('#aspnetForm').size() == 0) {
                $el.wrap('<form></form>');
                form = $el.parent();
                form.attr('action',action);
                form.attr('method',method);
            } 

            // if form-container is on a form element

            $el.on('click',":submit",function(e){
                if (!e.isDefaultPrevented()) submitForm(form,$el);
                return false; // block the normal submission of the form
            });

            function keypressInBox(e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code === 13) { //Enter keycode                        
                    e.preventDefault();
                    submitForm(form,$el);
                }
            }

            $(":text,:password",$el).bind("keypress", {}, keypressInBox);

        } else {
            form = $el;
            form.submit(function(){
                return submitForm(form,$el);
            });
        }

        $el.bind('validate',function(){
            validate(form,$el)
        })


        function validate(thisForm,container) {
            if ($(thisForm).attr('id') === 'aspnetForm') {

                $(":input",container).each(function(){
                    // remember all inputs in a div.form
                    $(this).data('autoform','1');
                });
                  
                // delete any inputs not in the div.form
                $(":input").each(function(){
                    if (!$(this).data('autoform')) { 
                        $(this).addClass('autoform-remove-name');
                        if ($(this).hasClass('required')) {
                            $(this).addClass('autoform-remove-required');
                            $(this).removeClass('required');
                        }
                        
                    }
                });
            }

            thisForm.parsley({
                messages: {
                  defaultMessage: "<b>ERROR</b> This value seems to be invalid."
                  , type: {
                        email:      "<b>ERROR</b> This value should be a valid email."
                      , url:        "<b>ERROR</b> This value should be a valid url."
                      , urlstrict:  "<b>ERROR</b> This value should be a valid url."
                      , number:     "<b>ERROR</b> This value should be a valid number."
                      , digits:     "<b>ERROR</b> This value should be digits."
                      , dateIso:    "<b>ERROR</b> This value should be a valid date (YYYY-MM-DD)."
                      , alphanum:   "<b>ERROR</b> This value should be alphanumeric."
                      , phone:      "<b>ERROR</b> This value should be a valid phone number."
                    }
                  , notnull:        "<b>ERROR</b> This value should not be null."
                  , notblank:       "<b>ERROR</b> This value should not be blank."
                  , required:       "<b>ERROR</b> This value is required."
                  , regexp:         "<b>ERROR</b> This value seems to be invalid."
                  , min:            "<b>ERROR</b> This value should be greater than or equal to %s."
                  , max:            "<b>ERROR</b> This value should be lower than or equal to %s."
                  , range:          "<b>ERROR</b> This value should be between %s and %s."
                  , minlength:      "<b>ERROR</b> This value is too short. It should have %s characters or more."
                  , maxlength:      "<b>ERROR</b> This value is too long. It should have %s characters or less."
                  , rangelength:    "<b>ERROR</b> This value length is invalid. It should be between %s and %s characters long."
                  , mincheck:       "<b>ERROR</b> You must select at least %s choices."
                  , maxcheck:       "<b>ERROR</b> You must select %s choices or less."
                  , rangecheck:     "<b>ERROR</b> You must select between %s and %s choices."
                  , equalto:        "<b>ERROR</b> This value should be the same."
                },
                animate: false,
                errorClass: 'field-error', // set error class
                errors: {
                    errorElem: '<div><b>Error:</b> </div>',
                    errorsWrapper: '<div></div>',
                    classHandler: function (elem, isRadioOrCheckbox) {  // add error class to parent
                        var grp = elem.parents('.field-group-vertical').eq(0);
                        if (grp) return grp;
                        if (!elem.attr('class') || elem.attr('class').indexOf('field') === -1) {
                            return $(elem).parent().parent();   
                        } else {
                            return $(elem).parent();   
                        }
                    },
                    container:  function (elem, isRadioOrCheckbox) {  // place the error on the page
                        var $container;
                        var grp = elem.parents('.field-group-vertical').eq(0);
                        if (grp.length) {
                            $container = $("<div class='error-placeholder'></div>").insertAfter(grp.children().last());
                            return $container;
                        }
                        if (!elem.attr('class') || elem.attr('class').indexOf('field') === -1) {
                            $container = $("<div class='error-placeholder'></div>").insertAfter(elem.parent());
                            return $container;
                        }
                        $container = elem.parent().find(".error-placeholder");
                        if ($container.length === 0) {
                            $container = $("<div class='error-placeholder'></div>").insertAfter(elem);
                        }
                        return $container;
                    }
                }
            });

            thisForm.parsley('validate');

            if (thisForm.parsley('isValid')) {
                container.removeClass('invalid');
            } else {
                container.addClass('invalid');
            }
        }

        
         
        function submitForm(thisForm,container) {

            var e = jQuery.Event("submit");
            $el.trigger(e);
            if (e.isDefaultPrevented()) {return false;}

            validate(thisForm,container);

            if (thisForm.parsley('isValid')) {
                $(".autoform-remove-name").each(function(){
                    $(this).attr('name',null); 
                });


                // set the method at the very last minute to protect password fields
                var action = container.attr('data-action');
                var method = container.attr('data-method');
                thisForm.attr('action',action);
                if (!method) { method = 'GET'; }
                thisForm.attr('method',method);
                thisForm.attr('action',action);
                if (thisForm.attr('method').toLowerCase() == 'get') {
                    $("input[type=password]").each(function(){
                        $(this).val('');
                    })
                }

                $(thisForm).submit();    
                return true;
            } else {
                $(".autoform-remove-required").each(function(){
                    $(this).addClass('required'); 
                });
                return false;
            }

        }
        
    };
});