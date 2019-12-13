// variables
var table;
var mymap;
const width = 400;
const height = window.innerHeight;
const markerData = [];
let data;

function preload() {
  // load the CSV data into our `table` variable and clip out the header row
  table = loadTable("./significant_month.csv", "csv", "header");
}

function measureDistance(srcLat, srcLng, dstLat, dstLng) {
  var origin = L.latLng(srcLat, srcLng),
    point = L.latLng(dstLat, dstLng);
  return origin.distanceTo(point) / 1000;
}

function measureDirection(srcLat, srcLng, dstLat, dstLng) {
  srcLat *= Math.PI / 180;
  dstLat *= Math.PI / 180;
  srcLng *= Math.PI / 180;
  dstLng *= Math.PI / 180;
  var y = Math.sin(dstLng - srcLng) * Math.cos(dstLat),
    x =
      Math.cos(srcLat) * Math.sin(dstLat) -
      Math.sin(srcLat) * Math.cos(dstLat) * Math.cos(dstLng - srcLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function setup() {
  background(0);
  let cnv = createCanvas(width, height);
  cnv.parent("#canvas");
  background(0);
  translate(width / 2, height / 2);

  // first, call our map initialization function (look in the html's style tag to set its dimensions)
  setupMap();

  // call our function (defined below) that populates the maps with markers based on the table contents
  addCircles();

  // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
  fill(0);
  noStroke();
  textSize(16);

  //start rings and squiggles

  // var ringX = 20;
  // var ringY = 100;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function drawRings(x, y, numRings) {
  var minRadius = 1;
  var radiusStep = 18;
  // stroke - color(red);
  for (var i = numRings; i > 0; i--) {
    circle(x, y, minRadius + i * radiusStep);
  }
  return minRadius + numRings * radiusStep;
}

function drawSquiggle(x, y, numWiggles) {
  var wiggleHeight = 6;
  var wiggleWidth = 10;

  beginShape();
  for (var i = 0; i <= numWiggles * 2; i++) {
    var dx = i % 2 ? wiggleWidth : -wiggleWidth;
    vertex(x + dx / 2, y + i * wiggleHeight);
  }
  endShape();
}

function setupMap() {
  // create your own map
  mymap = L.map("earthquakeMap").setView([20, 0.0], 3.43);

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
  noFill();
  stroke("red");

  ellipse(0, 0, 400, 400);
  stroke("green");
  ellipse(0, 0, 300, 300);
  ellipse(0, 0, 200, 200);
  ellipse(0, 0, 100, 100);

  // stroke("green");
  // line(-400, 0, 400, 0);
  // line(0, -200, 0, 200);
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
    var lat = row.getNum("latitude");
    var lng = row.getNum("longitude");
    var closest = Cities.closestTo(lat, lng);
    // console.log(closest);

    // skip over any rows where the magnitude data is missing
    if (row.get("mag") == "") {
      continue;
    }

    // create a new dot
    var circle = L.circle([row.getNum("latitude"), row.getNum("longitude")], {
      color: "red", // the dot stroke color
      fill: true,
      fillColor: "#f03", // the dot fill color
      fillOpacity: 0.5, // use some transparency so we can see overlaps
      radius: 105000,
      //row.getNum("mag"),
      weight: 1
    });

    // place the new dot on the map
    circle.addTo(mymap);
    // circle.bindTooltip(
    //   `<p> Magnitude: ${row.getNum("mag")} <br/> Depth: ${row.getNum(
    //     "depth"
    //   )}</p>`
    // );
    markerData.push({
      mag: row.getNum("mag"),
      depth: row.getNum("depth"),
      city: closest[0].name,
      country: closest[0].country,
      direction: closest[0].direction,
      population: closest[0].population,
      distance: closest[0].distance,
      latitude: closest[0].latitude,
      longitude: closest[0].longitude
    });

    // data = markerData[i];
    // stroke("blue");
    // // fill("red");
    // ellipse(
    //   getCircleX(data.direction, data.depth * 3),
    //   getCircleY(data.direction, data.depth * 3),
    //   data.mag ** 2,
    //   data.mag ** 2
    // );
  }

  console.log(markerData);

  // console.log(markerData);

  // function drawGrid(x){
  //   for (let i = 0; i < array.length; i++) {
  //   if i === x ? // somwrhing special : normal;
  //   }
  // }
  // drawGrid();
  const metrics = document.querySelector(".metrics");
  const myCircles = document.querySelectorAll(".leaflet-interactive"); //all markers in one array

  myCircles.forEach((circ, j) => {
    circ.addEventListener("mouseover", () => {
      background(0);
      noFill();
      stroke("red");
      ellipse(0, 0, 400, 400);
      stroke("green");
      ellipse(0, 0, 300, 300);
      ellipse(0, 0, 200, 200);
      ellipse(0, 0, 100, 100);
      // drawGrid(i);
      const data2 = markerData[j];

      for (var m = 0; m < table.getRowCount(); m++) {
        var row = table.getRow(m);
        var distances = measureDistance(
          data2.latitude,
          data2.longitude,
          row.getNum("latitude"),
          row.getNum("longitude")
        );

        // console.log(distances);

        var directions = measureDirection(
          data2.latitude,
          data2.longitude,
          row.getNum("latitude"),
          row.getNum("longitude")
        );
        // console.log(directions);
        fill("blue");
        stroke("black");

        if (j === m) {
          // stroke("yellow");
          fill(161, 10, 2);
        }
        // j === m ? stroke("yellow") : stroke("none");

        ellipse(
          getCircleX(directions, map(distances, 10, 22250, 0, 200)),
          getCircleY(directions, map(distances, 10, 22250, 0, 200)),
          row.getNum("mag") ** 2,
          row.getNum("mag") ** 2
        );
        console.log(
          getCircleX(directions, map(distances, 10, 22250, 0, 400)),
          getCircleY(directions, map(distances, 10, 22250, 0, 400))
        );
      }

      metrics.innerHTML = `Mag: ${data2.mag}<br> Depth: ${data2.depth}<br> Distance: ${data2.distance}<br> Population: ${data2.population} <br> Direction: ${data2.direction}<br> City: ${data2.city}, ${data2.country} `;

      // myCircles.forEach((circ, l) => {
      //   const data3 = markerData[l];
      //   c1 = color(245, 215, 66);
      //   c2 = color(250, 12, 0);
      //   d = map(data3.depth, 0, 53, 0, 255);
      //   var c = lerpColor(c1, c2, d);
      //   stroke("blue");
      //   fill(c);
      //   // console.log(c);
      //   ellipse(
      //     getCircleX(data3.direction, data3.depth * 2),
      //     getCircleY(data3.direction, data3.depth * 2),
      //     data3.mag ** 2,
      //     data3.mag ** 2
      //   );
      // });

      // stroke("yellow");
      // // strokewidth("4")
      // ellipse(
      //   getCircleX(data2.direction, data2.depth * 2),
      //   getCircleY(data2.direction, data2.depth * 2),
      //   data2.mag ** 2,
      //   data2.mag ** 2
      // );

      // ellipse(0, 0, data.mag * 10, (data.depth / data.mag) * 10);
      // line(0, 0, data.mag * 10, 0);
      // stroke("green");
      // line(0, data.depth, 0, 0);
      // stroke("blue");
      // line(0, 0, data.population * -0.0001, 0);
      // stroke("pink");
      // line(0, data.distance * -0.1, 0, 0);
      // quad(0, data.mag, 0, data.mag, data.population, 0, data.distance, 0);
      // drawSquiggle(0, 0, data.depth);
      // stroke("red");
      // drawRings(0, 0, data.mag);
      // console.log(data.mag, i, data.depth);
    });
  });
}

//draw inside circle
function getCircleX(radians, radius) {
  return Math.cos((radians * Math.PI) / 180) * radius;
}
function getCircleY(radians, radius) {
  return Math.sin((radians * Math.PI) / 180) * radius;
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

//inside setup
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
