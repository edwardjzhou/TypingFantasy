// utf-8 all ascii chars is 1byte at most
// all other chars in utf=8 require 2 bytes

// 1. useeffect and asnyc await funcs 
// 2. rewrite fetchALL and then fetch single things
// 3. put in a progress bar with suspense react on bonethrow


// int x = 5
// int* a = malloc( 5*sizeof(int)) malloc returns a ptr to a 8byte address (void *)
// so is a is a pointer (*a is nothing its just symbol for pointer, write it int* var next time)
//cs50 on dnyamic allocation finlaly understnad it kidna
//int m
// int* a => pointer in stack called "a", that pts to an integer; NOT an integer itself
// int* b = malloc(sizeof(int))   => b is a pointer to unnamed malloced address on the heap
// a = &m => a gets m's address; a points to m, does the fact that i was made a int* a pointer matter? dunno
// a = b => a and b point to the same addy 
// m = 10 puts "10" in m's box
// *b = m+2 => dereference b and put a value in there
// free(b) => the pointer b is freed
// *a = 11 => pointer b was same as a so theres segmentation fault

// int* pa, *pb or int *pa, *pb
//float stack_array[5]
// vs float* heap_array = malloc(5*sizeof(float))
// runtime vs compiletime will be same in practice if theres nothing stateful about at the runtime
// like user input or other varying things like time or i dont know whos gonna run wat 
// so dynamic allocation is for when its not known at compiletime what will happen exactly 
//pass by value unless you 
// string is a char* ptr to
// 64 bit addresses in 64bit machines are gonna be 8 bytes, 4 bytes on 32bit

// #include < stdio.h >

//     int main()
// {
//     char array[4];
//     for (int i = 0; i < 4; i++) {
//         array[i] = "a";
//     }
//     int x = * array;
//     printf("%x", x);
//     // char asdf[5]; //really a char * called asdf
//     // scanf("%s", asdf);
//     // printf("%s", asdf);
//     // int x;
//     // printf("x: "); 
//     // scanf("%i",&x);
//     // printf("x: %i\n",x);

//     // int x = sizeof(char);
//     // printf("%i",x);

//     // int x = 1;
//     // char *y = &x;
//     // printf("%s", y);
//     // *y = 5;
//     // printf("%i",x);

//     // int a = 1;
//     // int b = 2;
//     // printf("Hello World %i, %i ", a,b );
//     // swap(&a, &b);
//     // printf("Hello World %i, %i ", a,b );


//     return 0;
// }

// void swap(int * pa, int * pb) {
//     int tmp = * pa; 
//     * pa = * pb;
//     * pb = tmp;
// }

// 0xff you can use hex directly in javascipt

// iF EXISTS(SELECT TOP 1 1 FROM ...WHERE. 

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

        this.collisionIntervalChecker = setInterval(this.checkCollision.bind(this), 1000)

        this.asdf = document.getElementById('sprites') 

        this.takingDamage = false
    }

    poll() {
        //animate whatever is polled in terms of importance
        // taking damage > moving > passive action ? 
        
    }

    checkCollision() {
        for (let enemy in this.enemies) {
            // console.log(enemy)
            if ( (enemy.x - this.x)^2 + (enemy.y - this.y)^2  < 10) {
             this.takeDamage()
             console.log('asdf')

            }
        }
    }

    takeDamage() {
        console.log(42354235)
        this.takingDamage = true
        // let asdf = document.getElementById('sprites') 
        // this.ctx.drawImage(asdf, 80, 250, 30, 60, this.x, this.y + 50, 500, 500)
        // this.ctx.drawImage(asdf, 0, 0, 30, 60, this.x, this.y + 50, 50, 50)

        // this.lastaction = document.getElementById('sprites') 
        // this.ctx.drawImage(this.lastaction, 80, 250, 30, 60, this.x, this.y + 50, 500, 500)
    /* top is 250 */
    /* bot is 310 */
    /* 80 110 */
        //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

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
        if (this.takingDamage = true) {
            this.ctx.drawImage(this.asdf, 0, 0, 500, 500, this.x, this.y, 500, 500)

        }


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

        if ( !left && !up && !right && !right && !down && !this.takingDamage ) {
            this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
        }
    }
    
       


    animateDeath() {
  

    }



}


export default Crono
