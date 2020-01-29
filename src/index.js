// 3 chars vs 3 chars you can choose who to target and each char gets 1 word/amount of time
import Enemy from './enemy'

let canvas;
let ctx;
let word;
let keys;
let fontSize;

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.addEventListener("keydown", keyPush);
    word = [];

    //https://stackoverflow.com/questions/15661796/how-to-handle-multiple-keypresses-with-canvas
    keys = []; // keys that have been pressed and not released are true in here 
    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
        console.log(keys)
    });
    //

    setInterval(animateTypingArea, 1000 / 30); //30fps
    game()


})

function game() {
    let enemies = []
    window.enemies = enemies
    let rate = .5 //per second
    
    
    
    spawnEnemy()
    
    function spawnEnemy(rate){
        enemies.push(new Enemy)
    }
}

function animateTypingArea() {
    fontSize = 50;
    //handles deleting old characters 
    ctx.clearRect(0, canvas.height - fontSize, canvas.width, fontSize)
    //end deleting

    //handles recoloring deleted user text area (maybe clearRect is redundant)
    ctx.fillStyle = "grey";
    ctx.fillRect(0, canvas.height - fontSize, canvas.width, fontSize)
    //end recoloring

    //user input word
    ctx.fillStyle = "blue";
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillText(word.join(''), 0, (canvas.height));
    //end user input word
    // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width

}
function handleSubmit(enteredWord){
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].word.includes(enteredWord) && enemies[i].alive === true){
            enemies[i].alive = false;
            enemies[i].animateDeath();
        }else{
            console.log('failedenter')
        }
    }
}

function keyPush(e) {
    //couldve used fromCharCode()
    switch (e.keyCode) {
        case 65:
            word.push('a')
            // console.log(word)
            break;
        case 66:
            word.push('b')
            break;
        case 67:
            word.push('c')
            break;
        case 68:
            word.push('d')
            break;
        case 69:
            word.push('e')
            break;
        case 70:
            word.push('f')
            break;
        case 71:
            word.push('g')
            break;
        case 72:
            word.push('h')
            break;
        case 73:
            word.push('i')
            break;
        case 74:
            word.push('j')
            break;
        case 75:
            word.push('k')
            break;
        case 76:
            word.push('l')
            break;
        case 77:
            word.push('m')
            break;
        case 78:
            word.push('n')
            break;
        case 79:
            word.push('o')
            break;
        case 80:
            word.push('p')
            break;
        case 81:
            word.push('q')
            break;
        case 82:
            word.push('r')
            break;
        case 83:
            word.push('s')
            break;
        case 84:
            word.push('t')
            break;
        case 85:
            word.push('u')
            break;
        case 86:
            word.push('v')
            break;
        case 87:
            word.push('w')
            break;
        case 88:
            word.push('x')
            break;
        case 89:
            word.push('y')
            break;
        case 90:
            word.push('z')
            break;
        case 32:
            // console.log('SPACE BAR pressed PAUSE');
            break;
        case 8:
            // console.log('Delete Keymac/backspace pc Pressed');
            word.pop();
            break;
        case 13:
            handleSubmit(word.join(''))
            word = [];
            break;

    }
}

