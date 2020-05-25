import Enemy from './enemy';
import Crono from './crono';

// TBD 1. Add a monster Try data strcuture to highlight in red possible targets as a sort of demo of tries and like a targeting system to warn a user he
// messed up in typing a monsters word

//could a "Game isntance" have more than 1 context and 1 canvas? if not, then dont pass this.ctx to every helper func that needs it. just directly reference this.ctx
//can we do UTF-8 support so we can do Chinese words?
// i overmodularized things with classes-- no need because i dont have multiple games or multiple chronos in one game

class Game {
    constructor() {
        this._getResources()
        this._addListeners()
        // animate start menu/screen then ask for difficulty
        // ensure settings have default values? with a method call here?

    
        this.isGameover = false 
        this.isPaused = false
        this.gameLoop()
        // gameloop on gameover calls stuff to stop animating
        // gameloop animates and makes game events happen
    }


    drawAttackArc(){  // this remains static after an attack until a new attack. could let chrono class take care of this.
        // THIS IS WHERE THE ARC IS DRAWN)
        if (this.player.circleCenterY) {
            // first line of two
            this.ctx.beginPath();
            this.ctx.arc(this.player.circleCenterX, this.player.circleCenterY, this.player.diameter / 2, this.player.angleStartClockwise, this.player.angleEndClockwise, false)
            this.ctx.strokeStyle = "#FFFF00";
            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round'
            this.ctx.stroke();
            this.ctx.closePath();

            // second line of two
            this.ctx.beginPath();
            this.ctx.arc(this.player.circleCenterX, this.player.circleCenterY, this.player.diameter / 2 + 10, this.player.angleStartClockwise, this.player.angleEndClockwise, false)
            this.ctx.strokeStyle = "#FFFF00";
            this.ctx.lineWidth = 1;
            this.ctx.lineCap = 'round'
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    drawMap(){
        // 1024x768 background render
        this.ctx.drawImage(this.forestbg, 0, 0, 500, 350, 0, 0, this.canvas.width, this.canvas.height - 50)
    }

    drawEnemies(){
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].animate(this.player.x, this.player.y); // move towards player
        }
    }

    drawTypingArea() {
        this.fontSize = this.fontSize || 50;

        //handles deleting old characters 
        this.ctx.clearRect(0, this.canvas.height - this.fontSize, this.canvas.width, this.fontSize);
        //end deleting

        //handles recoloring deleted user text area (maybe clearRect is redundant)
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, this.canvas.height - this.fontSize, this.canvas.width, this.fontSize);
        //end recoloring

        //user input word
        this.ctx.fillStyle = "blue";
        this.ctx.font = `bold ${this.fontSize}px ChronoType`;
        this.ctx.fillText(this.word.join(''), 0, (this.canvas.height));
        //end user input word
        // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width

    }
 
    drawWPM() { 
        if (this.then === undefined) {
            this.then = Date.now()
        }

        this.now = Date.now()
        this.time = parseInt((this.now - this.then) / 1000)
        this.wpm = parseInt(this.destroyedCount / (this.time / 60))
        this.ctx.fillStyle = "blue";
        this.ctx.font = `bold ${this.fontSize}px ChronoType`;
        this.ctx.fillText('Time: ' + this.time + '   WPM: ' + this.wpm, this.canvas.width - 600, (this.canvas.height));
    }

    drawHeart() {
        //THIS IS THE HEART ANIMATION FOR HP
        this.ctx.beginPath()
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeWeight = 3;
        this.ctx.shadowOffsetX = 4.0;
        this.ctx.shadowOffsetY = 4.0;
        this.ctx.lineWidth = 10.0;
        this.ctx.fillStyle = "#FF0000";

        let d = 30
        let k = 100;
        this.ctx.moveTo(k, k + d / 4);
        this.ctx.quadraticCurveTo(k, k, k + d / 4, k);
        this.ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
        this.ctx.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
        this.ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
        this.ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
        this.ctx.lineTo(k + d / 2, k + d);
        this.ctx.lineTo(k + d / 4, k + d * 3 / 4);
        this.ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        // end heart animation
    }

    animate(frameCount) {
        // animate this.player, this.enemies, and maybe track framecount
        // whoever goes first is drawn on top of. so more important comes last
        // furthermore, chrono should only give up 1 image of himself to animate not many 

        if (frameCount === undefined) frameCount = 0
        
        this.drawMap(this.ctx, this.canvas)
        this.drawAttackArc(this.ctx, this.player)
        this.drawEnemies(this.enemies, this.player)
        this.drawTypingArea(this.ctx,this.canvas, this.fontSize);
        this.drawWPM(this.ctx, this.canvas, this.fontSize);
        this.drawHeart(this.ctx)
        this.player.animate();

        frameCount++
        this.request = requestAnimationFrame(() => {
            if (!this.isPaused) {
                this.animate(frameCount)
            }
        }) //will not call the CB until the batch of animations inside current call stack frame animates at once. global
    }


    gameLoop(){ //responsible for spawning initial actors, creating new actors, and calling animate-- will eventually stick all game logic in here including calls to "move/act" rather than letting animate take care of that implicitly
        this.rate = this.rate || 1 //per second
        this.enemies = []
        this.spawnEnemy()
        this.player = new Crono(300, 300, this.canvas, this.ctx, this.cronoleftimg, this.cronorightimg, this.cronoupimg, this.cronodownimg, this.cronothrust, this.keys, this.enemies)
        if (!this.isGameover && !this.isPaused) this.animate()
    }

    spawnEnemy() {
        this.enemies.push(new Enemy(Math.floor(Math.random() * this.canvas.width + 1), Math.floor(Math.random() * this.canvas.height + 1), this.canvas, this.ctx, this.imp, 1, this.bluepaint))
        setTimeout( ()=> this.spawnEnemy(this.rate), 1000 / this.rate)
    }

    _getResources(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.cronoleftimg = document.getElementById('cronoleft')
        this.cronorightimg = document.getElementById('cronoright')
        this.cronodownimg = document.getElementById('cronodown')
        this.cronoupimg = document.getElementById('cronoup')
        this.forestbg = document.getElementById('forest')
        this.imp = document.getElementById('imp')
        this.cronothrust = document.getElementById('cronothrust')
        this.bluepaint = document.getElementById('bluepaint')
    }

    _addListeners(){
        this.keys = [] // used for moving
        this.word = [] // what word you've typed 

        document.body.addEventListener("keydown", (e) => {
            let key = e.keyCode
            this.keys[key] = true;

            if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key).toLowerCase())
            else if (key === 32) {
                if (!this.isPaused) this.pause() 
                else if (this.isPaused) this.unpause()
            }
            else if (key === 8) this.word.pop();
            else if (key === 13) {
                console.log(this.word)
                this.handleSubmit()
                this.word = [];
            }
        });

        document.body.addEventListener("keyup", (e) => {
            this.keys[e.keyCode] = false;
        });
    }

    _detachListeners(){
        document.body.removeEventListener("keydown")
        document.body.removeEventListener("keyup")
        this.keys = []
        this.word = []
    }

    gameover() {
        cancelAnimationFrame(this.request)
        // animate GAMEOVER in text
    }

    pause() {
        this.isPaused = true 
        cancelAnimationFrame(this.request)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(this.canvas.height, this.canvas.width);        
        console.log(`game paused`)
    }

    unpause(){
        this.isPaused = false
        requestAnimationFrame(this.request)
        console.log(`game unpasued`)
    }
    
    handleSubmit() {
        console.log(this.word)
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].word === this.word.join(``) && this.enemies[i].alive === true) {
                this.player.animateAttack(this.enemies[i].x, this.enemies[i].y - 50, this.cronothrust)
                this.enemies[i].alive = false;
                // enemies[i].animateDeath();
                this.destroyedCount >= 0 ? this.destroyedCount++ : this.destroyedCount = 0
            }
        }
    }

  
}

export default Game