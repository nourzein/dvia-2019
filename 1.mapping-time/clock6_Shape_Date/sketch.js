var maxWidth = 200;

function setup() {
  // set the width & height of the sketch
  createCanvas(800, 800);
  //background('white');
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock());
  noStroke();
 

}

function draw() {
  background ('lightgray');
  var sqWidth = width/30;
  var sqHeight = height/30;
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock();
  
    var secsWidth = map(now.sec,  0,60, 0, maxWidth);  
    
  // }else{
    
  //   // alternatively, we can use the clock's 'progress' percentages
  //   // hourWidth = maxWidth * now.progress.day;
  //   // minsWidth = maxWidth * now.progress.hour;
  //   secsWidth = maxWidth * now.progress.min;
  // }

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing


  // // set up typography & drawing-color
  // textFont("Anonymous Pro"); // ← check index.html to see how it was loaded from google-fonts
  // textSize(42); // make it big
  // fill(100, 50, 50);

  // // draw the time string to the canvas
  // text(now.text.date, 30, 50);
  // text(now.text.time, 30, 100);
  var r = random(255);
  var g = random(255);
  var b = random(255);
  fill(130, 90, 60);
  maxXPos = width;
  var maxShift1 = map(now.sec,  0,60, 0, maxXPos);
  //ellipse(maxShift1, height/3, 30,30);
  
  var maxShift2 = map(now.min,  0,60, 0, maxXPos);
  //ellipse(maxShift2*2, height/3*2, 30,30);
  
  var color1= map(now.sec, 0, 60, 0,255)
  for (i=0;i<width; i++){
    for (j=0; j<height;j++){
       fill(color1, 40, 100);
       rect(i,j,sqWidth, sqHeight);
       j+=sqHeight;
    }
    i+=sqWidth;
  }
  //console.log(now.ms);
   //textFont("Roboto");
   textSize(40);
   fill('#ffffff');
   text(now.ms, 370, 400);
   
   
  













// var yRot = 0
// var mRot = 0
// var dRot = 0



// function setup() {
//   createCanvas(800, 800);
// rectMode(CENTER)
// ellipseMode(CENTER)

//  }
  

// function draw() {
//   background(100);
//   stroke (100);
//   fill(255)
//   var now = clock()

//   var yMax = PI/14;
//   var mMax = PI/14;
//   var dMax = PI/14;
  
//   yRot += now.progress.year * yMax;
//   mRot += now.min/60 * mMax;
//   dRot += now.day/30 * dMax;

 
// push ()
// translate(width*0.2, height*0.5)
// rotate (dRot)
// fill (255)
// rect (0 , 0, 150, 150);
// pop()

// push ()
// translate (width*0.5, height*0.5)
// rotate (yRot)
// ellipse (0, 0, 200, 200);
// pop ()
  

// push ()
// translate(width*0.8, height*0.5);
// rotate (mRot)
// triangle (0, 0, 200, 0, 100, 150);
// pop()
// }