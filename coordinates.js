const form = document.getElementById('htmlform');

form.addEventListener('submit', function(event) {
  calc();
  // Then we prevent the form from being sent by canceling the event
  event.preventDefault();
});

function calc() {
  let latitude = document.getElementById('latitude');
  let longitude = document.getElementById('longitude');
  let distance = document.getElementById('distance');
  let waypoints = document.getElementById('waypoints');
  let filename = document.getElementById('filename').value.concat('.txt');

  // document.getElementById('lat').innerHTML = "Latitude = " + latitude.value;
  // document.getElementById('long').innerHTML = "Longitude = " + longitude.value;
  // document.getElementById('dist').innerHTML = "Distance = " + distance.value;
  // document.getElementById('wpoints').innerHTML = "Waypoints = " + waypoints.value;
  // document.getElementById('fname').innerHTML = "Filename = " + filename.value.concat('.txt');
  // document.getElementById('ps').innerHTML = "P.S.: Már csak a kalkuláció hiányzik :-) <br> Hajrá Dia !";

  let resultArray = calculate(latitude.value, longitude.value, distance.value, waypoints.value);
  saveTextAsFile(filename, resultArray);
}

function calculate(latitude, longitude, radius, wayPoints) {
  let resultArray = createArray(wayPoints, 2);
  let degreeDiff = 360 / wayPoints;
  let degrees = degreeDiff;

  // Convert radius (in meters) to decimal degrees. It is valid only around North 47th Latitude,
  // see a calculator here: http://www.csgnetwork.com/degreelenllavcalc.html
  let radLat = ((radius * 1000) / 11.117) * 0.0000001;
  let radLong = ((radius * 1000) / 7.605) * 0.0000001;

  // Calculate first coordinate pair:
  let bdFirstLat = latitude;
  let firstLat = bdFirstLat;
  let bdFirstLong = longitude + radLong;
  let firstLong = bdFirstLong;

  //Format first coordinates:
  // let df = new DecimalFormat();
  // df.setMinimumFractionDigits(7);
  let formattedFirstLat = firstLat;
  formattedFirstLat = formattedFirstLat.replace(',', '.');
  let formattedFirstLong = firstLong;
  formattedFirstLong = formattedFirstLong.replace(',', '.');

  // Add first point to resultArray array:
  let firstPair = { formattedFirstLat, formattedFirstLong };
  resultArray[0] = firstPair;

  for (let i = 1; i < wayPoints; i++) {
    let actualDegree = degrees + degreeDiff;
    let actualLat = radLat * Math.sin(actualDegree) + latitude;
    let actualLong = radLong * Math.cos(actualDegree) + longitude;

    // Round them to 7 decimal places:
    let bdLat = actualLat;
    let bdLong = actualLong;
    let roundedLat = bdLat;
    let roundedLong = bdLong;
    let formattedLat = roundedLat;
    formattedLat = formattedLat.replace(',', '.');
    let formattedLong = roundedLong;
    formattedLong = formattedLong.replace(',', '.');
    let coordinates = { formattedLat, formattedLong };
    resultArray[i] = coordinates;
    degrees += degreeDiff;
  }

  return resultArray;
}

function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function saveTextAsFile(filename, result) {
  var textToWrite = JSON.stringify(result);
  var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
  var fileNameToSaveAs = filename;
  var downloadLink = document.createElement('a');
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = 'Download File';
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}
