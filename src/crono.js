import Actor from './actor';

class Crono extends Actor{
    constructor(x, y, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys, enemies) {
        super(x,y)
        this.canvas = canvas
        this.ctx = ctx
        this.alive = true ;
        this.animate = this.animate
        this.animateDeath = this.animateDeath.bind(this)
        this.cronoleftimg = cronoleftimg
        this.cronorightimg= cronorightimg
        this.cronoupimg = cronoupimg
        this.cronodownimg = cronodownimg
        this.lastaction = this.cronodownimg
        this.cronothrust = cronothrust
        this.keys = keys
        this.enemies = enemies
        this.hp = 100


        this.sprites = document.getElementById('sprites') 
        this.takingDamage = false
        this.animateGrimace = false
    }

    poll() {
    }
    
    // checkcollision is called every animate() in GAME CLASS
    checkCollision() { // can use leetcodes overlapping rectangles to detect. want to add a get method for this.x,this.y and this.x + canvaswidthtakenupbycrono, etc.
        for (const enemy of this.enemies) {
            if (enemy.alive === false) continue

            if ( ( (enemy.x - this.x)**2 + (enemy.y - this.y)**2 )**.5  < 20) {
                this.takeDamage()
            //  console.log('collision with enemy detected')

            }
        }
    }

    takeDamage() {
        if (this.takingDamage === false) {
            this.hp-- 
            this.takingDamage = true
            this.animateGrimace = true
            setTimeout( () => {
                this.takingDamage = false
            }, 5000)
        } else if (this.takingDamage = true && this.animateGrimace===true) {
            this.ctx.drawImage(this.sprites, 80, 80, 30, 30, this.x, this.y, 50, 50)            
            setTimeout(()=>this.animateGrimace = false,500)
        }
   

    }

    animateAttack(x, y, attackPicture) {
        let leftsY
        let leftsX
        // x bigger the more right, y bigger the lower, arclength, 1
        // this.y is where crono is y is where enemy is at the start
        this.circleCenterY = (this.y + y )/ 2
        this.circleCenterX = (this.x + x )/ 2
        this.diameter = Math.pow(Math.pow((this.x-x),2) + Math.pow((this.y-y),2), 0.5)
        // which unit is on the LEFT?
        if (this.x < x){
            leftsY = this.y
            leftsX = this.x
        } else {
            leftsY = y
            leftsX = x
        }
        this.angleStartClockwise = -Math.atan( (leftsY - this.circleCenterY) / (this.circleCenterX - leftsX)) + Math.PI
        this.angleEndClockwise = Math.PI + this.angleStartClockwise

        this.x = x
        this.y = y
        
        this.ctx.drawImage(attackPicture, 0, 0, 500, 500, this.x, this.y + 50, 500, 500)
        
        this.lastaction = attackPicture
    }
    
    // animate unfortuantely controls movement so i wnet with if(!this.animateGrimace)
    animate() {
       
        let up = this.keys[38]
        let down = this.keys[40]
        let left = this.keys[37]
        let right = this.keys[39]

        if (right){
            if (this.x < this.canvas.width - 30 && (!down && !up)) {
                this.x += 4
                if(!this.animateGrimace) this.ctx.drawImage(this.cronorightimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            } else if (this.x > 0 - 30 && (down || up)) {
                this.x += 2.8
            }
            this.lastaction = this.cronorightimg
        } 

        if (left) {
            if (this.x > 0 - 30 && (!down && !up)) {
                this.x -= 4
                if (!this.animateGrimace)this.ctx.drawImage(this.cronoleftimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            } else if (this.x > 0 - 30 && (down || up)) {
                this.x -= 2.8
            }
            this.lastaction = this.cronoleftimg
        }

        // down and up will overpower left and right as a lastaction
        if (down) {
            if (this.y < this.canvas.height - 30 && (!left && !right)) {
                this.y += 4
            } else if (this.y < this.canvas.height - 30 && (left || right)) {
                this.y += 2.8
            }
            if (!this.animateGrimace)this.ctx.drawImage(this.cronodownimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            this.lastaction = this.cronodownimg
        }

        if (up && !down) {
            if (this.y > 0 - 30 && (!left && !right)) {
                this.y -= 4
            } else if (this.y > 0 - 30 && (left || right)) {
                this.y -= 2.8
            }
            if (!this.animateGrimace)this.ctx.drawImage(this.cronoupimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            this.lastaction = this.cronoupimg
        } 

        if ( !left && !up && !right && !right && !down && !this.takingDamage ) {
            if (!this.animateGrimace) this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
        }

        // if (this.takingDamage) {
        //     this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
        // }
    }
    
    animateDeath() {
        // if I have time
    }



}


export default Crono
