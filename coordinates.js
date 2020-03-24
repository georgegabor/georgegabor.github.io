function calc() {
  let longitude = document.getElementById('longitude');
  let latitude = document.getElementById('latitude');
  let distance = document.getElementById('distance');
  let waypoints = document.getElementById('waypoints');

  document.getElementById('long').innerHTML = "Longitude = " + longitude.value;
  document.getElementById('lat').innerHTML = "Latitude = " + latitude.value;
  document.getElementById('dist').innerHTML = "Distance = " + distance.value;
  document.getElementById('wpoints').innerHTML = "Waypoints = " + waypoints.value;
  document.getElementById('ps').innerHTML = "P.S.: Már csak a kalkuláció hiányzik :-) <br> Hajrá Dia !";

}
