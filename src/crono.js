class Crono{
    constructor(x, y, difficulty){

        this.alive = true ;
        this.animateDeath = this.animateDeath.bind(this)
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
    }

    animateDeath() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        // ctx.fillStyle = "purple";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        var bg = new Image();
        bg.onload = function () {

            // At this point, the image is fully loaded
            // So do your thing!

        };

        bg.src = 'src/ChronoTrigger1000GuardiaForestBG.png'; // Set source path
        // ctx.drawImage(bg, 500, 500, 256, 224, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(bg,90,90, 200,200)

    }



}


export default Crono
