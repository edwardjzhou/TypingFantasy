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