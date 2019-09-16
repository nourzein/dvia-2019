
/*
   Iteration with a "for" loop to construct repetitive forms.

   loop syntax works like this:
     for(initialize; test; update){
       ... loop body (i.e., the steps to be repeated)
     }
     ... rest of program

   the basic flow of this kind of loop is:
     1. do the 'initialize' operation
     2. is 'test' true? YES: execute the statements in the 'body' of the loop
                        NO: 'break' from looping and move on to the rest of the program
     3. do the 'update' operation
     4. go to step 2

   Updating a variable by modifying its existing value is extremely common when looping.
   Some convenient shorthands for this include:
     x++     is equivalent to:  x = x + 1
     x--     is equivalent to:  x = x - 1
     x += a  is equivalent to:  x = x + a
     x -= b  is equivalent to:  x = x + b
     x *= c  is equivalent to:  x = x * c
     x /= c  is equivalent to:  x = x / c
*/

var x= 0 
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
var sec= map(now.sec, 0, 60, 0, h);
var min= map(now.min, 0, 60, 0, h );
var hour= map (now.hour, 0, 12, 0, h)
}
else{
    // alternatively, we can use the clock's 'progress' percentages
    hour = h * now.progress.day
    min = h* now.progress.hour
    sec = h * now.progress.min
  }



// stroke(255, 158, 231)
// strokeWeight(4);
// strokeCap (ROUND);

// fill (255, 87, 213)
// rect (x, mili, 120, 20)

fill (171, 5, 130)
rect (x, hour, 180, 20)

fill (240, 41, 190)
rect (x+ 200, min, 180, 20)

fill (255, 87, 213)
rect (x+ 400, sec, 180, 20)
 
}






// var y;
// var num = 14;

// function setup() {
//   createCanvas(600, 600);
//   background(0);
//   noStroke();
  
  

//   var spacing = 60
//   var radius = 30

//   push()

//   translate(100, 50)
//   fill('red')
//   circle(0, 0, radius)
//   circle(0, spacing, radius)
//   circle(0, 2*spacing, radius)
//   circle(0, 3*spacing, radius)
//   circle(0, 4*spacing, radius)
//   circle(0, 5*spacing, radius)

//   translate(200, 0)
//   fill('orange')
//   for (var i=0; i<6; i++){
//     circle(0, i*spacing, radius)
//   }

//   translate(200, 0)
//   fill('yellow')
//   for (var y=0; y<6*spacing; y+=spacing){
//    circle(0, y, radius)
//   }

//   pop()

// //   translate(100, 400)
// //   var xPositions = [0, 5, 10, 20, 40, 80, 160, 320, 640]
// //   xPositions.forEach(function(x, i){
// //     stroke(255 - 30*i)
// //     line(x, 0, x, 150)
// //   })
// }
