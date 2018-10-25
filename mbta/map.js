var map; 
var SouthStation = {lat: 42.352271, lng: -71.05524200000001};

var myMarker; 
var currentLat = 0;
var currentLng = 0;
var currentLoc = new google.maps.LatLng(currentLat, currentLng);  

var infoWindow = new google.maps.InfoWindow();

var markerCollection = [];

var MBTAStops = 
[ 
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

{ "stop_name":"Savin Hill","stop_lat":42.31129,"stop_lon":-71.053331,"stop_id":"place-shmnl" },
{ "stop_name":"Fields Corner","stop_lat":42.300093,"stop_lon":-71.061667,"stop_id":"place-fldcr" },
{ "stop_name":"Shawmut","stop_lat":42.29312583,"stop_lon":-71.06573796000001,"stop_id":"place-smmnl" },
{ "stop_name":"Ashmont","stop_lat":42.284652,"stop_lon":-71.06448899999999,"stop_id":"place-asmnl" },  

{ "stop_name":"North Quincy","stop_lat":42.275275,"stop_lon":-71.029583,"stop_id":"place-nqncy" },
{ "stop_name":"Wollaston","stop_lat":42.2665139,"stop_lon":-71.0203369,"stop_id":"place-wlsta" },
{ "stop_name":"Quincy Center","stop_lat":42.251809,"stop_lon":-71.005409,"stop_id":"place-qnctr" },
{ "stop_name":"Quincy Adams","stop_lat":42.233391,"stop_lon":-71.007153,"stop_id":"place-qamnl" },
{ "stop_name":"Braintree","stop_lat":42.2078543,"stop_lon":-71.0011385,"stop_id":"place-brntn" }
];

//Initialize and add the map
//https://developers.google.com/maps/documentation/javascript/geolocation
function initMap(){    
  console.log("Hi from function initMap!");   
  map = new google.maps.Map(
    document.getElementById("map"), {
      zoom: 13,              //city=10, streets=15
      center: SouthStation   //centered on south station
    }
    );
  renderStops();
  //renderRedline(map);
  getMyLocation();
}

//use the navigator object to get my current location 
function getMyLocation(){
  console.log("Hi from function getMyLocation!"); 
  //var marker = new google.maps.Marker ({position: SouthStation, map: map});
        if (navigator.geolocation) { // the navigator.geolocation object is supported on the browser
          navigator.geolocation.getCurrentPosition(function(position) {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
              renderMyMarker();      //call funtion to render my marker

              map.setCenter(currentLoc);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
          // Browser doesn't support Geolocation
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
  console.log("Hi from function renderStops!"); 
  
    var stop = {};
    var stopMarker; 

        for (var i = 0; i < 22; i++) {
          stop = MBTAStops[i];
          stopMarker = createMarker(stop);
          console.log("the i in the for loop is "+i);
          markerCollection.push(stopMarker);
        }
        
}

//this function takes in an object, returns a marker object 
function createMarker(stop){

console.log("hello from the createMarker function!!!!");

  var image = 'signpost.png'; 
  var marker;
  var contentString = "";
  var stop_id = stop["stop_id"];

  marker = new google.maps.Marker({
    position: {lat: stop["stop_lat"], lng: stop["stop_lon"]},
    map: map,
    icon: image, 
    title: stop["stop_name"]   
  });
  google.maps.event.addListener(marker, 'click', function() { 
   contentString = getSchedule(stop_id);
   infoWindow.open(map, this);
   infoWindow.setContent(contentString);
   //infoWindow.setContent("hello!");
 }); 

  return marker;
}

/*
function renderRedline(){
  var PolylinePath = [];
  var Polyline1, Polyline2, Polyline3; 
  var stopLatLng;

//2. add the stop's coordinates to the PolylinePath
          stopLatLng = new google.maps.LatLng({lat: stop["stop_lat"], lng: stop["stop_lon"]});
          PolylinePath.push(stopLatLng);
        //draw Polyline
        var Polyline = new google.maps.Polyline({
          path: PolylinePath,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        Polyline.setMap(map);
    
*/

//add a marker on my current location, infowindow and render it on the map 
function renderMyMarker() {
  var nearestStop;
  var Polyline;
  var contentString;

  console.log("Hi from function renderMyMarker!"); 
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
  console.log("Hi from function calNearest!"); 
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

//this function takes in a string (stop_id) returns a string 
function getSchedule(string){
  console.log("Hi from function getSchedule!"); 
  var requestURL = 'https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id='+ string;
  var request = new XMLHttpRequest();
  var parsed;
  var direction; 
  var returnHTML= "";
  var contentString;
  //1 open 
  request.open('GET', requestURL, true); 
  console.log("the requestURL is "+requestURL);
  console.log("the readyState is" + request.readyState + " the status is "+request.status);
  //2 event listener 
  request.onreadystatechange = function (){
    if (request.readyState == 4 && request.status == 200) {
      //3 fire off a request 
      console.log("request.responseText" + request.responseText);//works 
      parsed = JSON.parse(request.responseText); 
      console.log("not in the for loop yet"); //works 
      console.log("parsed.data.length is "+ parsed.data.length);//works 
      for (var i = 0; i < parsed.data.length; i++) {
        //console.log("finally in the for loop"); //works
        //console.log(i);
        if (parsed.data[i].attributes.direction_id == 0) {
            direction = "Northbound to Alewife";}
          else if (parsed.data[i].attributes.direction_id == 1){
            direction = "Southbound (to Ashmont/Braintree)";}
        //console.log("direction is "+ direction); //works 
        returnHTML += "<p>The next train "+ direction + " is arriving at " + parsed.data[i].attributes.arrival_time + ".</p>";  
          }
          console.log("returnHTML is "+ returnHTML); //works
        }
        else if (request.readyState == 4 && request.status != 200) {
          returnHTML = "<p>Schedule not available.</p>";
        }
        else if (request.readyState == 3) {
          returnHTML = "<p>Loading...</p>";
        }

      console.log("returnHTML is "+ returnHTML); 
      //4 send back the content 
      request.send();
    
      contentString = 
      "<h1>" + stop.stop_name + "</h1>" + returnHTML ;   
      
      console.log("contentString is " + contentString);
      };
      return contentString;
    
  }


