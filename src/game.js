class Game {
    constructor(difficulty) {
        this.word = []
        this.keys = new Set()
        this.difficulty = difficulty || 1
        this.enemies = []
    }

        document.body.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });

        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
            //console.log(keys)
        });
    
    pause () {

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y);        
    }

    keyPress (e) {
        let key = e.keyCode
        if (key >= 65 && key <= 90) {
            this.word.push(String.fromCharCode(e.keyCode))
        } 
        
        if (key === 32) this.pause()
        if (key === 8) this.word.pop();
        if (key === 13) {
            handleSubmit(word.join(''))
            this.word = [];
        }
    }
    
    handleSubmit(word) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].word === enteredWord && enemies[i].alive === true) {
                player.animateAttack(enemies[i].x, enemies[i].y - 50, cronothrust)
                enemies[i].alive = false;
                // enemies[i].animateDeath();
                destroyedCount++
            } else {
                console.log('failedenter')
            }
        }
    }

    animate () {

    }

}

export default Game

// const carTypes = new Map();
// class CarFactory {
//     static register(name, implementation) {
//         carTypes.set(name, implementation);
//         return CarFactory;
//     }
//     static make(name) {
//         const makeCar = carTypes.get(name);
//         return makeCar();
//     }

//     register(name, implementation) {
//         CarFactory.register(name, implementation);
//         return this;
//     }
//     make(name) { return CarFactory.make(name); }
// }

// export default CarFactory;


// // index.js
// import Car from "./classes/car";
// import Lexus from "./classes/lexus";

// import CarFactory from "./factories/car";

// CarFactory
//     .register("Lexus", () => new Lexus())
//     .register("Bentley", () => new Bentley());

// init(CarFactory);

// function init(Car) {
//     const lexus = Car.make("Lexus");
// }