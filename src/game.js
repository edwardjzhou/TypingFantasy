import Enemy from './enemy';
import Crono from './crono';
import Trie from './trie';


// TBD 1. Add a monster Try data strcuture to highlight in red possible targets as a sort of demo of tries and like a targeting system to warn a user he
// messed up in typing a monsters word DONE
// 2. add chinese input into they key-area
// 3. add splat sounds for kicks
// 4. finish collision detection and taking damage NOW
// 5. implement a high score table with a notepad file or firebase or something with express MIDWAY
// 6.animate the splash screen with words flying in / also maybe fade to black in the 0-2000 ms transition
// 7. add in upload your own words
// 8. draw the tracers for the reticle
// 9. add symbols to make hp immutable (almost) w const HP = Symbol()
// this[HP] = 100; Reflect.ownKeys() or Object.getOwnPropertySymbols() can detect
// 10. https://developers.redhat.com/blog/2017/01/17/data-encapsulation-vs-immutability-in-javascript/ make a factory for enemys? for like a boss rather than inheritanc
//BUGS TBD: 
// 1.  time needs to stop (timeElapsed ) when game is paused so wpm doesnt go to 0 and the next one enemy doesnt instaspawn after pause
// 2. need to fix settimeouts on collision/damage taking and animating it
const qs = document.querySelector.bind(globalThis.document)

class Game {
    constructor() {
        this._getResources();
        this._ensureDefaultSettings();
        this._addListeners();
        this.animateSplash();
        let interval = setInterval(  () => {
            if (!this.onSplash) {
                clearInterval(interval);
                this.dynamicallyLoadLanguageModule()
            }
        }, 2000);

    }

    dynamicallyLoadLanguageModule() { 
        // this may be all wrong as it seems after the main package is loaded BOTH of these are prefetched... or is the conditional not for prefetch but for  real load?
        if (this.gameMode === `english`) {
            import(/* webpackChunkName: "./dictionaryEnglish", webpackPrefetch: true */ './dictionaryEnglish').then(({ englishDictionary }) => {
                this.dictionary = englishDictionary
                this.gameLoop();
            }).catch((err) => {
                alert(err)
            })
        } else if (this.gameMode === `chinese`) {
            import(/* webpackChunkName: "./dictionaryChinese", webpackPrefetch: true */ './dictionaryChinese').then(({ chineseDictionary }) => {
                this.dictionary = chineseDictionary
                this.gameLoop();
            }).catch((err) => {
                alert(err)
            })
        }
    }

    get hasGameStarted(){
        return !this.onSplash
    }

    get language(){
        return this.gameMode
    }

    animateSplash(timeElapsed = 0){
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
        if (this.gameMode === `english`) this.ctx.drawImage(this.cursor, 0, 0, 32, 32, 25, 320, 50, 50 ); 
        else if (this.gameMode === `chinese`) this.ctx.drawImage(this.cursor, 0, 0, 32, 32, 25, 380, 50, 50);

        requestAnimationFrame( (rafTimeElapsed) => {
            if (this.onSplash === true) this.animateSplash(rafTimeElapsed);
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
        // original image's 1024x768; we do a background render
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
        if (this.isPaused && !this.timeOfPauseStart) this.timeOfPauseStart = Date.now()
        if (!this.isPaused && this.timeOfPauseStart) {
            this.then = this.then + (Date.now() - this.timeOfPauseStart)
            this.timeOfPauseStart = null
        }
        if (this.then === undefined) {
            this.then = Date.now();
        }

        this.now = Date.now();
        this.time = parseInt((this.now - this.then) / 1000);
        this.wpm = parseInt(this.destroyedCount / (this.time / 60)) || 0; //0 to get rid of NaN
        this.ctx.fillStyle = "blue";
        this.ctx.font = `bold ${this.fontSize}px ChronoType`;
        this.ctx.fillText('Time: ' + this.time + '  WPM: ' + this.wpm, this.canvas.width - 600, (this.canvas.height));
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

    animate(timeElapsed = 0) {
        //still unsure as to best way to do this
        if (this.player.hp <= 0) {
            this.isGameover = true
            this.gameover()
        }

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

        this.player.checkCollision()
        this.player.animate();

        this.request = requestAnimationFrame( (rafTimeElapsed) => {
            if (!this.isPaused && !this.isGameOver) {
                this.animate(rafTimeElapsed);
            }
        }) //will not call the CB until the batch of animations inside current call stack frame animates at once. 
    }

    // almost a misnomer at this point -- all game logic will be in animation from now on
    gameLoop(){ //responsible for spawning initial actors, creating new actors, and calling animate-- will eventually stick all game logic in here including calls to "move/act" rather than letting animate take care of that implicitly
        if (this.gameMode === `chinese`) {
            this._detachListeners()
            this._addListeners()       
        }
        this.trie = new Trie();
        this.enemies = [];
        this.player = new Crono(300, 300, this.canvas, this.ctx, this.cronoleftimg, this.cronorightimg, this.cronoupimg, this.cronodownimg, this.cronothrust, this.keys, this.enemies);
        this.animate();
    }

    spawnEnemy() {
        let newEnemy = new Enemy(Math.floor(Math.random() * this.canvas.width + 1),
            Math.floor(Math.random() * this.canvas.height + 1), this.canvas, this.ctx, this.imp, 1, this.bluepaint, this.gameMode, this.squarereticle, this.dictionary)
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
        this.cursor = document.getElementById(`cursor`)
        this.squarereticle = document.getElementById(`squarereticle`);
    }

    _addListeners(){
        this.keys = [] // used for moving
        this.word = [] // what word you've typed 

        function preventDefaultViewportJiggling(e) {
            const arrowsAndSpacebar = {
                37: true,
                38: true,
                39: true,
                40: true,
                32: true,
            }

            Object.freeze(arrowsAndSpacebar)
            if (arrowsAndSpacebar[e.keyCode]) e.preventDefault()
        }

        if (this.gameMode===`english`) {
            this.keydownHandler = (e) => {
                let key = e.keyCode
                this.keys[key] = true;
                
            
                preventDefaultViewportJiggling(e)


                if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key).toLowerCase())
                else if (key === 32 && !this.isGameover) {
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
            }

        } else if (this.gameMode ===`chinese`) {
                this.chineseInput = document.createElement(`input`)
                this.chineseInput.setAttribute(`placeholder`,`饱经沧桑`)
                this.chineseInput.style.height = "40px"
                this.chineseInput.style.width = "200px"
                this.chineseInput.style.margin = "5px"

                this.chineseAdvisoryText = document.createTextNode("Type chinese here");
                this.linebreak = document.createElement("br");

                this.canvas.insertAdjacentElement(`afterend`, this.chineseInput);
                this.chineseInput.insertAdjacentElement(`beforebegin`, this.linebreak);

                this.keydownHandler = (e) => {
                    let key = e.keyCode //should be nubmer
                    this.keys[key] = true; //small range of keyboard keys means that this type of bucketing is acceptable
                    // the larger the range of values in a set hte more costly it is to use bucket sort (just confused myself)
                    // expense in meemory freom range and multiplying to get the right memory location from index ?

                    //object freeze enum
                    //prevent arrow keys from messsing with your viewport/scrolling 

                    preventDefaultViewportJiggling(e)

                    if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key).toLowerCase())
                    else if (key === 32 && !this.isGameover) {
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
            }
        }

        this.keyupHandler = (e) => {
            this.keys[e.keyCode] = false;
        }

        document.body.addEventListener("keydown",  this.keydownHandler, true);
        document.body.addEventListener("keyup",  this.keyupHandler, true);
    }

    _detachListeners(){
        document.body.removeEventListener("keydown", this.keydownHandler, true)
        document.body.removeEventListener("keyup", this.keyupHandler, true)
        console.log(`detacehd english listener`)
        this.keys = []
        this.word = []
    }

    animateGameover() {
        this.ctx.font = `bold 50px ChronoType`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText('GAMEOVER', this.canvas.width * .4, this.canvas.height * .5);
        requestAnimationFrame( (timeELapsed) => {
            if (this.onGameover === true) this.animateGameover(timeElapsed);
        })
    }

    createHighscoreDialogBox() {

    }

     gameover() {
        this.onGameover = true
        
        fetch('./newhighscore', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([ this.destroyedCount, 'irrelevant!' ])
        }).then(response => response.json() ).then( resolved => {
            if (resolved === true) {
                this.createHighscoreDialogBox()
                // console.log(resolved)//resolved === false
                // console.log(this) // window.game
            }
        }) 
            // console.log(window.WARRANTNEWHIGHSCORE)
    

         

        
        fetch('./highscore', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([ 654, 'test1' ])
        }).then(res => {
            console.log(res.json())
            return window.highScoresNEW = res.json()
        })

        this.animateGameover()
       
        // fetch('http://localhost:3001/highscore', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ a: 1, b: 'Textual content' })
        // });


        // cancelAnimationFrame(this.request)

        this._detachListeners()

        this.setTimeout( ()=> {
            window.game = null
            window.game = new Game()
        },5000)

        // animate GAMEOVER in text

        // fetch('./highscore', {
        //     method: 'post',
        //     body: "hi"
        // })

        // var tenure = prompt("Please enter preferred tenure in years", "15");

        // if (tenure != null) {
        //     alert("You have entered " + tenure + " years");
        // }
    }

    pause() {
        this.isPaused = true 
        this.drawWPM() // to ensure we get that one snapshot of PAUSE TIME so that drawWPM isnt messed up by pause
        this.ctx.font = `bold 50px ChronoType`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText('PRESS SPACEBAR TO UNPAUSE', this.canvas.width * .2, this.canvas.height * .5);
    }

    unpause() {
        this.isPaused = false
        this.animate()

           
    }
    
    handleSubmit() {
        if (this.player && this.word.join(``) === `2814019473`) this.player.hp = Infinity
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