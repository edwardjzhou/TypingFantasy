// FUTURE:
// 1. show WPM somewhere need to keep track of time elapsed
// 2. gameover reset the game 
// 3. animate attack from crono-- should he just teleport everywhere and use x-attack? OR HUGE ARC with MATH that he flies through
// 4. how does crono lose? do monsters need to attack him he needs hp or soemthing or if more than 5monsters are alive at once he loses
// 5. make it feel more alive with actual edges that crono and monsters cant spawn/cross
// 6. monsters move randomly left and right to and fro, also spawn preferentially away from existing monsters??
// 7. animate random movement, walking, and standing so it doesnt look like crono is skating
// 8. options/welcome screen/ choosing difficulty such as spawn rate
// 9. animate monster death
// 10. glitch: moving down+left double animates 
import Enemy from './enemy'
import Crono from './crono';

var canvas;
var ctx;
var word;
var keys;
var fontSize;
var enemies;
var bg;
var cronorightimg;
var cronoleftimg;
var cronodownimg;
var cronoupimg;
var cronothrust
var forestbg;
var player
var imp
var request;
var wpm;
var time;


document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');   
    cronoleftimg = document.getElementById('cronoleft')
    cronorightimg = document.getElementById('cronoright')
    cronodownimg = document.getElementById('cronodown')
    cronoupimg = document.getElementById('cronoup')
    forestbg = document.getElementById('forest')
    imp = document.getElementById('imp')
    cronothrust = document.getElementById('cronothrust')




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

    game()
})

function game() {
    let rate = .2 //per second
    enemies = []
    spawnEnemy(rate)

    player = new Crono(300,300, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys)

    function spawnEnemy(rate){
        enemies.push(new Enemy(Math.floor(Math.random()*canvas.width+1),Math.floor(Math.random()*canvas.height+1),canvas,ctx, imp))
        setTimeout(()=>spawnEnemy(rate),1000/rate)
    }
    render(player, enemies)
    // setInterval(()=>render(player,enemies), 1000/15);
}

function render(player, enemies, asdf){
    asdf = asdf || 1
    request = requestAnimationFrame(() => render(player, enemies, asdf))

    // ctx.clearRect(0, 0, canvas.width, canvas.height); // wipe everything
    // player.moveRight()
    // bg = new Image(); // 1024x768 background render
    // bg.addEventListener('load', function () {
    //     ctx.drawImage(bg, 0, 0, 500, 350, 0, 0, canvas.width, canvas.height - 50)
    // }, false)
    // bg.src = 'src/ChronoTrigger1000GuardiaForestBG.png'

    ctx.drawImage(forestbg, 0, 0, 500, 350, 0, 0, canvas.width, canvas.height - 50)

    // player.moveRight()
    for(let i = 0; i < enemies.length; i++){
        enemies[i].animate();
    }
    animateTypingArea();
    player.animate();

    // asdf++
    // console.log(asdf)

}

function gameover(){
    cancelAnimationFrame(request)
}
function animateWPM(){

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
    ctx.font = `bold ${fontSize}px ChronoType`;
    ctx.fillText(word.join(''), 0, (canvas.height));
    //end user input word
    // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width

}
function handleSubmit(enteredWord){
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].word === enteredWord && enemies[i].alive === true){
            player.animateAttack(enemies[i].x, enemies[i].y-50, cronothrust)
            enemies[i].alive = false;
            // enemies[i].animateDeath();
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

