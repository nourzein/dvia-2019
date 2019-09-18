var x = 200 // starting x position to draw
var y = 50  // starting y position to draw
var barWidth = 150 // width of each bar
var maxHeight = 500 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 10 // the vertical space to skip between bars

var discrete = false// flag whether to have the bars 'tick' from one value to the next or move smoothly,
                    // try setting it to false and see what happens...


function setup() {
	createCanvas(800, 600)
  angleMode(DEGREES)
  translate (400, 300)
	
}

function draw() {
  background(0)
  stroke(245, 201, 236)

  // measure the current time & calculate the width in pixels of each bar
  var now = clock()
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourHeight = map(now.hour, 1,12, 0, maxHeight) // from hours (1-12) to pixels (0–maxWidth)
    var minsHeight = map(now.min,  0,60, 0, maxHeight)  // from mins (0–60) to pixels (0–maxWidth)
    var secsHeight = map(now.sec,  0,60, 0, maxHeight)  // from secs (0–60) to pixels (0–maxWidth)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    hourHeight = maxHeight * now.progress.day
    minsHeight = maxHeight* now.progress.hour
    secsHeight = maxHeight * now.progress.min
  }

  //draw 3 background bars to indicate the max width
  
  
  fill(51, 11, 41)
  rect(x, y,                         barWidth , maxHeight)
  rect(x + barWidth +spacing, y  ,  barWidth , maxHeight)
  rect(x+ 2*(barWidth +spacing), y, barWidth , maxHeight)

  // draw the seconds bar at the top...
  fill(245, 69, 201)
  rect(x , y , barWidth , secsHeight) 
 
  // ...the minutes bar in the middle...
  fill(191, 55, 158)
  rect(x+ barWidth +spacing, y , barWidth , minsHeight)

  // ...and the hour bar at the bottom
  fill(138, 36, 113)
  rect(x + 2*(barWidth +spacing), y, barWidth , hourHeight)
}