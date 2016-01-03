/*

typeahead

https://twitter.github.io/typeahead.js/js/main.js
http://fusiongrokker.com/post/heavily-customizing-a-bootstrap-typeahead


This was modified in the plugin
_onTabKeyed: function onTabKeyed(type, $e) {
    var $selectable;
    if ($selectable = this.menu.getActiveSelectable()) {
        this.select($selectable); // && $e.preventDefault();  allow people to tab to the search button 
    } else if ($selectable = this.menu.getTopSelectable()) {
        //this.autocomplete($selectable) && $e.preventDefault(); // don't autofill a suggestion when user hits tab
    }
},

*/

define(['jquery','framework/jquery.typeahead'],function($,typeahead){


     function substringMatcher(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });             
        cb(matches);
      };
    };

    return function(el){

        var $el = $(el);
        if ($el.data('typeahead-installed') == true) return;
        $el.data('typeahead-installed',true);

        require(['typeahead.js','bloodhound'],function(typeahead,Bloodhound){

            var configs = [{
                      hint: $el.data('typeahead-hint') ? true : false,
                      highlight: true,
                      minLength: 1
                    }];

            // inline typeahead values

            for (var i=-1;i<10;i++) {
                var d = $el.data('typeahead-set'+i+'-values');
                if (i == -1) d = $el.data('typeahead-values');
                if (d) {
                    var values = [];
                    $.each(d.split('|'), function(){
                        values.push($.trim(this));
                    });
                    var c = {source: substringMatcher(values)}
                    var label = $el.data('typeahead-set'+i+'-label');
                    if (label) c['templates'] = {header: '<h3 class="mu-uc">'+ label +'</h3>'}
                    configs.push(c);
                }                
            }

            // external autocomplete values

            var endpoint = $el.data('typeahead-endpoint');
            var prefetch = $el.data('typeahead-prefetch');
            if (endpoint || prefetch) {
                var opts = {};
                opts.datumTokenizer = Bloodhound.tokenizers.obj.whitespace('value');
                opts.queryTokenizer = Bloodhound.tokenizers.whitespace;
                //opts.local = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
                if (prefetch) opts.prefetch = {
                                                    url: prefetch,
                                                    transform: function(response){
                                                        var results = [];
                                                        $.each(response,function(){
                                                            results.push({'value':this.t || this.title})
                                                        })
                                                        return results;
                                                    }
                                              }
                if (endpoint) opts.remote = {
                                                    url: endpoint,
                                                    wildcard: '%QUERY',
                                                    transform: function(response){
                                                        var results = [];
                                                        $.each(response,function(){
                                                            results.push({'value':this.t || this.title})
                                                        })
                                                        return results;
                                                    }
                                            }
                var dataset = new Bloodhound(opts);
                var c = {display: 'value', source: dataset, limit: 5}
                configs.push(c);
            }

            if (configs.length > 1) {
                $el.find('input').each(function () {
                    var t = null;
                    if (configs.length == 2)
                        t = $(this).typeahead(configs[0], configs[1]);
                    if (configs.length == 3)
                        t = $(this).typeahead(configs[0], configs[1], configs[2]);
                    t.on('typeahead:select', function (e, data) {
                        $el.trigger('select', { val: t.val() });
                    });
                    t.on('keypress', function (e) {
                        var code = e.keyCode ? e.keyCode : e.which;
                        if (code === 13) {
                            e.preventDefault();
                            $el.trigger('enter', { val: t.val() });
                        }
                    });
                });
            }

        })

    }
});

 