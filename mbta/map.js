var currentLat = 0;
var currentLng = 0;
var currentLoc = new google.maps.LatLng(currentLat, currentLng); 

var map = undefined; 
var myMarker; 
var infoWindow = new google.maps.InfoWindow;

// Initialize and add the map
function initMap(){
	// The location of South Station
	var SouthStation = {lat: 42.352271, lng: -71.05524200000001};
	// The map, centered at Uluru
	map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: 10, 				 //zoom level for a city
			center: SouthStation; 	 //centered on south station
		}
	)
  getMyLocation();
}

function getMyLocation{
	//var marker = new google.maps.Marker ({position: SouthStation, map: map});

	// Try HTML5 geolocation.
        if (navigator.geolocation) { // the navigator.geolocation object is supported on the browser
          navigator.geolocation.getCurrentPosition(function(position) {
              currentLat = position.coords.latitude,
              currentLng = position.coords.longitude;
              rendermap();
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

function rendermap(){

}