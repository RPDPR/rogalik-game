var App = App || {};

App.Game = function () {
  this.gameLoop = this.gameLoop.bind(this);
};

App.Game.prototype.init = function () {
  this.lastFrameTime;
  this.gameField = document.querySelector(".field");

  var res = createField(this.gameField);

  this.tileArray = res.tileArray;
  this.wallTileArray = res.wallTileArray;
  this.baseTileArray = res.baseTileArray;
  this.potions = res.potionsGlobal;
  this.swords = res.swordsGlobal;
  this.enemies = res.enemiesGlobal;
  this.player = res.playerGlobal;

  // user pressed keys state /////
  this.keys = [];

  document.addEventListener("keydown", (e) => {
    this.keys[e.key.toLowerCase()] = true;
  });

  document.addEventListener("keyup", (e) => {
    this.keys[e.key.toLowerCase()] = false;
  });

  this.gameLoop();
};

App.Game.prototype.gameLoop = function () {
  const now = performance.now();
  const fps = 5;
  const interval = 1000 / fps;

  if (!this.lastFrameTime) this.lastFrameTime = now;

  const delta = now - this.lastFrameTime;

  if (delta >= interval) {
    this.lastFrameTime = now - (delta % interval);
    this.update();
    this.render();
  }

  requestAnimationFrame(this.gameLoop);
};

App.Game.prototype.render = function () {};

App.Game.prototype.update = function () {
  // movement /////
  if (this.keys["w"]) {
    playerMovement("w");
  }
  if (this.keys["a"]) {
    playerMovement("a");
  }
  if (this.keys["s"]) {
    playerMovement("s");
  }
  if (this.keys["d"]) {
    playerMovement("d");
  }
};
