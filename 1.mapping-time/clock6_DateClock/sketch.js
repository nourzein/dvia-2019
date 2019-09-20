//Planets clock

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  rotate(-90);

  var now = clock();

  var mRot = now.progress.year * 360;
  var dRot = now.progress.month * 360;
  var hRot = now.progress.day * 360;

  let hour = map(now.progress.hour, 0, 1, 0, 360);
  let day = map(now.progress.day, 0, 1, 0, 360);
  let month = map(now.progress.month, 0, 1, 0, 360);

  noFill();

  strokeWeight(8);
  stroke(250, 95, 235);
  arc(0, 0, 700, 700, 0, 360);

  push();
  rotate(mRot);
  stroke(250, 95, 235);
  line(0, 0, 120, 0);
  pop();

  push();
  rotate(dRot);
  stroke(250, 95, 235);
  line(0, 0, 220, 0);
  pop();

  push();
  rotate(hRot);
  stroke(250, 95, 235);
  line(0, 0, 320, 0);
  pop();
}
