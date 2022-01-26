function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255, 255, 255);
  
  let c = color(255, 0, 0, 102);
  let d = color(0, 255, 0, 102);
  let e = color(0, 0, 255, 102);
  
  noStroke();
  fill(c);
  circle(250, 140, 200);
  
  noStroke();
  fill(d);
  circle(170, 245, 200);
  
  noStroke();
  fill(e);
  circle(315, 245, 200);
}