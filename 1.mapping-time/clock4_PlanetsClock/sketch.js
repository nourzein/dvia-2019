//Planets clock
let myData;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  stroke(255);

  var now = clock();

  // let sec= now.sec // to check if it's working
  let day = now.day;
  let month = now.month;
  var monthsArc = map(now.month, 0, 12, 0, 360);
  var dayArc = map(now.day, 0, 30, 0, 360);

  var sRot = now.progress.min * 360;

  var r = 30;

  // //seasons array
  // var colors = [
  //   "#b3330c" /*fall*/,
  //   "#820717" /*fall*/,
  //   "#a60707" /*fall*/,
  //   "#353161" /*winter*/,
  //   "#311a59" /*winter*/,
  //   "#691b75" /*winter*/,
  //   "#f24979" /*spring*/,
  //   "#fa37f7" /*spring*/,
  //   "#fa3771" /*spring*/,
  //   "#2b6e2b" /*summer*/,
  //   "#d9d445" /*summer*/,
  //   "#9ed945" /*summer*/
  // ];
  // var gradient = chroma.scale(colors).mode("lab");
  // function colorForProgress(pct) {
  //   return gradient(pct).hex();
  // }

  // var color = colorForProgress(now.progress.year);

  // r = (now.year - 2018) * r;
  // console.log(now.year);

  //earth ellipse
  translate(width / 2, height / 2);
  noStroke();
  // fill(5, 99, 35);
  fill(50, 168, 82);
  ellipse(0, 0, 20, 20);

  //sun arc
  stroke(255, 164, 36);
  strokeWeight(2);
  noFill();
  arc(0, 0, 400, 400, 360, 360);

  //moon arc
  noFill();
  stroke(53, 48, 74);
  strokeWeight(2);
  arc(0, 0, 80, 80, 0, 360);

  //month ellipse
  push();
  rotate(dayArc);
  fill(97, 84, 153);
  ellipse(0, 40, 15, 15);

  pop();

  //year ellipse
  push();
  rotate(monthsArc);
  fill(208, 20, 70);
  ellipse(0, 200, r, r);
  pop();
}
