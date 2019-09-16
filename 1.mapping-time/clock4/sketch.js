//Planets clock

function setup() {
    createCanvas(800, 800);
    }
    
function draw() {
    background(0);
    stroke (255);

var now= clock ()

// let sec= now.sec // to check if it's working
let day= now.day
let month= now.month
var monthsArc= map(now.month, 0, 12, 0, 360);
var dayArc= map(now.day, 0, 30, 0, 360);

translate (width/2, height/2)
noStroke();
fill  (5, 99, 35)
ellipse (0, 0, 15, 15);

stroke(255, 164, 36);
strokeWeight(2);
noFill();
arc (0, 0, 400, 400, 0, monthsArc); 


noFill();
stroke (53, 48, 74)
strokeWeight(2)
arc (0 , 0 ,50, 50, 0 , dayArc);

}
  


