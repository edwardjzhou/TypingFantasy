
// bundle splitting = split your bundle up but still dl both for first time users
// code splitting = dont dl and load code you dont use
import Actor from './actor';

// import { chineseDictionary as dictionary2 } from './chineseexpansionpack'

class Enemy extends Actor {
    constructor(x, y, canvas, ctx, imp, difficulty, bluepaint, gameMode, squarereticle, dictionary) {
        super(x,y);
        this.canvas = canvas;
        this.ctx = ctx;
        this.alive = true;
        this.animate = this.animate.bind(this);
        this.animateDeath = this.animateDeath.bind(this);
        this.imp = imp;
        this.difficulty = difficulty;
        this.standStill = false;
        this.bluepaint = bluepaint;
        this.gameMode = gameMode;
        this.squarereticle = squarereticle;
        this.dictionary = dictionary

      

        this.word = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
 
        

    }

    static CreateEnemy() {
        // if I have time 
    }

    animateReticle(){
        this.ctx.drawImage(this.squarereticle, 0, 0, 400, 400, this.x-5, this.y-5, 55, 55)

    }

    animate(cronoX,cronoY){
        // will this monster move
        if (this.alive === true && this.standStill === false){
            let randomMove = Math.random()
            if(cronoX > this.x){
                if (randomMove < .70){
                    this.x += 1
                } else if(randomMove >= .70 && randomMove < .99){
                    this.x -= 1
                } else{
                    this.standStill = true
                    setTimeout(() => this.standStill = false , 3000)
                }
            } else if(cronoX < this.x) {
                if (randomMove < .70) {
                    this.x -= 1
                } else if (randomMove >= .70 && randomMove < .99) {
                    this.x += 1
                } else{
                    this.standStill = true
                    setTimeout(() => this.standStill = false, 3000)
                } 
            }
            if (cronoY > this.y) {
                if (randomMove < .70) {
                    this.y += 1
                } else if (randomMove >= .70 && randomMove < .99) {
                    this.y -= 1
                } else{
                    this.standStill = true
                    setTimeout(() => this.standStill = false, 3000)
                }
            } else if (cronoY < this.y) {
                if (randomMove < .70) {
                    this.y -= 1
                } else if (randomMove >= .70 && randomMove < .99) {
                    this.y += 1
                } else{
                    this.standStill = true
                    setTimeout(() => this.standStill = false, 3000)
                }
            } 
        }
        // if alive draw the word above it and the monster itself
        if (this.alive === true){
            this.ctx.drawImage(this.imp, 0, 0, 200, 300, this.x, this.y, 500, 500)
            this.ctx.fillStyle = "white";
            this.ctx.font = `bold 50px ChronoType`;
            this.ctx.fillText(this.word, this.x, this.y, 500, 500)
        } 
        // if dead draw a blue splat instead
        else if (this.alive === false){
            this.ctx.drawImage(this.bluepaint, 0, 0, 500, 500, this.x, this.y, 60, 60)
        }

    }

    animateDeath(){
        // if I have time I can animate the death
    }

    wander() {
        //if I have time I can do collision detection
    }

}

export default Enemy
