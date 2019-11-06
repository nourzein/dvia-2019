var totals;
var atmospheric;
var underground;

function preload() {
  totals = loadTable("data/totals.csv", "csv", "header");
  atmospheric = loadTable("data/atmospheric.csv", "csv", "header");
  underground = loadTable("data/underground.csv", "csv", "header");
}

function setup() {
  createCanvas(4500, 700);
  background(25);
  angleMode(DEGREES);

  // pick one of the three data files to work with and call it 'table'
  var table = totals;

  // log the whole dataset to the console so we can poke around in it
  print(table);

  //create sequential pallet
  // var numberOfShades = 9;
  // var palette = Brewer.sequential("BuPu", numberOfShades, lowest, highest);

  //create color for countries
  // var colors = [
  //   "#ff5900",
  //   "#e502ed",
  //   "#1d02ed",
  //   "#00d471",
  //   "#00c9d4",
  //   "#d60019",
  //   "#ffb938",
  //   "#ff38a5"
  // ];
  // var gradient = chroma.scale(colors).mode("lab");
  // function colorForProgress(pct) {
  //   return gradient(pct).hex();
  // }

  // set up typography
  textFont("Rokkitt");
  textSize(16);
  fill(255);
  noStroke();

  var x = 200;
  var y = 100;
  var rowHeight = 80;
  var colWidth = 70;

  // draw country name labels on the left edge of the table
  textStyle(BOLD);
  textAlign(RIGHT);

  for (var c = 1; c < table.getColumnCount(); c++) {
    text(table.columns[c], x - colWidth, y);
    //

    y += rowHeight;
  }

  // draw year labels in the header row
  x = 200;
  y = 100;
  textStyle(NORMAL);
  textAlign(BOLD);
  for (var r = 0; r < table.getRowCount(); r++) {
    var year = table.getString(r, 0);
    text(year, x, y - rowHeight);
    x += colWidth;
  }

  // print out the total for each country, one column at a time
  x = 200;

  for (var r = 0; r < table.getRowCount(); r++) {
    y = 100;

    for (var c = 1; c < table.getColumnCount(); c++) {
      var cell = table.getNum(r, c);
      //var row = table.column(c);
      //let radius = map(now.progress.month, 0, 1, minRadius, maxRadius)
      var value = map(cell, 0, 100, 1, 360);

      // let gray = map(c, 1, table.getColumnCount(), colors[0], colors[7]);
      // fill(gray);
      // var color = colorForProgress(row);
      // fill(color);

      //fill(random(0, 255), random(0, 255), random(0, 255));

      // to fill color for each country var color = colorForProgress(table.columns(), c);
      //fill(color);
      //var color = palette.colorForValue(totals[c]);
      //fill(color);
      fill(255, 128, 128);
      strokeWeight(3);
      strokeCap(SQUARE);
      //stroke(255, 89, 0);
      arc(x, y, 50, 50, 0, value);
      //ellipse(x, y, value, value);
      //text(value, x, y);
      y += rowHeight;
    }
    x += colWidth;
  }
}
console.log(table.getColumnCount());
console.log(colors);
