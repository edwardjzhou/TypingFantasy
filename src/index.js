// asap:1. walking animaton based on EITHER instance variable keeping track of past actions
// OR just count requestanimationframe frames IDK
// 2. collisions and damage on chrono
// 3. bloody pool for death animation for both crono and monsters
// 4. functions with instance variables to track last lifetime of animation like the jumping tracers? or just a settimeout

// FUTURE:
// 3. animate attack from crono-- should he just teleport everywhere and use x-attack? OR HUGE ARC with MATH that he flies through SOMEWHAT SOLVED
// 5. make it feel more alive with actual edges that crono and monsters cant spawn/cross
// 7. animate random movement, walking, and standing so it doesnt look like crono is skating
// 8. options/welcome screen/ choosing difficulty such as spawn rate
// 9. animate monster death

import Game from "./game";
import UI from "./ui";

document.addEventListener("DOMContentLoaded", () => {
 
  UI.styleTooltip(); //onetime
  UI.handleClipboard(); //onetime
  UI.fetchScores();
  UI.attachChatToCanvasLeft();

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
