class Crono {
    constructor(x, y, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys, enemies) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = x
        this.y = y
        this.alive = true ;
        this.animate = this.animate.bind(this)
        this.animateDeath = this.animateDeath.bind(this)
        this.cronoleftimg = cronoleftimg
        this.cronorightimg= cronorightimg
        this.cronoupimg = cronoupimg
        this.cronodownimg = cronodownimg
        this.lastaction = this.cronodownimg
        this.cronothrust = cronothrust
        this.keys = keys
        this.enemies = enemies

        setInterval(this.checkCollision.bind(this), 1000)
    }

    checkCollision() {
        for (let enemy in this.enemies) {
            console.log(enemy)

        }
    }

    takeDamage() {
        
    }

    animateAttack(x, y) {
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
        this.ctx.drawImage(this.cronothrust, 0, 0, 500, 500, this.x, this.y + 50, 500, 500)
        this.lastaction = this.cronothrust
    }
    
    animate() {
        let up = this.keys[38]
        let down = this.keys[40]
        let left = this.keys[37]
        let right = this.keys[39]

        if (right){
            if (this.x < this.canvas.width - 30 && (!down && !up)) {
                this.x += 4
                this.ctx.drawImage(this.cronorightimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            } else if (this.x > 0 - 30 && (down || up)) {
                this.x += 2.8
            }
            this.lastaction = this.cronorightimg
        } 

        if (left) {
            if (this.x > 0 - 30 && (!down && !up)) {
                this.x -= 4
                this.ctx.drawImage(this.cronoleftimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
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
            this.ctx.drawImage(this.cronodownimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            this.lastaction = this.cronodownimg
        }

        if (up && !down) {
            if (this.y > 0 - 30 && (!left && !right)) {
                this.y -= 4
            } else if (this.y > 0 - 30 && (left || right)) {
                this.y -= 2.8
            }
            this.ctx.drawImage(this.cronoupimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
            this.lastaction = this.cronoupimg
        } 

        if ( !left && !up && !right && !right && !down ) {
            this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
        }
    }
    
       


    animateDeath() {
  

    }



}


export default Crono
