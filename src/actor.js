// inspired by AP Commputer Science's GridWorld
// read up on interface mixins implements, class Location, class Grid
export default class Actor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  animate() {
    // 1. determine what image we want to animate.
    // 2. i feel like there should be a (move 1 step in time) method or should it just be animate
  }

  get location() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
