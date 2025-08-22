var App = App || {};

App.Game = function () {
  this.gameLoop = this.gameLoop.bind(this);
};

App.Game.prototype.init = function () {
  this.date = Date.now();
  this.gameField = document.querySelector(".field");

  createField(this.gameField);
  this.gameLoop();
};

App.Game.prototype.gameLoop = function () {
  // console.log(`rendering... ${Date.now() - this.date || Date.now()}`);
  this.update();
  requestAnimationFrame(this.gameLoop);
};

App.Game.prototype.update = function () {};
