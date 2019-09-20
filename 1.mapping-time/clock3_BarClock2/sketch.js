var x= - 200
var y= 0 
var discrete= false
var h= 400


function setup() {
createCanvas(800, 800);
  noStroke();
  rectMode(CENTER)
 
}

function draw() {
background(0)
translate (200, 400)

var now = clock()

if (discrete) {
// var mili= map(now.millis, 0, 1000, 0, h)
var sec= map(now.progress.sec, 0, 1, 0, h);
// var sec= map(now.sec, 0, 60, 0, h);
var min= map(now.min, 0, 60, 0, h );
var hour= map (now.hour, 0, 12, 0, h)
}
else{
    // alternatively, we can use the clock's 'progress' percentages
    hour = h * now.progress.day
    min = h* now.progress.hour
    sec= h* now.progress.min
    milsec = h * now.progress.sec
  }


  
fill (171, 5, 130)
rect (x, hour, 200, 20)

fill (240, 41, 190)
rect (x+ 200, min, 100, 20)

fill (255, 87, 213)
rect (x+ 400, sec, 100, 20)
 
fill (171, 5, 130)
rect (x+ 600 , milsec, 100, 20)

}

