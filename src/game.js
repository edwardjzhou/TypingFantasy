import Enemy from './enemy';
import Crono from './crono';

//could a "Game isntance" have more than 1 context and 1 canvas? if not, then dont pass this.ctx to every helper func that needs it. just directly reference this.ctx
//can we do UTF-8 support so we can do Chinese words?

class Game {
    constructor() {
        this.getResources()
        this.addListeners()
        // animate start menu/screen then ask for difficulty
    
        this.isGameover = false 
        this.isPaused = false
        this.gameLoop()
        // gameloop on gameover calls stuff to stop animating
        // gameloop animates and makes game events happen
    }


    drawAttackArc(ctx, player){  // this remains static after an attack until a new attack. could let chrono class take care of this.
        // THIS IS WHERE THE ARC IS DRAWN)
        if (player.circleCenterY) {
            // first line of two
            ctx.beginPath();
            ctx.arc(player.circleCenterX, player.circleCenterY, player.diameter / 2, player.angleStartClockwise, player.angleEndClockwise, false)
            ctx.strokeStyle = "#FFFF00";
            ctx.lineWidth = 2;
            ctx.lineCap = 'round'
            ctx.stroke();
            ctx.closePath();

            // second line of two
            ctx.beginPath();
            ctx.arc(player.circleCenterX, player.circleCenterY, player.diameter / 2 + 10, player.angleStartClockwise, player.angleEndClockwise, false)
            ctx.strokeStyle = "#FFFF00";
            ctx.lineWidth = 1;
            ctx.lineCap = 'round'
            ctx.stroke();
            ctx.closePath();
        }
    }

    drawMap(ctx, canvas){
        // 1024x768 background render
        ctx.drawImage(forestbg, 0, 0, 500, 350, 0, 0, canvas.width, canvas.height - 50)
    }

    drawEnemies(enemies){
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].animate(player.x, player.y); // move towards player
        }
    }

    drawTypingArea(ctx,canvas) {
        this.fontSize = 50;

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
 
    drawWPM(ctx, canvas, fontSize) { //bunch of global variables needs fixing
        if (then === undefined) {
            then = Date.now()
        }

        now = Date.now()
        time = parseInt((now - then) / 1000)
        wpm = parseInt(destroyedCount / (time / 60))
        ctx.fillStyle = "blue";
        ctx.font = `bold ${fontSize}px ChronoType`;
        ctx.fillText('Time: ' + time + '   WPM: ' + wpm, canvas.width - 600, (canvas.height));
    }

    animate(frameCount) {
        // animate this.player, this.enemies, and maybe track framecount
        // whoever goes first is drawn on top of. so more important comes last
        // furthermore, chrono should only give up 1 image of himself to animate not many 

        if (frameCount === undefined) frameCount = 0
        
        this.drawMap(this.ctx, this.canvas)
        this.drawAttackArc(this.ctx, this.player)
        this.drawEnemies(this.enemies)
        this.drawTypingArea(this.ctx,this.canvas);
        this.drawWPM(this.ctx, this.canvas, this.fontSize);
        this.player.animate();

        frameCount++
        request = requestAnimationFrame(() => animate(frameCount)) //will not call the CB until the batch of animations inside current call stack frame animates at once
    }






drawHeart(){
     //THIS IS THE HEART ANIMATION FOR HP

    let context = ctx
    context.beginPath()
    context.strokeStyle = "#000000";
    context.strokeWeight = 3;
    context.shadowOffsetX = 4.0;
    context.shadowOffsetY = 4.0;
    context.lineWidth = 10.0;
    context.fillStyle = "#FF0000";
    var d = 30
    var k = 100;

    context.moveTo(k, k + d / 4);
    context.quadraticCurveTo(k, k, k + d / 4, k);
    context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
    context.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
    context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
    context.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
    context.lineTo(k + d / 2, k + d);
    context.lineTo(k + d / 4, k + d * 3 / 4);
    context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
    context.stroke();
    context.fill();
    context.closePath();
     // end heart animation

}



}


    }


    gameLoop(){ //responsible for spawning initial actors, creating new actors, and calling animate
        this.rate = this.rate || 1 //per second
        this.enemies = []
        spawnEnemy(this.rate)
        function spawnEnemy(rate) {
            enemies.push(new Enemy(Math.floor(Math.random() * this.canvas.width + 1), Math.floor(Math.random() * this.canvas.height + 1), this.canvas, this.ctx, this.imp, 1, this.bluepaint))
            setTimeout(() => spawnEnemy(rate), 1000 / rate)
        }
        this.player = new Crono(300, 300, this.canvas, this.ctx, this.cronoleftimg, this.cronorightimg, this.cronoupimg, this.cronodownimg, this.cronothrust, this.keys, this.enemies)

        while (!this.isGameover && !this.isPaused) animate(this.player, this.enemies)

    }

    getResources(){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.cronoleftimg = document.getElementById('cronoleft')
        this.cronorightimg = document.getElementById('cronoright')
        this.cronodownimg = document.getElementById('cronodown')
        this.cronoupimg = document.getElementById('cronoup')
        this.forestbg = document.getElementById('forest')
        this.imp = document.getElementById('imp')
        this.cronothrust = document.getElementById('cronothrust')
        this.bluepaint = document.getElementById('bluepaint')
    }

    addListeners(){
        this.keys = [] // used for moving
        this.word = [] // what word you've typed 

        document.body.addEventListener("keydown", (e) => {
            let key = e.keyCode
            this.keys[key] = true;

            if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key))
            else if (key === 32) this.pause() //spacebar
            else if (key === 8) this.word.pop();
            else if (key === 13) {
                this.handleSubmit(word.join(''))
                this.word = [];
            }
        });

        document.body.addEventListener("keyup", (e) => {
            this.keys[e.keyCode] = false;
        });
    }

    detachListeners(){
        document.body.removeEventListener("keydown")
        document.body.removeEventListener("keyup")
        this.keys = []
        this.word = []
    }

    gameover() {
        cancelAnimationFrame(request)
        // animate GAMEOVER in text
    }

    pause() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y);        
    }

       
    
    
    handleSubmit(word) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].word === enteredWord && enemies[i].alive === true) {
                player.animateAttack(enemies[i].x, enemies[i].y - 50, cronothrust)
                enemies[i].alive = false;
                // enemies[i].animateDeath();
                destroyedCount++
            } else {
                console.log('failedenter')
            }
        }
    }

  
}

export default Game