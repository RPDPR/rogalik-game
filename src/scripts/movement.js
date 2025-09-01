function takePotion() {}
function takeSword() {}

function moveEntity(entityIndex, nextTileIndex, gameData) {
  var entityTile = gameData.state[entityIndex];
  var nextTile = gameData.state[nextTileIndex];

  if (
    nextTile === gameData.tileStates.wall ||
    nextTile === gameData.tileStates.enemy ||
    nextTile === gameData.tileStates.player
  ) {
    return entityIndex;
  }

  if (entityTile === gameData.tileStates.player) {
    if (nextTile === gameData.tileStates.potion) {
      gameData.state[nextTileIndex] = 6;
      gameData.state[entityIndex] = 1;
      takePotion();
      return nextTileIndex;
    }

    if (nextTile === gameData.tileStates.sword) {
      gameData.state[nextTileIndex] = 6;
      gameData.state[entityIndex] = 1;
      takeSword();
      return nextTileIndex;
    }

    if (
      nextTile === gameData.tileStates.tile ||
      nextTile === gameData.tileStates.base
    ) {
      gameData.state[nextTileIndex] = 6;
      gameData.state[entityIndex] = 1;
      return nextTileIndex;
    }
  }
  if (entityTile === gameData.tileStates.enemy) {
    if (nextTile === gameData.tileStates.potion) {
      gameData.state[nextTileIndex] = 5;
      gameData.state[entityIndex] = 1;
      return nextTileIndex;
    }

    if (nextTile === gameData.tileStates.sword) {
      gameData.state[nextTileIndex] = 5;
      gameData.state[entityIndex] = 1;
      return nextTileIndex;
    }

    if (
      nextTile === gameData.tileStates.tile ||
      nextTile === gameData.tileStates.base
    ) {
      gameData.state[nextTileIndex] = 5;
      gameData.state[entityIndex] = 1;
      return nextTileIndex;
    }
  }
  return entityIndex;
}

function playerMovement(pressedKey, gameData) {
  var WTQ = gameData.widthTileQuantity;
  var HTQ = gameData.heightTileQuantity;

  var player = findIndexOfElement(gameData.state, function (el) {
    return el === gameData.tileStates.player;
  });
  if (player === -1) return;

  var nextTile;

  if (pressedKey === "w")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "up");
  if (pressedKey === "a")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "left");
  if (pressedKey === "s")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "down");
  if (pressedKey === "d")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "right");

  var newPlayerTile = moveEntity(player, nextTile, gameData);
}

function enemyMovement(gameData) {
  var WTQ = gameData.widthTileQuantity;
  var HTQ = gameData.heightTileQuantity;

  var enemies = [];
  gameData.state.forEach(function (el, i) {
    if (el === gameData.tileStates.enemy) {
      enemies.push(i);
    }
  });
  console.log(enemies);
  if (enemies == null || enemies.length === 0) return;

  var directions = ["up", "down", "right", "left"];

  for (var i = 0; i < enemies.length; i++) {
    var newEnemyTile = enemies[i];
    var nextTile;

    while (newEnemyTile === enemies[i]) {
      var randomDirection =
        directions[Math.floor(Math.random() * directions.length)];

      nextTile = getNearestTile(
        gameData.state,
        WTQ,
        HTQ,
        enemies[i],
        randomDirection
      );
      newEnemyTile = moveEntity(enemies[i], nextTile, gameData);
    }
  }
}
