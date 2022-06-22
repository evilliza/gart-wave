// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

var seed = Math.random() * 9821;
var mySize;
var circle_r;
var space;
var m;
let xspacing;
let w;
let maxwaves;
let theta;
let amplitude = new Array(maxwaves);
let dx = new Array(maxwaves);
let yvalues;
let colors0 = "292929-3055ff-e45240-b1b1b1-ffffff".split("-").map((a) => "#" + a);
let colors1 = "5d565c-97d183-c0dee4-edb136-e07958-7382ce".split("-").map((a) => "#" + a);
var color_1, color_2, colorbg;

function setup() {
	randomSeed(seed);
	mySize = min(windowWidth, windowHeight);
	// pixelDensity(5);
	translate((width - mySize) / 2, (height - mySize) / 2);
	createCanvas(mySize, mySize);
	color_1 = colors1;
	color_2 = colors0;
	colorbg = random(color_1);
	background(colorbg);
	circle_r = (mySize / 3) * 2;
	w = width * 2;
	m = 0;
	xspacing = random(1, 5);
	maxwaves = random(1, 5);
	theta = 0.0;


	for (let i = 0; i < maxwaves; i++) {
		amplitude[i] = random(10, 20);
		let period = random(1000, 500);
		dx[i] = (TWO_PI / period) * xspacing;
	}

	yvalues = new Array(floor(w / xspacing));
}

function draw() {
	randomSeed(seed);
	push();
	noStroke();
	let color_c = random(color_2);
	fill(color_c);
	translate(width / 2, height / 2);
	rotate(random(0, TAU));
	// circle(0, 0, circle_r);

	drawingContext.shadowColor = color(color_c);
	drawingContext.shadowOffsetX = random(-5, 3);
	drawingContext.shadowOffsetY = random(-3, 3);
	drawingContext.shadowBlur = 0;
	for (let i = 0; i < xspacing * 3; i += int(random(2, 3))) {
		push();
		translate(i, i * m + m);
		calcWave();
		renderWave();
		pop();
	}
	pop();
	m -= random(0.01, 0.2);
	if (m < -height / 8) {
		noLoop();
	}
}

function calcWave() {
	// theta += random(0.002, 0.001);

	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = 0;
	}

	for (let j = 0; j < maxwaves; j++) {
		let x = theta;
		for (let i = 0; i < yvalues.length; i++) {
			if (j % 2 == 0) yvalues[i] += sin(x) * amplitude[j];
			else yvalues[i] += cos(x) * amplitude[j];
			x += dx[j];
		}
	}
	theta += random(0.002, 0.001);
}

function renderWave() {
	noFill();
	stroke(colorbg);
	strokeWeight(random(5));
	for (let x = 0; x < yvalues.length; x++) {

		point(
			-width + x * xspacing,
			height / 2 + yvalues[x]
		);
	}
}

function keyTyped() {
	if (key === "s" || key === "S") {
		saveCanvas("wave", "png");
	}
}
