
const form = document.getElementById('htmlform');

form.addEventListener('submit', function (event) {
  calc();
  // Then we prevent the form from being sent by canceling the event
  event.preventDefault();
});

function calc() {
  let longitude = document.getElementById('longitude');
  let latitude = document.getElementById('latitude');
  let distance = document.getElementById('distance');
  let waypoints = document.getElementById('waypoints');
  let filename = document.getElementById('filename');

  document.getElementById('long').innerHTML = "Longitude = " + longitude.value;
  document.getElementById('lat').innerHTML = "Latitude = " + latitude.value;
  document.getElementById('dist').innerHTML = "Distance = " + distance.value;
  document.getElementById('wpoints').innerHTML = "Waypoints = " + waypoints.value;
  document.getElementById('fname').innerHTML = "Filename = " + filename.value.concat('.txt');
  document.getElementById('ps').innerHTML = "P.S.: Már csak a kalkuláció hiányzik :-) <br> Hajrá Dia !";
}
