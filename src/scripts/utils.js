function iterateByWidth(tileArray, WTQ, HTQ, callback) {
  for (let i = 0, h = 1, w = 1; i < tileArray.length; i++, w++) {
    if (i % WTQ === 0 && i !== 0) {
      h++;
      w = 1;
    }
    callback(tileArray[i], i, w, h);
  }
}

function iterateByHeight(tileArray, WTQ, HTQ, callback) {
  for (let w = 1; w <= WTQ; w++) {
    for (let h = 1; h <= HTQ; h++) {
      const i = (h - 1) * WTQ + (w - 1);
      callback(tileArray[i], i, w, h);
    }
  }
}

function createRooms(tileArray, widthTileQuantity, heightTileQuantity) {
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
        tile.classList.remove("tileW");
      }
    }
  }

  function carveCorridor(x1, y1, x2, y2) {
    var x = x1,
      y = y1;
    while (x !== x2) {
      var tileIndex = y * widthTileQuantity + x;
      tileArray[tileIndex].classList.remove("tileW");
      x += x2 > x ? 1 : -1;
    }
    while (y !== y2) {
      var tileIndex = y * widthTileQuantity + x;
      tileArray[tileIndex].classList.remove("tileW");
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

function createPaths(tileArray, widthTileQuantity, heightTileQuantity) {
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
        if (tileArray[i].classList.contains("tileW")) {
          tileArray[i].classList.remove("tileW");
        }
        if (!tileArray[i].classList.contains("tileB")) {
          tileArray[i].classList.add("tileB");
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
        if (tileArray[i].classList.contains("tileW")) {
          tileArray[i].classList.remove("tileW");
        }
        if (!tileArray[i].classList.contains("tileB")) {
          tileArray[i].classList.add("tileB");
        }
      }
    }
  );
}

function createPotions(tileArray) {
  var potionsCount = 10;
  var potionsPlaced = [];
  var potionsGlobal = [];

  while (potionsPlaced.length < potionsCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      potionsPlaced.length >= potionsCount ||
      potionsPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains("tileW") ||
      tileArray[randomPlace].classList.contains("tileE") ||
      tileArray[randomPlace].classList.contains("tileHP") ||
      tileArray[randomPlace].classList.contains("tileP") ||
      tileArray[randomPlace].classList.contains("tileSW")
    ) {
      continue;
    }
    potionsPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add("tileHP");
    potionsGlobal.push(tileArray[randomPlace]);
  }
  return potionsGlobal;
}

function createSwords(tileArray) {
  var swordsCount = 2;
  var swordsPlaced = [];
  var swordsGlobal = [];

  while (swordsPlaced.length < swordsCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      swordsPlaced.length >= swordsCount ||
      swordsPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains("tileW") ||
      tileArray[randomPlace].classList.contains("tileE") ||
      tileArray[randomPlace].classList.contains("tileHP") ||
      tileArray[randomPlace].classList.contains("tileP") ||
      tileArray[randomPlace].classList.contains("tileSW")
    ) {
      continue;
    }
    swordsPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add("tileSW");
    swordsGlobal.push(tileArray[randomPlace]);
  }
  return swordsGlobal;
}

function createEnemies(tileArray) {
  var enemiesCount = 10;
  var enemiesPlaced = [];
  var enemiesGlobal = [];

  while (enemiesPlaced.length < enemiesCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      enemiesPlaced.length >= enemiesCount ||
      enemiesPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains("tileW") ||
      tileArray[randomPlace].classList.contains("tileE") ||
      tileArray[randomPlace].classList.contains("tileHP") ||
      tileArray[randomPlace].classList.contains("tileP") ||
      tileArray[randomPlace].classList.contains("tileSW")
    ) {
      continue;
    }
    enemiesPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add("tileE");
    enemiesGlobal.push(tileArray[randomPlace]);
  }
  return enemiesGlobal;
}

function createPlayer(tileArray) {
  var playerCount = 1;
  var playerPlaced = [];

  while (playerPlaced.length < playerCount) {
    var randomPlace = Math.floor(Math.random() * tileArray.length);

    if (
      playerPlaced.length >= playerCount ||
      playerPlaced.indexOf(randomPlace) != -1 ||
      tileArray[randomPlace].classList.contains("tileW") ||
      tileArray[randomPlace].classList.contains("tileE") ||
      tileArray[randomPlace].classList.contains("tileHP") ||
      tileArray[randomPlace].classList.contains("tileP") ||
      tileArray[randomPlace].classList.contains("tileSW")
    ) {
      continue;
    }
    playerPlaced.push(randomPlace);
    tileArray[randomPlace].classList.add("tileP");
    return tileArray[randomPlace];
  }
}

function createField(gameField) {
  var tileArray = [];
  var wallTileArray = [];
  var baseTileArray = [];
  var potionsGlobal = [];
  var swordsGlobal = [];
  var enemiesGlobal = [];
  var playerGlobal;

  var widthTileQuantity = 40;
  var heightTileQuantity = 24;

  var gameField_Width = gameField.clientWidth;
  var gameField_Height = gameField.clientHeight;
  var tile_Width = Math.floor(gameField_Width / widthTileQuantity);
  var tile_Height = Math.floor(gameField_Height / heightTileQuantity);

  // creating base tiles /////
  for (var h = 0; h < heightTileQuantity; h++) {
    for (var w = 0; w < widthTileQuantity; w++) {
      var tile = document.createElement("div");

      tile.classList.add("tile");
      tile.classList.add("tileB");
      tile.classList.add("tileW");

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
  createRooms(tileArray, widthTileQuantity, heightTileQuantity);
  // creating paths /////
  createPaths(tileArray, widthTileQuantity, heightTileQuantity);
  // create potions /////
  potionsGlobal = createPotions(tileArray, potionsGlobal);
  // create swords /////
  swordsGlobal = createSwords(tileArray, swordsGlobal);
  // create enemies /////
  enemiesGlobal = createEnemies(tileArray, enemiesGlobal);
  // create player /////
  playerGlobal = createPlayer(tileArray, playerGlobal);

  // wall tile array /////
  wallTileArray = document.querySelectorAll(".tileW");
  // base tile array /////
  baseTileArray = document.querySelectorAll(".tileB");

  return {
    tileArray,
    wallTileArray,
    baseTileArray,
    potionsGlobal,
    swordsGlobal,
    enemiesGlobal,
    playerGlobal,
  };
}
