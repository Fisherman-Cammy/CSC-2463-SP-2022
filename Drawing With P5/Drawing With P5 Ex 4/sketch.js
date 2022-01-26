function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0, 0, 255);
  
  let c = color(76, 153, 0);
  let d = color(255, 0, 0);
  
  stroke(255, 255, 255);
  strokeWeight(4);
  fill(c);
  circle(width / 2, height / 2, 250);
  
  stroke(255, 255, 255);
  strokeWeight(4);
  fill(d);
  triangle(165, 350, 250, 130, 335, 350);
  triangle(150, 175, 250, 375, 350, 175);
  //arc(width / 2, height / 2, 255, 255, 4, 310, PIE);
  
}