var currentLat = 0;
var currentLng = 0;
var currentLoc = new google.maps.LatLng(currentLat, currentLng); 

var map; 
var meMarker; 
var infoWindow = new google.maps.InfoWindow();

// Initialize and add the map
function initMap(){
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

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
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
  meMarker = new google.maps.Marker({
    position: currentLoc,
    title: "This is where I am!"
  });
  meMarker.setMap(map); //this one can be google's default red marker 
    
  // Open info window on click of marker
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(meMarker.title);
    infowindow.open(map, meMarker);
  });
}



