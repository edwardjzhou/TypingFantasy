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

import Game from "./game";
import UI from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  // UI.__proto__ is native code
  // UI.prototype.constructor === UI === {staticmethod: func(){}, prototype: {instance methods here} }
  // UI.prototype = {constructor: UI, normalmethod: func(){} }
  // cannot assign to this
  // THe problem: A static method calls this.instanceMethod(). The this is UI.prototype.constructor NOT UI.prototype
  // Fix: if (!this.hasOwnproperty(`constructor`)) \

  // classes always have a syntactic box around them i guess and are run in strict mode so they dont have access to qs
  // GENERAL RULE IS THE CALLER OF A FUNCTION IS THE THIS INSIDE THE FUNCTION
  // CALLING A METHOD WITHOUT AN OBJECT: Class.prototype.normalMethod
  // (THIS in normalMethod is going to be Class.prototype, the caller, normally it would the object)
  // CALLING A STATIC METHOD WITH AN OBJECT: obj.__proto__.constructor.staticMETHOD
  // Class.prototype.constructor.static methods here
  // UI.prototype.constructor ==  UI
  // window.UI = UI
  UI.styleTooltip(); //onetime
  UI.handleClipboard(); //onetime
  UI.fetchScores();
  UI.attachChatToCanvasLeft()

  window.game = new Game(); // window for testing

  // Notification.requestPermission()
  // setTimeout( () => {
  //     if (Notification.permission === "granted") new Notification("You've played for 5 minutes!")
  // }, 300000)
});

// from https://orteil.dashnet.org/cookieclicker/
// var PlaySound = function (url, vol, pitchVar) {
//     //url : the url of the sound to play (will be cached so it only loads once)
//     //vol : volume between 0 and 1 (multiplied by game volume setting); defaults to 1 (full volume)
//     //(DISABLED) pitchVar : pitch variance in browsers that support it (Firefox only at the moment); defaults to 0.05 (which means pitch can be up to -5% or +5% anytime the sound plays)
//     var volume = 1;
//     var pitchVar = (typeof pitchVar === 'undefined') ? 0.05 : pitchVar;
//     var rate = 1 + (Math.random() * 2 - 1) * pitchVar;
//     if (typeof vol !== 'undefined') volume = vol;
//     if (!Game.volume || volume == 0) return 0;
//     if (!Sounds[url]) {
//         //sound isn't loaded, cache it
//         Sounds[url] = new Audio(url);
//         Sounds[url].onloadeddata = function (e) { PlaySound(url, vol, pitchVar); }
//     }
//     else if (Sounds[url].readyState >= 2) {
//         var sound = SoundInsts[SoundI];
//         SoundI++;
//         if (SoundI >= 12) SoundI = 0;
//         sound.src = Sounds[url].src;
//         //sound.currentTime=0;
//         sound.volume = Math.pow(volume * Game.volume / 100, 2);
//         if (pitchSupport && rate != 0) {
//             sound.preservesPitch = false;
//             sound.mozPreservesPitch = false;
//             sound.webkitPreservesPitch = false;
//             sound.playbackRate = rate;
//         }
//         sound.play();
//     }
// }
