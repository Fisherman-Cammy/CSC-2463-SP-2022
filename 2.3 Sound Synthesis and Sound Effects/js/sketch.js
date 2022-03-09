// Cameron Bartels 2022

let actionImage;

let pitch = 200;
let pitch2 = 400;

let osc = new Tone.FMOscillator(pitch,'sine','sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);

let freqLFO = new Tone.LFO(15, 500, 1000).start();
freqLFO.connect(osc.frequency);

let osc2 = new Tone.AMOscillator(pitch2, 'square', 'triangle').start();
let gain2 = new Tone.Gain().toDestination();
let pan2 = new Tone.Panner().connect(gain2);
let ampEnv2 = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.3,
  sustain: 0.5,
  release: 0.8
}).connect(pan2);
osc2.connect(ampEnv2);

let freqLFO2 = new Tone.LFO(10, 400, 2000).start();
freqLFO.connect(osc2.frequency);

function preload(){
  actionImage = loadImage("media/gun.png");
}

function setup() {
  createCanvas(900, 800);
}

function draw() {
  background(220);

  textSize(30);
  text('SciFi Gun Sound Effect', 70, 40);
  text('Press & hold the mouse to see the effect', 70, 300);
}

function mousePressed() {
  background(70,130,180);
  image(actionImage, 0, 0);
  gunSound();
}

function mouseReleased(){
  resetCode();
}

function gunSound() {
  Tone.start();
  ampEnv2.triggerAttackRelease('4n', '+0.5');
  ampEnv.triggerAttackRelease('4n', '+.65');
}

function resetCode() {
  background(220);
}