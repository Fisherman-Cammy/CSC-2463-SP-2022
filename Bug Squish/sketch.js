let spriteSheet;
let character = [];
let count = 10;
let startTime;
let gameState = 'wait';
let score = 0;

function preload(){
  spriteSheet = loadImage("bug2.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  
  for(i = 0;i < count; i++){
    character[i] = new Character(random([spriteSheet]), random(100, 500), random(100,500), random(1, 3), random(-1, 1));
  }
}

function timer(){
  return int((millis() - startTime) / 1000);
}

function mousePressed(){
  let dmin = -1;
  let character_id = -1;
  
  for(i = 0; i < count; i++){
    let d = character[i].grabcheck();
    if(d != -1){
      if(dmin == -1 || d < dmin){
        dmin = d;
        character_id = i;
      }
    }
  }
  
  if(character_id != 1){
    character[character_id].grab();
  }
}

function mouseDragged(){
  for(i = 0; i < count; i++){
    character[i].drag();
  }
}

function mouseReleased(){
  for (i = 0; i < count; i++){
    character[i].drop();
  }
}

function draw() {
  background(255, 255, 255);
  if (gameState == 'wait'){
    textSize(30);
    text('Press any key to start', 150, 300)
    if(mousePressed){
      startTime = millis();
      gameState = 'playing';
    }
  }
  
  else if(gameState == 'playing'){
    for(i = 0; i < count; i++){
      character[i].draw();
    }
    let time = timer();
    text("Time: " + (30 - time), 10, 30);
    text("Score: " + score, 10, 60);
    if(time >= 30){
      gameState = 'end';
    }
  }
  
  else if(gameState == 'end'){
    text("Game Over", 150, 300);
    text("Final Score: " + score, 150, 350);
    text("Press any key to restart", 150, 400);
    if(mouseIsPressed){
      startTime = millis();
      gameState = 'playing';
    }
  }
}

class Character{
  constructor(spriteSheet, x, y, speed, move){
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    this.facing = 1;
    this.speed = speed;
    this.move = move;
    this.facing = move;
    this.grabbed = false;
    this.spriteFrame = 0;
  }
  
  animate(){
    let sx, sy;
    
    if(this.move == 0){
      if(this.grabbed){
        sx = this.spriteFrame % 7 + 5;
        sy = 9;
      }
      
      else{
        sx = 0;
        sy = 0;
      }
    }
    
    else{
      sx = this.spriteFrame % 8 + 1;
      sy = 0;
    }
    
    return [sx, sy];
  }
  
  draw(){
    push();
    translate(this.x, this.y);
    rotate(this.facing, 1);
    
    let[sx, sy] = this.animate();
    image(this.spriteSheet, 0, 0, 100, 100, 10 * sx, 10 * sy, 80, 80);
    
    if(frameCount % 5 == 0){
      this.spriteFrame += 1;
    }
    
    this.x += this.speed * this.move;
    
    if(this.x < 30){
      this.move = 1;
      this.facing = 1;
    }
    
    else if(this.x > width - 30){
      this.move = -1;
      this.facing = -1;
    }
    pop();
  }
  
  go(direction){
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }
  
  stop(){
    this.move = 0;
  }
  
  grabcheck(){
    let d = -1;
    if(mouseX > this.x -40 && mouseX < this.x + 40 && mouseY > this.y -40 && mouseY < this.y + 40)
    {
      d = dist(mouseX, mouseY, this.x, this.y)
    }
    return d;
  }
  
  grab(){
    this.stop();
    this.grabbed = true;
    this.offsetX = this.x + mouseX;
    this.offsetY = this.y + mouseY;
    score++;
  }
  
  drag(){
    if(this.grabbed){
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }
  
  drop(){
    if(this.grabbed){
      this.go(this.facing);
      this.grabbed = false;
    }
  }
  
  killbug(){
    character[i].remove();
    score++
  }
}