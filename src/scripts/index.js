class Game {
  constructor() {
    this.gameLoop = this.gameLoop.bind(this);
  }
  init() {
    this.date = Date.now();
    this.gameLoop();
  }
  gameLoop() {
    console.log(`rendering... ${Date.now() - this.date || Date.now()}`);
    requestAnimationFrame(this.gameLoop);
  }
}
