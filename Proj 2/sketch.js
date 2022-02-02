let global = 0;

function setup() {
  createCanvas(600, 600);
  background(225);
}

function draw() {
  
  let c = color(255, 0, 0);
  let d = color(255, 128, 0);
  let e = color(255, 255, 0);
  let f = color(128, 255, 0);
  let g = color(0, 255, 255);
  let h = color(0, 0, 255);
  let i = color(255, 0, 255);
  let j = color(139, 69, 19);
  let k = color(255, 255, 255);
  let l = color(0, 0, 0);
  
  let dis = dist(mouseX, mouseY, 2, 2);
  
  
  noStroke();
  fill(c);
  rect(2, 2, 20, 20);
  
  fill(d);
  rect(2, 24, 20, 20);
  
  fill(e);
  rect(2, 46, 20, 20);
  
  fill(f);
  rect(2, 68, 20, 20);
  
  fill(g);
  rect(2, 90, 20, 20);
  
  fill(h);
  rect(2, 112, 20, 20);
  
  fill(i);
  rect(2, 134, 20, 20);
  
  fill(j);
  rect(2, 156, 20, 20);
  
  fill(k);
  rect(2, 178, 20, 20);
  
  fill(l);
  rect(2, 200, 20, 20);
  
  if(mouseIsPressed){
    if(mouseX > 24){
        stroke(global);
        strokeWeight(4);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    else if(mouseY > 2 && mouseY < 22){
      global = c;
    }
    
    else if(mouseY > 24 && mouseY < 44){
      global = d;
    }
    
    else if(mouseY > 48 && mouseY < 68){
      global = e;
    }
    
    else if(mouseY > 70 && mouseY < 92){
      global = f;
    }
    
    else if(mouseY > 94 && mouseY < 114){
      global = g;
    }
    
    else if(mouseY > 116 && mouseY < 136){
      global = h;
    }
    
    else if(mouseY > 138 && mouseY < 160){
      global = i;
    }
    
    else if(mouseY > 162 && mouseY < 182){
      global = j;
    }
    
    else if(mouseY > 184 && mouseY < 204){
      global = k;
    }
    
    else if(mouseY > 206 && mouseY < 226){
      global = l;
    }
  }
}