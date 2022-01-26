function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(0);
  
  let c = color(255, 255, 0);
  let d = color(255, 0, 0);
  let e = color(0, 0, 255)
  
  noStroke();
  fill(c);
  arc(100, 100, 150, 150, 4, 310);
  
  noStroke();
  fill(d);
  square(230, 40, 135, 70, 70, 0, 0);
  
  stroke(255, 255, 255);
  strokeWeight(6);
  fill(e);
  circle(260, 100, 30);
  
  stroke(255, 255, 255);
  strokeWeight(6);
  fill(e);
  circle(325, 100, 30);
  
}