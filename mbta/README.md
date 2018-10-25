Closest MBTA Station 

Created by Jiaxun Leila Li on October 20, 2018

worked on this on Sunday for 2 hours; 
worked on it on Monday for 7 hours:
	13:30-15:00 - 1.5hr;
	17:00-19:30 - 2.5hr;
	21:00-24:00 - 3 hr;

Update on Monday 23:55, renders map, myMarker, but no stopMarker, maybe due to the JSON string/object.

Correctly implemented: 
(1 point) The basics (proper repository folder name, 1 CSS file, map on entire page, separate file for JavaScript)
(1 point) README.md
(1 point) All the MBTA Red Line subway stations are marked on the map
(1 point) Each station on the map shall be a marker with an icon: use the same icon image for each marker
(2 points) Determine and mark your location on the map; map is automatically centered to your location when determined
(2 points) Note the closest MBTA Red Line subway station from where you are (e.g., upon clicking on marker of where you are)
(1 point) Polyline connecting your marker to the closest MBTA Red Line subway station

Not implemented: 
(2 points) Render a red polyline connecting each station, thus showing the complete Red Line on the map
(4 points) Upon clicking on a MBTA Red Line subway station marker, display an infowindow of the schedule of upcoming trains for that station

Dodged: 
(-5 points) Nonsense Git commit messages or did not commit much.
(-6 points) Programming errors and console.log() outputs exist in JavaScript console (warnings acceptable).
(-15 points) You used jQuery.

Questions: 
Should the nearest stop be calculated after clicking my location marker or after loading my location? I did the former to save loading time. 

Mind map: 
<iframe width='853' height='480' src='https://embed.coggle.it/diagram/W86XHeExeUO3X1qn/4c3714a0d68f4caccc2e819c13c5811e95de854cfac76002c5fec62702981cbd' frameborder='0' allowfullscreen></iframe>

Code Cited: 
https://github.com/tuftsdev/WebProgramming/blob/gh-pages/examples/google_maps/geolocation_map.html
https://developers.google.com/maps/documentation/javascript/geolocation
https://developers.google.com/maps/documentation/javascript/geolocation
https://developers.google.com/maps/documentation/javascript/examples/map-simple
https://stackoverflow.com/questions/20736034/loop-over-an-object-and-return-lowest-number-in-javascript
https://stackoverflow.com/questions/12272239/javascript-function-returning-an-object
https://developers.google.com/maps/documentation/javascript/examples/icon-simple
https://developers.google.com/maps/documentation/javascript/examples/polyline-simple

Icon downloaded from here: https://icons8.com/icon/set/signpost/all

