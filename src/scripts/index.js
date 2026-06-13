var App = App || {};

App.Game = function () {
  this.gameLoop = this.gameLoop.bind(this);
};

App.Game.prototype.init = function () {
  this.lastFrameTime;
  this.lastMoveTime;
  this.gameField = document.querySelector(".field");

  // field sizes ////
  this.widthTileQuantity = 40;
  this.heightTileQuantity = 24;

  // tiles values /////
  this.tileStates = tileStates || {};

  // tiles classes /////
  this.tileClasses = tileClasses || {};

  var dd = createField(
    this.gameField,
    this.tileClasses,
    this.widthTileQuantity,
    this.heightTileQuantity
  );

  // dom data /////
  this.domData = {
    tileClasses: this.tileClasses,
    widthTileQuantity: this.widthTileQuantity,
    heightTileQuantity: this.heightTileQuantity,
    tileArray: dd.tileArray,
    wallArray: dd.wallArray,
    baseArray: dd.baseArray,
    potions: dd.potionsGlobal,
    swords: dd.swordsGlobal,
    enemies: dd.enemiesGlobal,
    player: dd.playerGlobal,
  };

  var gd = buildGame(this.domData.tileArray, this.domData.tileClasses);

  // gameData /////
  this.gameData = {
    tileStates: this.tileStates,
    widthTileQuantity: this.widthTileQuantity,
    heightTileQuantity: this.heightTileQuantity,
    state: gd,
  };

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
  var now = performance.now();
  var fps = 60;
  var interval = 1000 / fps;

  if (!this.lastFrameTime) this.lastFrameTime = now;

  var delta = now - this.lastFrameTime;

  if (delta >= interval) {
    this.lastFrameTime = now - (delta % interval);
    this.update();
    this.render();
  }

  requestAnimationFrame(this.gameLoop);
};

App.Game.prototype.render = function () {
  clearGameField(this.domData.tileArray, this.domData.tileClasses);
  updateGameField(
    this.domData.tileArray,
    this.gameData.state,
    this.domData.tileClasses,
    this.gameData.tileStates
  );
};

App.Game.prototype.update = function () {
  var moveInterval = 300;
  if (!this.lastMoveTime) this.lastMoveTime = performance.now();

  var now = performance.now();
  if (now - this.lastMoveTime < moveInterval) {
    return;
  }
  this.lastMoveTime = now;

  // movement /////
  if (this.keys["w"]) {
    playerMovement("w", this.gameData);
  }
  if (this.keys["a"]) {
    playerMovement("a", this.gameData);
  }
  if (this.keys["s"]) {
    playerMovement("s", this.gameData);
  }
  if (this.keys["d"]) {
    playerMovement("d", this.gameData);
  }

  // enemy movement /////
  enemyMovement(this.gameData);
};
