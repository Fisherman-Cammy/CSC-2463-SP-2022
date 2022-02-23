// Cameron Bartels 2022

const sounds = new Tone.Players({
  'chicken': 'media/01-chicken.wav',
  'dog': 'media/02-dog.wav',
  'cow': 'media/03-cow.wav',
  'cat': 'media/04-cat.wav',
  'goat': 'media/05-goat.wav'
})

const delay = new Tone.FeedbackDelay("8n", 0.25);

let soundNames = ['chicken', 'dog', 'cow', 'cat', 'goat'];
let buttons = [];
let slider;

function setup() {
  createCanvas(600, 600);

  sounds.connect(delay);
  delay.toDestination();

  slider = createSlider(0., 1., 0., 0.05);
  slider.position(20, 350);
  slider.mouseReleased(  ()=>{
    delay.delayTime.value = slider.value();
  })

  soundNames.forEach((word, index)=>{
    buttons[index] = createButton(word);
    buttons[index].position(20, 70 + (index * 40));
    buttons[index].mousePressed(  ()=> playSound(word));
  })
}

function draw() {
  background (250, 128, 114);

  textSize(30);
  text('Animal Noises Sampler', 20, 24);
  textSize(20);
  text('Click the button to play the sound', 20, 54);
  text('Use the slider to increase the feedback delay', 20, 340)  
}

function playSound(whichSound = 'chicken') {
  sounds.player(whichSound).start();
}