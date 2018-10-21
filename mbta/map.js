var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.352271, lng: -71.05524200000001}, //centered on south station
		zoom: 10; // zoom level for a city
}
)
}
