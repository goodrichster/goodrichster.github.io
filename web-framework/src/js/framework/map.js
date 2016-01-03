/*
save scroll position on click
*/   
     
define(['jquery'],function($){

 

     function renderMap($el){
        console.info(google,google.maps)

        var style = [
            {
                stylers: [
                    { saturation: "-10" },
                    { xlightness: "20" }
                ]
                },{
                featureType: "poi",
                stylers: [
                    { visibility: "off" }
                ]
                },{
                featureType: "transit",
                stylers: [
                    { visibility: "on" }
                ]
                },{
                featureType: "road",
                stylers: [
                    { lightness: "50" },
                    { visibility: "on" }
                ]
                },{
                featureType: "landscape",
                stylers: [
                    { xlightness: "50" }
                ]
            }
        ];


        if ($el.length > 0) {  

            var mapElement = $el.find('.map:first');

            var options = {
                zoom: mapElement.data('zoom') ? mapElement.data('zoom') : 7,
                minZoom: mapElement.data('min-zoom') ? mapElement.data('min-zoom') : 2,
                maxZoom: mapElement.data('max-zoom') ? mapElement.data('max-zoom') : 18,
                scrollwheel: false,
                center:  new google.maps.LatLng(42.3601983, -71.127229),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: false
            };

            if (mapElement.data('center')){
                if (mapElement.data('center').indexOf(',') == -1) return;
                var lat = parseFloat(mapElement.data('center').split(',')[0]);
                var lon = parseFloat(mapElement.data('center').split(',')[1]);
                options.center = new google.maps.LatLng(lat, lon);
            }

            var bounds = new google.maps.LatLngBounds();

            var map = new google.maps.Map(mapElement[0], options);
            map.setOptions({
                styles: style
            });   

            var infowindow = new google.maps.InfoWindow({});

            console.info($el.find("ul.pins").html());
            $el.find("ul.pins > li").each(function(){
                var title = $(this).attr('title');
                if ($(this).data('latlon').indexOf(',') == -1) return;
                var lat = parseFloat($(this).data('latlon').split(',')[0])
                var lon = parseFloat($(this).data('latlon').split(',')[1])
                var html = $(this).html();

                var myLatlng = new google.maps.LatLng(lat,lon);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillOpacity: 0.9,
                      fillColor: '#368db9',
                      strokeColor: '#a41034',
                      strokeOpacity: 0,

                      scale: 4
                    },
                    title: title
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(html)
                    infowindow.open(map,marker);
                });
                bounds.extend(marker.position);
            })

            if (mapElement.data('fitbounds')) map.fitBounds(bounds);

            var listener = google.maps.event.addListener(map, "idle", function () {
                google.maps.event.removeListener(listener);
            });

        }

     }

     return function(el){
        var $el = $(el);
        if ($el.data('map-installed') === true) return;
        $el.data('map-installed',true);
        console.info('init',$el.find('.pins').html())

        if (window.google && window.google.maps){
           renderMap($el);
        } else {
           var num = parseInt(Math.random(0,10000)*100000000)
           // stack them and only call the init once
           window['framework_map_init'] = window['framework_map_init'] || [];
           window['framework_map_init'].push(function(){
               renderMap($el);
           });
           window.framework_map_init_all = function(){
              for(var i = 0;i<window.framework_map_init.length;i++){
                 window.framework_map_init[i]();
              }
              window.framework_map_init_all = function(){};
           }
           var libs = ['https://maps.googleapis.com/maps/api/js?&callback=framework_map_init_all'];
           require(libs,function(){});      
        }

     }
});

