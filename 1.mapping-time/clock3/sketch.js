
function setup() {
  // set the width & height of the sketch
  createCanvas(600, 600);
  angleMode(DEGREES);


  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())

}

let timeParts = [ 'hour', 'minute', 'second', 'millisecond' ];
let parts = [ 24, 60, 60, 1000 ];
let eles = timeParts.map((n, i) => {
		timeParts[i] = `get${n[0].toUpperCase() + n.slice(1)}s`;
		return document.getElementById(n);
	});

function draw() {
	let d = new Date();
	let time = timeParts.map(n => d[n]());
	
	time.forEach((n, i) => {
		let t = (1 - n / (parts[i] - 1)) * 100;
		eles[i].style.setProperty('--pos', t.toFixed(5) + '%');
	});
	
	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);