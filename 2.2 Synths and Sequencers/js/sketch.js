// Cameron Bartels 2022

const synth = new Tone.AMSynth();
const drum = new Tone.MembraneSynth();
const reverb = new Tone.JCReverb(0.1).toDestination();

synth.connect(reverb);
drum.connect(reverb);

let gain;

let notes = {
  'a': "C4",
  's': "D4",
  'd': "E4",
  'f': "F4",
  'g': "G4",
  'h': "A4",
  'j': "B4",
  'k': "C5",
  'l': "D5"
}

function setup() {
  createCanvas(600, 600);
  gain = new Nexus.Slider('#gain');
  gain.on('change', (v)=> {
    reverb.roomSize.value = v;
  });
}

function draw() {
  background (176, 224, 230); 

  textSize(30);
  text('Synths and Sequencers', 20, 40);
  textSize(20);
  text('Use the keys A, S, D, F, G, H, J, K, L to play notes', 20, 100);
  textSize(14);
  text('Reverb', 122, 215);
}

function keyPressed (){
  let toPlay = notes[key];
  
  synth.triggerAttackRelease(toPlay, '8n');
  drum.triggerAttackRelease(toPlay, '8n', '+0.25');
}
