var totals;
var atmospheric;
var underground;
var shouldExport = true;
var exportFilename = "my-sketch.svg";

function preload() {
  totals = loadTable("data/totals.csv", "csv", "header");
  atmospheric = loadTable("data/atmospheric.csv", "csv", "header");
  underground = loadTable("data/underground.csv", "csv", "header");
  treaties = loadTable("data/treaties.csv", "csv", "header");
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
  createCanvas(6500, 1000);
  //createCanvas(600, 300, SVG);
  background(0);
  angleMode(DEGREES);

  x = 200;
  y = 400;
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("Nuclear Testing and the Effect of Treaties", width / 2);

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

  push();
  //fill(255);
  stroke(255);
  strokeWeight(1);
  line(30, 880, 6500, 880);
  line(30, 910, 6500, 910);
  pop();

  x = 50;
  y = 975;
  textStyle(NORMAL);
  textAlign(BOLD, CENTER);
  for (var r = 0; r < table.getRowCount(); r++) {
    var year = table.getString(r, 0);
    text(year, x, y - rowHeight);
    //   text(year, x, y - rowHeight);
    // if (r < 18) {
    //   var year = table.getString(r, 0);
    //   text(year, x, y - rowHeight);
    // } else if (r > 17 && r < 52) {
    //   y = 975;
    //   var year = table.getString(r, 0);
    //   text(year, x, y - rowHeight);
    // } else {
    //   y = 1010;
    //   var year = table.getString(r, 0);
    //   text(year, x, y - rowHeight);
    // }

    x += colWidth;
  }

  // print out the total for each country, one column at a time
  x = 50;

  for (var r = 0; r < table.getRowCount(); r++) {
    y = 600;
    for (var c = 1; c < table.getColumnCount(); c++) {
      var tell = table.getNum(r, c) * 2;
      var atm = atmospheric.getNum(r, c);
      var und = underground.getNum(r, c);
      var atmArc = map(atm, 0, 60, 1, 360);
      var undArc = map(und, 0, 100, 1, 360);

      //fill(255, 128, 128, 220);
      // strokeCap(SQUARE);
      //stroke(255, 89, 0);
      //fill(colors[r]);
      var country = table.columns[c];
      var clr = palette.colorForValue(country);
      clr._array[3] = 0.9;

      noFill();
      stroke(clr);
      strokeWeight(1);
      arc(x, y, atmArc, atmArc, 180, 360);
      arc(x, y, undArc, undArc, 1, 180);

      // push();
      // rotate(180);
      //ellipse(x, y, cell, bell);
      // pop();
      //ellipse(x, y, 50, cell);
      //text(value, x, y);
      //   y += rowHeight;
    }

    y = 300;
    for (var c = 1; c < table.getColumnCount(); c++) {
      var tell = table.getNum(r, c) * 4;
      var cell = atmospheric.getNum(r, c) * 4;
      var bell = underground.getNum(r, c) * 4;
      //var value = map(cell, 0, 100, 1, 180);
      //fill(255, 128, 128, 220);
      strokeCap(SQUARE);
      //stroke(255, 89, 0);
      //fill(colors[r]);
      var country = table.columns[c];
      var clr = palette.colorForValue(country);
      //fill(clr);
      stroke(clr, 123);
      strokeWeight(1.5);
      ellipse(x, y, 1, tell);
      //circle(x, y, tell * 0.5, tell * 0.5);

      //text(value, x, y);
      //   y += rowHeight;
    }

    x += colWidth;
  }

  //save("my-sketch.svg");
  //   if (shouldExport) {
  //     createCanvas(canvasW, canvasH, SVG);
  //   } else {
  //     createCanvas(canvasW, canvasH);
  //   }
}
