import Enemy from './enemy';
import Crono from './crono';
import Trie from './trie';
import UI from './ui'


// TBD 1. Add a monster Try data strcuture to highlight in red possible targets as a sort of demo of tries and like a targeting system to warn a user he
// messed up in typing a monsters word DONE
// 2. add chinese input into they key-area HALFDONE
// 3. add splat sounds for kicks TBD
// 4. finish collision detection and taking damage NOW glitchy
// 5. implement a high score table with a notepad file or firebase or something with express MIDWAY
// 6.animate the splash screen with words flying in / also maybe fade to black in the 0-2000 ms transition
// 7. add in upload your own words
// 8. draw the tracers for the reticle
// 9. add symbols to make hp immutable (almost) w const HP = Symbol()
// this[HP] = 100; Reflect.ownKeys() or Object.getOwnPropertySymbols() can detect
// 10. https://developers.redhat.com/blog/2017/01/17/data-encapsulation-vs-immutability-in-javascript/ make a factory for enemys? for like a boss rather than inheritanc
//BUGS TBD: 
// 1.  time needs to stop (timeElapsed ) when game is paused so wpm doesnt go to 0 and the next one enemy doesnt instaspawn after pause FIXED
// 2. need to fix settimeouts on collision/damage taking and animating it TBD

const EventEmitter = require('events'); // CAN this be done HERE?
/* 
ASAP: finish highscores inside gameover, finish up chinsee input and value changing 
*/

class Game {
    constructor() {
        this._getResources();
        this._ensureDefaultSettings();
        this._addListeners();
        this.animateSplash(); 



      

        //animate stops recursively calling itself then 0-2 secs later we start downloading the full chosen lang pack THEN -> gameloop()
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
                console.log(`ENG DICITONARY DLED`)

                this.dictionary = englishDictionary
                this.word = []
                this.gameLoop();
                return

            }).catch((err) => {
                alert(err)
            })
        } else if (this.gameMode === `chinese`) {
            import(/* webpackChunkName: "./dictionaryChinese", webpackPrefetch: true */ './dictionaryChinese').then(({ chineseDictionary }) => {
                console.log(`CN DICITONARY DLED`)

                this.dictionary = chineseDictionary
                this.word = []
                this.gameLoop();
                return

            }).catch((err) => {
                alert(err)
            })
        }
    }


    remakeGame (){
        //basiclaly rerun constuctor here i did it in gameover()
    }

    get hasGameStarted(){
        return !this.onSplash
    }

    get language(){
        return this.gameMode
    }

    set setHP (desiredHP){
        this.player.hp = desiredHP
    }

    ensureDefaultCTX () {
        this.ctx.lineWidth = 1
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.ctx.strokeWeight = null
    }


    animateSplash(timeElapsed = 0){
        console.log(`SPLASH ANIMATION`)
        // ,timeElapsed)
        // this.dynamicallyLoadLanguageModule()// SHOULD I PRE DOWNLOAD BASED OFF CURSOR CHOICE ON TTIMEELAPSED 0 && NOT DOWNLOADING?
        // DOWNLOAD PROGRSS BAR 
    //     req.on( 'response', function ( data ) {
    //     console.log(data.headers['content-length']);
    // } );
        
        this.ensureDefaultCTX()

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
        
        if (this.onSplash === true)
        requestAnimationFrame( (rafTimeElapsed) => {
             this.animateSplash(rafTimeElapsed);
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
        this.ensureDefaultCTX()

        const possibilities = this.trie.possibilities(this.word.join(``));

        // really shouldve used a enemies hash where enemies[`enemy.word`] = enemy object; a hash where the submitted word maps to the enemy object
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].animate(this.player.x, this.player.y); // move towards player
            if (possibilities.includes(this.enemies[i].word) && this.enemies[i].alive === true) this.enemies[i].animateReticle();
        }

    }

    drawChineseEnemies() {
        this.ensureDefaultCTX()

        const possibilities = this.trie.possibilities(this.word);

        // really shouldve used a enemies hash where enemies[`enemy.word`] = enemy object; a hash where the submitted word maps to the enemy object
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].animate(this.player.x, this.player.y); // move towards player
            if (possibilities.includes(this.enemies[i].word) && this.enemies[i].alive === true) this.enemies[i].animateReticle();
        }

    }
    drawChineseTypingArea() {
        this.ensureDefaultCTX()

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
        // this.ctx.fillText(this.word.join(''), 0, (this.canvas.height));
        //end user input word
        // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width



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
        //THIS IS THE HEART ANIMATION FOR HP; add credits 
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
        // console.log(`ANIMATE`,timeElapsed)
        if (this.isPaused || this.isGameover) return
        //still unsure as to best way to do this
        if (this.player.hp <= 0) {
            this.isGameover = true
            this.ctx.font = `bold 60px ChronoType`;
            this.ctx.fillStyle = "red";
            this.ctx.fillText('GAMEOVER', this.canvas.width * .4, this.canvas.height * .5);
            this.gameover()
            return
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

        //to deal with all at once input in chinese vs piecemeal in english 
        switch (this.language) {
            case (`chinese`): {
                this.drawChineseEnemies(this.enemies, this.player);
                this.drawChineseTypingArea(this.ctx, this.canvas, this.fontSize);
                break
            }
            case (`english`): {
                this.drawEnemies(this.enemies, this.player);
                this.drawTypingArea(this.ctx, this.canvas, this.fontSize);
                break
            }
        }
       
        this.drawWPM(this.ctx, this.canvas, this.fontSize);
        this.drawHeart(this.ctx);

        this.player.checkCollision()
        this.player.animate();

        if (this.isPaused) console.log(`pause hits animation`)
        
        if (!this.isPaused && !this.isGameOver)
        this.request = requestAnimationFrame( (rafTimeElapsed) => {
            {
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
        // this.moveHighScoreTable();

        this.trie = new Trie();
        this.enemies = [];
        this.player = new Crono(300, 300, this.canvas, this.ctx, this.cronoleftimg, this.cronorightimg, this.cronoupimg, this.cronodownimg, this.cronothrust, this.keys, this.enemies);
        UI.addCheats()
        this.animate();
        return
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
            // bad design i think i should have just made a chinese game or chinese fucns rather than if's in every key handling method
        } else if (this.gameMode ===`chinese`) {
                this.rate /= 1/4 // as the average idiom is like 4-8 cn chars and each char takes 2-4 leters for like 18 chars for one idiom submit
                this.chineseInput = document.createElement(`input`)
                this.chineseInput.setAttribute(`placeholder`,`饱经沧桑`)
                this.chineseInput.style.height = "0"
                this.chineseInput.style.width = "0"
                this.chineseInput.style.margin = "0"
                this.chineseInput.style.display = "none"

                this.chineseAdvisoryText = document.createTextNode("Type chinese here");
                // this.linebreak = document.createElement("br");
                
                this.chineseInput.style.position = `absolute`
                document.body.insertBefore(this.chineseInput, document.body.children[document.body.children.length-1])
                this.chineseInput.style.height = "40px"
                this.chineseInput.style.width = "180px"
                this.chineseInput.style.margin = "2px"

                // this.canvas.insertAdjacentElement(`afterend`, this.chineseInput);
                // this.chineseInput.insertAdjacentElement(`beforebegin`, this.linebreak);

                //function here is hoisted to the top of _addListeners to a point before this.chineseinput was born
                // hence ()=>{}ing it instead of doing function(){}
                const attachChineseInputToCanvasBottomLeft = (yetToAttach = true) => {
                    this.chineseInput.style.left = this.canvas.getBoundingClientRect().x + `px`
                    this.chineseInput.style.top = this.canvas.getBoundingClientRect().bottom - (this.fontSize ? this.fontSize : 40) + `px`
                    this.chineseInput.style.display = `block`
                    if (yetToAttach) window.addEventListener('resize', 
                    this.chineseListener = () => attachChineseInputToCanvasBottomLeft(false)) ;
                }
                attachChineseInputToCanvasBottomLeft()
                //to fix a glitch of it being slightly off-center;unsure of root cause
                setTimeout(()=> attachChineseInputToCanvasBottomLeft(false), 100) 

                

                this.keydownHandler = (e) => {
                    let key = e.keyCode //should be nubmer
                    this.keys[key] = true; //small range of keyboard keys means that this type of bucketing is acceptable
                    // the larger the range of values in a set hte more costly it is to use bucket sort (just confused myself)
                    // expense in meemory freom range and multiplying to get the right memory location from index ?

                    //object freeze enum
                    //prevent arrow keys from messsing with your viewport/scrolling 

                    preventDefaultViewportJiggling(e)
                    this.chineseInput.focus()

                    this.word = this.chineseInput.value
                    // if (key >= 65 && key <= 90) this.word.push(String.fromCharCode(key).toLowerCase())
                    // this.word = this.chineseInput.value
                    if (key === 32 && !this.isGameover) {
                        if (!this.isPaused) this.pause()
                        else if (this.isPaused) this.unpause()
                    }
                    // else if (key === 8) this.word.pop();
                    else if (key === 13) {
                        if (this.onSplash) {
                            this.onSplash = false
                        } else {
                            this.handleChineseSubmit()                            
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

    handleChineseSubmit() {
        this.word = this.chineseInput.value
        if (this.player && this.word === `edward`) this.player.hp = Infinity
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].word === this.word && this.enemies[i].alive === true) {
                this.player.animateAttack(this.enemies[i].x, this.enemies[i].y - 50, this.cronothrust)
                this.enemies[i].alive = false;
                socket.emit('word typed', this.word);

                this.destroyedCount >= 1 ? this.destroyedCount++ : this.destroyedCount = 1
            }
        }
        this.chineseInput.value = ""
    }
    

    // chinese exception to remove the 1. the input box 2. the event listener on that box
    _detachListeners(){
        if (this.chineseInput) {
            window.removeEventListener('resize', this.chineseListener); //REMOVE LISTENER BEFORE REMOVING THE HTTP ELEMENT
            this.chineseInput.remove()
        }



        document.body.removeEventListener("keydown", this.keydownHandler, true)
        document.body.removeEventListener("keyup", this.keyupHandler, true)
        this.keys = []
        this.word = []
    }

    //         console.log(time) went from time=10420 to 13420
    // REMEMBER THAT OLD STUFF THAT WAS ON SCREEN REMAINS ON SCREEN EVEN AFTER ITS NO LONGER BEING CALLED
    animateGameover(time, timeToPass = 3, previousElapsed) {
        this.ctx.font = `bold 100px`
        // console.log(time)
        if (!this.initialAnimateGameoverTime) this.initialAnimateGameoverTime = time

        const elapsed = timeToPass - ~~((time - this.initialAnimateGameoverTime)/1000)
        // console.log(previousElapsed , elapsed )
        this.ctx.fillText('GAMEOVER!', this.canvas.width * .4, this.canvas.height * .5);
        if (previousElapsed !== elapsed) {
            // if (elapsed === timeToPass)
            // this.ctx.fillText(`Restart in ${elapsed}`, this.canvas.width * .4, this.canvas.height * .8 - this.fontSize * elapsed)
            // else {
            this.ctx.fillText(`${elapsed}`, this.canvas.width * .5, this.canvas.height * .9 - this.fontSize * elapsed)
            // }
        }
        console.log((this.initialAnimateGameoverTime)) // the last time this fires is AFTEr the game has been delteed in settimeout
        this.ctx.font = `bold 60px ChronoType`;
        this.ctx.fillStyle = "red";
        // const displayedFlooredTime = ~~(time - this.initialAnimateGameoverTime)
        
        
        if (this.onGameover === true)
        requestAnimationFrame( (timeElapsed) => {
            this.animateGameover(timeElapsed, timeToPass, elapsed);
        })
        
    }

    async createHighscoreDialogBox() {
        const username = prompt(`NEW HIGH SCORE! Please enter your moniker!
                                You destroyed ${this.destroyedCount || 0} monsters!`, "Name");
        const newScores = await fetch('./highscore', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([ this.destroyedCount || 0, username || `unnamed`])
                }).then(res => {
                    // console.log(`third`)
                    return res.json()
                })
        UI.deleteScores()
        UI.createScoreTable(newScores)

        // console.log(`fourth`)

    }

     async gameover() {
        this.onGameover = true
        this._detachListeners()

        await fetch('./newhighscore', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([ this.destroyedCount || 0, 'irrelevant!' ])
        }).then(response => response.json() ).then( warrantsNewHighScore => {
            if (warrantsNewHighScore === true) {
                this.createHighscoreDialogBox()
                // console.log(` as soon as prompt finishes we are first`)
            }
        })     

        //  console.log(`second`)

        cancelAnimationFrame(this.request) //game animation is done for no matter what + returned 

        setTimeout( ()=> {
            this.onGameover = false
            // this.canvas.remove()
            // let current = window.game
            // current = {}
            // console.log(window.game)
            // console.log(this)
            // console.log(`removed old canv`)
            // document.body.insertBefore(this.canvas, document.querySelector(`#instructions`) )
            // console.log(`inserted new canv`)
            // delete this 
            UI.destroyerOfObjects()
            // console.log(`insetTIMEOUT`)
            
            window.game = new Game() // no more refs to old game so it hsould be garbage colelcted?
            // its not ill figure htis out later its complicated

        },3000)
        
        this.animateGameover()


  
    }
//     pause hits pasue func
//     game.js: 652 isPaused in pause() is set
// game.js: 658 drawn pause text
// game.js: 315 ANIMATE 35254.477
// game.js: 362 pause hits animation
    pause() {
        // console.log(`pause hits pasue func`)
        this.isPaused = true 
        // console.log(`isPaused in pause() is set`)

        this.drawWPM() // to ensure we get that one snapshot of PAUSE TIME so that drawWPM isnt messed up by pause
        this.ctx.font = `bold 50px ChronoType`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText('PRESS SPACEBAR TO UNPAUSE', this.canvas.width * .2, this.canvas.height * .5);
        // console.log(`drawn pause text`)
    }

    unpause() {
        this.isPaused = false
        this.animate()
    }
    
    handleSubmit() {
        if (this.player && this.word.join(``) === `edward`) this.player.hp = Infinity
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].word === this.word.join(``) && this.enemies[i].alive === true) {
                this.player.animateAttack(this.enemies[i].x, this.enemies[i].y - 50, this.cronothrust)
                
                // const event = new EventEmitter();
                console.log(socket)
                // console.log(socket)
                socket.emit('word typed', this.word.join(``));

                this.enemies[i].alive = false;
                this.destroyedCount >= 1 ? this.destroyedCount++ : this.destroyedCount = 1
            }
        }
    }

  
}

export default Game