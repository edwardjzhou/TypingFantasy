class Crono{
    constructor(x, y, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys){
        this.canvas = canvas
        this.ctx = ctx
        this.x = x
        this.y = y
        this.alive = true ;
        this.animate = this.animate.bind(this)
        this.animateDeath = this.animateDeath.bind(this)
        this.moveRight = this.moveRight.bind(this)
        this.cronoleftimg = cronoleftimg
        this.cronorightimg= cronorightimg
        this.cronoupimg = cronoupimg
        this.cronodownimg = cronodownimg
        this.lastaction = this.cronodownimg
        this.cronothrust = cronothrust

        this.keys = keys
        // this.cronoImg.src = 'src/cronobattleleft.gif'; 
       
        // this.cronoImg.src = 'src/cronobattleleft.gif'; // Set source path
    }

    animateAttack(x,y){
        this.x = x
        this.y = y
        this.ctx.drawImage(this.cronothrust, 0, 0, 500, 500, this.x, this.y + 50, 500, 500)
        this.lastaction = this.cronothrust
    }
    
    animate(){
            if (this.keys[39]=== true){
               this.moveRight()
               this.lastaction = this.cronorightimg
            }
            if (this.keys[40] === true) {
                this.moveDown()
                this.lastaction = this.cronodownimg
            }
            if (this.keys[37] === true) {
                this.moveLeft()
                this.lastaction =this.cronoleftimg
            }
            if (this.keys[38] === true) {
                this.moveUp()
                this.lastaction = this.cronoupimg
            } else if ( (this.keys[37] === false || this.keys[37] ===undefined)
            && (this.keys[38] === false || this.keys[38] === undefined)
            && (this.keys[39] === false || this.keys[39] ===undefined)
            && (this.keys[40] === false || this.keys[40] ===undefined)){
                this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
            }  else{
                this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
            }
        }
    
             //     // let canvas = document.getElementById('canvas');
    //     // let ctx = canvas.getContext('2d');
            
    //     this.cronoImg.addEventListener('onload', function () {
    //         this.ctx.drawImage(this.cronoImg, 0, 0, 62, 62, 300, 300, 62, 62)
    //     }, false);
    //     this.cronoImg.src = 'src/cronobattleleft.gif'; // Set source path
    //     //    this.ctx.drawImage(this.cronoImg, 0, 0, 62, 62, 300, 300, 62, 62)
       
    moveDown(){
        if (this.y < this.canvas.height - 30 && (this.keys[37] || this.keys[39])=== false) {
            this.y += 4
        } else if (this.y < this.canvas.height - 30 && (this.keys[37] || this.keys[39]) === true){
            this.y += 2.8
        }
        this.ctx.drawImage(this.cronodownimg, 0, 0, 500, 500, this.x, this.y, 500, 500)

    }

    moveUp(){
        if (this.y > 0 - 30 && (this.keys[37] || this.keys[39]) === false) {
            this.y -= 4
        } else if (this.y > 0 - 30 && (this.keys[37] || this.keys[39]) === true) {
            this.y -= 2.8
        }
        this.ctx.drawImage(this.cronoupimg, 0, 0, 500, 500, this.x, this.y, 500, 500)

    }
    
    moveLeft(){
        if (this.x > 0 - 30 && (this.keys[40] || this.keys[38] )=== false) {
            this.x -= 4
            this.ctx.drawImage(this.cronoleftimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
        } else if (this.x > 0 - 30 && (this.keys[40] || this.keys[38]) === true){
            this.x -= 2.8
        }

    }

    moveRight(){
        if (this.x < this.canvas.width - 30 && (this.keys[40] || this.keys[38] )=== false){
            this.x += 4
            this.ctx.drawImage(this.cronorightimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
        } else if(this.x > 0 - 30 && (this.keys[40] || this.keys[38]) === true) {
            this.x += 2.8
        }

    }

    animateDeath() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

    }



}


export default Crono
