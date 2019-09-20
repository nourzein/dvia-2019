var maxRadius = 650;
var minRadius = 200;

function setup() {
  createCanvas(800, 800);
}

var colors = [
  "#b3330c" /*fall*/,
  "#820717" /*fall*/,
  "#353161" /*winter*/,
  "#311a59" /*winter*/,
  "#f24979" /*spring*/,
  "#fa37f7" /*spring*/,
  "#2b6e2b" /*summer*/,
  "#d9d445" /*summer*/
];
var gradient = chroma.scale(colors).mode("lab");
function colorForProgress(pct) {
  return gradient(pct).hex();
}

function draw() {
  translate(width / 2, height / 2);
  var now = clock();
  var color = colorForProgress(now.progress.year); //to see what month
  let radius = map(now.progress.month, 0, 1, minRadius, maxRadius); //to see what days
  fill(color);
  ellipse(0, 0, radius, radius);
}

//how to let the color and time start when I want
//how to let the circle not exist when I am doing it
