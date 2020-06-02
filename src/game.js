import Enemy from './enemy';
import Crono from './crono';
import Trie from './trie';



// TBD 1. Add a monster Try data strcuture to highlight in red possible targets as a sort of demo of tries and like a targeting system to warn a user he
// messed up in typing a monsters word
// 2. add chinese input into they key-area
// 3. add splat sounds for kicks
// 4. finish collision detection and taking damage 

//BUGS I Just created: time needs to stop (timeElapsed ) when game is paused so wpm doesnt go to 0 and the next one enemy doesnt instaspawn after pause
// MAYBE IF have time: animate the splash screen with words flying in / also maybe fade to black in the 0-2000 ms transition
class Game {
    constructor() {
        this._getResources();
        this._addListeners();
        this._ensureDefaultSettings();
        this.animateSplash();
        let interval = setInterval( ()=> {
            if (!this.onSplash) {
                clearInterval(interval);
                this.gameLoop();
            }
        }, 2000);

    }

    animateSplash(timeElapsed){
        // background img
        this.ctx.drawImage(this.splash, 0, 0, 1200, 900, 0, 0, this.canvas.width, this.canvas.height); //add credits of where i took image from

        //title
        this.ctx.font = `bold 100px ChronoType`;
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeText('TYPING FANTASY!', this.canvas.width * .1-2, 100-3);
        this.ctx.fillText('TYPING FANTASY!', this.canvas.width * .1, 100);

        // language choices
        this.ctx.font = `bold 50px ChronoType`;
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeText('Choose a TYPING LANGUAGE and hit ENTER!', this.canvas.width * .05 - 2, (this.canvas.height * .5) - 3);
        this.ctx.fillText('Choose a TYPING LANGUAGE and hit ENTER!', this.canvas.width * .05, (this.canvas.height * .5));
        this.ctx.strokeText('ENGLISH 5-letter words', this.canvas.width * .1-2, (this.canvas.height * .6)-3);
        this.ctx.fillText('ENGLISH 5-letter words', this.canvas.width * .1, (this.canvas.height * .6));
        this.ctx.strokeText('CHINESE idioms', this.canvas.width * .1 -2, (this.canvas.height * .7)-3);
        this.ctx.fillText('CHINESE idioms', this.canvas.width * .1, (this.canvas.height * .7));

        // language selection logic
        let up = this.keys[38];
        let down = this.keys[40];
        if (down && this.gameMode ===`english`) this.gameMode=`chinese`;
        else if (up && this.gameMode===`chinese`) this.gameMode=`english`;
        if (this.gameMode === `english`) this.ctx.drawImage(document.getElementById(`cursor`), 0, 0, 32, 32, 25, 320, 50, 50 ); //add credits of where i took image from
        else if (this.gameMode === `chinese`) this.ctx.drawImage(document.getElementById(`cursor`), 0, 0, 32, 32, 25, 380, 50, 50);

        requestAnimationFrame(()=> {
            if (this.onSplash === true) this.animateSplash(timeElapsed);
        })
    }

    _ensureDefaultSettings() {
        this.isGameover = this.isGameover || false;
        this.isPaused = this.isPaused || false;
        this.gameMode = this.gameMode || `english`; 
        this.onSplash = this.onSplash || true;
        this.lastTimeElapsed = this.lastTimeElapsed || 0;
        this.rate = this.rate || 2000;
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
        this.ctx.drawImage(this.forestbg, 0, 0, 500, 350, 0, 0, this.canvas.width, this.canvas.height - 50);
    }

    drawEnemies(){
        const possibilities = this.trie.possibilities(this.word.join(``));

        // really shouldve used a enemies hash where enemies[`enemy.word`] = enemy object; a hash where the submitted word maps to the enemy object
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].animate(this.player.x, this.player.y); // move towards player
            if (possibilities.includes(this.enemies[i].word) && this.enemies[i].alive === true) this.enemies[i].animateReticle();
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
            this.then = Date.now();
        }

        this.now = Date.now();
        this.time = parseInt((this.now - this.then) / 1000);
        this.wpm = parseInt(this.destroyedCount / (this.time / 60)) || 0; //0 to get rid of NaN
        this.ctx.fillStyle = "blue";
        this.ctx.font = `bold ${this.fontSize}px ChronoType`;
        this.ctx.fillText('Time: ' + this.time + '   WPM: ' + this.wpm, this.canvas.width - 600, (this.canvas.height));
    }

    drawHeart() {
        //THIS IS THE HEART ANIMATION FOR HP
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeWeight = 3;
        this.ctx.shadowOffsetX = 4.0;
        this.ctx.shadowOffsetY = 4.0;
        this.ctx.lineWidth = 10.0;
        this.ctx.fillStyle = "#FF0000";

        let d = 30; // this is like the size
        let k = 560; // this is where it is on diagonal
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

        // THIS IS THE HP NUMBER ANIMATION
        this.ctx.fillStyle = "blue";
        this.ctx.font = `bold ${this.fontSize}px ChronoType`;
        this.ctx.fillText(`${this.player.hp}`, this.canvas.width - 195, (this.canvas.height));
        
    }

    animate(timeElapsed) {
        // console.log(time)
        // animate this.player, this.enemies, and maybe track framecount
        // whoever goes first is drawn on top of. so more important comes last
        // furthermore, chrono should only give up 1 image of himself to animate not many CAN WE USE PASSING STRINGS THAT ARE EVALED HERE?
        // OR DO WE JUST STRAIGHT UP CALL ANIMAATE IN THE CHRONO CLASS METHOD
        if (timeElapsed - this.lastTimeElapsed > this.rate){
            this.spawnEnemy();
            this.lastTimeElapsed = timeElapsed;
        }

        this.drawMap(this.ctx, this.canvas);
        this.drawAttackArc(this.ctx, this.player);
        this.drawEnemies(this.enemies, this.player);
        this.drawTypingArea(this.ctx,this.canvas, this.fontSize);
        this.drawWPM(this.ctx, this.canvas, this.fontSize);
        this.drawHeart(this.ctx);
        this.player.animate();

        this.request = requestAnimationFrame((timeElapsed) => {
            if (!this.isPaused && !this.isGameOver) {
                this.animate(timeElapsed);
            }
        }) //will not call the CB until the batch of animations inside current call stack frame animates at once. 
    }

    // almost a misnomer at this point -- all game logic will be in animation from now on
    gameLoop(){ //responsible for spawning initial actors, creating new actors, and calling animate-- will eventually stick all game logic in here including calls to "move/act" rather than letting animate take care of that implicitly
        this.trie = new Trie();
        this.enemies = [];
        this.player = new Crono(300, 300, this.canvas, this.ctx, this.cronoleftimg, this.cronorightimg, this.cronoupimg, this.cronodownimg, this.cronothrust, this.keys, this.enemies);
        this.animate();
    }

    spawnEnemy() {
        let newEnemy = new Enemy(Math.floor(Math.random() * this.canvas.width + 1),
            Math.floor(Math.random() * this.canvas.height + 1), this.canvas, this.ctx, this.imp, 1, this.bluepaint, this.gameMode, this.squarereticle)
        this.enemies.push(newEnemy)
        this.trie.addWord(newEnemy.word)
        if (this.isGameover) return  //breaks spawning on gameover
        // while (this.isPaused) {} //temporary solution; actually breaks the call stack
        // if (this.isPaused) return

        // setTimeout( ()=> this.spawnEnemy(this.rate), 1000 / this.rate)
    }

    _getResources(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.cronoleftimg = document.getElementById('cronoleft');
        this.cronorightimg = document.getElementById('cronoright');
        this.cronodownimg = document.getElementById('cronodown');
        this.cronoupimg = document.getElementById('cronoup');
        this.forestbg = document.getElementById('forest');
        this.imp = document.getElementById('imp');
        this.cronothrust = document.getElementById('cronothrust');
        this.bluepaint = document.getElementById('bluepaint');
        this.splash = document.getElementById(`splash`);
        this.squarereticle = document.getElementById(`squarereticle`);
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
                if (this.onSplash) {
                    this.onSplash = false
                } else {
                    this.handleSubmit()
                    this.word = [];
                }
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
        this._detachListeners()

        // animate GAMEOVER in text
    }

    pause() {
        this.isPaused = true 
        this.ctx.fillText('PRESS SPACEBAR TO UNPAUSE', this.canvas.width * .2, this.canvas.height * .5);
    }

    unpause(){
        this.isPaused = false
        this.animate()
    }
    
    handleSubmit() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].word === this.word.join(``) && this.enemies[i].alive === true) {
                this.player.animateAttack(this.enemies[i].x, this.enemies[i].y - 50, this.cronothrust)
                this.enemies[i].alive = false;
                this.destroyedCount >= 0 ? this.destroyedCount++ : this.destroyedCount = 0
            }
        }
    }

  
}

export default Game