function createField(gameField) {
  var widthTileQuantity = 40;
  var heightTileQuantity = 24;

  var gameField_Width = gameField.clientWidth;
  var gameField_Height = gameField.clientHeight;
  var baseTile_Width = Math.floor(gameField_Width / widthTileQuantity);
  var baseTile_Height = Math.floor(gameField_Height / heightTileQuantity);

  // creating base tiles /////
  for (var h = 0; h < 24; h++) {
    for (var w = 0; w < 40; w++) {
      var baseTile = document.createElement("div");

      baseTile.classList.add("tile");
      baseTile.classList.add("tileB");
      baseTile.classList.add("tileW");

      baseTile.style.width = String(baseTile_Width) + "px";
      baseTile.style.height = String(baseTile_Height) + "px";

      baseTile.style.left = String(w * baseTile_Width) + "px";
      baseTile.style.top = String(h * baseTile_Height) + "px";

      gameField.appendChild(baseTile);
    }
  }

  var baseTileArray = document.querySelectorAll(".tileB");

  // creating rooms /////
  var roomCount = Math.floor(Math.random() * 6) + 5;
  var minSize = 3;
  var maxSize = 8;

  var rooms = [];

  for (var r = 0; r < roomCount; r++) {
    var tries = 0;
    var placed = false;

    while (!placed && tries < 50) {
      tries++;

      var roomW = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      var roomH = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

      var startX = Math.floor(Math.random() * (widthTileQuantity - roomW));
      var startY = Math.floor(Math.random() * (heightTileQuantity - roomH));

      var canPlace = true;
      for (var k = 0; k < rooms.length; k++) {
        var other = rooms[k];

        var overlapX = Math.max(
          0,
          Math.min(startX + roomW, other.x + other.w) -
            Math.max(startX, other.x)
        );
        var overlapY = Math.max(
          0,
          Math.min(startY + roomH, other.y + other.h) -
            Math.max(startY, other.y)
        );

        if (overlapX > 1 && overlapY > 1) {
          canPlace = false;
          break;
        }

        var touchingHorizontally =
          (startX + roomW === other.x || other.x + other.w === startX) &&
          !(startY + roomH <= other.y || startY >= other.y + other.h);

        var touchingVertically =
          (startY + roomH === other.y || other.y + other.h === startY) &&
          !(startX + roomW <= other.x || startX >= other.x + other.w);

        if (touchingHorizontally || touchingVertically) {
          canPlace = false;
          break;
        }
      }

      if (!canPlace) continue;

      for (var y = 0; y < roomH; y++) {
        for (var x = 0; x < roomW; x++) {
          var posX = startX + x;
          var posY = startY + y;

          if (
            posX < 0 ||
            posY < 0 ||
            posX >= widthTileQuantity ||
            posY >= heightTileQuantity
          )
            continue;

          var baseTileIndex = posY * widthTileQuantity + posX;
          var baseTile = baseTileArray[baseTileIndex];
          if (!baseTile) continue;

          if (x > 0 && x < roomW - 1 && y > 0 && y < roomH - 1) {
            baseTile.classList.remove("tileW");
          }
        }
      }

      for (var y = -1; y <= roomH; y++) {
        for (var x = -1; x <= roomW; x++) {
          var posX = startX + x;
          var posY = startY + y;

          if (
            posX < 0 ||
            posY < 0 ||
            posX >= widthTileQuantity ||
            posY >= heightTileQuantity
          )
            continue;

          if (x >= 0 && x < roomW && y >= 0 && y < roomH) continue;

          var baseTileIndex = posY * widthTileQuantity + posX;
          var baseTile = baseTileArray[baseTileIndex];
          if (!baseTile) continue;

          baseTile.classList.remove("tileW");
        }
      }

      rooms.push({ x: startX, y: startY, w: roomW, h: roomH });
      placed = true;
    }
  }

  // creating paths /////
}
