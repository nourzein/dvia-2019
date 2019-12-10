// the data loaded from a USGS-provided CSV file
var table;

// my leaflet.js map
var mymap;

function preload() {
  // load the CSV data into our `table` variable and clip out the header row
  table = loadTable("./significant_month.csv", "csv", "header");
}

const width = 400;
const height = window.innerHeight;
const markerData = [];

function setup() {
  background(0);
  // first, call our map initialization function (look in the html's style tag to set its dimensions)
  setupMap();

  // call our function (defined below) that populates the maps with markers based on the table contents
  addCircles();

  // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially

  let cnv = createCanvas(width, height);
  cnv.parent("#canvas"); //ask
  background(0);

  fill(0);
  noStroke();
  textSize(16);
  text(`Plotting ${table.getRowCount()} seismic events`, 20, 40);
  text(`Largest Magnitude: ${columnMax(table, "mag")}`, 20, 60);
  text(`Greatest Depth: ${columnMax(table, "depth")}`, 20, 80);

  //start rings and squiggles

  translate(width / 2, height / 2);
  var ringX = 20;
  var ringY = 100;

  // stroke(150);
  // stroke("green");
  // drawSquiggle(ringX, ringY, 15);
  // stroke("red");
  // drawRings(ringX, ringY, 5);

  // // shift over to the right a bit
  // ringX += 200;

  // draw 10 rings and 15 squiggles, but offset the y position of the
  // squiggle based on the height returned by drawRings()
  // stroke("orange");
  // var ringHeight = drawRings(ringX, ringY, 10);
  // stroke("skyblue");
  // drawSquiggle(ringX, ringY + ringHeight, 15);
  // pop();
}

function drawRings(x, y, numRings) {
  var minRadius = 1;
  var radiusStep = 20;
  // stroke - color(red);
  for (var i = numRings; i > 0; i--) {
    circle(x, y, minRadius + i * radiusStep);
  }
  return minRadius + numRings * radiusStep;
}

function drawSquiggle(x, y, numWiggles) {
  var wiggleHeight = 6;
  var wiggleWidth = 20;

  beginShape();
  for (var i = 0; i <= numWiggles * 2; i++) {
    var dx = i % 2 ? wiggleWidth : -wiggleWidth;
    vertex(x + dx / 2, y + i * wiggleHeight);
  }
  endShape();
}

function setupMap() {
  // create your own map
  mymap = L.map("earthquakeMap").setView([20, 0.0], 2.43);

  // load a set of map tiles – choose from the different providers demoed here:
  // https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer(
    //"https://api.mapbox.com/styles/v1/nourzein/ck36l9ya309rz1cmr9ymzximc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg",
    //"https://api.mapbox.com/styles/v1/nourzein/cjdtac0gp437g2sn57n6fb9za/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg",
    "https://api.mapbox.com/styles/v1/nourzein/ck36l9ya309rz1cmr9ymzximc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg",
    {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.light",
      accessToken:
        "pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg"
    }
  ).addTo(mymap);
}

function addCircles() {
  //on map
  // calculate minimum and maximum values for magnitude and depth
  var magnitudeMin = 0.0;
  var magnitudeMax = columnMax(table, "mag");
  console.log("magnitude range:", [magnitudeMin, magnitudeMax]);

  var depthMin = 0.0;
  var depthMax = columnMax(table, "depth");
  console.log("depth range:", [depthMin, depthMax]);
  // step through the rows of the table and add a dot for each event
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);

    // skip over any rows where the magnitude data is missing
    if (row.get("mag") == "") {
      continue;
    }

    // create a new dot
    var circle = L.circle([row.getNum("latitude"), row.getNum("longitude")], {
      color: "red", // the dot stroke color
      fill: true,
      fillColor: "#f03", // the dot fill color
      fillOpacity: 1, // use some transparency so we can see overlaps
      radius: 100000,
      //row.getNum("mag"),
      weight: 1
    });

    // place the new dot on the map
    circle.addTo(mymap);
    circle.bindTooltip(
      `<p> Magnitude: ${row.getNum("mag")} <br/> Depth: ${row.getNum(
        "depth"
      )}</p>`
    );
    markerData.push({ mag: row.getNum("mag"), depth: row.getNum("depth") });
  }

  // console.log(markerData);

  const myCircles = document.querySelectorAll(".leaflet-interactive");
  myCircles.forEach((circ, i) => {
    circ.addEventListener("mouseover", () => {
      background(0);
      stroke("green");
      drawSquiggle(0, 0, markerData[i].depth);
      stroke("red");
      drawRings(0, 0, markerData[i].mag);
      console.log(markerData[i].mag, markerData[i].depth);
    });
  });
}
//circles code
// var circle2 = L.circle([row.getNum("latitude"), row.getNum("longitude")], {
//   color: "red", // the dot stroke color
//   fill: false,
//   //   fillColor: "#f03", // the dot fill color
//   //   fillOpacity: 0.25, // use some transparency so we can see overlaps
//   radius: row.getNum("mag") * 20000,
//   weight: 1
// });

// circle2.addTo(mymap);
// circle2.bindTooltip("<p> this is earthquake </p>");

// var circle3 = L.circle([row.getNum("latitude"), row.getNum("longitude")], {
//   color: "red", // the dot stroke color
//   fill: false,
//   //   fillColor: "#f03", // the dot fill color
//   //   fillOpacity: 0.25, // use some transparency so we can see overlaps
//   radius: row.getNum("mag") * 10000,
//   weight: 1
// });

// circle3.addTo(mymap);
// circle3.bindTooltip("<p> this is earthquake </p>");

// var circle4 = L.circle([row.getNum("latitude"), row.getNum("longitude")], {
//   color: "red", // the dot stroke color
//   fill: false,
//   //   fillColor: "#f03", // the dot fill color
//   //   fillOpacity: 0.25, // use some transparency so we can see overlaps
//   radius: row.getNum("mag") * 5000,
//   weight: 1
// });

// circle4.addTo(mymap);
// circle4.bindTooltip("<p> this is earthquake </p>");
// }

// removes any circles that have been added to the map
function removeAllCircles() {
  mymap.eachLayer(function(layer) {
    if (layer instanceof L.Circle) {
      mymap.removeLayer(layer);
    }
  });
}

// get the maximum value within a column
function columnMax(tableObject, columnName) {
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName);

  // convert to a list of numbers by running each element through the `float` function
  var colValues = _.map(colStrings, float);

  // find the largest value in the column
  return _.max(colValues);
}

// get the minimum value within a column
function columnMin(tableObject, columnName) {
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName);

  // convert to a list of numbers by running each element through the `float` function
  var colValues = _.map(colStrings, float);

  // find the largest value in the column
  return _.min(colValues);
}
// var layer2= (insert tooltip layer)
// var tooltip= L.tooltip()
