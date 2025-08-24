function isEntityPlayer(entity) {
  return App.Game.domData.player == entity;
}

function buildGame(tileArray, tileClasses) {
  var gd = [];

  for (var i = 0; i < tileArray.length; i++) {
    var tile = tileArray[i];

    if (tile.classList.contains(tileClasses.player)) {
      gd.push(6);
      continue;
    }
    if (tile.classList.contains(tileClasses.enemy)) {
      gd.push(5);
      continue;
    }
    if (tile.classList.contains(tileClasses.sword)) {
      gd.push(4);
      continue;
    }
    if (tile.classList.contains(tileClasses.potion)) {
      gd.push(3);
      continue;
    }
    if (tile.classList.contains(tileClasses.wall)) {
      gd.push(2);
      continue;
    }
    if (tile.classList.contains(tileClasses.base)) {
      gd.push(1);
      continue;
    }
    if (tile.classList.contains(tileClasses.tile)) {
      gd.push(0);
      continue;
    }
  }
  return gd;
}

function clearGameField(tileArray, tileClasses) {
  for (var i = 0; i < tileArray.length; i++) {
    var tile = tileArray[i];

    if (tile.classList.contains(tileClasses.player)) {
      tile.classList.remove(tileClasses.player);
    }
    if (tile.classList.contains(tileClasses.enemy)) {
      tile.classList.remove(tileClasses.enemy);
    }
    if (tile.classList.contains(tileClasses.sword)) {
      tile.classList.remove(tileClasses.sword);
    }
    if (tile.classList.contains(tileClasses.potion)) {
      tile.classList.remove(tileClasses.potion);
    }
    if (tile.classList.contains(tileClasses.wall)) {
      tile.classList.remove(tileClasses.wall);
    }
  }
  return tileArray;
}

function updateGameField(tileArray, state, tileClasses, tileStates) {
  for (var i = 0; i < state.length; i++) {
    var tile = tileArray[i];
    var tileState = state[i];

    if (tileState == tileStates.player) {
      tile.classList.add(tileClasses.player);
      continue;
    }
    if (tileState == tileStates.enemy) {
      tile.classList.add(tileClasses.enemy);
      continue;
    }
    if (tileState == tileStates.sword) {
      tile.classList.add(tileClasses.sword);
      continue;
    }
    if (tileState == tileStates.potion) {
      tile.classList.add(tileClasses.potion);
      continue;
    }
    if (tileState == tileStates.wall) {
      tile.classList.add(tileClasses.wall);
      continue;
    }
    if (tileState == tileStates.base) {
      tile.classList.add(tileClasses.base);
      continue;
    }
    if (tileState == tileStates.tile) {
      tile.classList.add(tileClasses.tile);
      continue;
    }
  }
  return tileArray;
}
