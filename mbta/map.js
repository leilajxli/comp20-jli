var currentLat = 0;
var currentLng = 0;
var currentLoc = new google.maps.LatLng(currentLat, currentLng); 

var map; 
var myMarker; 
var infoWindow = new google.maps.InfoWindow();

var image;        //icon image
var MBTAStops;    //is this a list, map or array?
var stop;         //stores the geolocation of each stop
var stopMarker;   //icons rendered on the map

//cited: https://developers.google.com/maps/documentation/javascript/geolocation
// Initialize and add the map
function initMap(){       //where do I call the first function?
  // The location of South Station
  var SouthStation = {lat: 42.352271, lng: -71.05524200000001};
  // The map, centered at Uluru
  map = new google.maps.Map(
    document.getElementById("map"), {
      zoom: 10,          //zoom level for a city
      center: SouthStation   //centered on south station
    }
  );
  getMyLocation();
}

function getMyLocation(){
  //var marker = new google.maps.Marker ({position: SouthStation, map: map});

  // Try HTML5 geolocation object
        if (navigator.geolocation) { // the navigator.geolocation object is supported on the browser
          navigator.geolocation.getCurrentPosition(function(position) {
              currentLat = position.coords.latitude;
              currentLng = position.coords.longitude;
              renderMap();

            infoWindow.setPosition(currentLoc);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(currentLoc);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}

function handleLocationError(browserHasGeolocation, infoWindow, currentLoc) {
        infoWindow.setPosition(currentLoc);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

function renderMap() {
  currentLoc = new google.maps.LatLng(currentLat, currentLng);

  //make the map object go to whereIam
  map.panTo(currentLoc);
  
  // set value to the declared marker variable 
  myMarker = new google.maps.Marker({
    position: currentLoc,
    title: "This is where I am!"
  });
  myMarker.setMap(map); //this one can be google's default red marker 
    
  // Open info window on click of marker
  google.maps.event.addListener(myMarker, 'click', function() {
    infoWindow.setContent(myMarker.title);
    infoWindow.open(map, myMarker);
  });

  renderMBTAStops();
}

function renderMBTAStops(){
  MBTAStops = JSON.parse(

{"MBTAStops":[
  { "stop_name":"South Station","stop_lat":"42.352271","stop_lon":"-71.05524200000001","stop_id":"place-sstat" },
  { "stop_name":"Andrew","stop_lat":"42.330154","stop_lon":"-71.057655","stop_id":"place-andrw" },
  { "stop_name":"Porter Square","stop_lat":"42.3884","stop_lon":"-71.11914899999999","stop_id":"place-portr" },
  { "stop_name":"Harvard Square","stop_lat":"42.373362","stop_lon":"-71.118956","stop_id":"place-harsq" },
  { "stop_name":"JFK/UMass","stop_lat":"42.320685","stop_lon":"-71.052391","stop_id":"place-jfk" },
  { "stop_name":"Savin Hill","stop_lat":"42.31129","stop_lon":"-71.053331","stop_id":"place-shmnl" },
  { "stop_name":"Park Street","stop_lat":"42.35639457","stop_lon":"-71.0624242","stop_id":"place-pktrm" },
  { "stop_name":"Broadway","stop_lat":"42.342622","stop_lon":"-71.056967","stop_id":"place-brdwy" },
  { "stop_name":"North Quincy","stop_lat":"42.275275","stop_lon":"-71.029583","stop_id":"place-nqncy" },
  { "stop_name":"Shawmut","stop_lat":"42.29312583","stop_lon":"-71.06573796000001","stop_id":"place-smmnl" },
  { "stop_name":"Davis","stop_lat":"42.39674","stop_lon":"-71.121815","stop_id":"place-davis" },
  { "stop_name":"Alewife","stop_lat":"42.395428","stop_lon":"-71.142483","stop_id":"place-alfcl" },
  { "stop_name":"Kendall/MIT","stop_lat":"42.36249079","stop_lon":"-71.08617653","stop_id":"place-knncl" },
  { "stop_name":"Charles/MGH","stop_lat":"42.361166","stop_lon":"-71.070628","stop_id":"place-chmnl" },
  { "stop_name":"Downtown Crossing","stop_lat":"42.355518","stop_lon":"-71.060225","stop_id":"place-dwnxg" },
  { "stop_name":"Quincy Center","stop_lat":"42.251809","stop_lon":"-71.005409","stop_id":"place-qnctr" },
  { "stop_name":"Quincy Adams","stop_lat":"42.233391","stop_lon":"-71.007153","stop_id":"place-qamnl" },
  { "stop_name":"Ashmont","stop_lat":"42.284652","stop_lon":"-71.06448899999999","stop_id":"place-asmnl" },
  { "stop_name":"Wollaston","stop_lat":"42.2665139","stop_lon":"-71.0203369","stop_id":"place-wlsta" },
  { "stop_name":"Fields Corner","stop_lat":"42.300093","stop_lon":"-71.061667","stop_id":"place-fldcr" },
  { "stop_name":"Central Square","stop_lat":"42.365486","stop_lon":"-71.103802","stop_id":"place-cntsq" },
  { "stop_name":"Braintree","stop_lat":"42.2078543","stop_lon":"-71.0011385","stop_id":"place-brntn" },
]}
   );
  
  addMarkers(map);

}

//cited: https://developers.google.com/maps/documentation/javascript/examples/icon-complex
function addMarkers(map) {
        // Adds markers to the map.
        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        image = {
          //icon downloaded from here: https://icons8.com/icon/set/signpost/all
          url: 'signpost.png',
          // This marker is 8 pixels wide by 8 pixels high.
          size: new google.maps.Size(8, 8),
          // The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image (0, 0).
          origin: new google.maps.Point(0, 0),
          // The position at which to anchor an image in correspondence to the location of the marker on the map. By default, the anchor is located along the center point of the bottom of the image.
          anchor: new google.maps.Point(4, 8)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        // Coordinates are relative to the top, left corner of the object. 
        var shape = {
          coords: [0,0,8,8],
          type: 'rect'
        };
        for (var i = 0; i < MBTAStops.length; i++) {
          stop = MBTAStops[i];
          stopMarker = new google.maps.Marker({
            position: {lat: stop[1], lng: stop[2]},
            map: map,
            icon: image,
            shape: shape,
            title: stop[0],
            //All markers are displayed on the map in order of their zIndex, (type:number)
            //with higher values displaying in front of markers with lower values. ->this might be a problem with strings?
            zIndex: stop[3]   
          });
        }

        stopMarker.setMap(map); //now each stop marker will be rendered on the map

        // Open info window on click of marker
        google.maps.event.addListener(stopMarker, 'click', function(){
          //setContent(content), content:  string|Node
          infoWindow.setContent(stopMarker.title);
           //Opens this InfoWindow on the given map. 
          infoWindow.open(map, stopMarker);
        });


      }


