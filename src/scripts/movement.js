function takePotion() {}
function takeSword() {}

function moveEntity(entityIndex, nextTileIndex, gameData) {
  var nextTile = gameData.state[nextTileIndex];

  if (
    nextTile === gameData.tileStates.wall ||
    nextTile === gameData.tileStates.enemy
  ) {
    return entityIndex;
  }

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

  return entityIndex;
}

function playerMovement(pressedKey, gameData) {
  var WTQ = gameData.widthTileQuantity;
  var HTQ = gameData.heightTileQuantity;

  var player = findIndexOfElement(gameData.state, function (el) {
    return el === gameData.tileStates.player;
  });
  if (player === -1) return;

  var nextTile = player;

  if (pressedKey === "w")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "up");
  if (pressedKey === "a")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "left");
  if (pressedKey === "s")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "down");
  if (pressedKey === "d")
    nextTile = getNearestTile(gameData.state, WTQ, HTQ, player, "right");

  var newPlayerIndex = moveEntity(player, nextTile, gameData);
}
