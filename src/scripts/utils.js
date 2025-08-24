function findIndexOfElement(arr, predicate) {
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

function iterateByWidth(tileArray, WTQ, HTQ, callback) {
  for (var i = 0, h = 1, w = 1; i < tileArray.length; i++, w++) {
    if (i % WTQ === 0 && i !== 0) {
      h++;
      w = 1;
    }
    callback(tileArray[i], i, w, h);
  }
}

function iterateByHeight(tileArray, WTQ, HTQ, callback) {
  for (var w = 1; w <= WTQ; w++) {
    for (var h = 1; h <= HTQ; h++) {
      var i = (h - 1) * WTQ + (w - 1);
      callback(tileArray[i], i, w, h);
    }
  }
}

function getEdgeTilesInDom(tileArray, WTQ, HTQ) {
  var edges = [];

  for (var w = 0; w < WTQ; w++) {
    edges.push(tileArray[w]);
  }

  for (var h = 1; h < HTQ - 1; h++) {
    edges.push(tileArray[h * WTQ + (WTQ - 1)]);
  }

  for (var w = WTQ * (HTQ - 1); w < WTQ * HTQ; w++) {
    edges.push(tileArray[w]);
  }

  for (var h = HTQ - 2; h > 0; h--) {
    edges.push(tileArray[h * WTQ]);
  }

  return edges;
}

function getEdgeTiles(WTQ, HTQ) {
  var edges = [];

  for (var w = 0; w < WTQ; w++) {
    edges.push(w);
  }

  for (var h = 1; h < HTQ - 1; h++) {
    edges.push(h * WTQ + (WTQ - 1));
  }

  for (var w = WTQ * (HTQ - 1); w < WTQ * HTQ; w++) {
    edges.push(w);
  }

  for (var h = HTQ - 2; h > 0; h--) {
    edges.push(h * WTQ);
  }

  return edges;
}

function getNearestTile(stateArray, WTQ, HTQ, entityIndex, direction) {
  var nearestTileIndex;
  var edgeTileIndices = getEdgeTiles(WTQ, HTQ);

  var isEntityEdge = edgeTileIndices.indexOf(entityIndex) !== -1;

  switch (direction) {
    case "up":
      if (entityIndex < WTQ) return undefined;
      nearestTileIndex = entityIndex - WTQ;
      break;
    case "down":
      if (entityIndex >= stateArray.length - WTQ) return undefined;
      nearestTileIndex = entityIndex + WTQ;
      break;
    case "right":
      if ((entityIndex + 1) % WTQ === 0) return undefined;
      nearestTileIndex = entityIndex + 1;
      break;
    case "left":
      if (entityIndex % WTQ === 0) return undefined;
      nearestTileIndex = entityIndex - 1;
      break;
  }

  return nearestTileIndex;
}

// function getNearestTile(tileArray, WTQ, HTQ, entity, direction) {
//   var nearestTile;
//   var entityIndex = findIndexOfElement(tileArray, function (el) {
//     return el == entity;
//   });
//   var edgeTilesArray = getEdgeTiles(tileArray, WTQ, HTQ);
//   var isEntityAnEdgeTile = edgeTilesArray.indexOf(entity) != -1;

//   switch (direction) {
//     case "up":
//       if (isEntityAnEdgeTile && tileArray[entityIndex - WTQ] == -1) {
//         return undefined;
//       }
//       nearestTile = tileArray[entityIndex - WTQ];
//       break;
//     case "down":
//       if (isEntityAnEdgeTile && tileArray[entityIndex + WTQ] == -1) {
//         return undefined;
//       }
//       nearestTile = tileArray[entityIndex + WTQ];
//       break;
//     case "right":
//       if ((entityIndex + 1) % WTQ == 0) {
//         return undefined;
//       }
//       nearestTile = tileArray[entityIndex + 1];
//       break;
//     case "left":
//       if (entityIndex % WTQ == 0) {
//         return undefined;
//       }
//       nearestTile = tileArray[entityIndex - 1];
//       break;
//   }
//   return nearestTile;
// }

function createRooms(
  tileArray,
  tileClasses,
  widthTileQuantity,
  heightTileQuantity
) {
  var roomCount = Math.floor(Math.random() * 6) + 5;
  var minRoomSize = 3;
  var maxRoomSize = 8;

  var rooms = [];

  function carveRoom(x, y, w, h) {
    for (var yy = y; yy < y + h; yy++) {
      for (var xx = x; xx < x + w; xx++) {
        if (
          xx < 0 ||
          yy < 0 ||
          xx >= widthTileQuantity ||
          yy >= heightTileQuantity
        )
          continue;
        var tileIndex = yy * widthTileQuantity + xx;
        var tile = tileArray[tileIndex];
        if (!tile) continue;
        tile.classList.remove(tileClasses.wall);
      }
    }
  }

  function carveCorridor(x1, y1, x2, y2) {
    var x = x1,
      y = y1;
    while (x !== x2) {
      var tileIndex = y * widthTileQuantity + x;
      tileArray[tileIndex].classList.remove(tileClasses.wall);
      x += x2 > x ? 1 : -1;
    }
    while (y !== y2) {
      var tileIndex = y * widthTileQuantity + x;
      tileArray[tileIndex].classList.remove(tileClasses.wall);
      y += y2 > y ? 1 : -1;
    }
  }

  for (var r = 0; r < roomCount; r++) {
    var roomW =
      Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
    var roomH =
      Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
    var startX = Math.floor(Math.random() * (widthTileQuantity - roomW));
    var startY = Math.floor(Math.random() * (heightTileQuantity - roomH));

    carveRoom(startX, startY, roomW, roomH);

    var centerX = Math.floor(startX + roomW / 2);
    var centerY = Math.floor(startY + roomH / 2);

    if (rooms.length > 0) {
      var prev = rooms[rooms.length - 1];
      carveCorridor(prev.cx, prev.cy, centerX, centerY);
    }

    rooms.push({
      x: startX,
      y: startY,
      w: roomW,
      h: roomH,
      cx: centerX,
      cy: centerY,
    });
  }
}

function createPaths(
  tileArray,
  tileClasses,
  widthTileQuantity,
  heightTileQuantity
) {
  var pathsCountX = Math.floor(Math.random() * 3) + 3;
  var pathsCountY = Math.floor(Math.random() * 3) + 3;
  var widthPaths = [];
  var heightPaths = [];

  for (var w = 0; w < pathsCountY; ) {
    var randomHeight = Math.floor(Math.random() * widthTileQuantity);
    if (heightPaths.indexOf(randomHeight) == -1) {
      heightPaths.push(randomHeight);
      w++;
    }
    continue;
  }
  for (var h = 0; h < pathsCountX; ) {
    var randomHeight = Math.floor(Math.random() * heightTileQuantity);
    if (widthPaths.indexOf(randomHeight) == -1) {
      widthPaths.push(randomHeight);
      h++;
    }
    continue;
  }

  iterateByWidth(
    tileArray,
    widthTileQuantity,
    heightTileQuantity,
    function (tile, i, w, h) {
      if (widthPaths.indexOf(h) != -1) {
        if (tileArray[i].classList.contains(tileClasses.wall)) {
          tileArray[i].classList.remove(tileClasses.wall);
        }
        if (!tileArray[i].classList.contains(tileClasses.base)) {
          tileArray[i].classList.add(tileClasses.base);
        }
      }
    }
  );

  iterateByHeight(
    tileArray,
    widthTileQuantity,
    heightTileQuantity,
    function (tile, i, w, h) {
      if (heightPaths.indexOf(w) != -1) {
        if (tileArray[i].classList.contains(tileClasses.wall)) {
          tileArray[i].classList.remove(tileClasses.wall);
        }
        if (!tileArray[i].classList.contains(tileClasses.base)) {
          tileArray[i].classList.add(tileClasses.base);
        }
      }
    }
  );
}

function createPotions(tileArray, tileClasses) {
  var potionsCount = 10;
  var potionsPlaced = [];
  var potionsGlobal = [];

  while (potionsPlaced.length < potionsCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      potionsPlaced.length >= potionsCount ||
      potionsPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains(tileClasses.wall) ||
      tileArray[randomPlace].classList.contains(tileClasses.enemy) ||
      tileArray[randomPlace].classList.contains(tileClasses.potion) ||
      tileArray[randomPlace].classList.contains(tileClasses.player) ||
      tileArray[randomPlace].classList.contains(tileClasses.sword)
    ) {
      continue;
    }
    potionsPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add(tileClasses.potion);
    potionsGlobal.push(tileArray[randomPlace]);
  }
  return potionsGlobal;
}

function createSwords(tileArray, tileClasses) {
  var swordsCount = 2;
  var swordsPlaced = [];
  var swordsGlobal = [];

  while (swordsPlaced.length < swordsCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      swordsPlaced.length >= swordsCount ||
      swordsPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains(tileClasses.wall) ||
      tileArray[randomPlace].classList.contains(tileClasses.enemy) ||
      tileArray[randomPlace].classList.contains(tileClasses.potion) ||
      tileArray[randomPlace].classList.contains(tileClasses.player) ||
      tileArray[randomPlace].classList.contains(tileClasses.sword)
    ) {
      continue;
    }
    swordsPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add(tileClasses.sword);
    swordsGlobal.push(tileArray[randomPlace]);
  }
  return swordsGlobal;
}

function createEnemies(tileArray, tileClasses) {
  var enemiesCount = 10;
  var enemiesPlaced = [];
  var enemiesGlobal = [];

  while (enemiesPlaced.length < enemiesCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      enemiesPlaced.length >= enemiesCount ||
      enemiesPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains(tileClasses.wall) ||
      tileArray[randomPlace].classList.contains(tileClasses.enemy) ||
      tileArray[randomPlace].classList.contains(tileClasses.potion) ||
      tileArray[randomPlace].classList.contains(tileClasses.player) ||
      tileArray[randomPlace].classList.contains(tileClasses.sword)
    ) {
      continue;
    }
    enemiesPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add(tileClasses.enemy);
    enemiesGlobal.push(tileArray[randomPlace]);
  }
  return enemiesGlobal;
}

function createPlayer(tileArray, tileClasses) {
  var playerCount = 1;
  var playerPlaced = [];

  while (playerPlaced.length < playerCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      playerPlaced.length >= playerCount ||
      playerPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains(tileClasses.wall) ||
      tileArray[randomPlace].classList.contains(tileClasses.enemy) ||
      tileArray[randomPlace].classList.contains(tileClasses.potion) ||
      tileArray[randomPlace].classList.contains(tileClasses.player) ||
      tileArray[randomPlace].classList.contains(tileClasses.sword)
    ) {
      continue;
    }
    playerPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add(tileClasses.player);
    return tileArray[randomPlace];
  }
}

function createField(
  gameField,
  tileClasses,
  widthTileQuantity,
  heightTileQuantity
) {
  var tileArray = [];
  var wallArray = [];
  var baseArray = [];
  var potionsGlobal = [];
  var swordsGlobal = [];
  var enemiesGlobal = [];
  var playerGlobal;

  var gameField_Width = gameField.clientWidth;
  var gameField_Height = gameField.clientHeight;
  var tile_Width = Math.floor(gameField_Width / widthTileQuantity);
  var tile_Height = Math.floor(gameField_Height / heightTileQuantity);

  // creating base tiles /////
  for (var h = 0; h < heightTileQuantity; h++) {
    for (var w = 0; w < widthTileQuantity; w++) {
      var tile = document.createElement("div");

      tile.classList.add(tileClasses.tile);
      tile.classList.add(tileClasses.base);
      tile.classList.add(tileClasses.wall);

      tile.style.width = String(tile_Width) + "px";
      tile.style.height = String(tile_Height) + "px";

      tile.style.left = String(w * tile_Width) + "px";
      tile.style.top = String(h * tile_Height) + "px";

      gameField.appendChild(tile);
    }
  }

  // main tile array /////
  tileArray = document.querySelectorAll(".tile");

  // creating rooms /////
  createRooms(tileArray, tileClasses, widthTileQuantity, heightTileQuantity);
  // creating paths /////
  createPaths(tileArray, tileClasses, widthTileQuantity, heightTileQuantity);
  // create potions /////
  potionsGlobal = createPotions(tileArray, tileClasses, potionsGlobal);
  // create swords /////
  swordsGlobal = createSwords(tileArray, tileClasses, swordsGlobal);
  // create enemies /////
  enemiesGlobal = createEnemies(tileArray, tileClasses, enemiesGlobal);
  // create player /////
  playerGlobal = createPlayer(tileArray, tileClasses, playerGlobal);

  // wall tile array /////
  wallArray = document.querySelectorAll(tileClasses.wall);
  // base tile array /////
  baseArray = document.querySelectorAll(tileClasses.base);

  return {
    tileArray,
    wallArray,
    baseArray,
    potionsGlobal,
    swordsGlobal,
    enemiesGlobal,
    playerGlobal,
  };
}
