let gameState = 'start';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

let serialPDM;
let portName = 'COM3';
let sensors;

let pitch = 100;
let pitch2 = 400;
let nxButton;
let note;

const synth = new Tone.PolySynth().toDestination();
const synthA = new Tone.FMSynth().toDestination();

let osc = new Tone.FMOscillator(pitch2, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 0.4
}).connect(pan);
osc.connect(ampEnv);

let freqLFO = new Tone.LFO(15, 500, 1000).start();
freqLFO.connect(osc.frequency)

let pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "8n", time);
}, ["C4", "D4", "E4", "G4"]);

let melody = new Tone.Sequence((time, note) =>{
    synth.triggerAttackRelease(note, "8n", time);
}, ['G4', 'A4', 'B4', 'C4']);

const loopA = new Tone.Loop(time => {
    synthA.triggerAttackRelease("C2", "8n", time);
}, "2n".startsWith(0));

function setup(){
    nxButton = Nexus.Add.Button('#nxUI');
    nxButton.on('change', ()=>{
        Tone.start();
        pattern.start(0);
        Tone.Transport.start();
        melody.start();
    });

    serialPDM = new PDMSerial(portName);
    sensors = serialPDM.sensorData;
}

function triggerSound(){
    Tone.start();
    ampEnv.triggerAttackRelease('4n');
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter'){
        gameState = gameState == 'start' ? 'play' : 'start';
        if(gameState == 'play'){
            message.innerHTML = 'Game Started';
            message.getElementsByClassName.left = 42 + 'vw';
            requestAnimationFrame(() => {
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveBall(dx, dy, dxd, dyd);
            })
        }
    }
    if (gameState == 'play'){
        if(e.key == 'w'){
            paddle_1.style.top = 
            Math.max(
                board_coord.top,
                paddle_1_coord.top - window.innerHeight * 0.06
            ) + 'px';
            paddle_1_coord = paddle_1.getBoundingClientRect();
        }
        if (e.key == 's') {
            paddle_1.style.top =
              Math.min(
                board_coord.bottom - paddle_common.height,
                paddle_1_coord.top + window.innerHeight * 0.06
              ) + 'px';
            paddle_1_coord = paddle_1.getBoundingClientRect();
        }
        
        if (e.key == 'ArrowUp') {
            paddle_2.style.top =
              Math.max(
                board_coord.top,
                paddle_2_coord.top - window.innerHeight * 0.1
              ) + 'px';
            paddle_2_coord = paddle_2.getBoundingClientRect();
        }
        if (e.key == 'ArrowDown') {
            paddle_2.style.top =
            Math.min(
                board_coord.bottom - paddle_common.height,
                paddle_2_coord.top + window.innerHeight * 0.1
            ) + 'px';
        paddle_2_coord = paddle_2.getBoundingClientRect();
        }
    }
});

function moveBall(dx, dy, dxd, dyd){
    // serialPDM.transmit('led', 0);
    if(ball_coord.top <= board_coord.top){
        dyd = 1;
    }
    if(ball_coord.bottom >= board_coord.bottom){
        dyd = 0;
    }
    if(
        ball_coord.left <= paddle_1_coord.right &&
        ball_coord.top >= paddle_1_coord.top &&
        ball_coord.bottom <= paddle_1_coord.bottom
    ){
        dxd = 1;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if(
        ball_coord.right >= paddle_2_coord.left &&
        ball_coord.top >= paddle_2_coord.top &&
        ball_coord.bottom <= paddle_2_coord.bottom
    ){
        dxd = 0;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if(
        ball_coord.left <= board_coord.left ||
        ball_coord.right >= board_coord.right
    ){
        if (ball_coord.left <= board_coord.left) {
            score_2.innerHTML = +score_2.innerHTML + 1;
            triggerSound();
            // serialPDM.transmit('led', 1);
          } else {
            score_1.innerHTML = +score_1.innerHTML + 1;
            triggerSound();
            // serialPDM.transmit('led', 1);
          }
          gameState = 'start';
        
          ball_coord = initial_ball_coord;
          ball.style = initial_ball.style;
          message.innerHTML = 'Press Enter to Play Pong';
          message.style.left = 38 + 'vw';
          return;
        }
    ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveBall(dx, dy, dxd, dyd);
    });
}