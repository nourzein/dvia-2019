//get the y axis running
//drawing a line does not work, figure out why
//get a line for test scores happening

//get total graph and underground and above groun on one page and then do illustrator for treaties signed!
//final deliverables: two coded pieces, one for treaties having two lines, another for pdh students

var totals;
var atmospheric;
var underground;
var shouldExport = true;
var exportFilename = "my-sketch.svg";

function preload() {
  totals = loadTable("data/totals.csv", "csv", "header");
  atmospheric = loadTable("data/atmospheric.csv", "csv", "header");
  underground = loadTable("data/underground.csv", "csv", "header");
  phd = loadTable("data/PhD.csv", "csv", "header");
  us = loadTable("data/US.csv", "csv", "header");
}

function setup() {
  //   var canvasW = 300;
  //   var canvasH = 200;

  //   if (shouldExport) {
  //     createCanvas(canvasW, canvasH, SVG);
  //   } else {
  //     createCanvas(canvasW, canvasH);
  //   }
  // Add a final argument of `SVG` to your createCanvas command
  createCanvas(3590, 700);
  //createCanvas(600, 300, SVG);
  background(0);
  angleMode(DEGREES);

  x = 100;
  y = 200;
  textAlign(CENTER);
  textSize(50);
  noFill();
  text("Nuclear Testing and the Effect of Treaties", 300);

  // pick one of the three data files to work with and call it 'table'
  var table = totals;

  // log the whole dataset to the console so we can poke around in it
  print(table);

  // set up typography
  textFont("SERIF");
  textSize(12);
  fill(255);
  noStroke();

  var palette = Brewer.qualitative("Set1", table.columns);

  var x = 200;
  var y = 100;
  var rowHeight = 80;
  var colWidth = 100;

  // draw phd number as y axis
  x = 200;
  y = 100;
  textStyle(NORMAL);
  textAlign(BOLD);
  // for (let i = 100; i < 1500; i + 500) {
  //   num = 0;
  //   text(num, x - colWidth, y);
  //   num++;
  //   y += rowHeight;
  // }

  // draw year labels in the header row
  x = 50;
  y = 700;
  textStyle(NORMAL);
  textAlign(BOLD, CENTER);
  for (var r = 0; r < us.getRowCount(); r++) {
    var year = table.getString(r, 0);
    text(year, x, y - rowHeight);

    x += colWidth;
  }

  fill(255);
  stroke(255);
  strokeWeight(3);
  line(50, 600, 4000, 600);

  // print out the total for each country, one column at a time
  x = 50;

  for (var r = 0; r < us.getRowCount(); r++) {
    y = 300;

    for (var c = 1; c < us.getColumnCount(); c++) {
      var cell = us.getNum(r, c);
      var bell = (phd.getNum(r, c) * 4) / 100;
      //var value = map(cell, 0, 100, 1, 180);
      //fill(255, 128, 128, 220);
      strokeCap(SQUARE);
      //stroke(255, 89, 0);
      //fill(colors[r]);
      var country = table.columns[c];
      var clr = palette.colorForValue(country);
      //stroke(255, 8, 8);
      fill(0, 17, 166);
      strokeWeight(1);
      ellipse(x, y, cell, cell);
      // fill(252, 186, 3);
      // ellipse(x, y, bell, 50);
      //text(value, x, y);
      //   y += rowHeight;
    }
    y = 500;
    for (var c = 1; c < us.getColumnCount(); c++) {
      //var cell = us.getNum(r, c);
      var bell = (phd.getNum(r, c) * 4) / 100;
      //var value = map(cell, 0, 100, 1, 180);
      //fill(255, 128, 128, 220);
      strokeCap(SQUARE);
      //stroke(255, 89, 0);
      //fill(colors[r]);
      var country = table.columns[c];
      var clr = palette.colorForValue(country);
      //stroke(255, 8, 8);
      fill(212, 59, 8);
      strokeWeight(1);
      ellipse(x, y, bell, bell);
      // fill(252, 186, 3);
      // ellipse(x, y, bell, 50);
      //text(value, x, y);
      //   y += rowHeight;
    }
    x += colWidth;
  }
  console.log(phd);
  //save("my-sketch.svg");
  //   if (shouldExport) {
  //     createCanvas(canvasW, canvasH, SVG);
  //   } else {
  //     createCanvas(canvasW, canvasH);
  //   }
}
