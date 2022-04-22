//Cameron Bartels Spring 2022

//declaring variables
let global = 0;
let pitch = 100;
let nxButton;
let note;

let serialPDM;
let portName = 'COM3';
let sensors;


//creating all of the synths that will be used to play music in the program
// let synth = new Tone.PolySynth().toDestination();
// const synthA = new Tone.FMSynth().toDestination();
// let synthB = new Tone.FMSynth().toDestination();

//creating a pattern to play a background set of notes
// let pattern = new Tone.Pattern(function(time, note){
//   synth.triggerAttackRelease(note, "8n", time);
// }, ["C4", "D4", "E4", "G4"]);

//create a melody to play ontop of the pattern and loop
// let melody = new Tone.Sequence((time, note)=>{
//   synth.triggerAttackRelease(note, '8n', time);
// }, ['G4', 'A4', 'B4', 'C4']);

//create a loop used to have a "bass kick" that is played every half note of the pattern. Starts at the same time as the pattern starts
// const loopA = new Tone.Loop(time => {
// 	synthA.triggerAttackRelease("C2", "8n", time);
// }, "2n").start(0);

function setup() {
  
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  
  sensors = serialPDM.sensorData;
  //creating the canvas and setting the background color. Did not set background color to white so the user can see the white color, so it does not appear that there is an 
  //empty section in the paint selection area
  createCanvas(600, 600);
  background(225);

  //create a button to start the background audio made by the loop, pattern, and melody
//   nxButton = Nexus.Add.Button('#nxUI');
//   nxButton.on('change', ()=>{
//     Tone.start();
//     pattern.start(0);
//     Tone.Transport.start();
//     melody.start();
//   })
}

function draw() {
  textSize(20);
  text("Click the button at the top to start the music!",110, 590);

  //making variables for all of the colors of the squares
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
  
  //creating all of the boxes that hold the colors that can be used to paint with
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
  
  //if statement is how the program actually draws the paint lines while the mouse is being pressed
  if(mouseIsPressed){
    
    serialPDM.transmit('led', 1);
    console.log('test');
    //This if statement holds the code that draws the lines and sets what color the line should be
    //Also it plays a note from a synth that is updated when the color is changed
    if(mouseX > 30){
        stroke(global);
        strokeWeight(4);
        line(pmouseX, pmouseY, mouseX, mouseY);
        // Tone.start();
        // synthB.triggerAttackRelease(note, '4n');
    }
    //changing the color to red, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 2 && mouseY < 22){
      global = c;
      // Tone.Transport.bpm.value = 160;
      // synthB.triggerAttackRelease("C3", "8n");
      // note = "C1"
    }
    //changing the color to orange, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 24 && mouseY < 44){
      global = d;
      // Tone.Transport.bpm.value = 150;
      // synthB.triggerAttackRelease("D3", "8n");
      // note = "D1"
    }
    //changing the color to yellow, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 48 && mouseY < 68){
      global = e;
      // Tone.Transport.bpm.value = 140;
      // synthB.triggerAttackRelease("E3", "8n");
      // note = "E1"
    }
    //changing the color to lime green, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 70 && mouseY < 92){
      global = f;
      // Tone.Transport.bpm.value = 130;
      // synthB.triggerAttackRelease("F3", "8n");
      // note = "F1"
    }
    //changing the color to cyan, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 94 && mouseY < 114){
      global = g;
      // Tone.Transport.bpm.value = 120;
      // synthB.triggerAttackRelease("G3", "8n");
      // note = "G1"
    }
    //changing the color to dark blue, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 116 && mouseY < 136){
      global = h;
      // Tone.Transport.bpm.value = 110;
      // synthB.triggerAttackRelease("A3", "8n");
      // note = "A1"
    }
    //changing the color to magenta, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 138 && mouseY < 160){
      global = i;
      // Tone.Transport.bpm.value = 100;
      // synthB.triggerAttackRelease("B3", "8n");
      // note = "B1"
    }
    //changing the color to brown, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 162 && mouseY < 182){
      global = j;
      // Tone.Transport.bpm.value = 90;
      // synthB.triggerAttackRelease("C4", "8n");
      // note = "C2"
    }
    //changing the color to white, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 184 && mouseY < 204){
      global = k;
      // Tone.Transport.bpm.value = 80;
      // synthB.triggerAttackRelease("D4", "8n");
      // note = "D2"
    }
    //changing the color to black, playing a note when the box is clicked, and changing the note that is played when the mouse button is held down while drawing
    else if(mouseY > 206 && mouseY < 226){
      global = l;
      // Tone.Transport.bpm.value = 70;
      // synthB.triggerAttackRelease("E4", "8n");
      // note = "E2"
    }
  }
  else{
    serialPDM.transmit('led', 0);
  }
}