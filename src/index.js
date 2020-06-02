

// asap:1. walking animaton based on EITHER instance variable keeping track of past actions
// OR just count requestanimationframe frames IDK
// 2. collisions and damage on chrono
// 3. bloody pool for death animation for both crono and monsters
// 4. functions with instance variables to track last lifetime of animation like the jumping tracers? or just a settimeout

// FUTURE:
// 1. show WPM somewhere need to keep track of time elapsed DONE
// 2. gameover reset the game 
// 3. animate attack from crono-- should he just teleport everywhere and use x-attack? OR HUGE ARC with MATH that he flies through SOMEWHAT SOLVED
// 4. how does crono lose? do monsters need to attack him he needs hp or soemthing or if more than 5monsters are alive at once he loses
// 5. make it feel more alive with actual edges that crono and monsters cant spawn/cross
// 6. monsters move randomly left and right to and fro, also spawn preferentially away from existing monsters??
// 7. animate random movement, walking, and standing so it doesnt look like crono is skating
// 8. options/welcome screen/ choosing difficulty such as spawn rate
// 9. animate monster death
// 10. glitch: moving down+left double animates  SOLVED
// 11. maybe huge melee limit break swing but will take a lot of either async/instance variables tracking/animationframes counting
//https://github.com/blindman67/GIFGroover
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
//https://retrogamezone.co.uk/chronotrigger.htm
//http://www.videogamesprites.net/ChronoTrigger/Party/Crono/

//https://ezgif.com/gif-to-sprite CONVERT walking gif into a spritesheet
//refactor steps
// 1. copy paste everything outside of a class now into CLASS GAME
// 2. append a this. to everything
// 3. make everything in game.animate() loop only take 1 look at each of word, wpm, time, crono, and enemies
// 4. animate the most latest or more prioritized animation does 

//distinction between 1. UI events like keypress 2.static resources like crono images and the canvas
// 3. game running animation loop and setting gameover or pause 4 mvoers split into crono and enemies
// is it worth creating a UI class? or does it just amke things harder to code and understnad. I cant tell until i do it both ways
// this is an experiment, then. gut instinct tells me a simple small game like this doesnt warrant so many component classes

import Game from './game';


document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game() // window for testing
    

    // Notification.requestPermission()
    // setTimeout(()=> { 
    //     if(Notification.permission === "granted") new Notification("You've played for 5 minutes!")
    // }, 300000)

})

