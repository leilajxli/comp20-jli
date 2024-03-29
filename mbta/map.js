var map; 
var SouthStation = {lat: 42.352271, lng: -71.05524200000001};

var myMarker; 
var currentLat = 0;
var currentLng = 0;
var currentLoc = new google.maps.LatLng(currentLat, currentLng);  

var infoWindow = new google.maps.InfoWindow();
var infoWindowStop = new google.maps.InfoWindow();

var MBTAStops = 
[ //[0]-[12]
{ "stop_name":"Alewife","stop_lat":42.395428,"stop_lon":-71.142483,"stop_id":"place-alfcl"},
{ "stop_name":"Davis","stop_lat":42.39674,"stop_lon":-71.121815,"stop_id":"place-davis" },
{ "stop_name":"Porter Square","stop_lat":42.3884,"stop_lon":-71.11914899999999,"stop_id":"place-portr" },
{ "stop_name":"Harvard Square","stop_lat":42.373362,"stop_lon":-71.118956,"stop_id":"place-harsq" },
{ "stop_name":"Central Square","stop_lat":42.365486,"stop_lon":-71.103802,"stop_id":"place-cntsq" },
{ "stop_name":"Kendall/MIT","stop_lat":42.36249079,"stop_lon":-71.08617653,"stop_id":"place-knncl" },
{ "stop_name":"Charles/MGH","stop_lat":42.361166,"stop_lon":-71.070628,"stop_id":"place-chmnl" },
{ "stop_name":"Park Street","stop_lat":42.35639457,"stop_lon":-71.0624242,"stop_id":"place-pktrm" },
{ "stop_name":"Downtown Crossing","stop_lat":42.355518,"stop_lon":-71.060225,"stop_id":"place-dwnxg" },
{ "stop_name":"South Station","stop_lat":42.352271,"stop_lon":-71.05524200000001,"stop_id":"place-sstat" },
{ "stop_name":"Broadway","stop_lat":42.342622,"stop_lon":-71.056967,"stop_id":"place-brdwy" },
{ "stop_name":"Andrew","stop_lat":42.330154,"stop_lon":-71.057655,"stop_id":"place-andrw" },
{ "stop_name":"JFK/UMass","stop_lat":42.320685,"stop_lon":-71.052391,"stop_id":"place-jfk" },
//[13]-[16]
{ "stop_name":"Savin Hill","stop_lat":42.31129,"stop_lon":-71.053331,"stop_id":"place-shmnl" },
{ "stop_name":"Fields Corner","stop_lat":42.300093,"stop_lon":-71.061667,"stop_id":"place-fldcr" },
{ "stop_name":"Shawmut","stop_lat":42.29312583,"stop_lon":-71.06573796000001,"stop_id":"place-smmnl" },
{ "stop_name":"Ashmont","stop_lat":42.284652,"stop_lon":-71.06448899999999,"stop_id":"place-asmnl" },  
//[17]-[21]
{ "stop_name":"North Quincy","stop_lat":42.275275,"stop_lon":-71.029583,"stop_id":"place-nqncy" },
{ "stop_name":"Wollaston","stop_lat":42.2665139,"stop_lon":-71.0203369,"stop_id":"place-wlsta" },
{ "stop_name":"Quincy Center","stop_lat":42.251809,"stop_lon":-71.005409,"stop_id":"place-qnctr" },
{ "stop_name":"Quincy Adams","stop_lat":42.233391,"stop_lon":-71.007153,"stop_id":"place-qamnl" },
{ "stop_name":"Braintree","stop_lat":42.2078543,"stop_lon":-71.0011385,"stop_id":"place-brntn" }
];

//initiatialize, center on south station
function initMap(){    
  map = new google.maps.Map(
    document.getElementById("map"), {
      zoom: 13,              
      center: SouthStation   
    }
    );
  renderStops();
  renderRedline(); 
  getMyLocation();
}

//use the navigator object to get user location
function getMyLocation(){
  var marker = new google.maps.Marker ({position: SouthStation, map: map});
        if (navigator.geolocation) { 
          navigator.geolocation.getCurrentPosition(function(position) {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
              renderMyMarker();      
              map.setCenter(currentLoc);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
}

//display an infoWindow if the Geolocation service failed.
function handleLocationError(browserHasGeolocation, infoWindow, currentLoc) {
  infoWindow.setPosition(currentLoc);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//add Markers for all the MBTA stops, with an icon and an eventListener
function renderStops() {
    var stopObj = {};
        for (var i = 0; i < 22; i++) {
          stopObj = MBTAStops[i];
          createMarker(stopObj);  
        }
}

//this function takes in an object, creates a marker on the map 
function createMarker(stopObj){
  var image = 'signpost.png'; 
  var stopMarker;
  var stop_id = stopObj["stop_id"];
  var stop_name = stopObj["stop_name"];

  stopMarker = new google.maps.Marker({
    position: {lat: stopObj["stop_lat"], lng: stopObj["stop_lon"]},
    map: map,
    icon: image, 
    title: stopObj["stop_name"]   
  });

  google.maps.event.addListener(stopMarker, 'click', function() { 
    getSchedule(stop_id, stopMarker, stop_name);
 }); 
}

function renderRedline(){
  
var PolylinePath1, PolylinePath2, PolylinePath3; 
var Polyline1, Polyline2, Polyline3; 

  //MBTA[0]-[12] from Alewife to JFK
  PolylinePath1 = [];
  for (var a=0; a<13; a++){
    var stop1 = MBTAStops[a];
    var stopLatLng1 = new google.maps.LatLng({lat: stop1["stop_lat"], lng: stop1["stop_lon"]});
  PolylinePath1.push(stopLatLng1);
  }
  Polyline1 = new google.maps.Polyline({
    path: PolylinePath1,
    geodesic: true, 
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2 
  });
  Polyline1.setMap(map);
  
  //MBTA[13]-[16] from JFK to Ashmont
  PolylinePath2 = [{lat:42.320685,lng:-71.052391}];
  for (var b=13; b<17; b++){
    var stop2 = MBTAStops[b];
    var stopLatLng2 = new google.maps.LatLng({lat: stop2["stop_lat"], lng: stop2["stop_lon"]});
  PolylinePath2.push(stopLatLng2);
  }
  Polyline2 = new google.maps.Polyline({
    path: PolylinePath2,
    geodesic: true, 
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2 
  });
  Polyline2.setMap(map);

  //MBTA[17]-[21] from JFK to Braintree
  PolylinePath3 = [{lat:42.320685,lng:-71.052391}];
  for (var c=17; c<22; c++){
    var stop3 = MBTAStops[c];
    var stopLatLng3 = new google.maps.LatLng({lat: stop3["stop_lat"], lng: stop3["stop_lon"]});
  PolylinePath3.push(stopLatLng3);
  }
  Polyline3 = new google.maps.Polyline({
    path: PolylinePath3,
    geodesic: true, 
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2 
  });
  Polyline3.setMap(map);

}  

//add a marker on my current location, infowindow and render it on the map 
function renderMyMarker() {
  var nearestStop;
  var Polyline;
  var contentString;

  currentLoc = new google.maps.LatLng(currentLat, currentLng);
  //make the map object go to whereIam
  map.panTo(currentLoc);
  //set value to the declared marker variable 
  myMarker = new google.maps.Marker({
    position: currentLoc,
    title: "This is where I am!",
  });
  myMarker.setMap(map); 

  //call the function to calculate the nearest MBTA stop, use an object to store the output 
  nearestStop = calNearest(currentLoc);
  //render a Polyline that connects current location marker to the nearest stop marker
  Polyline = new google.maps.Polyline({
    path: [currentLoc,nearestStop.LatLng],
    geodesic: true,
    strokeColor: '#0000FF',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  Polyline.setMap(map);

  //Add an event lister to my marker icon 
  google.maps.event.addListener(myMarker, 'click', function () {
  contentString = 
  "The nearest MBTA Red Line subway stop is " + nearestStop.name + " which is " + nearestStop.distance + " miles away from me.";    
  infoWindow.setContent(contentString);
  infoWindow.open(map, myMarker);

});  

}

//the function takes a LatLng pair of my current location and return an object representating the nearest stop
function calNearest(LatLng) {   
  var stopLatLng;
  var stop; 
  var distance = 0; 
  var name = "";
  var smallest = Infinity; 

  for (i=0;i<22;i++) {
    stop = MBTAStops[i];
    stopLatLng = new google.maps.LatLng({lat: stop.stop_lat, lng: stop.stop_lon});
    distance = google.maps.geometry.spherical.computeDistanceBetween(currentLoc, stopLatLng);
    if (distance < smallest) {
      smallest = distance;
      name = stop.stop_name;
      LatLng = stopLatLng;
    } 
  }
  smallest = (smallest*0.00062137).toPrecision(2);

  return {
    name: name,
    distance: smallest,
    LatLng : LatLng
  };
}

//this function takes in a string (stop_id) returns a string(schedule of upcoming trains)
function getSchedule(stop_id, stopMarker,stop_name){

  var requestURL = "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id="+ stop_id;
  var request; 
  var parsed;
  var direction; 
  var returnHTML;
  var contentString;
  var direction_id;
  var arrival_time;
  
  request = new XMLHttpRequest();

  request.open("GET", requestURL, true); 
  
  request.onreadystatechange = function (){
   
    if (request.readyState == 4 && request.status == 200) {
      parsed = JSON.parse(request.responseText); 
    
        for (var i = 0; i < parsed.data.length; i++) {
            direction_id = parsed.data[i].attributes.direction_id;
            arrival_time = parsed.data[i].attributes.arrival_time;
            var timeObj = new Date (arrival_time);
            var time_return = timeObj.toLocaleTimeString('en-US');
            
            if (direction_id == 0) {
              direction = "Northbound to Alewife";
            }
            else if (direction_id == 1){
              direction = "Southbound to Ashmont/Braintree";
            }

            if (arrival_time != null) {
            //returnHTML += "<p>The next train "+ direction + " is arriving at " + arrival_time + ".</p>";
            returnHTML += "<p>The next train "+ direction + " is arriving at " + time_return + ".</p>"; 
            } 
        }
      
      contentString = "<h1>" + stop_name + "</h1>" + returnHTML; 
  
      infoWindowStop.setContent(contentString);
      infoWindowStop.open(map, stopMarker);
        
    }

    else if (request.readyState == 4 && request.status != 200) {
        returnHTML = "<p>Schedule not available.</p>";
    }

    else if (request.readyState == 3) {
        returnHTML = "<p>Upcoming trains:</p>";
    }

  };

  request.send();

}


