//Planets clock

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  stroke(255);

  var now = clock();

  // let sec= now.sec // to check if it's working
  var now = clock();

  var secondsArc = map(now.sec, 0, 60, 0, 360);
  var minutesArc = map(now.min, 0, 60, 0, 360);
  var hoursArc = map(now.hour % 12, 0, 12, 0, 360);
  var monthsArc = map(now.month, 0, 12, 0, 360);
  var dayArc = map(now.day, 0, 30, 0, 360);

  var sRot = now.progress.min * 360;

  var r = 30;

  //seasons array
  var colors = [
    "#b3330c" /*fall*/,
    "#820717" /*fall*/,
    "#a60707" /*fall*/,
    "#353161" /*winter*/,
    "#311a59" /*winter*/,
    "#691b75" /*winter*/,
    "#f24979" /*spring*/,
    "#fa37f7" /*spring*/,
    "#fa3771" /*spring*/,
    "#2b6e2b" /*summer*/,
    "#d9d445" /*summer*/,
    "#9ed945" /*summer*/
  ];
  var gradient = chroma.scale(colors).mode("lab");
  function colorForProgress(pct) {
    return gradient(pct).hex();
  }

  var color = colorForProgress(now.progress.year);

  r = (now.year - 2018) * r;
  console.log(now.year);

  //earth ellipse
  translate(width / 2, height / 2);
  noStroke();
  // fill(5, 99, 35);
  fill(color);
  ellipse(0, 0, 25, 25);

  //hour arc
  stroke(184, 2, 150);
  strokeWeight(2);
  noFill();
  arc(0, 0, 300, 300, 0, hoursArc);

  //min arc
  stroke(184, 2, 150);
  strokeWeight(2);
  noFill();
  arc(0, 0, 200, 200, 0, minutesArc);

  //sec arc
  stroke(184, 2, 150);
  strokeWeight(2);
  noFill();
  arc(0, 0, 100, 100, 0, secondsArc);

  //sun arc

  stroke(255, 140, 0);

  strokeWeight(2);
  noFill();
  arc(0, 0, 850, 850, 360, 360);

  //moon arc
  noFill();
  stroke(197, 197, 227);
  strokeWeight(2);
  arc(0, 0, 600, 600, 0, 360);

  //month ellipse
  push();
  rotate(dayArc);
  fill(97, 84, 153);
  ellipse(0, 300, 25, 25);

  pop();

  //year ellipse
  push();
  rotate(monthsArc);
  stroke(245, 69, 80);
  fill(255, 164, 36);
  ellipse(0, 425, r, r);
  pop();
}
